import React, { useState } from 'react'
import { ChevronDown, ChevronRight, AlertCircle } from 'lucide-react'
import { PageShell } from '@/components/PageShell'
import { SectionCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell,
} from '@/components/ui/table'
import { LOGS, type LogTipo, type LogStatus } from '@/lib/mock/logs'
import { CANAL_CORES, type CanalId } from '@/lib/mock/canais'

/* ── Constants ───────────────────────────────────────────────────── */

const OTA_ABBREV: Record<CanalId, string> = {
  booking: 'BDC', expedia: 'EXP', airbnb: 'AIR', decolar: 'DEC',
}

const OTA_NOME: Record<CanalId, string> = {
  booking: 'Booking.com', expedia: 'Expedia', airbnb: 'Airbnb', decolar: 'Decolar',
}

const TIPO_LABEL: Record<LogTipo, string> = {
  sync:          'Sync',
  reserva:       'Reserva',
  erro:          'Erro',
  cancelamento:  'Cancelamento',
}

const TIPO_BADGE: Record<LogTipo, 'info' | 'success' | 'danger' | 'warning'> = {
  sync:          'info',
  reserva:       'success',
  erro:          'danger',
  cancelamento:  'warning',
}

/* ── Helpers ─────────────────────────────────────────────────────── */

const TODAY = '2026-06-12'

function formatTimestamp(iso: string) {
  const [date, time] = iso.split('T')
  const hm = time?.slice(0, 5) ?? ''
  if (date === TODAY) return hm
  const [, m, d] = date.split('-')
  return `${d}/${m} · ${hm}`
}

/* ── Sub-components ──────────────────────────────────────────────── */

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

function StatusBadge({ status }: { status: LogStatus }) {
  if (status === 'sucesso') return <Badge variant="success">Sucesso</Badge>
  if (status === 'falha')   return <Badge variant="danger">Falha</Badge>
  return <Badge variant="outline">Neutro</Badge>
}

type FilterOption<T> = { value: T | 'all'; label: string }

