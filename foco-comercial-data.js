// ============================================
// FOCO COMERCIAL - rotinas semanais do time
// Agenda mensal de foco comercial (semana / período / dia)
// e resumo das rotinas (sub-área + principais atividades).
// ============================================

const focoComercialData = {
  dias: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'],
  semanas: [
    { semana: 'SEMANA 1', periodos: [
      { periodo: 'manhã', agenda: ['ANÁLISE VENDAS','PUBLICAÇÃO','CATALOGAÇÃO','PUBLICAÇÃO','PUBLICAÇÃO'] },
      { periodo: 'tarde', agenda: ['CAMPANHAS','PUBLICAÇÃO','ATIVAÇÃO','PUBLICAÇÃO','ANÁLISE VENDAS'] }
    ]},
    { semana: 'SEMANA 2', periodos: [
      { periodo: 'manhã', agenda: ['ANÁLISE VENDAS','PUBLICAÇÃO','CATALOGAÇÃO','PUBLICAÇÃO','ANÁLISE VENDAS'] },
      { periodo: 'tarde', agenda: ['PUBLICAÇÃO','PUBLICAÇÃO','PUBLICAÇÃO','PUBLICAÇÃO','CAMPANHAS'] }
    ]},
    { semana: 'SEMANA 3', periodos: [
      { periodo: 'manhã', agenda: ['ANÁLISE VENDAS','PUBLICAÇÃO','CATALOGAÇÃO','PUBLICAÇÃO','PUBLICAÇÃO'] },
      { periodo: 'tarde', agenda: ['PUBLICAÇÃO','PUBLICAÇÃO','ATIVAÇÃO','PUBLICAÇÃO','ANÁLISE VENDAS'] }
    ]},
    { semana: 'SEMANA 4', periodos: [
      { periodo: 'manhã', agenda: ['ANÁLISE VENDAS','PUBLICAÇÃO','CATALOGAÇÃO','PUBLICAÇÃO','ANÁLISE VENDAS'] },
      { periodo: 'tarde', agenda: ['PUBLICAÇÃO','PUBLICAÇÃO','PUBLICAÇÃO','PROSPECÇÃO','CAMPANHAS'] }
    ]},
    { semana: 'SEMANA 5', periodos: [
      { periodo: 'manhã', agenda: ['ANÁLISE VENDAS','PUBLICAÇÃO','PUBLICAÇÃO','PUBLICAÇÃO','PUBLICAÇÃO'] },
      { periodo: 'tarde', agenda: ['PUBLICAÇÃO','PUBLICAÇÃO','PROSPECÇÃO','PUBLICAÇÃO','ANÁLISE VENDAS'] }
    ]}
  ],
  rotinas: [
    { nome: 'PROSPECÇÃO', subarea: 'Publicação', resumo: 'Lançamentos de marcas ativas, prospectar marcas no radar e novas.' },
    { nome: 'PUBLICAÇÃO', subarea: 'Publicação', resumo: 'Produção de anúncios, cadastros e rotinas de publicação.' },
    { nome: 'ATIVAÇÃO', subarea: 'Publicação', resumo: 'Vínculo de produtos prontos com marketplaces e rotinas de ativação.' },
    { nome: 'CATALOGAÇÃO', subarea: 'Publicação', resumo: 'Catálogo Mercado Livre, catálogo Shopee, atributos obrigatórios.' },
    { nome: 'CAMPANHAS', subarea: 'Vendas', resumo: 'Ativação de campanhas, transmissões de campanhas, cupons e similares.' },
    { nome: 'ANÁLISE VENDAS', subarea: 'Vendas', resumo: 'Análise dos números de vendas e ações corretivas/estratégicas.' }
  ]
};
