import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogHeader, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CANAIS } from '@/lib/mock/canais'

type OtaOption = {
  id: string
  nome: string
  cor: string
  abbrev: string
  wizardPath?: string
}

const OTA_OPTIONS: OtaOption[] = [
  { id: 'booking', nome: 'Booking.com', cor: '#003580', abbrev: 'BDC', wizardPath: '/canais/conectar/booking' },
  { id: 'expedia', nome: 'Expedia',     cor: '#f6931f', abbrev: 'EXP', wizardPath: '/canais/conectar/expedia' },
  { id: 'airbnb',  nome: 'Airbnb',      cor: '#ff5a5f', abbrev: 'AIR', wizardPath: '/canais/conectar/airbnb'  },
  { id: 'decolar', nome: 'Decolar',     cor: '#ff5a00', abbrev: 'DEC', wizardPath: undefined },
]

interface OtaSelectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function OtaSelectModal({ open, onOpenChange }: OtaSelectModalProps) {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')

  const conectados = new Set(CANAIS.filter(c => c.status === 'ativo').map(c => c.id))

  const filtered = OTA_OPTIONS.filter(o =>
    o.nome.toLowerCase().includes(busca.toLowerCase())
  )

  function handleSelect(ota: OtaOption) {
    if (!ota.wizardPath) return
    onOpenChange(false)
    navigate(ota.wizardPath)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader title="Conectar canal" />
      <DialogContent className="py-4">
        <input
          type="search"
          placeholder="Buscar canal..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full rounded-md border border-ui-neutral-200 bg-white px-3 py-2 text-sm text-ui-neutral-800 placeholder:text-ui-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal dark:bg-[#1B2B4C] dark:border-[#374E7A] dark:text-ui-neutral-100 mb-4"
        />
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(ota => {
            const jaConectado = conectados.has(ota.id)
            const disponivel = !!ota.wizardPath
            const clickable = !jaConectado && disponivel

            return (
              <button
                key={ota.id}
                type="button"
                disabled={!clickable}
                onClick={() => handleSelect(ota)}
                className={[
                  'flex items-center gap-3 rounded-md border p-3 text-left transition-colors',
                  clickable
                    ? 'cursor-pointer border-ui-neutral-200 hover:border-brand-teal hover:bg-brand-teal/5 dark:border-[#374E7A] dark:hover:border-brand-teal'
                    : 'cursor-not-allowed border-ui-neutral-200 dark:border-[#374E7A] opacity-50',
                ].join(' ')}
              >
                <div
                  className="size-10 rounded-md flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                  style={{ backgroundColor: ota.cor }}
                >
                  {ota.abbrev}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-ui-neutral-800 dark:text-ui-neutral-100">{ota.nome}</p>
                  <p className="text-[11px] text-ui-neutral-500 mt-0.5">
                    {jaConectado ? 'Já conectado' : disponivel ? 'Clique para conectar' : 'Em breve'}
                  </p>
                </div>
                {jaConectado && (
                  <svg className="size-4 text-ui-semantic-success shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0Z"/>
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </DialogContent>
      <DialogFooter>
        <Button variant="neutral" onClick={() => onOpenChange(false)}>Cancelar</Button>
      </DialogFooter>
    </Dialog>
  )
}