function FilterPills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: FilterOption<T>[]
  value: T | 'all'
  onChange: (v: T | 'all') => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(opt => {
        const active = opt.value === value
        return (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            className={[
              'rounded-full px-3 py-1 text-[12px] font-semibold transition-colors',
              active
                ? 'bg-brand-teal text-white'
                : 'bg-ui-neutral-100 text-ui-neutral-600 hover:bg-ui-neutral-200 dark:bg-[#243656] dark:text-ui-neutral-300 dark:hover:bg-[#374E7A]',
            ].join(' ')}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */

const CANAL_OPTIONS: FilterOption<CanalId>[] = [
  { value: 'all',     label: 'Todos' },
  { value: 'booking', label: 'Booking.com' },
  { value: 'expedia', label: 'Expedia' },
  { value: 'airbnb',  label: 'Airbnb' },
]

const TIPO_OPTIONS: FilterOption<LogTipo>[] = [
  { value: 'all',          label: 'Todos' },
  { value: 'sync',         label: 'Sync' },
  { value: 'reserva',      label: 'Reserva' },
  { value: 'erro',         label: 'Erro' },
  { value: 'cancelamento', label: 'Cancelamento' },
]

const STATUS_OPTIONS: FilterOption<LogStatus>[] = [
  { value: 'all',     label: 'Todos' },
  { value: 'sucesso', label: 'Sucesso' },
  { value: 'falha',   label: 'Falha' },
  { value: 'neutro',  label: 'Neutro' },
]

export default function Logs() {
  const [canalFilter,  setCanalFilter]  = useState<CanalId  | 'all'>('all')
  const [tipoFilter,   setTipoFilter]   = useState<LogTipo  | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<LogStatus | 'all'>('all')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const filtered = LOGS.filter(l =>
    (canalFilter  === 'all' || l.canal  === canalFilter) &&
    (tipoFilter   === 'all' || l.tipo   === tipoFilter) &&
    (statusFilter === 'all' || l.status === statusFilter)
  )

  const errosAtivos = filtered.filter(l => l.status === 'falha').length

  function toggleExpand(id: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <PageShell
      title="Logs de Integração"
      breadcrumbs={[
        { label: 'Canais', path: '/canais' },
        { label: 'Logs' },
      ]}
    >
      {/* Erros ativos callout */}
      {errosAtivos > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-ui-semantic-danger/30 bg-ui-semantic-danger/5 px-4 py-3">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-ui-semantic-danger" />
          <p className="text-sm text-ui-semantic-danger">
            <span className="font-semibold">{errosAtivos} {errosAtivos === 1 ? 'erro ativo' : 'erros ativos'}</span>
            {' '}— clique na linha para ver o detalhe e a ação recomendada.
          </p>
        </div>
      )}

      {/* Filters */}
      <SectionCard>
        <div className="flex flex-col gap-4 p-1">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-ui-neutral-500 w-16 shrink-0">Canal</span>
              <FilterPills options={CANAL_OPTIONS} value={canalFilter} onChange={setCanalFilter} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-ui-neutral-500 w-16 shrink-0">Tipo</span>
              <FilterPills options={TIPO_OPTIONS} value={tipoFilter} onChange={setTipoFilter} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-ui-neutral-500 w-16 shrink-0">Status</span>
              <FilterPills options={STATUS_OPTIONS} value={statusFilter} onChange={setStatusFilter} />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Table */}
      <SectionCard>
        <div className="flex items-center justify-between px-4 py-3 border-b border-ui-neutral-200 dark:border-[#374E7A]">
          <span className="text-sm font-semibold text-ui-neutral-700">
            {filtered.length === LOGS.length
              ? `${LOGS.length} eventos`
              : `${filtered.length} de ${LOGS.length} eventos`}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-ui-neutral-400">
            <span className="text-3xl mb-3">📋</span>
            <p className="text-sm">Nenhum evento encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8" />
                <TableHead>Horário</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Ref. ID</TableHead>
                <TableHead centered>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log, i) => {
                const isExpanded = expanded.has(log.id)
                const hasDetalhe = !!log.detalhe
                return (
                  <React.Fragment key={log.id}>
                    <TableRow
                      odd={i % 2 === 0}
                      onClick={hasDetalhe ? () => toggleExpand(log.id) : undefined}
                      className={hasDetalhe ? 'cursor-pointer' : ''}
                    >
                      {/* Expand chevron */}
                      <TableCell className="w-8 pr-0">
                        {hasDetalhe ? (
                          <span className="text-ui-neutral-400">
                            {isExpanded
                              ? <ChevronDown className="size-4" />
                              : <ChevronRight className="size-4" />}
                          </span>
                        ) : null}
                      </TableCell>

                      <TableCell className="font-mono text-[12px] tabular-nums text-ui-neutral-500 whitespace-nowrap">
                        {formatTimestamp(log.timestamp)}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <OtaPill canal={log.canal} />
                          <span className="text-xs text-ui-neutral-500 hidden sm:inline">
                            {OTA_NOME[log.canal]}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant={TIPO_BADGE[log.tipo]}>
                          {TIPO_LABEL[log.tipo]}
                        </Badge>
                      </TableCell>

                      <TableCell className="max-w-[320px] truncate">
                        {log.descricao}
                      </TableCell>

                      <TableCell className="font-mono text-[12px] text-ui-neutral-500 whitespace-nowrap">
                        {log.refId}
                      </TableCell>

                      <TableCell centered>
                        <StatusBadge status={log.status} />
                      </TableCell>
                    </TableRow>

                    {/* Detalhe expandido */}
                    {hasDetalhe && isExpanded && (
                      <tr className="bg-ui-semantic-danger/5">
                        <td />
                        <td colSpan={6} className="px-3 py-3 shadow-[inset_0_-1px_0_#D6DDEE]">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 size-4 shrink-0 text-ui-semantic-danger" />
                            <p className="text-sm text-ui-neutral-700 dark:text-ui-neutral-200">{log.detalhe}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </PageShell>
  )
}
