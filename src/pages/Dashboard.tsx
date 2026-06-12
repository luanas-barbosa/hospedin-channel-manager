import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { PageShell } from '@/components/PageShell'
import { SectionCard, KpiCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/input'
import { CANAIS, CANAL_CORES, type CanalId } from '@/lib/mock/canais'
import { SYNC_RECENTE, ERROS_ATIVOS, type LogStatus } from '@/lib/mock/logs'
import {
  RESERVAS_RECENTES, DISTRIBUICAO_CANAIS,
  GRAFICO_7_DIAS, GRAFICO_30_DIAS, GRAFICO_MES,
} from '@/lib/mock/reservas'

/* ── Tipos ───────────────────────────────────────────────────────── */

type Periodo = 'este-mes' | 'ultimos-7' | 'ultimos-30'
type GraficoMode = 'consolidado' | 'por-canal'

/* ── KPIs por período ────────────────────────────────────────────── */

const KPI_DADOS: Record<Periodo, { receita: string; reservas: number; tendReceita: string; tendReservas: string }> = {
  'este-mes':   { receita: 'R$ 41.280', reservas: 63, tendReceita: '↑ 8% vs. mês anterior',       tendReservas: '↑ +12 vs. mês anterior' },
  'ultimos-7':  { receita: 'R$  9.520', reservas: 14, tendReceita: '↑ 3% vs. semana anterior',     tendReservas: '↑ +2 vs. semana anterior' },
  'ultimos-30': { receita: 'R$ 38.760', reservas: 58, tendReceita: '↑ 12% vs. período anterior',   tendReservas: '↑ +8 vs. período anterior' },
}

/* ── Helpers internos ────────────────────────────────────────────── */

const OTA_ABBREV: Record<CanalId, string> = {
  booking: 'BDC', expedia: 'EXP', airbnb: 'AIR', decolar: 'DEC',
}

function OtaPill({ canal }: { canal: CanalId }) {
  const cor = CANAL_CORES[canal]
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold whitespace-nowrap"
      style={{ backgroundColor: `${cor}22`, color: cor }}
    >
      {OTA_ABBREV[canal]}
    </span>
  )
}

function StatusIcon({ status }: { status: LogStatus }) {
  if (status === 'sucesso') return <span className="text-sm font-bold text-ui-semantic-success">✓</span>
  if (status === 'falha')   return <span className="text-sm font-bold text-ui-semantic-danger">✕</span>
  return <span className="text-sm font-bold text-ui-semantic-warning">–</span>
}

function formatHora(ts: string) {
  return ts.split('T')[1]?.slice(0, 5) ?? ''
}

function formatData(iso: string) {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

function taxaSyncColor(taxa: number) {
  if (taxa >= 95) return 'text-ui-primary-default'
  if (taxa >= 80) return 'text-ui-semantic-warning'
  return 'text-ui-semantic-danger'
}

/* ── Tooltip do gráfico ──────────────────────────────────────────── */

function GraficoTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ dataKey: string; name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-ui-neutral-200 rounded-md p-3 text-xs shadow-card">
      <p className="font-bold text-ui-neutral-800 mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="mb-0.5">
          {p.name}:{' '}
          {p.dataKey === 'receita' || p.dataKey === 'booking' || p.dataKey === 'expedia' || p.dataKey === 'airbnb'
            ? `R$ ${p.value.toLocaleString('pt-BR')}`
            : p.value}
        </p>
      ))}
    </div>
  )
}

/* ── Legenda customizada do gráfico ──────────────────────────────── */

