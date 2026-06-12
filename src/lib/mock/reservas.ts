import type { CanalId } from "./canais"

export interface Reserva {
  id: string
  hospede: string
  canal: CanalId
  checkin: string
  checkout: string
  valor: number
  quarto: string
}

export const RESERVAS_RECENTES: Reserva[] = [
  { id: "BK-7711771", hospede: "Ana Lima",          canal: "booking", checkin: "2026-06-14", checkout: "2026-06-16", valor: 840,   quarto: "Double Room Standard" },
  { id: "EX-2291001", hospede: "Carlos Souza",       canal: "expedia", checkin: "2026-06-15", checkout: "2026-06-18", valor: 1260,  quarto: "Budget Double Room" },
  { id: "AIR-009001", hospede: "Maria Ferreira",     canal: "airbnb",  checkin: "2026-06-16", checkout: "2026-06-19", valor: 620,   quarto: "Chalé Raízes" },
  { id: "BK-7711772", hospede: "João Pereira",       canal: "booking", checkin: "2026-06-17", checkout: "2026-06-20", valor: 1640,  quarto: "Family Room Premium" },
  { id: "EX-2291002", hospede: "Patricia Mendes",    canal: "expedia", checkin: "2026-06-18", checkout: "2026-06-21", valor: 980,   quarto: "Standard Triple" },
  { id: "BK-7711773", hospede: "Roberto Alves",      canal: "booking", checkin: "2026-06-19", checkout: "2026-06-22", valor: 1120,  quarto: "Triple Room Standard" },
  { id: "AIR-009002", hospede: "Fernanda Costa",     canal: "airbnb",  checkin: "2026-06-20", checkout: "2026-06-23", valor: 740,   quarto: "Suite das Pedras" },
  { id: "BK-7711774", hospede: "Lucas Oliveira",     canal: "booking", checkin: "2026-06-21", checkout: "2026-06-24", valor: 840,   quarto: "Double Room Standard" },
]

/* Distribuição de reservas por canal (para gráfico de barras horizontais) */
export const DISTRIBUICAO_CANAIS = [
  { canal: "booking" as CanalId, nome: "Booking.com", cor: "#003580", reservas: 32, percentual: 51 },
  { canal: "expedia" as CanalId, nome: "Expedia",     cor: "#f6931f", reservas: 19, percentual: 30 },
  { canal: "airbnb"  as CanalId, nome: "Airbnb",      cor: "#ff5a5f", reservas: 12, percentual: 19 },
]

/* Dados do gráfico Receita & Reservas — modo consolidado (últimos 7 dias) */
export const GRAFICO_7_DIAS = [
  { label: "Seg", receita: 4200,  reservas: 5 },
  { label: "Ter", receita: 5800,  reservas: 7 },
  { label: "Qua", receita: 3900,  reservas: 4 },
  { label: "Qui", receita: 6700,  reservas: 8 },
  { label: "Sex", receita: 8100,  reservas: 10 },
  { label: "Sáb", receita: 7400,  reservas: 9 },
  { label: "Dom", receita: 5180,  reservas: 6 },
]

export const GRAFICO_30_DIAS = Array.from({ length: 30 }, (_, i) => {
  const d = new Date("2026-06-01")
  d.setDate(d.getDate() + i)
  return {
    label: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
    receita: Math.round(2000 + Math.random() * 8000),
    reservas: Math.round(2 + Math.random() * 12),
  }
})

export const GRAFICO_MES = [
  { label: "Sem 1", receita: 18400, reservas: 22 },
  { label: "Sem 2", receita: 22100, reservas: 27 },
  { label: "Sem 3", receita: 19800, reservas: 24 },
  { label: "Sem 4", receita: 21280, reservas: 25 },
]
