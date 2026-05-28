export const canais = [
  {
    id: 'booking',
    nome: 'Booking.com',
    status: 'conectado',
    ultimaSync: '2 min atrás',
    taxaSucesso: 99.8,
    cor: '#003580',
    textoCor: '#FFFFFF',
    reservasHoje: 4,
    receitaHoje: 2840,
    descricao: null,
    disabled: false,
  },
  {
    id: 'expedia',
    nome: 'Expedia',
    status: 'aguardando',
    ultimaSync: null,
    taxaSucesso: null,
    cor: '#FFC72C',
    textoCor: '#1B2B4C',
    reservasHoje: 0,
    receitaHoje: 0,
    descricao: 'Aprovação de Connectivity Partner pendente',
    disabled: false,
  },
  {
    id: 'airbnb',
    nome: 'Airbnb',
    status: 'conectado',
    ultimaSync: '5 min atrás',
    taxaSucesso: 98.1,
    cor: '#FF5A5F',
    textoCor: '#FFFFFF',
    reservasHoje: 2,
    receitaHoje: 1890,
    descricao: null,
    disabled: false,
  },
  {
    id: 'rede',
    nome: 'Rede Hotéis',
    status: 'disponivel',
    ultimaSync: null,
    taxaSucesso: null,
    cor: '#8094AE',
    textoCor: '#FFFFFF',
    reservasHoje: 0,
    receitaHoje: 0,
    descricao: 'Em breve',
    disabled: true,
  },
]

