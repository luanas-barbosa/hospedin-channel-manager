import type { CanalId } from "./canais"

export type LogTipo = "sync" | "reserva" | "erro" | "cancelamento"
export type LogStatus = "sucesso" | "falha" | "neutro"

export interface LogEntry {
  id: string
  timestamp: string
  canal: CanalId
  tipo: LogTipo
  descricao: string
  refId: string
  status: LogStatus
  detalhe?: string
}

export const LOGS: LogEntry[] = [
  { id: "1",  timestamp: "2026-06-12T14:32:01", canal: "booking", tipo: "sync",         descricao: "Tarifas atualizadas — todas as categorias",    refId: "#BDC-SYNC-4481",  status: "sucesso" },
  { id: "2",  timestamp: "2026-06-12T14:31:58", canal: "expedia", tipo: "sync",         descricao: "Disponibilidade atualizada — Chalé 2",          refId: "#EXP-AV-2291",    status: "sucesso" },
  { id: "3",  timestamp: "2026-06-12T13:55:00", canal: "airbnb",  tipo: "erro",         descricao: "Falha ao enviar restrição — listing não ativo", refId: "#AIR-ERR-009",    status: "falha",  detalhe: "O listing #987125800 está inativo no Airbnb. Ative o listing no painel do Airbnb antes de enviar restrições." },
  { id: "4",  timestamp: "2026-06-12T13:40:00", canal: "booking", tipo: "reserva",      descricao: "Nova reserva recebida — R$ 840",               refId: "#BK-7711771",     status: "sucesso" },
  { id: "5",  timestamp: "2026-06-12T13:20:00", canal: "expedia", tipo: "cancelamento", descricao: "Cancelamento processado — Carlos Souza",        refId: "#EX-9928",        status: "neutro" },
  { id: "6",  timestamp: "2026-06-12T12:18:00", canal: "booking", tipo: "sync",         descricao: "Disponibilidade atualizada — Double Standard",  refId: "#BDC-AV-4482",    status: "sucesso" },
  { id: "7",  timestamp: "2026-06-12T11:45:00", canal: "expedia", tipo: "sync",         descricao: "Tarifas atualizadas — Budget Double",           refId: "#EXP-SYNC-2292",  status: "sucesso" },
  { id: "8",  timestamp: "2026-06-12T11:30:00", canal: "airbnb",  tipo: "erro",         descricao: "Falha OAuth — token expirado",                 refId: "#AIR-ERR-010",    status: "falha",  detalhe: "O token OAuth do Airbnb expirou. Reconecte a conta em Configuração → Airbnb → aba Mapeamento → Revogar e reconectar." },
  { id: "9",  timestamp: "2026-06-12T10:55:00", canal: "booking", tipo: "reserva",      descricao: "Nova reserva recebida — R$ 1.640",             refId: "#BK-7711772",     status: "sucesso" },
  { id: "10", timestamp: "2026-06-12T10:20:00", canal: "expedia", tipo: "reserva",      descricao: "Nova reserva recebida — R$ 1.260",             refId: "#EX-2291001",     status: "sucesso" },
  { id: "11", timestamp: "2026-06-12T09:48:00", canal: "booking", tipo: "sync",         descricao: "Disponibilidade atualizada — Family Room",     refId: "#BDC-AV-4483",    status: "sucesso" },
  { id: "12", timestamp: "2026-06-12T09:15:00", canal: "expedia", tipo: "cancelamento", descricao: "Cancelamento processado — Patricia Mendes",     refId: "#EX-9929",        status: "neutro" },
  { id: "13", timestamp: "2026-06-11T18:30:00", canal: "booking", tipo: "sync",         descricao: "Tarifas atualizadas — Triple Room",            refId: "#BDC-SYNC-4484",  status: "sucesso" },
  { id: "14", timestamp: "2026-06-11T17:45:00", canal: "airbnb",  tipo: "sync",         descricao: "Disponibilidade atualizada — Chalé Raízes",    refId: "#AIR-AV-987123",  status: "sucesso" },
  { id: "15", timestamp: "2026-06-11T16:20:00", canal: "booking", tipo: "reserva",      descricao: "Nova reserva recebida — R$ 840",               refId: "#BK-7711773",     status: "sucesso" },
]

/* Sync recente para o dashboard (últimas 5 entradas) */
export const SYNC_RECENTE = LOGS.slice(0, 5)

/* Erros ativos (status falha, sem resolução) */
export const ERROS_ATIVOS = LOGS.filter(l => l.status === "falha")
