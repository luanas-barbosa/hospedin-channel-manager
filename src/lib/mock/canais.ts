export type CanalId = "booking" | "expedia" | "airbnb" | "decolar"
export type CanalStatus = "ativo" | "inativo" | "nao-configurado"

export interface QuartoMapeamento {
  idCanal: string
  nomeCanal: string
  ajustePercent: number
  usoUnico?: boolean
  planoPmsId: string | null
  planoPmsNome: string | null
  /** Expedia OBP only */
  ocupacao?: number
}

export interface CanalConectado {
  id: CanalId
  nome: string
  cor: string
  status: CanalStatus
  hotelId?: string
  quartosVinculados: number
  totalQuartos: number
  reservasHoje: number
  receitaHoje: number
  taxaSync: number
  ultimaSyncTimestamp: string
  ultimaSyncTipo: string
  quartos: QuartoMapeamento[]
}

export const CANAL_CORES: Record<CanalId, string> = {
  booking: "#003580",
  expedia: "#f6931f",
  airbnb:  "#ff5a5f",
  decolar: "#ff5a00",
}

export const CANAIS: CanalConectado[] = [
  {
    id: "booking",
    nome: "Booking.com",
    cor: "#003580",
    status: "ativo",
    hotelId: "6314570",
    quartosVinculados: 3,
    totalQuartos: 3,
    reservasHoje: 4,
    receitaHoje: 2840,
    taxaSync: 99.8,
    ultimaSyncTimestamp: "2026-06-12T14:32:01",
    ultimaSyncTipo: "Tarifas",
    quartos: [
      { idCanal: "BDC-4481-A", nomeCanal: "Double Room Standard",  ajustePercent: 0, usoUnico: false, planoPmsId: "duplo",   planoPmsNome: "DUPLO — Tarifa Duplo" },
      { idCanal: "BDC-4481-B", nomeCanal: "Triple Room Standard",  ajustePercent: 0, usoUnico: false, planoPmsId: "triplo",  planoPmsNome: "TRIPLO — Tarifa Triplo" },
      { idCanal: "BDC-4481-C", nomeCanal: "Family Room Premium",   ajustePercent: 0, usoUnico: false, planoPmsId: "family",  planoPmsNome: "FAMILY — Tarifa Family" },
    ],
  },
  {
    id: "expedia",
    nome: "Expedia",
    cor: "#f6931f",
    status: "ativo",
    hotelId: "18492031",
    quartosVinculados: 3,
    totalQuartos: 3,
    reservasHoje: 2,
    receitaHoje: 1680,
    taxaSync: 97.2,
    ultimaSyncTimestamp: "2026-06-12T14:28:14",
    ultimaSyncTipo: "Disponibilidade",
    quartos: [
      { idCanal: "EXP-2291-A", nomeCanal: "Budget Double Room", ajustePercent: 0, ocupacao: 2, planoPmsId: "duplo",  planoPmsNome: "DUPLO — Tarifa Duplo" },
      { idCanal: "EXP-2291-A", nomeCanal: "Budget Double Room", ajustePercent: 0, ocupacao: 3, planoPmsId: "duplo",  planoPmsNome: "DUPLO — Tarifa Flex" },
      { idCanal: "EXP-2291-B", nomeCanal: "Standard Triple",    ajustePercent: 0, ocupacao: 3, planoPmsId: "triplo", planoPmsNome: "TRIPLO — Tarifa Triplo" },
    ],
  },
  {
    id: "airbnb",
    nome: "Airbnb",
    cor: "#ff5a5f",
    status: "inativo",
    hotelId: undefined,
    quartosVinculados: 2,
    totalQuartos: 3,
    reservasHoje: 0,
    receitaHoje: 0,
    taxaSync: 0,
    ultimaSyncTimestamp: "",
    ultimaSyncTipo: "",
    quartos: [
      { idCanal: "987123445", nomeCanal: "Chalé Raízes — Vista para o jardim",       ajustePercent: 0, planoPmsId: "chale1", planoPmsNome: "CHALÉ 1 — Chalé" },
      { idCanal: "987124112", nomeCanal: "Suite das Pedras — banheira de imersão",    ajustePercent: 0, planoPmsId: "suite",  planoPmsNome: "SUITE — Suite" },
      { idCanal: "987125800", nomeCanal: "Chalé Estrelas — deck externo",             ajustePercent: 0, planoPmsId: null,     planoPmsNome: null },
    ],
  },
  {
    id: "decolar",
    nome: "Decolar",
    cor: "#ff5a00",
    status: "nao-configurado",
    quartosVinculados: 0,
    totalQuartos: 0,
    reservasHoje: 0,
    receitaHoje: 0,
    taxaSync: 0,
    ultimaSyncTimestamp: "",
    ultimaSyncTipo: "",
    quartos: [],
  },
]

export const PLANOS_PMS = [
  { id: "duplo",   nome: "DUPLO — Tarifa Duplo" },
  { id: "triplo",  nome: "TRIPLO — Tarifa Triplo" },
  { id: "family",  nome: "FAMILY — Tarifa Family" },
  { id: "suite",   nome: "SUITE — Suite" },
  { id: "chale1",  nome: "CHALÉ 1 — Chalé" },
  { id: "chale2",  nome: "CHALÉ 2 — Chalé Superior" },
  { id: "flex",    nome: "DUPLO — Tarifa Flex" },
]