function GraficoLegenda({ mode }: { mode: GraficoMode }) {
  if (mode === 'consolidado') {
    return (
      <div className="flex items-center gap-4 justify-center mt-2 text-xs text-ui-neutral-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-[10px] rounded-sm bg-brand-teal" />
          Receita
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-[10px] rounded-full bg-[#fbbf24]" />
          Reservas
        </span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-4 justify-center mt-2 text-xs text-ui-neutral-600">
      {DISTRIBUICAO_CANAIS.map(d => (
        <span key={d.canal} className="flex items-center gap-1.5">
          <span className="inline-block size-[10px] rounded-sm" style={{ backgroundColor: d.cor }} />
          {d.nome}
        </span>
      ))}
    </div>
  )
}

/* ── Dashboard ───────────────────────────────────────────────────── */

export default function Dashboard() {
  const navigate = useNavigate()
  const [periodo, setPeriodo] = useState<Periodo>('este-mes')
  const [graficoMode, setGraficoMode] = useState<GraficoMode>('consolidado')

  /* dados derivados */
  const kpi = KPI_DADOS[periodo]
  const canaisAtivos = CANAIS.filter(c => c.status === 'ativo').length
  const totalCanais = CANAIS.length
  const temNaoAtivo = CANAIS.some(c => c.status !== 'ativo')

  const graficoConsolidado = periodo === 'este-mes' ? GRAFICO_MES
    : periodo === 'ultimos-7' ? GRAFICO_7_DIAS
    : GRAFICO_30_DIAS

  const graficoPorCanal = graficoConsolidado.map(item => ({
    label: item.label,
    booking: Math.round(item.receita * 0.51),
    expedia: Math.round(item.receita * 0.30),
    airbnb:  Math.round(item.receita * 0.19),
  }))

  /* saúde da sync — canais ativos */
  const canaisAtivosData = CANAIS.filter(c => c.status === 'ativo')
  const taxaSyncGeral = canaisAtivosData.length
    ? canaisAtivosData.reduce((s, c) => s + c.taxaSync, 0) / canaisAtivosData.length
    : 0
  const ultimaSync = canaisAtivosData
    .slice()
    .sort((a, b) => b.ultimaSyncTimestamp.localeCompare(a.ultimaSyncTimestamp))[0]

  return (
    <PageShell
      title="Canais"
      description="Visão geral dos canais conectados e desempenho"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Canais', path: '/canais' },
        { label: 'Dashboard' },
      ]}
      action={
        <Select
          value={periodo}
          onChange={e => setPeriodo(e.target.value as Periodo)}
          className="w-[180px] h-9 text-sm"
        >
          <option value="este-mes">Este mês</option>
          <option value="ultimos-7">Últimos 7 dias</option>
          <option value="ultimos-30">Últimos 30 dias</option>
        </Select>
      }
    >
      <div className="flex flex-col gap-5">

        {/* KPIs ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4">
          <KpiCard
            label="Receita pelos canais"
            value={kpi.receita}
            trend={<span className="text-ui-semantic-success">{kpi.tendReceita}</span>}
          />
          <KpiCard
            label="Reservas recebidas"
            value={kpi.reservas}
            trend={<span className="text-ui-semantic-success">{kpi.tendReservas}</span>}
          />
          <KpiCard
            label="Canais ativos"
            value={
              <span className="flex items-center gap-2">
                {`${canaisAtivos} de ${totalCanais}`}
                {temNaoAtivo && (
                  <svg className="size-4 text-ui-semantic-warning shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1.5a.5.5 0 0 1 .44.26l6 11a.5.5 0 0 1-.44.74H2a.5.5 0 0 1-.44-.74l6-11A.5.5 0 0 1 8 1.5ZM8 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3A.5.5 0 0 0 8 6Zm.5 5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z" />
                  </svg>
                )}
              </span>
            }
          />
        </div>

        {/* Colunas principal ──────────────────────────────────── */}
        <div className="grid grid-cols-[1fr_360px] gap-4 items-start">

          {/* Coluna esquerda */}
          <div className="flex flex-col gap-4">

            {/* Canais conectados */}
            <SectionCard title="Canais conectados">
              <div className="divide-y divide-ui-neutral-100 dark:divide-[#374E7A]/40 px-4">
                {CANAIS.map(canal => (
                  <div
                    key={canal.id}
                    className="flex items-center gap-3 py-3 cursor-pointer hover:bg-ui-neutral-100/60 dark:hover:bg-[#374E7A]/20 -mx-4 px-4 transition-colors"
                    onClick={() =>
                      canal.status !== 'nao-configurado'
                        ? navigate(`/canais/${canal.id}`)
                        : navigate('/canais/configuracao')
                    }
                  >
                    {/* Logo OTA */}
                    <div
                      className="size-10 rounded-md flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                      style={{ backgroundColor: CANAL_CORES[canal.id] }}
                    >
                      {OTA_ABBREV[canal.id]}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-ui-neutral-900 dark:text-ui-neutral-100 leading-tight">
                        {canal.nome}
                      </p>
                      <p className="text-xs text-ui-neutral-500 mt-0.5">
                        {canal.status === 'ativo' && `ID ${canal.hotelId} · ${canal.quartosVinculados} quartos mapeados`}
                        {canal.status === 'inativo' && `ID ${canal.hotelId ?? '—'} · canal desativado`}
                        {canal.status === 'nao-configurado' && 'OTA líder — não configurado'}
                      </p>
                    </div>

                    {/* Status + reservas */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {canal.status === 'ativo' && (
                        <>
                          <Badge variant="active" showDot>Ativo</Badge>
                          <span className="text-[11px] text-ui-neutral-500">
                            {canal.reservasHoje} reservas hoje
                          </span>
                        </>
                      )}
                      {canal.status === 'inativo' && (
                        <Badge variant="inactive" showDot>Inativo</Badge>
                      )}
                      {canal.status === 'nao-configurado' && (
                        <Button
                          variant="outline-neutral"
                          size="sm"
                          onClick={e => { e.stopPropagation(); navigate('/canais/configuracao') }}
                        >
                          Conectar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Sync recente */}
            <SectionCard
              title="Sync recente"
              headerAction={
                <Link
                  to="/canais/logs"
                  className="text-xs text-ui-primary-default hover:underline font-medium"
                >
                  Ver todos os logs →
                </Link>
              }
            >
              <div className="divide-y divide-ui-neutral-100 dark:divide-[#374E7A]/40 px-4">
                {SYNC_RECENTE.map(log => (
                  <div key={log.id} className="flex items-center gap-3 py-2.5">
                    <span className="text-xs text-ui-neutral-500 w-10 shrink-0 tabular-nums">
                      {formatHora(log.timestamp)}
                    </span>
                    <span className="flex-1 text-sm text-ui-neutral-800 dark:text-ui-neutral-200 leading-tight min-w-0 truncate">
                      {log.descricao}
                    </span>
                    <OtaPill canal={log.canal} />
                    <StatusIcon status={log.status} />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Gráfico */}
            <SectionCard
              title="Receita & reservas no tempo"
              headerAction={
                <div className="flex items-center rounded-md border border-ui-neutral-200 overflow-hidden text-xs">
                  {(['consolidado', 'por-canal'] as GraficoMode[]).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setGraficoMode(m)}
                      className={[
                        'px-3 py-1 transition-colors',
                        graficoMode === m
                          ? 'bg-brand-teal text-white font-bold'
                          : 'text-ui-neutral-600 hover:bg-ui-neutral-100',
                      ].join(' ')}
                    >
                      {m === 'consolidado' ? 'Consolidado' : 'Por canal'}
                    </button>
                  ))}
                </div>
              }
            >
              <div className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={220}>
                  {graficoMode === 'consolidado' ? (
                    <ComposedChart data={graficoConsolidado} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EBEEF2" vertical={false} />
                      <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#8094AE' }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="receita" orientation="left" tick={{ fontSize: 11, fill: '#8094AE' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
                      <YAxis yAxisId="reservas" orientation="right" tick={{ fontSize: 11, fill: '#8094AE' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<GraficoTooltip />} />
                      <Bar yAxisId="receita" dataKey="receita" name="Receita" fill="#32BBAA" radius={[3, 3, 0, 0]} maxBarSize={40} />
                      <Line yAxisId="reservas" type="monotone" dataKey="reservas" name="Reservas" stroke="#fbbf24" strokeWidth={2} dot={false} />
                    </ComposedChart>
                  ) : (
                    <ComposedChart data={graficoPorCanal} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EBEEF2" vertical={false} />
                      <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#8094AE' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#8094AE' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip content={<GraficoTooltip />} />
                      <Line type="monotone" dataKey="booking" name="Booking.com" stroke="#003580" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="expedia" name="Expedia"     stroke="#f6931f" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="airbnb"  name="Airbnb"      stroke="#ff5a5f" strokeWidth={2} dot={false} />
                    </ComposedChart>
                  )}
                </ResponsiveContainer>
                <GraficoLegenda mode={graficoMode} />
              </div>
            </SectionCard>
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col gap-4">

            {/* Distribuição de reservas */}
            <SectionCard title="Distribuição de reservas">
              <div className="flex flex-col gap-3 px-4 pb-4">
                {DISTRIBUICAO_CANAIS.map(d => (
                  <div key={d.canal}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-ui-neutral-800 dark:text-ui-neutral-200">{d.nome}</span>
                      <span className="text-xs text-ui-neutral-500">
                        {d.reservas} ({d.percentual}%)
                      </span>
                    </div>
                    <div className="h-1.5 bg-ui-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${d.percentual}%`, backgroundColor: d.cor }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Últimas reservas */}
            <SectionCard title="Últimas reservas">
              <div className="divide-y divide-ui-neutral-100 dark:divide-[#374E7A]/40 px-4">
                {RESERVAS_RECENTES.slice(0, 4).map(r => (
                  <div key={r.id} className="flex items-center gap-2 py-2.5">
                    <span className="flex-1 text-sm font-medium text-ui-neutral-800 dark:text-ui-neutral-200 truncate min-w-0">
                      {r.hospede}
                    </span>
                    <OtaPill canal={r.canal} />
                    <span className="text-xs text-ui-neutral-500 w-10 text-right shrink-0">
                      {formatData(r.checkin)}
                    </span>
                    <span className="text-sm font-bold text-ui-neutral-900 dark:text-ui-neutral-100 w-20 text-right shrink-0">
                      R$ {r.valor.toLocaleString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Saúde da sincronização */}
            <SectionCard title="Saúde da sincronização">
              <div className="grid grid-cols-3 divide-x divide-ui-neutral-100 dark:divide-[#374E7A]/40 px-4 pb-4">

                {/* Taxa de sync */}
                <div className="flex flex-col gap-0.5 pr-3">
                  <p className="text-[10px] font-bold text-ui-neutral-500 uppercase tracking-wide mb-1">
                    Taxa de sync
                  </p>
                  <p className={`text-xl font-bold leading-none ${taxaSyncColor(taxaSyncGeral)}`}>
                    {taxaSyncGeral.toFixed(1)}%
                  </p>
                  <p className="text-[11px] text-ui-neutral-500 mt-1">Últimas 24h</p>
                </div>

                {/* Erros ativos */}
                <div className="flex flex-col gap-0.5 px-3">
                  <p className="text-[10px] font-bold text-ui-neutral-500 uppercase tracking-wide mb-1">
                    Erros ativos
                  </p>
                  <p className={`text-xl font-bold leading-none ${ERROS_ATIVOS.length > 0 ? 'text-ui-semantic-danger' : 'text-ui-neutral-800 dark:text-ui-neutral-100'}`}>
                    {ERROS_ATIVOS.length}
                  </p>
                  {ERROS_ATIVOS.length > 0 && (
                    <Link
                      to="/canais/logs"
                      className="text-[11px] text-ui-semantic-warning hover:underline mt-1 font-medium"
                    >
                      ⚠ Ver erros →
                    </Link>
                  )}
                </div>

                {/* Última sincronização */}
                <div className="flex flex-col gap-0.5 pl-3">
                  <p className="text-[10px] font-bold text-ui-neutral-500 uppercase tracking-wide mb-1">
                    Última sincronização
                  </p>
                  <p className="text-sm font-bold text-ui-neutral-900 dark:text-ui-neutral-100 leading-tight">
                    há 3 minutos
                  </p>
                  {ultimaSync && (
                    <p className="text-[11px] text-ui-neutral-500 mt-0.5 leading-tight">
                      {ultimaSync.nome} · {ultimaSync.ultimaSyncTipo}
                    </p>
                  )}
                </div>
              </div>
            </SectionCard>

          </div>
        </div>
      </div>
    </PageShell>
  )
}
