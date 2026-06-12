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
    alertaMsg: '2 falhas de sync nas últimas 4h',
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
  { id: 1, timestamp: '28/05/2026 14:32:01', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Casal', planoTarifa: null, dataInicio: '01/06/2026', dataFim: '03/06/2026', direcao: 'saida', referencia: null, valor: null, adultoExtra: null, criancaExtra: null, qtd: 2, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Sync automático', enviadoPara: 'Booking.com', status: 'sucesso', detalhes: '3 datas atualizadas' },
  { id: 2, timestamp: '28/05/2026 14:31:58', canal: 'booking', tipo: 'Tarifa', categoria: 'Suite Tripla', planoTarifa: 'Diária Padrão', dataInicio: '01/06/2026', dataFim: '30/06/2026', direcao: 'saida', referencia: null, valor: 400, adultoExtra: 80, criancaExtra: 50, qtd: null, bloqueado: false, antecedencia: 0, restricaoEntrada: null, restricaoSaida: null, minNoites: 1, maxNoites: 30, alteradoPor: 'admin@hospedin.com', enviadoPara: 'Booking.com', status: 'sucesso', detalhes: 'R$ 400 → canal' },
  { id: 3, timestamp: '28/05/2026 14:28:14', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Family Suite', planoTarifa: null, dataInicio: '03/06/2026', dataFim: '05/06/2026', direcao: 'saida', referencia: null, valor: null, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Sync automático', enviadoPara: 'Booking.com', status: 'falha', detalhes: 'Timeout na resposta' },
  { id: 4, timestamp: '28/05/2026 14:27:50', canal: 'booking', tipo: 'Reserva', categoria: 'Luxo Superior', planoTarifa: 'Diária Padrão', dataInicio: '01/06/2026', dataFim: '05/06/2026', direcao: 'entrada', referencia: 'BK-48291', valor: 1520, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Booking.com', enviadoPara: 'PMS', status: 'sucesso', detalhes: 'BK-48291 recebida' },
  { id: 5, timestamp: '28/05/2026 13:44:02', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Tripla', planoTarifa: null, dataInicio: '04/06/2026', dataFim: '06/06/2026', direcao: 'saida', referencia: null, valor: null, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Sync automático', enviadoPara: 'Booking.com', status: 'falha', detalhes: 'Mapeamento incompleto' },
  { id: 6, timestamp: '28/05/2026 13:30:15', canal: 'booking', tipo: 'Tarifa', categoria: 'Suite Casal', planoTarifa: 'Não Reembolsável', dataInicio: '02/06/2026', dataFim: '30/06/2026', direcao: 'saida', referencia: null, valor: 380, adultoExtra: 60, criancaExtra: 0, qtd: null, bloqueado: false, antecedencia: 0, restricaoEntrada: null, restricaoSaida: null, minNoites: 2, maxNoites: 14, alteradoPor: 'admin@hospedin.com', enviadoPara: 'Booking.com', status: 'sucesso', detalhes: 'R$ 380 → canal' },
  { id: 7, timestamp: '28/05/2026 13:15:42', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Luxo Superior', planoTarifa: null, dataInicio: '05/06/2026', dataFim: '10/06/2026', direcao: 'saida', referencia: null, valor: null, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Sync automático', enviadoPara: 'Booking.com', status: 'sucesso', detalhes: '5 datas atualizadas' },
  { id: 8, timestamp: '28/05/2026 12:58:33', canal: 'booking', tipo: 'Reserva', categoria: 'Suite Casal', planoTarifa: 'Totalmente Flexível', dataInicio: '07/06/2026', dataFim: '10/06/2026', direcao: 'entrada', referencia: 'BK-48285', valor: 1140, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Booking.com', enviadoPara: 'PMS', status: 'sucesso', detalhes: 'BK-48285 recebida' },
  { id: 9, timestamp: '28/05/2026 12:45:19', canal: 'booking', tipo: 'Tarifa', categoria: 'Family Suite', planoTarifa: 'Café da Manhã Incluso', dataInicio: '10/06/2026', dataFim: '30/06/2026', direcao: 'saida', referencia: null, valor: 620, adultoExtra: 90, criancaExtra: 45, qtd: null, bloqueado: false, antecedencia: 2, restricaoEntrada: null, restricaoSaida: null, minNoites: 2, maxNoites: 21, alteradoPor: 'admin@hospedin.com', enviadoPara: 'Booking.com', status: 'pendente', detalhes: 'Aguardando confirmação' },
  { id: 10, timestamp: '28/05/2026 12:30:07', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Tripla', planoTarifa: null, dataInicio: '06/06/2026', dataFim: '08/06/2026', direcao: 'saida', referencia: null, valor: null, adultoExtra: null, criancaExtra: null, qtd: 2, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Sync automático', enviadoPara: 'Booking.com', status: 'sucesso', detalhes: '2 datas atualizadas' },
  { id: 11, timestamp: '28/05/2026 11:55:44', canal: 'booking', tipo: 'Tarifa', categoria: 'Luxo Superior', planoTarifa: 'Diária Padrão', dataInicio: '08/06/2026', dataFim: '30/06/2026', direcao: 'saida', referencia: null, valor: 520, adultoExtra: 100, criancaExtra: 60, qtd: null, bloqueado: false, antecedencia: 0, restricaoEntrada: null, restricaoSaida: null, minNoites: 1, maxNoites: 30, alteradoPor: 'admin@hospedin.com', enviadoPara: 'Booking.com', status: 'sucesso', detalhes: 'R$ 520 → canal' },
  { id: 12, timestamp: '28/05/2026 11:42:21', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Casal', planoTarifa: null, dataInicio: '09/06/2026', dataFim: '11/06/2026', direcao: 'saida', referencia: null, valor: null, adultoExtra: null, criancaExtra: null, qtd: 0, bloqueado: true, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'admin@hospedin.com', enviadoPara: 'Booking.com', status: 'falha', detalhes: 'Erro de autenticação' },
  { id: 13, timestamp: '28/05/2026 11:30:08', canal: 'booking', tipo: 'Reserva', categoria: 'Suite Tripla', planoTarifa: 'Totalmente Flexível', dataInicio: '03/06/2026', dataFim: '07/06/2026', direcao: 'entrada', referencia: 'BK-48279', valor: 2100, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Booking.com', enviadoPara: 'PMS', status: 'sucesso', detalhes: 'BK-48279 recebida' },
  { id: 14, timestamp: '28/05/2026 11:15:55', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Family Suite', planoTarifa: null, dataInicio: '11/06/2026', dataFim: '15/06/2026', direcao: 'saida', referencia: null, valor: null, adultoExtra: null, criancaExtra: null, qtd: 2, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Sync automático', enviadoPara: 'Booking.com', status: 'sucesso', detalhes: '4 datas atualizadas' },
  { id: 15, timestamp: '28/05/2026 10:58:32', canal: 'booking', tipo: 'Tarifa', categoria: 'Suite Casal', planoTarifa: 'Não Reembolsável', dataInicio: '12/06/2026', dataFim: '30/06/2026', direcao: 'saida', referencia: null, valor: 380, adultoExtra: 60, criancaExtra: 0, qtd: null, bloqueado: false, antecedencia: 0, restricaoEntrada: null, restricaoSaida: null, minNoites: 2, maxNoites: 14, alteradoPor: 'admin@hospedin.com', enviadoPara: 'Booking.com', status: 'sucesso', detalhes: 'R$ 380 → canal' },
  { id: 16, timestamp: '28/05/2026 10:45:19', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Luxo Superior', planoTarifa: null, dataInicio: '14/06/2026', dataFim: '16/06/2026', direcao: 'saida', referencia: null, valor: null, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Sync automático', enviadoPara: 'Booking.com', status: 'pendente', detalhes: 'Aguardando resposta' },
  { id: 17, timestamp: '28/05/2026 10:30:06', canal: 'booking', tipo: 'Reserva', categoria: 'Suite Casal', planoTarifa: 'Diária Padrão', dataInicio: '05/06/2026', dataFim: '08/06/2026', direcao: 'entrada', referencia: 'BK-48271', valor: 1140, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Booking.com', enviadoPara: 'PMS', status: 'sucesso', detalhes: 'BK-48271 recebida' },
  { id: 18, timestamp: '28/05/2026 10:15:43', canal: 'booking', tipo: 'Tarifa', categoria: 'Family Suite', planoTarifa: 'Café da Manhã Incluso', dataInicio: '15/06/2026', dataFim: '30/06/2026', direcao: 'saida', referencia: null, valor: 620, adultoExtra: 90, criancaExtra: 45, qtd: null, bloqueado: false, antecedencia: 2, restricaoEntrada: null, restricaoSaida: null, minNoites: 2, maxNoites: 21, alteradoPor: 'admin@hospedin.com', enviadoPara: 'Booking.com', status: 'sucesso', detalhes: 'R$ 620 → canal' },
  { id: 19, timestamp: '28/05/2026 10:02:20', canal: 'booking', tipo: 'Disponibilidade', categoria: 'Suite Tripla', planoTarifa: null, dataInicio: '16/06/2026', dataFim: '18/06/2026', direcao: 'saida', referencia: null, valor: null, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Sync automático', enviadoPara: 'Booking.com', status: 'falha', detalhes: 'Canal indisponível' },
  { id: 20, timestamp: '28/05/2026 09:45:07', canal: 'booking', tipo: 'Reserva', categoria: 'Luxo Superior', planoTarifa: 'Café da Manhã Incluso', dataInicio: '11/06/2026', dataFim: '14/06/2026', direcao: 'entrada', referencia: 'BK-48265', valor: 2400, adultoExtra: null, criancaExtra: null, qtd: 1, bloqueado: false, antecedencia: null, restricaoEntrada: null, restricaoSaida: null, minNoites: null, maxNoites: null, alteradoPor: 'Booking.com', enviadoPara: 'PMS', status: 'sucesso', detalhes: 'BK-48265 recebida' },
]

export const reservas = [
  { id: 1, canal: 'booking', codigo: 'BK-48291', hospede: 'Ana Paula Lima', uh: 'Suite Casal', tarifa: 'Diária Padrão', tarifaTecnica: 'Standard Rate - OccupancyBasedPricing', checkin: '01/06', checkout: '05/06', valorBruto: 1520, comissaoPct: 10, comissaoValor: 152, desconto: null, valorLiquido: 1368, sync: 'sincronizado', statusNegocio: 'confirmada' },
  { id: 2, canal: 'airbnb', codigo: 'AB-7812', hospede: 'Carlos Ferreira', uh: 'Chalé Clara', tarifa: 'Preço Padrão', tarifaTecnica: 'standard_nightly', checkin: '02/06', checkout: '04/06', valorBruto: 890, comissaoPct: 20, comissaoValor: 178, desconto: null, valorLiquido: 712, sync: 'sincronizado', statusNegocio: 'confirmada' },
  { id: 3, canal: 'booking', codigo: 'BK-48301', hospede: 'Marina Santos', uh: 'Suite Tripla', tarifa: 'Totalmente Flexível', tarifaTecnica: 'Flex Rate - FullyFlexible', checkin: '03/06', checkout: '07/06', valorBruto: 2100, comissaoPct: 10, comissaoValor: 210, desconto: 'Genius -10%', valorLiquido: 1764, sync: 'pendente', statusNegocio: 'pendente-confirmacao' },
  { id: 4, canal: 'airbnb', codigo: 'AB-7819', hospede: 'Roberto Alves', uh: 'Chalé Edu', tarifa: 'Preço Padrão', tarifaTecnica: 'standard_nightly', checkin: '05/06', checkout: '08/06', valorBruto: 1200, comissaoPct: 20, comissaoValor: 240, desconto: null, valorLiquido: 960, sync: 'sincronizado', statusNegocio: 'confirmada' },
  { id: 5, canal: 'booking', codigo: 'BK-48315', hospede: 'Fernanda Costa', uh: 'Luxo Superior', tarifa: 'Diária Padrão', tarifaTecnica: 'Standard Rate - OccupancyBasedPricing', checkin: '06/06', checkout: '09/06', valorBruto: 2400, comissaoPct: 10, comissaoValor: 240, desconto: null, valorLiquido: 2160, sync: 'sincronizado', statusNegocio: 'confirmada' },
  { id: 6, canal: 'booking', codigo: 'BK-48322', hospede: 'Paulo Rodrigues', uh: 'Suite Casal', tarifa: 'Não Reembolsável', tarifaTecnica: 'Non-refundable - NoRefund', checkin: '07/06', checkout: '10/06', valorBruto: 1140, comissaoPct: 10, comissaoValor: 114, desconto: null, valorLiquido: 1026, sync: 'sincronizado', statusNegocio: 'confirmada' },
  { id: 7, canal: 'airbnb', codigo: 'AB-7831', hospede: 'Juliana Martins', uh: 'Chalé Penha', tarifa: 'Preço Padrão', tarifaTecnica: 'standard_nightly', checkin: '08/06', checkout: '11/06', valorBruto: 1350, comissaoPct: 20, comissaoValor: 270, desconto: null, valorLiquido: 1080, sync: 'falha', statusNegocio: 'cancelada' },
  { id: 8, canal: 'booking', codigo: 'BK-48338', hospede: 'Marcos Lima', uh: 'Family Suite', tarifa: 'Diária Padrão', tarifaTecnica: 'Standard Rate - OccupancyBasedPricing', checkin: '09/06', checkout: '12/06', valorBruto: 2700, comissaoPct: 10, comissaoValor: 270, desconto: 'Genius -5%', valorLiquido: 2430, sync: 'sincronizado', statusNegocio: 'confirmada' },
  { id: 9, canal: 'airbnb', codigo: 'AB-7845', hospede: 'Carla Nogueira', uh: 'Chalé Clara', tarifa: 'Preço Padrão', tarifaTecnica: 'standard_nightly', checkin: '10/06', checkout: '13/06', valorBruto: 960, comissaoPct: 20, comissaoValor: 192, desconto: null, valorLiquido: 768, sync: 'sincronizado', statusNegocio: 'confirmada' },
  { id: 10, canal: 'booking', codigo: 'BK-48349', hospede: 'Diego Santos', uh: 'Luxo Superior', tarifa: 'Café da Manhã Incluso', tarifaTecnica: 'Breakfast Included - BoardBasis', checkin: '11/06', checkout: '14/06', valorBruto: 2400, comissaoPct: 10, comissaoValor: 240, desconto: null, valorLiquido: 2160, sync: 'pendente', statusNegocio: 'pendente-confirmacao' },
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
  channelRatePlans: [
    { id: 1, nome: 'Standard Double Room - Diária Padrão - 2 hóspedes', ajuste: 0, planoTarifa: 'Suite Casal - Tarifa Suite Casal' },
    { id: 2, nome: 'Standard Double Room - Totalmente Flexível - 2 hóspedes', ajuste: 0, planoTarifa: 'Suite Casal - [Totalmente Flexível]' },
    { id: 3, nome: 'Triple Room - Diária Padrão - 3 hóspedes', ajuste: 0, planoTarifa: 'Suite Tripla - Tarifa Suite Tripla' },
    { id: 4, nome: 'Triple Room - Totalmente Flexível - 3 hóspedes', ajuste: 0, planoTarifa: 'Suite Tripla - [Totalmente Flexível]' },
    { id: 5, nome: 'Family Suite - Diária Padrão - 4 hóspedes', ajuste: 0, planoTarifa: 'Family Suite - Tarifa Suite' },
    { id: 6, nome: 'Family Suite - Totalmente Flexível - 4 hóspedes', ajuste: 0, planoTarifa: 'Family Suite - [Totalmente Flexível]' },
    { id: 7, nome: 'Superior King - Diária Padrão - 2 hóspedes', ajuste: 0, planoTarifa: 'Luxo Superior - Tarifa Luxo' },
    { id: 8, nome: 'Superior King - Totalmente Flexível - 2 hóspedes', ajuste: 0, planoTarifa: 'Luxo Superior - [Totalmente Flexível]' },
    { id: 9, nome: 'Superior King - Não Reembolsável - 2 hóspedes', ajuste: 0, planoTarifa: 'Luxo Superior - Não Reembolsável' },
  ],
  planosTarifaPMS: [
    'Suite Casal - Tarifa Suite Casal', 'Suite Casal - [Totalmente Flexível]', 'Suite Casal - Não Reembolsável',
    'Suite Tripla - Tarifa Suite Tripla', 'Suite Tripla - [Totalmente Flexível]',
    'Family Suite - Tarifa Suite', 'Family Suite - [Totalmente Flexível]',
    'Luxo Superior - Tarifa Luxo', 'Luxo Superior - [Totalmente Flexível]', 'Luxo Superior - Não Reembolsável',
  ],
  markup: 0,
}

export const mapeamentoAirbnb = {
  anuncios: [
    { id: 1, nomeAnuncio: 'Chalé Maria Clara | bnb', categoriaPMS: 'Chalé Clara - Tarifa Padrão', status: 'mapeado', sincronizado: true },
    { id: 2, nomeAnuncio: 'Chalé Maria Eduarda | bnb', categoriaPMS: 'Chalé Edu - Tarifa Padrão', status: 'mapeado', sincronizado: true },
    { id: 3, nomeAnuncio: 'Chalé Nadia | bnb', categoriaPMS: '', status: 'pendente', sincronizado: false },
    { id: 4, nomeAnuncio: 'Chalé Maria da Penha | bnb', categoriaPMS: 'Chalé Penha - Tarifa Padrão', status: 'mapeado', sincronizado: true },
  ],
  categoriasPMS: ['Chalé Clara - Tarifa Padrão', 'Chalé Edu - Tarifa Padrão', 'Chalé Nadia - Tarifa Padrão', 'Chalé Penha - Tarifa Padrão'],
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

export const logsAtividade = [
  {
    id: 1,
    pagina: 'Mapeamento — Booking.com',
    timestamp: '28/05/2026 14:35:22',
    login: 'admin@hospedin.com',
    nomeCompleto: 'Admin Hospedin',
    tipoUsuario: 'implantador',
    detalhes: { acao: 'Plano de tarifa atualizado', campo: 'Triple Room — plano PMS', de: '(sem mapeamento)', para: 'Suite Tripla - Tarifa Suite Tripla' },
  },
  {
    id: 2,
    pagina: 'Configurações — Booking.com',
    timestamp: '28/05/2026 13:50:11',
    login: 'admin@hospedin.com',
    nomeCompleto: 'Admin Hospedin',
    tipoUsuario: 'implantador',
    detalhes: { acao: 'Configuração alterada', campo: 'Rollback automático em cancelamentos', de: 'Desligado', para: 'Ligado' },
  },
  {
    id: 3,
    pagina: 'Dashboard — Canais',
    timestamp: '28/05/2026 13:15:05',
    login: 'joao.silva@minhapousada.com.br',
    nomeCompleto: 'João Silva',
    tipoUsuario: 'hoteleiro',
    detalhes: { acao: 'Visualização', campo: 'Dashboard de Canais', de: null, para: null },
  },
  {
    id: 4,
    pagina: 'Mapeamento — Booking.com',
    timestamp: '28/05/2026 12:44:37',
    login: 'admin@hospedin.com',
    nomeCompleto: 'Admin Hospedin',
    tipoUsuario: 'implantador',
    detalhes: { acao: 'Plano de tarifa atualizado', campo: 'Family Suite — plano PMS', de: '(sem mapeamento)', para: 'Family Suite - Tarifa Suite' },
  },
  {
    id: 5,
    pagina: 'Sync automático — Canal Booking.com',
    timestamp: '28/05/2026 12:30:07',
    login: 'sistema',
    nomeCompleto: 'Sistema Automático',
    tipoUsuario: 'sistema',
    detalhes: { acao: 'Sincronização automática disparada', campo: 'Disponibilidade — Suite Tripla', de: null, para: '2 datas atualizadas' },
  },
  {
    id: 6,
    pagina: 'Reservas — Detalhe BK-48301',
    timestamp: '28/05/2026 11:58:14',
    login: 'joao.silva@minhapousada.com.br',
    nomeCompleto: 'João Silva',
    tipoUsuario: 'hoteleiro',
    detalhes: { acao: 'Visualização', campo: 'Reserva BK-48301 — Marina Santos', de: null, para: null },
  },
  {
    id: 7,
    pagina: 'Configurações — Booking.com',
    timestamp: '28/05/2026 11:30:45',
    login: 'admin@hospedin.com',
    nomeCompleto: 'Admin Hospedin',
    tipoUsuario: 'implantador',
    detalhes: { acao: 'Configuração alterada', campo: 'Importar reservas ao conectar', de: 'Desligado', para: 'Ligado' },
  },
  {
    id: 8,
    pagina: 'Mapeamento — Airbnb',
    timestamp: '28/05/2026 10:52:09',
    login: 'admin@hospedin.com',
    nomeCompleto: 'Admin Hospedin',
    tipoUsuario: 'implantador',
    detalhes: { acao: 'Anúncio mapeado', campo: 'Chalé Nadia | bnb', de: '(sem mapeamento)', para: 'Chalé Nadia - Tarifa Padrão' },
  },
  {
    id: 9,
    pagina: 'Sync automático — Canal Booking.com',
    timestamp: '28/05/2026 10:15:43',
    login: 'sistema',
    nomeCompleto: 'Sistema Automático',
    tipoUsuario: 'sistema',
    detalhes: { acao: 'Tarifa enviada ao canal', campo: 'Family Suite — Café da Manhã Incluso', de: null, para: 'R$ 620 enviado' },
  },
  {
    id: 10,
    pagina: 'Canais — Lista',
    timestamp: '28/05/2026 09:30:00',
    login: 'joao.silva@minhapousada.com.br',
    nomeCompleto: 'João Silva',
    tipoUsuario: 'hoteleiro',
    detalhes: { acao: 'Visualização', campo: 'Lista de canais disponíveis', de: null, para: null },
  },
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

export const canaisConfig = [
  { id: 'booking', nome: 'Booking.com', sigla: 'BDC', cor: '#003580', textoCor: '#FFFFFF', status: 'conectado', hotelId: '6314570', quartosMapeados: 4, reservas: 32 },
  { id: 'expedia', nome: 'Expedia / Hotels.com', sigla: 'EXP', cor: '#1B3A8C', textoCor: '#FFFFFF', status: 'conectado', hotelId: '18492031', quartosMapeados: 4, reservas: 19 },
  { id: 'airbnb', nome: 'Airbnb', sigla: 'AIR', cor: '#FF5A5F', textoCor: '#FFFFFF', status: 'pendente', listings: 3, reservas: 12 },
  { id: 'decolar', nome: 'Decolar', sigla: 'DEC', cor: '#E8A317', textoCor: '#FFFFFF', status: 'inativo' },
]

export const syncRecente = [
  { hora: '14:32', descricao: 'Tarifas atualizadas — todas as categorias', canal: 'BDC', status: 'sucesso' },
  { hora: '14:28', descricao: 'Disponibilidade atualizada — Chalé 2', canal: 'Expedia', status: 'sucesso' },
  { hora: '13:55', descricao: 'Falha ao enviar restrição — listing não ativo', canal: 'Airbnb', status: 'falha' },
  { hora: '13:40', descricao: 'Nova reserva recebida — R$ 840', canal: 'BDC', status: 'sucesso' },
  { hora: '12:18', descricao: 'Cancelamento processado — #EX-9928', canal: 'Expedia', status: 'neutro' },
]

export const ultimasReservasDash = [
  { hospede: 'Ana Lima', canal: 'BDC', data: '14/06', valor: 840 },
  { hospede: 'Carlos Souza', canal: 'Expedia', data: '15/06', valor: 1260 },
  { hospede: 'Maria Ferreira', canal: 'Airbnb', data: '16/06', valor: 620 },
  { hospede: 'João Pereira', canal: 'BDC', data: '17/06', valor: 1640 },
]

export const wizardBookingQuartos = [
  { id: 1, nome: 'Double Room Standard', roomId: 'BDC-4481-A', ajuste: 15, usoUnico: true, planoPMS: 'DUPLO — Tarifa Duplo' },
  { id: 2, nome: 'Triple Room Standard', roomId: 'BDC-4481-B', ajuste: 15, usoUnico: false, planoPMS: 'TRIPLO — Tarifa Triplo' },
  { id: 3, nome: 'Family Room Premium', roomId: 'BDC-4481-C', ajuste: 0, usoUnico: false, planoPMS: '' },
]

export const wizardExpediaQuartos = [
  { id: 1, nome: 'Budget Double Room · 2 pax', modelo: 'OccupancyBasedPricing', ajuste: 0, planoPMS: 'DUPLO — Tarifa Duplo' },
  { id: 2, nome: 'Budget Double Room · Flex · 2 pax', modelo: 'OccupancyBasedPricing', ajuste: 0, planoPMS: 'DUPLO — Tarifa Flexível' },
  { id: 3, nome: 'Suite Standard · 4 pax', modelo: 'OccupancyBasedPricing', ajuste: 0, planoPMS: 'SUITE — Tarifa Suíte' },
]

export const wizardAirbnbListings = [
  { id: 1, nome: 'Chalé Raízes — Vista para o jardim', listingId: '987123445', ajuste: 0, planoPMS: 'CHALÉ 1 — Tarifa Chalé' },
  { id: 2, nome: 'Suíte das Pedras — banheira de imersão', listingId: '987124112', ajuste: 0, planoPMS: 'SUITE — Tarifa Suite' },
  { id: 3, nome: 'Chalé Estrelas — deck externo', listingId: '987125800', ajuste: 0, planoPMS: '' },
]

export const planosPMSOptions = [
  'DUPLO — Tarifa Duplo', 'DUPLO — Tarifa Flexível', 'TRIPLO — Tarifa Triplo',
  'SUITE — Tarifa Suíte', 'CHALÉ 1 — Tarifa Chalé', 'CHALÉ 2 — Tarifa Chalé',
  'LUXO — Tarifa Luxo', 'FAMILY — Tarifa Family',
]