export const logs = [
  { id: 1, timestamp: '28/05/2026 14:32:01', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Casal', status: 'sucesso', detalhes: '3 datas atualizadas' },
  { id: 2, timestamp: '28/05/2026 14:31:58', canal: 'booking', tipo: 'Tarifa', categoria: 'Suite Tripla', status: 'sucesso', detalhes: 'R$ 400 → canal' },
  { id: 3, timestamp: '28/05/2026 14:28:14', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Family Suite', status: 'falha', detalhes: 'Timeout na resposta' },
  { id: 4, timestamp: '28/05/2026 14:27:50', canal: 'booking', tipo: 'Reserva', categoria: 'Luxo Superior', status: 'sucesso', detalhes: 'BK-48291 recebida' },
  { id: 5, timestamp: '28/05/2026 13:44:02', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Tripla', status: 'falha', detalhes: 'Mapeamento incompleto' },
  { id: 6, timestamp: '28/05/2026 13:30:15', canal: 'booking', tipo: 'Tarifa', categoria: 'Suite Casal', status: 'sucesso', detalhes: 'R$ 380 → canal' },
  { id: 7, timestamp: '28/05/2026 13:15:42', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Luxo Superior', status: 'sucesso', detalhes: '5 datas atualizadas' },
  { id: 8, timestamp: '28/05/2026 12:58:33', canal: 'booking', tipo: 'Reserva', categoria: 'Suite Casal', status: 'sucesso', detalhes: 'BK-48285 recebida' },
  { id: 9, timestamp: '28/05/2026 12:45:19', canal: 'booking', tipo: 'Tarifa', categoria: 'Family Suite', status: 'pendente', detalhes: 'Aguardando confirmação' },
  { id: 10, timestamp: '28/05/2026 12:30:07', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Tripla', status: 'sucesso', detalhes: '2 datas atualizadas' },
  { id: 11, timestamp: '28/05/2026 11:55:44', canal: 'booking', tipo: 'Tarifa', categoria: 'Luxo Superior', status: 'sucesso', detalhes: 'R$ 520 → canal' },
  { id: 12, timestamp: '28/05/2026 11:42:21', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Casal', status: 'falha', detalhes: 'Erro de autenticação' },
  { id: 13, timestamp: '28/05/2026 11:30:08', canal: 'booking', tipo: 'Reserva', categoria: 'Suite Tripla', status: 'sucesso', detalhes: 'BK-48279 recebida' },
  { id: 14, timestamp: '28/05/2026 11:15:55', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Family Suite', status: 'sucesso', detalhes: '4 datas atualizadas' },
  { id: 15, timestamp: '28/05/2026 10:58:32', canal: 'booking', tipo: 'Tarifa', categoria: 'Suite Casal', status: 'sucesso', detalhes: 'R$ 380 → canal' },
  { id: 16, timestamp: '28/05/2026 10:45:19', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Luxo Superior', status: 'pendente', detalhes: 'Aguardando resposta' },
  { id: 17, timestamp: '28/05/2026 10:30:06', canal: 'booking', tipo: 'Reserva', categoria: 'Suite Casal', status: 'sucesso', detalhes: 'BK-48271 recebida' },
  { id: 18, timestamp: '28/05/2026 10:15:43', canal: 'booking', tipo: 'Tarifa', categoria: 'Family Suite', status: 'sucesso', detalhes: 'R$ 620 → canal' },
  { id: 19, timestamp: '28/05/2026 10:02:20', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Tripla', status: 'falha', detalhes: 'Canal indisponível' },
  { id: 20, timestamp: '28/05/2026 09:45:07', canal: 'booking', tipo: 'Reserva', categoria: 'Luxo Superior', status: 'sucesso', detalhes: 'BK-48265 recebida' },
]

export const reservas = [
  { id: 1, canal: 'booking', codigo: 'BK-48291', hospede: 'Ana Paula Lima', uh: 'Suite Casal', checkin: '01/06', checkout: '05/06', valorBruto: 1520, desconto: null, valorLiquido: 1368, sync: 'sincronizado' },
  { id: 2, canal: 'airbnb', codigo: 'AB-7812', hospede: 'Carlos Ferreira', uh: 'Chalé Clara', checkin: '02/06', checkout: '04/06', valorBruto: 890, desconto: null, valorLiquido: 712, sync: 'sincronizado' },
  { id: 3, canal: 'booking', codigo: 'BK-48301', hospede: 'Marina Santos', uh: 'Suite Tripla', checkin: '03/06', checkout: '07/06', valorBruto: 2100, desconto: 'Genius -10%', valorLiquido: 1764, sync: 'pendente' },
  { id: 4, canal: 'airbnb', codigo: 'AB-7819', hospede: 'Roberto Alves', uh: 'Chalé Edu', checkin: '05/06', checkout: '08/06', valorBruto: 1200, desconto: null, valorLiquido: 960, sync: 'sincronizado' },
  { id: 5, canal: 'booking', codigo: 'BK-48315', hospede: 'Fernanda Costa', uh: 'Luxo Superior', checkin: '06/06', checkout: '09/06', valorBruto: 2400, desconto: null, valorLiquido: 2160, sync: 'sincronizado' },
  { id: 6, canal: 'booking', codigo: 'BK-48322', hospede: 'Paulo Rodrigues', uh: 'Suite Casal', checkin: '07/06', checkout: '10/06', valorBruto: 1140, desconto: null, valorLiquido: 1026, sync: 'sincronizado' },
  { id: 7, canal: 'airbnb', codigo: 'AB-7831', hospede: 'Juliana Martins', uh: 'Chalé Penha', checkin: '08/06', checkout: '11/06', valorBruto: 1350, desconto: null, valorLiquido: 1080, sync: 'falha' },
  { id: 8, canal: 'booking', codigo: 'BK-48338', hospede: 'Marcos Lima', uh: 'Family Suite', checkin: '09/06', checkout: '12/06', valorBruto: 2700, desconto: 'Genius -5%', valorLiquido: 2430, sync: 'sincronizado' },
  { id: 9, canal: 'airbnb', codigo: 'AB-7845', hospede: 'Carla Nogueira', uh: 'Chalé Clara', checkin: '10/06', checkout: '13/06', valorBruto: 960, desconto: null, valorLiquido: 768, sync: 'sincronizado' },
  { id: 10, canal: 'booking', codigo: 'BK-48349', hospede: 'Diego Santos', uh: 'Luxo Superior', checkin: '11/06', checkout: '14/06', valorBruto: 2400, desconto: null, valorLiquido: 2160, sync: 'pendente' },
]

export const mapeamentoBooking = {
  quartos: [
    { id: 1, nomeCanalQuarto: 'Standard Double', ocupacaoMax: 2, categoriaSelecionada: 'Suite Casal', status: 'mapeado' },
    { id: 2, nomeCanalQuarto: 'Triple Room', ocupacaoMax: 3, categoriaSelecionada: 'Suite Tripla', status: 'conflito', conflito: 'ocupação diverge' },
    { id: 3, nomeCanalQuarto: 'Family Suite', ocupacaoMax: 4, categoriaSelecionada: '', status: 'pendente' },
    { id: 4, nomeCanalQuarto: 'Superior King', ocupacaoMax: 2, categoriaSelecionada: 'Luxo Superior', status: 'mapeado' },
  ],
  categoriasPMS: ['Suite Casal', 'Suite Tripla', 'Luxo Superior', 'Family Suite', 'Chalé Clara', 'Chalé Edu', 'Chalé Penha'],
  tarifas: [
    { id: 1, nome: 'Standard Rate', tipo: 'Standard', tarifarioPMS: 'Diária Padrão', status: 'mapeado' },
    { id: 2, nome: 'Weekly Rate', tipo: 'Derivada', tarifarioPMS: '', status: 'alerta' },
    { id: 3, nome: 'Non-refundable', tipo: 'Especial', tarifarioPMS: 'Não Reembolsável', status: 'mapeado' },
  ],
  tarifariosPMS: ['Diária Padrão', 'Não Reembolsável', 'Café da Manhã Incluso', 'Tarifa Especial'],
  markup: 0,
}

export const mapeamentoAirbnb = {
  anuncios: [
    { id: 1, nomeAnuncio: 'Chalé Maria Clara', categoriaPMS: 'Chalé Clara', status: 'mapeado', sincronizado: true },
    { id: 2, nomeAnuncio: 'Chalé Maria Eduarda', categoriaPMS: 'Chalé Edu', status: 'mapeado', sincronizado: true },
    { id: 3, nomeAnuncio: 'Chalé Nadia', categoriaPMS: '', status: 'pendente', sincronizado: false },
    { id: 4, nomeAnuncio: 'Chalé Maria da Penha', categoriaPMS: 'Chalé Penha', status: 'mapeado', sincronizado: true },
  ],
  categoriasPMS: ['Chalé Clara', 'Chalé Edu', 'Chalé Nadia', 'Chalé Penha'],
  hospedeExtra: [
    { id: 1, categoria: 'Chalé Clara', ocupacaoMinima: 2, valorPorHospede: 80 },
    { id: 2, categoria: 'Chalé Edu', ocupacaoMinima: 2, valorPorHospede: 80 },
    { id: 3, categoria: 'Chalé Nadia', ocupacaoMinima: 2, valorPorHospede: 0 },
    { id: 4, categoria: 'Chalé Penha', ocupacaoMinima: 2, valorPorHospede: 80 },
  ],
}

export const syncEventos = [
  { id: 1, timestamp: '28/05/2026 14:32:01', tipo: 'Disponibilidade', categoria: 'Suite Casal', status: 'sucesso', detalhes: '3 datas atualizadas' },
  { id: 2, timestamp: '28/05/2026 14:31:58', tipo: 'Tarifa', categoria: 'Suite Tripla', status: 'sucesso', detalhes: 'R$ 400 → canal' },
  { id: 3, timestamp: '28/05/2026 14:28:14', tipo: 'Disponibilidade', categoria: 'Family Suite', status: 'falha', detalhes: 'Timeout na resposta' },
  { id: 4, timestamp: '28/05/2026 14:27:50', tipo: 'Reserva', categoria: 'Luxo Superior', status: 'sucesso', detalhes: 'BK-48291 recebida' },
  { id: 5, timestamp: '28/05/2026 13:44:02', tipo: 'Disponibilidade', categoria: 'Suite Tripla', status: 'falha', detalhes: 'Mapeamento incompleto' },
]

export const disponibilidade = [
  { categoria: 'Suite Casal', dias: [2, 1, 0, 2, 2, 2, 3] },
  { categoria: 'Suite Tripla', dias: [1, 1, 1, 0, 0, 1, 1] },
  { categoria: 'Luxo Superior', dias: [1, 0, 0, 0, 1, 1, 1] },
  { categoria: 'Family Suite', dias: [2, 2, 1, 1, 0, 2, 2] },
]

export const reservasBookingDetalhes = {
  'BK-48291': {
    canal: 'booking',
    codigo: 'BK-48291',
    hospede: 'Ana Paula Lima',
    uh: 'Suite Casal',
    checkin: '01/06/2026',
    checkout: '05/06/2026',
    valorBruto: 1520,
    valorLiquido: 1368,
    timeline: [
      { evento: 'Reserva recebida do canal', timestamp: '28/05/2026 14:27:50' },
      { evento: 'Sincronizada no PMS', timestamp: '28/05/2026 14:27:52' },
      { evento: 'Confirmação enviada ao canal', timestamp: '28/05/2026 14:27:55' },
    ],
  },
}
