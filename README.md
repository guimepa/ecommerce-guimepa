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
