const fornecedoresData = [
  {
    "fornecedor": "O.V.D",
    "image": "Vonder.png",
    "prazo": 45,
    "pedidoMinimo": 1500,
    "freteCif": 1000,
    "entrega": "1 A 2 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "MAKITA",
    "image": "Makita.png",
    "prazo": "30/60/90",
    "pedidoMinimo": 100,
    "freteCif": 1500,
    "entrega": "5 DIAS",
    "ruptura": "GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "TRAMONTINA",
    "image": "Tramontina.png",
    "prazo": "20/30/40",
    "pedidoMinimo": 800,
    "freteCif": 800,
    "entrega": "5 DIAS",
    "ruptura": "GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "BOSCH",
    "image": "Bosch.png",
    "prazo": "À VISTA",
    "pedidoMinimo": 1000,
    "freteCif": 1000,
    "entrega": "7 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "TOOLS WORLD",
    "image": "MTX.png",
    "prazo": "30/60",
    "pedidoMinimo": 1000,
    "freteCif": 1000,
    "entrega": "2 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "NEGRAO",
    "image": "WORKER.png",
    "prazo": 30,
    "pedidoMinimo": 750,
    "freteCif": 750,
    "entrega": "4 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "WAP SC",
    "image": "Wap.png",
    "prazo": "30/60/90",
    "pedidoMinimo": 1000,
    "freteCif": 4000,
    "entrega": "7 DIAS",
    "ruptura": "GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "WAP PR",
    "image": "Wap.png",
    "prazo": "30/60/90",
    "pedidoMinimo": 1000,
    "freteCif": 2000,
    "entrega": "7 DIAS",
    "ruptura": "GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "BUFFALO SC",
    "image": "Buffalo.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 2000,
    "freteCif": 2000,
    "entrega": "2 A 3 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "BUFFALO PR",
    "image": "Buffalo.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 1000,
    "freteCif": 1000,
    "entrega": "2 A 3 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "TOYAMA",
    "image": "Toyama.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 3000,
    "freteCif": 6000,
    "entrega": "3 A 10 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "TEKNA",
    "image": "Tekna.png",
    "prazo": 42,
    "pedidoMinimo": 500,
    "freteCif": 500,
    "entrega": "2 a 3 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "BRITANIA / PHILCO",
    "image": "britania.png",
    "prazo": "30/60/90",
    "pedidoMinimo": 3000,
    "freteCif": 3000,
    "entrega": "7 DIAS",
    "ruptura": "GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "PRESTO",
    "image": "PRESTO.png",
    "prazo": "30/60/90",
    "pedidoMinimo": 750,
    "freteCif": 750,
    "entrega": "7 DIAS",
    "ruptura": "GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "BELFIX",
    "image": "Bel.png",
    "prazo": 56,
    "pedidoMinimo": 500,
    "freteCif": 500,
    "entrega": "3 A 5 DIAS",
    "ruptura": "GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "CHIAPERINI",
    "image": "Chiaperini.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 1000,
    "freteCif": 2500,
    "entrega": "7 A 10 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": "SIM"
  },
  {
    "fornecedor": "GMEG",
    "image": "GMEG.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 1200,
    "freteCif": 3000,
    "entrega": "5 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "BALMER",
    "image": "Balmer.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 1000,
    "freteCif": "NÃO TEM",
    "entrega": "7 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "BRANCO",
    "image": "Branco.png",
    "prazo": "30/60/90",
    "pedidoMinimo": 300,
    "freteCif": 3000,
    "entrega": "5 A 7 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "CSM",
    "image": "CSM.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 2500,
    "freteCif": 2500,
    "entrega": "3 A 5 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "CCM",
    "image": "CCM.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 1000,
    "freteCif": 5000,
    "entrega": "2 A 3 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "BOVENAU",
    "image": "BOVENAU.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 1500,
    "freteCif": 4000,
    "entrega": "5 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "BETA",
    "image": "Beta.png",
    "prazo": "30/60/90",
    "pedidoMinimo": 1000,
    "freteCif": "NÃO TEM",
    "entrega": "10 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "LYNUS",
    "image": "LYNUS.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 1200,
    "freteCif": 3000,
    "entrega": "5 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "MENEGOTTI",
    "image": "Menegotti.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 1500,
    "freteCif": "2% DANFE",
    "entrega": "5 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "PDR",
    "image": "PDR.png",
    "prazo": "28/56/84",
    "pedidoMinimo": 500,
    "freteCif": 3500,
    "entrega": "7 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  },
  {
    "fornecedor": "TRAPP",
    "image": "Trapp.png",
    "prazo": "28/42/56",
    "pedidoMinimo": 500,
    "freteCif": 3000,
    "entrega": "7 DIAS",
    "ruptura": "NÃO GERA PENDENTE",
    "obsNfOc": null
  }
];
