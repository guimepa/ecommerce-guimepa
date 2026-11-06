#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Regenera os dados de Cross Docking do portal a partir da planilha
"Cross Docking Prazos Fornecedor.xlsx".

Saídas:
  crossdocking-prazos-data.js  -> registros OC/NF/estoque (base da análise)
  crossdocking-data.js          -> níveis de corte configurados por fornecedor
                                  (preservados e atualizados a cada base nova)

Uso:
  python tools/update-crossdocking.py [caminho_da_planilha]

Observações:
  * A planilha é a fonte da verdade. Toda linha vira um registro do portal.
  * A classificação CASA/FERRAMENTAS da Tramontina não é dedutível da planilha,
    por isso o histórico é preservado a partir do JS já gerado; registros novos
    são classificados por heurística (volume de itens da OC).
  * Edições feitas no portal (níveis de corte) podem ser exportadas para
    "crossdocking-overrides.json" e são aplicadas aqui a cada atualização.
"""

import datetime
import json
import math
import os
import re
import sys
from collections import Counter, defaultdict

import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_XLSX = os.path.join(
    os.path.dirname(ROOT),
    "Arquivos Excel",
    "Cross Docking Prazos Fornecedor.xlsx",
)
PRAZOS_JS = os.path.join(ROOT, "crossdocking-prazos-data.js")
CONFIG_JS = os.path.join(ROOT, "crossdocking-data.js")
OVERRIDES_JSON = os.path.join(ROOT, "crossdocking-overrides.json")

# ---------------------------------------------------------------------------
# mapa fornecedor -> (marca, logo em logos-marcas/)
# ---------------------------------------------------------------------------
MARCA_LOGO = {
    "AUTOMOZ COMERCIAL DISTRIBUIDORA LTDA": ("AUTOMOZ", "automoz.png"),
    "BEL FIX IMPORTACAO LTDA": ("BELFIX", "Bel.png"),
    "BETA DO BRASIL COM. MAQ. E FER.LTDA": ("BETA", "Beta.png"),
    "BRANCO MOTORES LTDA": ("BRANCO", "Branco.png"),
    "BRINOX METALURGICA SA": ("BRINOX", "Brinox.png"),
    "BRITANIA ELETRODOMESTICOS SA": ("BRITANIA", "britania.png"),
    "BUFFALO MOTORES E ACOPLADOS LTDA": ("BUFFALO", "Buffalo.png"),
    "CARTONALE IND E BENEF DE MATERIAIS PLASTICOS LTDA": ("CARTONALE", "cartonale.png"),
    "CCM MAQUINAS E MOTORES LTDA": ("CCM", "CCM.png"),
    "CHIAPERINI INDUSTRIAL LTDA": ("CHIAPERINI", "Chiaperini.png"),
    "CSM-COMPONENTES SISTEMAS E MAQUINAS PARA CONSTRUCAO LTDA": ("CSM", "CSM.png"),
    "FERRAGENS NEGRAO COM LTDA": ("NEGRAO", "WORKER.png"),
    "FERRAGENS NEGRAO COMERCIAL LTDA": ("NEGRAO", "WORKER.png"),
    "FORTIS CARRINHOS INDUSTRIAIS LTDA": ("FORTIS", "fortis.png"),
    "FRESNOMAQ INDUSTRIA DE MAQUINAS SA": ("FRESNOMAQ MAQUINAS", "Wap.png"),
    "FRESNOMAQ MAQUINAS": ("FRESNOMAQ MAQUINAS", "Wap.png"),
    "FRICKE SOLDAS LTDA": ("FRICKE SOLDAS LTDA", "Balmer.png"),
    "GARTHEN IND E COM DE MAQUINAS LTDA": ("GARTHEN IND E COM DE MAQUINAS LTDA", "GMEG.png"),
    "LYNUS INDUSTRIA, COMERCIO, IMPORTACAO E EXPORTACAO LTDA": ("LYNUS", "LYNUS.png"),
    "MAKITA DO BRASIL FERRAMENTAS ELETRICAS LTDA": ("MAKITA", "Makita.png"),
    "METAL TECNICA BOVENAU LTDA": ("BOVENAU", "BOVENAU.png"),
    "METALURGICA TRAPP LTDA": ("TRAPP", "Trapp.png"),
    "NORDTECH MAQUINAS E MOTORES LTDA": ("NORDTECH MAQUINAS E MOTORES LTDA", "Tekna.png"),
    "O.V.D IMPORTADORA E DISTRIBUIDORA LTDA": ("O.V.D", "Vonder.png"),
    "ROBERT BOSCH LIMITADA": ("BOSCH", "Bosch.png"),
    "TOOLS WORLD LLC MUNDO DAS FERRAMENTAS DO BRASIL LTDA": ("TOOLS WORLD", "MTX.png"),
    "TOYAMA DO BRASIL MAQUINAS LTDA": ("TOYAMA", "Toyama.png"),
    "TRADESTAR IMPORTACAO E EXPORTACAO LTDA": ("TRADESTAR", "tradestar.png"),
    "TRAMONTINA SUL SA": ("TRAMONTINA", "Tramontina.png"),
    "WORKER COMERCIO DE FERRAMENTAS LTDA": ("NEGRAO", "WORKER.png"),
    "WTEC MOVEIS E EQUIPAMENTOS TECNICOS LTDA": ("WTEC MOVEIS E EQUIPAMENTOS TECNICOS LTDA", "PRESTO.png"),
}

TRAMONTINA = "TRAMONTINA SUL SA"
TRAMONTINA_CASA = "TRAMONTINA CASA"
TRAMONTINA_FERR = "TRAMONTINA FERRAMENTAS"
# heurística para registros novos (volume de itens da OC)
TRAMONTINA_CASA_MIN_ITENS = 15

# razão social antiga/alternativa -> nome canônico usado no mapa acima
FORNECEDOR_ALIASES = {
    "TRAMONTINA SUL LTDA": TRAMONTINA,
}

# diagnóstico da última resolução (nome bruto -> canônico), usado no relatório
RESOLUCOES = {}
# divergências entre a coluna "image" da planilha e o logo do mapa
DIVERGENCIAS_LOGO = {}
# linhas repetidas (mesma OC/NF) consolidadas na última execução
DEDUPE_REMOVIDOS = 0


# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------
def norm_fornecedor(value):
    if value is None:
        return ""
    return re.sub(r"\s+", " ", str(value)).strip().upper()


def logo_key(value):
    """Chave de comparação de logo: minúscula, sem diretório e sem extensão."""
    s = str(value or "").strip().replace("\\", "/").split("/")[-1].lower()
    return re.sub(r"\.\w+$", "", s)


def parse_int(value):
    """Converte quantidades da planilha ("13", 13, "1.200", "1.200,5") em int."""
    if value is None or value == "":
        return 0
    if isinstance(value, (int, float)):
        return int(value)
    s = re.sub(r"[^\d,.\-]", "", str(value))
    if not s:
        return 0
    if "," in s:
        s = s.replace(".", "").replace(",", ".")
    elif s.count(".") > 1:
        s = s.replace(".", "")
    try:
        return int(float(s))
    except ValueError:
        return 0


def _prefixo_comum(a, b):
    n = min(len(a), len(b))
    i = 0
    while i < n and a[i] == b[i]:
        i += 1
    return i


def resolve_fornecedor(value):
    """Resolve o nome da planilha para a chave canônica de MARCA_LOGO.

    A planilha é preenchida à mão e às vezes concatena uma observação ao nome
    do fornecedor ("MAKITA ... LTDAFALTOU ITENS") ou traz o nome truncado
    ("O.V.D IMPORTADORA E DISTRIBUID"). Este resolvedor tolera os dois casos.
    Retorna None quando não há correspondência segura.
    """
    nome = norm_fornecedor(value)
    if not nome:
        return ""
    if nome in MARCA_LOGO or nome == TRAMONTINA:
        return nome
    if nome in FORNECEDOR_ALIASES:
        canonico = FORNECEDOR_ALIASES[nome]
        RESOLUCOES[nome] = canonico
        return canonico

    # nome como aparece na planilha -> chave canônica do mapa
    conhecidos = {k: k for k in MARCA_LOGO}
    conhecidos[TRAMONTINA] = TRAMONTINA
    for alias, canonico in FORNECEDOR_ALIASES.items():
        conhecidos[alias] = canonico

    # 1) nome completo + observação colada no final
    candidatos = [k for k in conhecidos if nome.startswith(k)]
    if candidatos:
        canonico = conhecidos[max(candidatos, key=len)]
        RESOLUCOES[nome] = canonico
        return canonico

    # 2) nome truncado
    candidatos = [k for k in conhecidos if k.startswith(nome) and len(nome) >= 12]
    if candidatos:
        canonico = conhecidos[min(candidatos, key=len)]
        RESOLUCOES[nome] = canonico
        return canonico

    # 3) nome truncado + observação
    melhor, melhor_lcp = None, 0
    for k in conhecidos:
        lcp = _prefixo_comum(nome, k)
        if lcp > melhor_lcp:
            melhor, melhor_lcp = k, lcp
    if melhor and melhor_lcp >= 18 and melhor_lcp >= 0.55 * min(len(nome), len(melhor)):
        canonico = conhecidos[melhor]
        RESOLUCOES[nome] = canonico
        return canonico

    return None


def dstr(value):
    if isinstance(value, datetime.datetime):
        return value.strftime("%Y-%m-%d")
    return ""


def parse_date(value):
    if isinstance(value, datetime.datetime):
        return value.date()
    if isinstance(value, datetime.date):
        return value
    return None


def biz_days(start, end):
    """Dias úteis (seg a sex) em (start, end]."""
    if not start or not end or end < start:
        return None
    n, cur = 0, start
    while cur < end:
        cur += datetime.timedelta(days=1)
        if cur.weekday() < 5:
            n += 1
    return n


def sort_key(rec):
    """dataOc, dataNf, dataEstoque (vazias no fim) e número da OC."""
    est = rec["dataEstoque"]
    oc = str(rec["oc"])
    return (
        rec["dataOc"],
        rec["dataNf"],
        1 if not est else 0,
        est,
        int(oc) if oc.isdigit() else 0,
    )


def load_previous_labels():
    """Histórico de classificação (Tramontina) a partir do JS já gerado."""
    labels = {}
    if not os.path.exists(PRAZOS_JS):
        return labels
    with open(PRAZOS_JS, encoding="utf-8") as fh:
        text = fh.read()
    for raw in re.findall(r'\{ "oc":.*?\}', text):
        try:
            obj = json.loads(raw)
        except json.JSONDecodeError:
            continue
        if obj.get("fornecedor") != TRAMONTINA:
            continue
        marca = obj.get("marca")
        if marca not in (TRAMONTINA_CASA, TRAMONTINA_FERR):
            continue
        if obj.get("nf"):
            labels[("nf", str(obj["oc"]), str(obj["nf"]))] = marca
        labels[("dt", obj.get("oc"), obj.get("dataOc"), obj.get("dataNf"), obj.get("dataEstoque"))] = marca
    return labels


def classify_tramontina(row, labels):
    nf = "" if row["nf"] is None else str(row["nf"])
    oc = str(row["oc"])
    raw = str(row.get("ocRaw") or oc)
    for chave_oc in (raw, oc):
        hit = labels.get(("nf", chave_oc, nf))
        if hit:
            return hit
        hit = labels.get(
            ("dt", chave_oc, row["dataOc"], row["dataNf"], row["dataEstoque"])
        )
        if hit:
            return hit
    itens = row["itens"] or 0
    return TRAMONTINA_CASA if itens >= TRAMONTINA_CASA_MIN_ITENS else TRAMONTINA_FERR


# ---------------------------------------------------------------------------
# leitura da planilha
# ---------------------------------------------------------------------------
def read_sheet(xlsx_path):
    wb = openpyxl.load_workbook(xlsx_path, data_only=True)
    ws = wb[wb.sheetnames[0]]
    raw = []
    for values in ws.iter_rows(min_row=2, values_only=True):
        if values[0] is None and values[1] is None:
            continue
        raw.append(values)
    return raw


def build_records(raw, labels):
    records = []
    nao_resolvidos = {}
    for values in raw:
        fornecedor = resolve_fornecedor(values[9])
        if not fornecedor:
            nao_resolvidos[norm_fornecedor(values[9])] = (
                nao_resolvidos.get(norm_fornecedor(values[9]), 0) + 1
            )
            continue
        # a planilha consolida várias OCs na mesma NF (separadas por "," ou ".");
        # cada OC vira um registro próprio
        oc_raw = str(values[1] or "").strip()
        ocs = re.findall(r"\d{4,6}", oc_raw)
        if not ocs:
            continue
        for oc in ocs:
            row = {
                "nf": "" if values[0] is None else str(values[0]).strip(),
                "oc": oc,
                "ocRaw": oc_raw,
                "fornecedor": fornecedor,
                "itens": parse_int(values[5]),
                "dataOc": dstr(values[2]),
                "dataNf": dstr(values[3]),
                "dataEstoque": dstr(values[4]),
                "xls": bool(values[14]),
            }
            if fornecedor == TRAMONTINA:
                row["marca"] = classify_tramontina(row, labels)
                row["logo"] = "Tramontina.png"
            else:
                marca_logo = MARCA_LOGO.get(fornecedor)
                if marca_logo is None:
                    raise SystemExit(
                        "Fornecedor sem mapa de marca/logo: %r (adicione em MARCA_LOGO)" % fornecedor
                    )
                row["marca"], row["logo"] = marca_logo
            img = logo_key(values[10]) if len(values) > 10 else ""
            if img and img != logo_key(row["logo"]):
                chave = (norm_fornecedor(values[9]), row["logo"], str(values[10]))
                DIVERGENCIAS_LOGO[chave] = DIVERGENCIAS_LOGO.get(chave, 0) + 1
            records.append(row)
    if nao_resolvidos:
        detalhe = "\n".join(
            "  %3d x %s" % (n, nome) for nome, n in sorted(nao_resolvidos.items())
        )
        raise SystemExit(
            "Fornecedor(es) sem mapa de marca/logo. Adicione em MARCA_LOGO "
            "(ou em FORNECEDOR_ALIASES):\n%s" % detalhe
        )
    records = dedupe_oc_nf(records)
    records.sort(key=sort_key)
    return records


def dedupe_oc_nf(records):
    """Consolida a mesma OC/NF repetida na planilha.

    A planilha traz a linha agrupada ("OC 49246,49248,49249 | NF 208015") e
    também a linha individual de cada OC; sem consolidar, a mesma OC apareceria
    duas vezes na Análise OC. Quando há repetição, prevalece a linha individual
    (data de emissão da própria OC) e, depois, a mais completa.
    """
    grupos = defaultdict(list)
    for rec in records:
        grupos[(rec["oc"], rec["nf"], rec["marca"])].append(rec)

    def score(rec):
        individual = 1 if len(re.findall(r"\d{4,6}", rec["ocRaw"])) <= 1 else 0
        datas = sum(1 for d in (rec["dataOc"], rec["dataNf"], rec["dataEstoque"]) if d)
        return (individual, datas, rec["dataOc"])

    out = []
    for itens in grupos.values():
        out.append(max(itens, key=score) if len(itens) > 1 else itens[0])
    global DEDUPE_REMOVIDOS
    DEDUPE_REMOVIDOS = sum(len(v) - 1 for v in grupos.values())
    return out


def write_prazos_js(records):
    lines = ["const crossDockingPrazosData = ["]
    for rec in records:
        lines.append(
            '  { "oc": %s, "nf": %s, "fornecedor": %s, "marca": %s, "logo": %s, '
            '"dataOc": %s, "dataNf": %s, "dataEstoque": %s, "xls": %s },'
            % (
                json.dumps(rec["oc"], ensure_ascii=False),
                json.dumps(rec["nf"], ensure_ascii=False),
                json.dumps(rec["fornecedor"], ensure_ascii=False),
                json.dumps(rec["marca"], ensure_ascii=False),
                json.dumps(rec["logo"], ensure_ascii=False),
                json.dumps(rec["dataOc"], ensure_ascii=False),
                json.dumps(rec["dataNf"], ensure_ascii=False),
                json.dumps(rec["dataEstoque"], ensure_ascii=False),
                "true" if rec["xls"] else "false",
            )
        )
    lines.append("];")
    with open(PRAZOS_JS, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(lines) + "\n")
    return len(records)


# ---------------------------------------------------------------------------
# níveis de corte configurados (crossdocking-data.js)
# ---------------------------------------------------------------------------
def supplier_real_stats(records):
    """Média real de dias úteis (OC -> estoque) por marca."""
    buckets = defaultdict(list)
    for rec in records:
        if not (rec["dataOc"] and rec["dataNf"] and rec["dataEstoque"]):
            continue
        try:
            d_oc = datetime.date.fromisoformat(rec["dataOc"])
            d_nf = datetime.date.fromisoformat(rec["dataNf"])
            d_es = datetime.date.fromisoformat(rec["dataEstoque"])
        except ValueError:
            continue
        total = biz_days(d_oc, d_es)
        if total is None or total < 0 or total > 30:
            continue
        buckets[rec["marca"]].append(total)
    stats = {}
    for marca, values in buckets.items():
        values.sort()
        stats[marca] = {
            "n": len(values),
            "media": sum(values) / len(values),
            "p90": values[min(len(values) - 1, int(len(values) * 0.9))],
        }
    return stats


def config_entries():
    """Lê os níveis de corte já configurados preservando o arquivo original."""
    with open(CONFIG_JS, encoding="utf-8") as fh:
        text = fh.read()
    entries = []
    for raw in re.findall(r"\{\s*\"ordem\".*?\n  \}", text, flags=re.S):
        obj = json.loads(raw)
        entries.append(obj)
    return entries


def apply_overrides(entries, overrides):
    if not overrides:
        return entries
    by_key = {(e["fornecedor"], e["ordem"]): e for e in entries}
    for item in overrides.get("niveis", []):
        key = (item.get("fornecedor"), item.get("ordem"))
        if key in by_key:
            by_key[key]["prazo"] = item.get("prazo", by_key[key]["prazo"])
    return entries


def update_config_js(records, stats):
    """Mantém os níveis de corte atualizados a cada nova base.

    - preserva os prazos já configurados
    - aplica overrides exportados do portal (edição com senha)
    - insere fornecedores novos que ainda não existem na configuração
    """
    with open(CONFIG_JS, encoding="utf-8") as fh:
        text = fh.read()
    blocks = re.findall(r"\{\s*\"ordem\".*?\n  \}", text, flags=re.S)
    entries = [json.loads(b) for b in blocks]

    overrides = {}
    if os.path.exists(OVERRIDES_JSON):
        try:
            with open(OVERRIDES_JSON, encoding="utf-8-sig") as fh:
                overrides = json.load(fh)
        except (ValueError, OSError) as exc:
            print(f"AVISO: {os.path.basename(OVERRIDES_JSON)} ignorado ({exc}).")
            overrides = {}
    entries = apply_overrides(entries, overrides)

    existing = {e["fornecedor"] for e in entries}
    existing_logos = {str(e.get("image") or "").lower() for e in entries}
    next_order = max((e["ordem"] for e in entries), default=0) + 1

    added = []
    marcas_base = {}
    for rec in records:
        marcas_base.setdefault(rec["marca"], rec["logo"])
    # todo fornecedor presente na base precisa existir na configuração,
    # mesmo os que ainda não têm ciclo completo (sem média real)
    for marca in sorted(marcas_base):
        logo = marcas_base[marca]
        if not logo or logo.lower() in existing_logos:
            continue
        info = stats.get(marca)
        prazo = max(1, int(math.ceil(info["media"]))) if info else 1
        entries.append(
            {
                "ordem": next_order,
                "fornecedor": marca,
                "marca": marca,
                "image": logo,
                "prazo": prazo,
                "operador": "GERAL",
                "preco": None,
                "custo": None,
            }
        )
        existing.add(marca)
        existing_logos.add(logo.lower())
        next_order += 1
        added.append((marca, logo, prazo, info is not None))

    if not added and not overrides:
        return added, entries

    entries.sort(key=lambda e: e["ordem"])
    write_config_js(entries)
    return added, entries


def write_config_js(entries):
    out = ["const crossDockingData = ["]
    blocks = []
    for e in entries:
        campos = [
            ("ordem", e.get("ordem")),
            ("fornecedor", e.get("fornecedor")),
            ("image", e.get("image")),
            ("prazo", e.get("prazo")),
            ("operador", e.get("operador")),
            ("preco", e.get("preco")),
            ("custo", e.get("custo")),
        ]
        if e.get("marca"):
            campos.insert(2, ("marca", e.get("marca")))
        linhas = ["  {"]
        for i, (k, v) in enumerate(campos):
            sufixo = "" if i == len(campos) - 1 else ","
            linhas.append(
                '    "%s": %s%s' % (k, json.dumps(v, ensure_ascii=False), sufixo)
            )
        linhas.append("  }")
        blocks.append("\n".join(linhas))
    out.append(",\n".join(blocks))
    out.append("];")
    with open(CONFIG_JS, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(out) + "\n")


# ---------------------------------------------------------------------------
def main():
    xlsx_path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_XLSX
    if not os.path.exists(xlsx_path):
        raise SystemExit("Planilha nao encontrada: %s" % xlsx_path)

    labels = load_previous_labels()
    raw = read_sheet(xlsx_path)
    records = build_records(raw, labels)
    total = write_prazos_js(records)
    stats = supplier_real_stats(records)
    added, _entries = update_config_js(records, stats)

    print("Registros gravados em crossdocking-prazos-data.js: %d" % total)
    print("Fornecedores na base: %d" % len({r["fornecedor"] for r in records}))
    if DEDUPE_REMOVIDOS:
        print(
            "Linhas repetidas consolidadas (mesma OC/NF): %d" % DEDUPE_REMOVIDOS
        )
    if RESOLUCOES:
        print("Nomes da planilha normalizados (%d variacoes):" % len(RESOLUCOES))
        for bruto, canonico in sorted(RESOLUCOES.items()):
            print("  - %s  ->  %s" % (bruto, canonico))
    if DIVERGENCIAS_LOGO:
        print("AVISO: logo do mapa diferente da coluna 'image' da planilha:")
        for (bruto, esperado, achado), n in sorted(DIVERGENCIAS_LOGO.items()):
            print("  - %3d x %s: mapa=%s / planilha=%s" % (n, bruto, esperado, achado))
    faltando = sorted(
        {
            r["logo"]
            for r in records
            if not os.path.exists(os.path.join(ROOT, "logos-marcas", r["logo"]))
        }
    )
    if faltando:
        print("AVISO: logos ausentes em logos-marcas/ (adicione os arquivos):")
        for logo in faltando:
            print("  - %s" % logo)
    if added:
        print("Niveis de corte inseridos (fornecedores novos):")
        for fornecedor, logo, prazo, com_media in added:
            nota = "" if com_media else " - sem ciclo completo na base"
            print("  - %s [%s] (%s dias%s)" % (fornecedor, logo, prazo, nota))
    else:
        print("Nenhum fornecedor novo para incluir nos niveis de corte.")


if __name__ == "__main__":
    main()
