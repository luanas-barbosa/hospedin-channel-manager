import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PageShell } from '@/components/PageShell'
import { SectionCard, KpiCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell,
} from '@/components/ui/table'
import { CANAIS, CANAL_CORES, type CanalId, type CanalConectado } from '@/lib/mock/canais'
import { LOGS, type LogStatus } from '@/lib/mock/logs'
import { RESERVAS_RECENTES, type Reserva } from '@/lib/mock/reservas'

/* ── Types ───────────────────────────────────────────────────────── */

type TabId = 'visao-geral' | 'mapeamento' | 'configuracoes'

/* ── Constants ───────────────────────────────────────────────────── */

const OTA_ABBREV: Record<CanalId, string> = {
  booking: 'BDC', expedia: 'EXP', airbnb: 'AIR', decolar: 'DEC',
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'visao-geral',    label: 'Visão geral' },
  { id: 'mapeamento',     label: 'Mapeamento' },
  { id: 'configuracoes',  label: 'Configurações' },
]

/* ── Helpers ─────────────────────────────────────────────────────── */

function StatusIcon({ status }: { status: LogStatus }) {
  if (status === 'sucesso') return <span className="text-sm font-bold text-ui-semantic-success">✓</span>
  if (status === 'falha')   return <span className="text-sm font-bold text-ui-semantic-danger">✕</span>
  return <span className="text-sm font-bold text-ui-neutral-400">–</span>
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

function formatHora(ts: string) { return ts.split('T')[1]?.slice(0, 5) ?? '' }
function formatData(iso: string) { const [, m, d] = iso.split('-'); return `${d}/${m}` }
function taxaSyncColor(t: number) {
  if (t >= 95) return 'text-ui-primary-default'
  if (t >= 80) return 'text-ui-semantic-warning'
  return 'text-ui-semantic-danger'
}

/* ── Tab bar ─────────────────────────────────────────────────────── */

function TabBar({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  return (
    <div className="flex border-b border-ui-neutral-200">
      {TABS.map(tab => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            'px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap',
            active === tab.id
              ? 'border-b-2 border-brand-teal text-brand-teal -mb-px'
              : 'border-b-2 border-transparent text-ui-neutral-500 hover:text-ui-neutral-700',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

/* ── Tab: Visão geral ────────────────────────────────────────────── */

function TabVisaoGeral({ canal, logs, reservas }: {
  canal: CanalConectado
  logs: ReturnType<typeof LOGS.filter>
  reservas: Reserva[]
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <KpiCard
          label="Reservas hoje"
          value={canal.reservasHoje}
          trend={canal.status === 'inativo' ? <span className="text-ui-semantic-warning">Canal inativo</span> : undefined}
        />
        <KpiCard
          label="Receita hoje"
          value={canal.receitaHoje > 0
            ? `R$ ${canal.receitaHoje.toLocaleString('pt-BR')}`
            : 'R$ 0'}
        />
        <KpiCard
          label="Taxa de sync"
          value={
            <span className={taxaSyncColor(canal.taxaSync)}>
              {canal.taxaSync > 0 ? `${canal.taxaSync}%` : '—'}
            </span>
          }
          trend={canal.ultimaSyncTipo
            ? <span className="text-ui-neutral-500">{canal.ultimaSyncTipo}</span>
            : undefined}
        />
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-4 items-start">
        {/* Sincronizações recentes */}
        <SectionCard
          title="Sincronizações recentes"
          headerAction={
            <Link to="/canais/logs" className="text-xs text-ui-primary-default hover:underline font-medium">
              Ver todos →
            </Link>
          }
        >
          {logs.length === 0 ? (
            <p className="text-sm text-ui-neutral-400 px-4 py-6 text-center">
              Nenhum evento registrado para este canal.
            </p>
          ) : (
            <div className="divide-y divide-ui-neutral-100 dark:divide-[#374E7A]/40 px-4">
              {logs.slice(0, 6).map(log => (
                <div key={log.id} className="flex items-center gap-3 py-2.5">
                  <span className="text-xs text-ui-neutral-400 w-10 shrink-0 tabular-nums">
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
          )}
        </SectionCard>

        {/* Últimas reservas */}
        <SectionCard title="Últimas reservas">
          {reservas.length === 0 ? (
            <p className="text-sm text-ui-neutral-400 px-4 py-6 text-center">
              Nenhuma reserva encontrada.
            </p>
          ) : (
            <div className="divide-y divide-ui-neutral-100 dark:divide-[#374E7A]/40 px-4">
              {reservas.slice(0, 5).map(r => (
                <div key={r.id} className="flex items-center gap-2 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ui-neutral-800 dark:text-ui-neutral-200 truncate">
                      {r.hospede}
                    </p>
                    <p className="text-[11px] text-ui-neutral-400 mt-0.5 truncate">{r.quarto}</p>
                  </div>
                  <span className="text-xs text-ui-neutral-400 shrink-0">{formatData(r.checkin)}</span>
                  <span className="text-sm font-bold text-ui-neutral-900 dark:text-ui-neutral-100 shrink-0 w-20 text-right">
                    R$ {r.valor.toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}

/* ── Tab: Mapeamento ─────────────────────────────────────────────── */

function TabMapeamento({ canal, navigate }: { canal: CanalConectado; navigate: ReturnType<typeof useNavigate> }) {
  const isAirbnb  = canal.id === 'airbnb'
  const isExpedia = canal.id === 'expedia'
  const isBooking = canal.id === 'booking'

  const wizardPath = `/canais/conectar/${canal.id}`

  return (
    <div className="flex flex-col gap-4">
      <SectionCard
        title="Quartos mapeados"
        headerAction={
          <Button
            variant="outline-neutral"
            size="sm"
            onClick={() => navigate(wizardPath)}
          >
            Editar no wizard
          </Button>
        }
      >
        <div className="px-4 pb-4">
          {canal.quartos.length === 0 ? (
            <p className="text-sm text-ui-neutral-400 py-6 text-center">
              Nenhum quarto mapeado. Configure no wizard.
            </p>
          ) : (
            <div className="rounded-md border border-ui-neutral-200 overflow-hidden mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isAirbnb ? 'Listing no Airbnb' : 'Quarto no canal'}</TableHead>
                    <TableHead>Plano no PMS</TableHead>
                    {isExpedia && <TableHead className="w-[100px]">Ocupação</TableHead>}
                    <TableHead className="w-[110px]">Ajuste</TableHead>
                    {isBooking && <TableHead className="w-[100px]" centered>Uso único</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {canal.quartos.map((q, i) => {
                    const mapeado = q.planoPmsId !== null
                    return (
                      <TableRow key={i}>
                        <TableCell className="py-2.5 h-auto">
                          <div className="flex items-center gap-2.5">
                            <span className={`size-2 rounded-full shrink-0 ${mapeado ? 'bg-ui-semantic-success' : 'bg-ui-semantic-danger'}`} />
                            <div>
                              <p className="text-sm font-medium text-ui-neutral-900 leading-tight">
                                {q.nomeCanal}
                              </p>
                              <p className="text-[11px] text-ui-neutral-400 mt-0.5">
                                {q.idCanal}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {mapeado ? (
                            <span className="text-sm text-ui-neutral-800">{q.planoPmsNome}</span>
                          ) : (
                            <span className="text-xs text-ui-semantic-danger italic">Sem vínculo</span>
                          )}
                        </TableCell>
                        {isExpedia && (
                          <TableCell>
                            <span className="text-sm text-ui-neutral-700">
                              {q.ocupacao != null ? `${q.ocupacao} pax` : '—'}
                            </span>
                          </TableCell>
                        )}
                        <TableCell>
                          <span className="text-sm text-ui-neutral-700">
                            {q.ajustePercent > 0 ? `+${q.ajustePercent}%`
                              : q.ajustePercent < 0 ? `${q.ajustePercent}%`
                              : '0%'}
                          </span>
                        </TableCell>
                        {isBooking && (
                          <TableCell centered>
                            <span className={`text-xs font-medium ${q.usoUnico ? 'text-ui-semantic-success' : 'text-ui-neutral-400'}`}>
                              {q.usoUnico ? 'Sim' : 'Não'}
                            </span>
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </SectionCard>

      <p className="text-[11px] text-ui-neutral-400">
        <span className="text-ui-semantic-success font-bold">●</span> Mapeado &nbsp;
        <span className="text-ui-semantic-danger font-bold">●</span> Sem vínculo &nbsp;&nbsp;
        Para alterar o mapeamento, use o botão "Editar no wizard".
      </p>
    </div>
  )
}

/* ── Tab: Configurações ──────────────────────────────────────────── */

function TabConfiguracoes({ canal, navigate }: { canal: CanalConectado; navigate: ReturnType<typeof useNavigate> }) {
  function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
      <div className="flex items-start justify-between py-3 border-b border-ui-neutral-100 dark:border-[#374E7A]/40 last:border-0">
        <span className="text-sm text-ui-neutral-500 shrink-0 w-40">{label}</span>
        <span className="text-sm font-medium text-ui-neutral-900 dark:text-ui-neutral-100 text-right flex-1">
          {value}
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 max-w-[600px]">
      {/* Credenciais / info */}
      <SectionCard title="Informações do canal">
        <div className="px-4 pb-2">
          <Row label="Canal" value={canal.nome} />
          {canal.hotelId && <Row label="Hotel ID" value={canal.hotelId} />}
          <Row
            label="Status"
            value={
              canal.status === 'ativo'
                ? <Badge variant="active" showDot>Ativo</Badge>
                : <Badge variant="inactive" showDot>Inativo</Badge>
            }
          />
          {canal.status === 'ativo' && canal.taxaSync > 0 && (
            <Row label="Taxa de sync" value={<span className={taxaSyncColor(canal.taxaSync)}>{canal.taxaSync}%</span>} />
          )}
          {canal.ultimaSyncTimestamp && (
            <Row
              label="Última sincronização"
              value={`${formatData(canal.ultimaSyncTimestamp.split('T')[0])} às ${formatHora(canal.ultimaSyncTimestamp)}`}
            />
          )}
          {canal.id === 'expedia' && (
            <Row label="Modelo de precificação" value="OBP — por ocupação" />
          )}
          {canal.id === 'airbnb' && (
            <Row
              label="Autorização OAuth"
              value={<span className="text-ui-semantic-success font-medium">✓ Autorizada</span>}
            />
          )}
          <Row
            label="Quartos mapeados"
            value={`${canal.quartosVinculados} de ${canal.totalQuartos}`}
          />
        </div>
      </SectionCard>

      {/* Ações de status */}
      <SectionCard title="Ações">
        <div className="px-4 pb-4 flex flex-col gap-3">
          {canal.status === 'ativo' ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ui-neutral-800">Pausar sincronização</p>
                <p className="text-xs text-ui-neutral-500 mt-0.5">
                  Canal continua configurado, mas para de enviar atualizações.
                </p>
              </div>
              <Button variant="outline-destructive" size="sm">Desativar</Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ui-neutral-800">Reativar sincronização</p>
                <p className="text-xs text-ui-neutral-500 mt-0.5">
                  Retoma o envio de tarifas e disponibilidade ao canal.
                </p>
              </div>
              <Button variant="outline-neutral" size="sm">Reativar</Button>
            </div>
          )}

          <div className="h-px bg-ui-neutral-100 dark:bg-[#374E7A]/40" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ui-semantic-danger">Desconectar canal</p>
              <p className="text-xs text-ui-neutral-500 mt-0.5">
                Remove a integração e apaga todo o mapeamento. Irreversível.
              </p>
            </div>
            <Button variant="outline-destructive" size="sm">Desconectar</Button>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

/* ── CanalDetalhe ────────────────────────────────────────────────── */

export default function CanalDetalhe() {
  const { canal: canalParam } = useParams<{ canal: string }>()
  const navigate = useNavigate()
  const [tab, setTab] = useState<TabId>('visao-geral')

  const canal = CANAIS.find(c => c.id === canalParam)

  if (!canal || canal.status === 'nao-configurado') {
    navigate('/canais/configuracao', { replace: true })
    return null
  }

  const logsDoCanal   = LOGS.filter(l => l.canal === canal.id)
  const reservasDoCanal = RESERVAS_RECENTES.filter(r => r.canal === canal.id)
  const abbrev = OTA_ABBREV[canal.id]

  return (
    <PageShell
      title={canal.nome}
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Canais', path: '/canais' },
        { label: canal.nome },
      ]}
      action={
        canal.status === 'ativo'
          ? <Button variant="outline-destructive" size="sm">Desativar canal</Button>
          : <Button variant="outline-neutral" size="sm">Reativar canal</Button>
      }
    >
      <div className="flex flex-col gap-4">

        {/* Canal identity header */}
        <div className="rounded-md border border-ui-neutral-200 bg-white shadow-card px-4 py-3 flex items-center gap-4">
          <div
            className="size-10 rounded-md flex items-center justify-center text-[11px] font-bold text-white shrink-0"
            style={{ backgroundColor: canal.cor }}
          >
            {abbrev}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-ui-neutral-900 leading-tight">{canal.nome}</p>
            {canal.hotelId && (
              <p className="text-xs text-ui-neutral-500 mt-0.5">Hotel ID: {canal.hotelId}</p>
            )}
          </div>
          {canal.status === 'ativo'   && <Badge variant="active"   showDot>Ativo</Badge>}
          {canal.status === 'inativo' && <Badge variant="inactive" showDot>Inativo</Badge>}
        </div>

        {/* Tab navigation + content */}
        <div>
          <TabBar active={tab} onChange={setTab} />
          <div className="pt-4">
            {tab === 'visao-geral' && (
              <TabVisaoGeral
                canal={canal}
                logs={logsDoCanal}
                reservas={reservasDoCanal}
              />
            )}
            {tab === 'mapeamento' && (
              <TabMapeamento canal={canal} navigate={navigate} />
            )}
            {tab === 'configuracoes' && (
              <TabConfiguracoes canal={canal} navigate={navigate} />
            )}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
