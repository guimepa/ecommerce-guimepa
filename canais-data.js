// ============================================
// CANAIS - mapa canônico de agrupamento
// Fonte única para os agrupamentos de Marketplaces e Campanhas.
// Cada canal (loja) pertence a um grupo canônico; as grafias
// alternativas de uma mesma loja ficam reunidas aqui.
// ============================================

const canaisData = [
  { id:'all', label:'Exibir todas', color:'#64748b', logo:'', channels:null },
  { id:'mercado-livre', label:'Mercado Livre', color:'#2d3277', logo:'meli.png', channels:['MELI GUIMEPA','MELI GUIMEPA SHOP','MELI GUIMEPA STORE','MELI DELTATOP','SAC MELI GUIMEPA'] },
  { id:'shopee', label:'Shopee', color:'#ee4d2d', logo:'shopee.png', channels:['SHOPEE GUIMEPA','SHOPEE GUIMEPA STORE'] },
  { id:'magalu', label:'Magalu', color:'#0086ff', logo:'Magalu.png', channels:['MAGALU-GUIMEPA','MAGALU-GUIMEPA SHOP','MAGAZINE LUIZA GMK8','MAGAZINE LUIZA GUIMEPA','MAGAZINE LUIZA DELTATOP','MAGAZINE LUIZA GUIMEPA STORE'] },
  { id:'amazon', label:'Amazon', color:'#ff9900', logo:'amazon.png', channels:['AMAZON GUIMEPA'] },
  { id:'ll-loyalty', label:'LL Loyalty', color:'#334155', logo:'LL.png', channels:['LL LOYALTY'] },
  { id:'shophub', label:'Shophub', color:'#2563eb', logo:'Shophub.png', channels:['SHOPHUB'] },
  { id:'webcontinental', label:'Web Continental', color:'#2563eb', logo:'Webcontinental.png', channels:['WEBCONTINENTAL GUIMEPA SHOP','WEB CONTINENTAL GUIMEPA SHOP','WEB CONTINENTAL'] },
  { id:'livelo', label:'Livelo', color:'#ec4899', logo:'LIVELO.png', channels:['LIVELO'] },
  { id:'leroy-merlin', label:'Leroy Merlin', color:'#78be20', logo:'Leroy.png', channels:['LEROY MERLIN'] },
  { id:'senff', label:'Senff', color:'#1e3a8a', logo:'SENFF.png', channels:['SENFF'] },
  { id:'loja-cooperado', label:'Coopera', color:'#168f58', logo:'loja.png', channels:['LOJA DO COOPERADO - SICOOB'] },
  { id:'tiktok', label:'TikTok', color:'#111827', logo:'TIKTOK.png', channels:['TIKTOK SHOP'] },
  { id:'temu', label:'Temu', color:'#16a34a', logo:'temu.png', channels:['TEMU'] },
  { id:'picpay', label:'PicPay', color:'#22c55e', logo:'picpay.png', channels:['PICPAY SHOP'] },
  { id:'shein', label:'Shein', color:'#000', logo:'shein.png', channels:['SHEIN'] },
  { id:'site', label:'Site', color:'#1d4ed8', logo:'site.png', channels:['SITE'] },
  { id:'b2w', label:'B2W', color:'#c026d3', logo:'', channels:['B2W DELTATOP','B2W GMK8','B2W GUIMEPA'] },
  { id:'madeira-madeira', label:'Madeira Madeira', color:'#65a30d', logo:'', channels:['MADEIRA MADEIRA'] }
];

window.grupoCanal = function (canal) {
  if (!canal) return null;
  const n = String(canal).trim().toUpperCase();
  const g = canaisData.find(x => x.channels && x.channels.includes(n));
  return g ? g.id : null;
};
