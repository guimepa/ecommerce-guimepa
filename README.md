# Portal E-commerce Guimepa 2.0

Painel operacional estático (HTML + JavaScript) que consolida as operações de e-commerce da Guimepa:
Marketplaces, Atividades, Ações, Publicações (cronograma Gantt), Campanhas, Cross Docking,
Fornecedores, Transportadoras e Intelipost.

Não possui build nem dependências — basta servir a pasta em qualquer hospedagem estática.

## Como usar

Abra `index.html` em um navegador moderno ou publique a pasta em GitHub Pages / qualquer host estático.

Atalhos:

- `Ctrl + K` — pesquisa global em todas as áreas.
- Botão de menu na barra superior recolhe a sidebar.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Única página (CSS + HTML + JS dos módulos). |
| `canais-data.js` | Mapa canônico de canais/lojas usado por Marketplaces e Campanhas. |
| `data.js` | Publicações: fornecedores, Gantt (`months`, `weeks`, `publicationYear`, `ganttSchedule`). |
| `marketplaces-data.js` | Lojas e informações por marketplace. |
| `atividades-data.js` | Atividades da equipe (E-commerce). |
| `suporte-ti-data.js` | Responsabilidades de TI (Suporte). |
| `acoes-data.js` | Histórico de ações. |
| `campanhas-data.js` | Campanhas coparticipadas. |
| `crossdocking-data.js` | Regras de cross docking por fornecedor. |
| `crossdocking-prazos-data.js` | Base de OCs do Cross Docking (OC, NF, emissões, entrada no estoque, itens, financeiro). |
| `crossdocking-config.js` | Configurações protegidas do Cross Docking (hash SHA-256 da senha de edição dos níveis). |
| `foco-comercial-data.js` | Rotinas semanais de foco comercial (agenda + resumo por rotina). |
| `fornecedores-data.js` | Condições comerciais dos fornecedores. |
| `transportadoras-data.js` | Transportadoras e cobertura. |
| `intelipost-data.js` | Regras do Intelipost. |
| `cronogramas-publicacao-data.js` | Cronogramas detalhados por fornecedor (chave = nome em `data.js`). |
| `rastreio-data.js` | URLs de rastreio por transportadora. |
| `assistencia-tecnica-data.js` | URLs de assistência técnica por fornecedor. |

## Como atualizar os dados

Os dados vêm de planilhas (XLSX) e são exportados para os arquivos `*-data.js`.
Ao gerar um novo arquivo:

1. Mantenha **exatamente** os nomes de campos usados pelo código (veja o arquivo atual).
2. Datas sempre no formato `AAAA-MM-DD`.
3. Para `descontoMarketplace` (campanhas) use número; a string `"por sku"` é aceita mas impede somas.
4. Para `canal` use o mesmo nome já existente — as grafias alternativas são reunidas em `canais-data.js`.

## Cross Docking

Sub-abas do módulo:

| Sub-aba | Conteúdo |
|---|---|
| **Visão Geral** | Comparação entre nível configurado e média real por fornecedor/marca. |
| **Análise OC** | Prova real OC → NF → Estoque: número da OC e da NF, datas (dd/mm/aaaa), dias de cada etapa, dias totais e financeiro. Filtros por fornecedor, marca, OC, NF, períodos e faixas de dias. |
| **Configuração de Prazos** | Níveis de corte (dias) por fornecedor e condição de pagamento, com a média real da base ao lado. |
| **Desempenho Logístico** | Indicadores de aderência dos fornecedores aos prazos. |

Edição dos níveis: botão ✎ no cartão → exige a senha (só o hash SHA-256 fica em `crossdocking-config.js`)
e um **motivo** de até 60 caracteres. Cada alteração grava data/hora, valor anterior, autor e motivo no
histórico (recolhido por padrão) e fica no `localStorage` do navegador. A toolbar permite **exportar** os
níveis (gera `crossdocking-overrides.json`) e **restaurar** os valores originais do arquivo — a restauração
também exige a mesma senha.

### Atualizar a base do Cross Docking

```
python tools/update-crossdocking.py ["caminho\Cross Docking Prazos Fornecedor.xlsx"]
```

O script lê a planilha (fonte da verdade) e regrava `crossdocking-prazos-data.js`. Em `crossdocking-data.js`
ele preserva os níveis já configurados, aplica `crossdocking-overrides.json` (se existir) e inclui
fornecedores novos com prazo inicial = média real arredondada para cima (ou 1 dia quando ainda não há
ciclo completo). A tag **CASA/FERRAMENTAS** da Tramontina vem da coluna O (XLS) da planilha: preenchida →
CASA, vazia → FERRAMENTAS. Vale para as duas razões sociais (TRAMONTINA SUL LTDA e TRAMONTINA SUL SA),
tratadas como o mesmo fornecedor.

O gerador também trata as imperfeições da planilha:

- normaliza o nome do fornecedor quando a célula traz observação colada ou nome truncado
  (`MAKITA ... LTDAFALTOU ITENS`, `O.V.D IMPORTADORA E DISTRIBUID`) e relata cada conversão;
- consolida a mesma OC/NF repetida (linha agrupada `49246,49248,49249` + linha individual), mantendo a
  linha individual e evitando contagem dupla na Análise OC;
- avisa quando falta o arquivo de logo em `logos-marcas/`.

## Convenções importantes

- **Nomes de canais**: a mesma loja pode aparecer como `MAGALU-GUIMEPA` (Marketplaces) e
  `MAGAZINE LUIZA GMK8` (Campanhas). Ambos pertencem ao grupo canônico **Magalu** em `canais-data.js`.
  Não crie grafias novas sem incluí-las no mapa.
- **Imagens**: logos ficam em `logos-marcas`, `logos-transportes`, `logos-marketplaces`,
  `logos-plataformas` e `logos-equipe`. Prefira PNG com dimensão máxima de 400 px (projeto otimizado).
- **Ano do cronograma**: o Gantt usa a constante `publicationYear` em `data.js` (não hardcoded no HTML).

## Manutenção

- A maioria das telas re-renderiza via `innerHTML` — edite com cuidado e teste após mudanças.
- Valide JSON/JS dos arquivos `*-data.js` após exportar (chaves balanceadas, sem duplicatas).
