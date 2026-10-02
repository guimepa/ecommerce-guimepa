const checklistsData = [
  {
    assunto: 'VISITAS DE PARCEIROS',
    etapas: [
      { texto: 'Criar e agendar a reunião na sala de reuniões' },
      { texto: 'Criar a apresentação' },
      { texto: 'Preparar o material da apresentação' },
      { texto: 'Validar a apresentação' },
      { texto: 'Montar a sala' },
      { texto: 'Criar a ata da conversa e registrar os alinhamentos' },
      { texto: 'Compartilhar e alinhar as demandas e pendências pós-visita/reunião' }
    ]
  },
  {
    assunto: 'ATIVAÇÃO DE LOJA DE MARKETPLACE',
    etapas: [
      { texto: 'Criar o grupo de WhatsApp' },
      { texto: 'Validar a minuta' },
      { texto: 'Assinar o contrato' },
      { texto: 'Cadastrar e configurar o marketplace no sistema' },
      { texto: 'Atualizar os dados na planilha de canais do Excel (Atividades)' },
      { texto: 'Solicitar a implantação no AnyMarket' },
      { texto: 'Configurar a integração' },
      { texto: 'Vincular as categorias' },
      { texto: 'Ativar um anúncio de teste' },
      { texto: 'Realizar um pedido fake ou simular o fluxo completo' },
      { texto: 'Ativar os anúncios completos' },
      { texto: 'Monitorar os erros e corrigir' },
      { texto: 'Efetuar a ativação da loja' }
    ]
  },
  {
    assunto: 'ANÁLISE PARA NOVA LOJA DE MARKETPLACE',
    etapas: [
      { categoria: 'OPERACIONAL', texto: 'A integração funciona bem?' },
      { categoria: 'OPERACIONAL', texto: 'Como é a catalogação dos anúncios?' },
      { categoria: 'OPERACIONAL', texto: 'Como é calculado o frete?' },
      { categoria: 'COMERCIAL', texto: 'Qual a comissão por categoria? (negociar)' },
      { categoria: 'COMERCIAL', texto: 'Como funcionam as campanhas?' },
      { categoria: 'COMERCIAL', texto: 'Cobra comissão sobre o frete?' },
      { categoria: 'ATENDIMENTO', texto: 'Existe painel seller? Por onde entra o SAC?' },
      { categoria: 'ATENDIMENTO', texto: 'Como é a política de cancelamento? Cobra taxas?' },
      { categoria: 'FINANCEIRO', texto: 'Como funciona o fluxo de repasse?' },
      { categoria: 'FINANCEIRO', texto: 'O repasse ocorre após a entrega ou o faturamento do pedido?' },
      { categoria: 'FINANCEIRO', texto: 'Precisamos de um modelo de relatório de repasse para análise de conciliação' },
      { categoria: 'FINANCEIRO', texto: 'Por onde retiramos o relatório? Vem por e-mail ou via portal?' }
    ]
  },
  {
    assunto: 'ATUALIZAÇÃO E ATIVAÇÃO TRANSPORTADORA INTELIPOST - TABELA DE FRETE',
    etapas: [
      { texto: 'Comparar as planilhas das duas origens' },
      { texto: 'Comparar as regiões descritas na tabela da versão Intelipost' },
      { texto: 'Conferir as colunas de preços, identificando possíveis erros (valor zerado, valor estourado, erro de célula)' },
      { texto: 'Conferir as colunas de TDA (Taxa de Dificuldade de Acesso)' },
      { texto: 'Registrar que a coluna e os valores de TDE (Taxa de Dificuldade de Entrega) não funcionam em cotações, por serem por CNPJ' },
      { texto: 'Abrir chamado dentro da tabela quando houver ativação — 1 por origem' },
      { texto: 'Descrever bem a solicitação; se for atualização, sempre descrever se é base geral ou base complementar' },
      { texto: 'Fazer testes e cotações com pelo menos 4 faixas de peso e pelo menos 2 por região do país, priorizando os mais vendidos' }
    ]
  },
  {
    assunto: 'DESATIVANDO LOJA DE MARKETPLACE',
    etapas: [
      { texto: 'Finalizar todos os anúncios' },
      { texto: 'Monitorar todas as vendas pendentes de entrega' },
      { texto: 'Finalizar todas as transmissões' },
      { texto: 'Confirmar todos os pedidos como entregues' },
      { texto: 'Remover todas as transmissões' },
      { texto: 'Formalizar o encerramento da operação da loja' },
      { texto: 'Desativar a integração no AnyMarket' }
    ]
  }
];