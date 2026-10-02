// Cronogramas detalhados da aba Publicações.
// Apenas marcas com Status Produção = "sim" podem abrir o painel ampliado.
// A chave deve corresponder ao nome do fornecedor em data.js.
const cronogramasPublicacaoData = {
  "FOXLUX": {
    title: "Publicação FOXLUX",
    manager: "Lucas",
    startDate: "2026-07-20",
    phases: [
      { phase: "1", group: "Cadastro Empresa, Financeiro", tasks: [
        { code: "1.1", activity: "Cadastrar Guimepa como Cliente", owner: "Representante", startOffset: 0, duration: 4, progress: 5, color: "blue" },
        { code: "1.1.1", activity: "Cadastrar Fornecedor", owner: "Guimepa", startOffset: 0, duration: 2, progress: 100, color: "blue" },
        { code: "1.2", activity: "Liberação de Crédito para Faturamento", owner: "Guimepa", startOffset: 5, duration: 10, progress: 0, color: "blue" },
        { code: "1.3", activity: "Validação de E-mail de DANFE", owner: "Guimepa", startOffset: 5, duration: 2, progress: 0, color: "blue" }
      ]},
      { phase: "1", group: "Cadastramento de Produtos", tasks: [
        { code: "3.1", activity: "Recebimento de todas as bases de dados", owner: "Fornecedor", startOffset: 1, duration: 1, progress: 0, color: "orange" },
        { code: "3.2", activity: "Recebimento de tabela de preços", owner: "Fornecedor", startOffset: 1, duration: 1, progress: 0, color: "orange" },
        { code: "3.2.1", activity: "Criação da Tabela e Cadastros no ERP", owner: "Guimepa", startOffset: 2, duration: 5, progress: 50, color: "orange" },
        { code: "3.2.2", activity: "Configurações de integração", owner: "Guimepa", startOffset: 6, duration: 4, progress: 0, color: "orange" }
      ]},
      { phase: "2", group: "Configurações da API", tasks: [
        { code: "2.1", activity: "Reunião entre TIs e alinhamento", owner: "Guimepa", startOffset: 4, duration: 1, progress: 0, color: "darkorange" },
        { code: "2.2", activity: "Implantação do Fornecedor", owner: "Fornecedor", startOffset: 4, duration: 15, progress: 0, color: "darkorange" },
        { code: "2.3", activity: "Implantação da Guimepa", owner: "Guimepa", startOffset: 19, duration: 11, progress: 0, color: "darkorange" },
        { code: "2.4", activity: "Realizar todos os testes prévios de conexão", owner: "Guimepa", startOffset: 30, duration: 2, progress: 0, color: "darkorange" },
        { code: "2.5", activity: "Configuração de Automações e testes", owner: "Guimepa", startOffset: 32, duration: 2, progress: 0, color: "darkorange" }
      ]},
      { phase: "3", group: "Publicação e Ativação dos Anúncios", tasks: [
        { code: "4.1", activity: "Padronizações de Títulos", owner: "Guimepa", startOffset: 8, duration: 18, progress: 0, color: "blue" },
        { code: "4.2", activity: "Padronizações de Descrições", owner: "Guimepa", startOffset: 8, duration: 18, progress: 0, color: "blue" },
        { code: "4.3", activity: "Categorização", owner: "Guimepa", startOffset: 25, duration: 3, progress: 0, color: "blue" },
        { code: "4.4", activity: "Padronizações de Imagens", owner: "Guimepa", startOffset: 18, duration: 11, progress: 0, color: "blue" },
        { code: "4.5", activity: "Ativação em todas as lojas", owner: "Guimepa", startOffset: 29, duration: 4, progress: 0, color: "blue" }
      ]}
    ]
  }
};
