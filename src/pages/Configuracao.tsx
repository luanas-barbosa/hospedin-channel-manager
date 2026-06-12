import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CANAIS, type CanalConectado } from '@/lib/mock/canais'
import OtaSelectModal from '@/components/OtaSelectModal'

const OTA_ABBREV: Record<string, string> = {
  booking: 'BDC', expedia: 'EXP', airbnb: 'AIR', decolar: 'DEC',
}

/* ── Card OTA ────────────────────────────────────────────────────── */

function OtaCard({ canal, onConectar }: { canal: CanalConectado; onConectar: () => void }) {
  const navigate = useNavigate()

  return (
    <div className="rounded-md border border-ui-neutral-200 dark:border-[#374E7A] bg-white dark:bg-[#1B2B4C] flex flex-col overflow-hidden shadow-card">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-ui-neutral-100 dark:border-[#374E7A]/60">
        <div
          className="size-10 rounded-md flex items-center justify-center text-[11px] font-bold text-white shrink-0"
          style={{ backgroundColor: canal.cor }}
        >
          {OTA_ABBREV[canal.id]}
        </div>
        <p className="flex-1 text-sm font-bold text-ui-neutral-900 dark:text-ui-neutral-100 leading-tight">
          {canal.nome}
        </p>
        {canal.status === 'ativo'           && <Badge variant="active"   showDot>Ativo</Badge>}
        {canal.status === 'inativo'         && <Badge variant="inactive" showDot>Inativo</Badge>}
        {canal.status === 'nao-configurado' && <Badge variant="outline">Não configurado</Badge>}
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-3 space-y-1.5">
        {canal.status === 'ativo' && (
          <>
            <p className="text-xs text-ui-neutral-500">
              Hotel ID:{' '}
              <span className="font-medium text-ui-neutral-800 dark:text-ui-neutral-200">{canal.hotelId}</span>
            </p>
            <p className="text-xs text-ui-neutral-500">
              Quartos mapeados:{' '}
              <span className="font-medium text-ui-neutral-800 dark:text-ui-neutral-200">
                {canal.quartosVinculados} de {canal.totalQuartos}
              </span>
            </p>
            <p className="text-xs text-ui-neutral-500">
              Taxa de sync:{' '}
              <span className="font-medium text-ui-semantic-success">{canal.taxaSync}%</span>
            </p>
          </>
        )}
        {canal.status === 'inativo' && (
          <>
            <p className="text-xs text-ui-neutral-500">
              Hotel ID:{' '}
              <span className="font-medium text-ui-neutral-800 dark:text-ui-neutral-200">{canal.hotelId ?? '—'}</span>
            </p>
            <p className="text-xs text-ui-neutral-500">
              Quartos mapeados:{' '}
              <span className="font-medium text-ui-neutral-800 dark:text-ui-neutral-200">
                {canal.quartosVinculados} de {canal.totalQuartos}
              </span>
            </p>
            <p className="text-xs text-ui-semantic-warning">Canal desativado</p>
          </>
        )}
        {canal.status === 'nao-configurado' && (
          <p className="text-xs text-ui-neutral-500">OTA disponível para conexão</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-ui-neutral-100 dark:border-[#374E7A]/60">
        {canal.status === 'ativo' && (
          <>
            <Button
              variant="outline-neutral"
              size="sm"
              className="flex-1"
              onClick={() => navigate(`/canais/${canal.id}`)}
            >
              Detalhes
            </Button>
            <Button variant="outline-destructive" size="sm" className="flex-1">
              Desativar
            </Button>
          </>
        )}
        {canal.status === 'inativo' && (
          <>
            <Button variant="outline-neutral" size="sm" className="flex-1">
              Reativar
            </Button>
            <Button variant="outline-destructive" size="sm" className="flex-1">
              Desconectar
            </Button>
          </>
        )}
        {canal.status === 'nao-configurado' && (
          <Button variant="primary" size="sm" className="flex-1" onClick={onConectar}>
            Conectar
          </Button>
        )}
      </div>
    </div>
  )
}

/* ── Card "Mais canais" ──────────────────────────────────────────── */

function MaisCanaisCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border-2 border-dashed border-ui-neutral-200 dark:border-[#374E7A] bg-transparent flex flex-col items-center justify-center gap-2 p-8 min-h-[200px] hover:border-brand-teal hover:bg-brand-teal/5 transition-colors group"
    >
      <div className="size-10 rounded-full border-2 border-ui-neutral-300 dark:border-[#374E7A] flex items-center justify-center group-hover:border-brand-teal transition-colors">
        <svg className="size-5 text-ui-neutral-400 group-hover:text-brand-teal transition-colors" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 4a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 10 4Z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-ui-neutral-700 dark:text-ui-neutral-300 group-hover:text-brand-teal transition-colors">
          Mais canais
        </p>
        <p className="text-xs text-ui-neutral-400 mt-0.5">Solicitar nova integração</p>
      </div>
    </button>
  )
}

/* ── Configuração ────────────────────────────────────────────────── */

export default function Configuracao() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <PageShell
        title="Configuração de Canais"
        description="Gerencie os canais de distribuição conectados ao seu PMS"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Canais', path: '/canais' },
          { label: 'Configuração' },
        ]}
        action={
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            + Conectar canal
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {CANAIS.map(canal => (
            <OtaCard
              key={canal.id}
              canal={canal}
              onConectar={() => setModalOpen(true)}
            />
          ))}
          <MaisCanaisCard onClick={() => setModalOpen(true)} />
        </div>
      </PageShell>

      <OtaSelectModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
