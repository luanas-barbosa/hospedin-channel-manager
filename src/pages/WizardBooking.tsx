import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/input'
import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell,
} from '@/components/ui/table'
// @ts-ignore — Stepper is still .jsx
import Stepper from '@/components/Stepper'
import { useToast } from '@/contexts/ToastContext.jsx'
import { PLANOS_PMS } from '@/lib/mock/canais'

/* ── Types ───────────────────────────────────────────────────────── */

type TesteStatus = 'idle' | 'testando' | 'sucesso' | 'erro'

type Quarto = {
  id: number
  nome: string
  roomId: string
  ajuste: number
  usoUnico: boolean
  planoPmsId: string
}

const STEPS = ['Conectar', 'Mapear quartos', 'Ativar']

const QUARTOS_INICIAL: Quarto[] = [
  { id: 1, nome: 'Double Room Standard', roomId: 'BDC-4481-A', ajuste: 0, usoUnico: false, planoPmsId: '' },
  { id: 2, nome: 'Triple Room Standard',  roomId: 'BDC-4481-B', ajuste: 0, usoUnico: false, planoPmsId: '' },
  { id: 3, nome: 'Family Room Premium',   roomId: 'BDC-4481-C', ajuste: 0, usoUnico: false, planoPmsId: '' },
]

/* ── Helpers ─────────────────────────────────────────────────────── */

function InfoBox({ type = 'info', children }: { type?: 'info' | 'warning' | 'error'; children: React.ReactNode }) {
  const cls = {
    info:    'bg-[#E8FDF6] border-[#A0EDD4] text-[#0D7A68]',
    warning: 'bg-[#FFFDE7] border-[#F9C846] text-[#B7810A]',
    error:   'bg-[#FFF5F5] border-[#F5C6C6] text-[#C0392B]',
  }[type]
  return (
    <div className={`rounded-md border px-4 py-3 text-sm leading-relaxed ${cls}`}>
      {children}
    </div>
  )
}

function WizardFooter({ step, onBack, onNext, nextLabel, nextDisabled, loading }: {
  step: number
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
  loading?: boolean
}) {
  return (
    <div className="flex items-center justify-between pt-5 mt-6 border-t border-ui-neutral-200">
      <Button variant="neutral" size="sm" onClick={onBack}>
        {step === 0 ? 'Cancelar' : '← Voltar'}
      </Button>
      <div className="flex items-center gap-3">
        <span className="text-xs text-ui-neutral-400">Passo {step + 1} de 3</span>
        <Button
          variant="primary"
          size="sm"
          onClick={onNext}
          disabled={nextDisabled || loading}
        >
          {loading ? 'Ativando...' : (nextLabel ?? 'Próximo →')}
        </Button>
      </div>
    </div>
  )
}

/* ── Step 1 — Conectar ───────────────────────────────────────────── */

function Step1({ onNext, onBack }: { onNext: (hotelId: string) => void; onBack: () => void }) {
  const [hotelId, setHotelId] = useState('6314570')
  const [status, setStatus] = useState<TesteStatus>('idle')

  function testar() {
    if (!hotelId.trim()) return
    setStatus('testando')
    setTimeout(() => {
      setStatus(hotelId.trim().length > 3 ? 'sucesso' : 'erro')
    }, 1400)
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-bold text-ui-neutral-900">Conectar Booking.com</h3>
        <p className="text-sm text-ui-neutral-500 mt-1">
          Informe o ID do seu hotel no Booking.com para iniciar a configuração.
        </p>
      </div>

      <InfoBox type="info">
        <strong>Como encontrar seu Hotel ID:</strong> No extranet do Booking.com, vá em{' '}
        <strong>Account › Connectivity Provider</strong>, pesquise "Hospedin" e autorize a
        conexão. O Hotel ID aparece na barra de navegação do extranet.
      </InfoBox>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-ui-neutral-700 uppercase tracking-wide">
          Booking.com Hotel ID{' '}
          <span className="text-ui-semantic-danger normal-case font-normal">*</span>
        </label>
        <div className="flex items-center gap-2">
          <Input
            value={hotelId}
            onChange={e => { setHotelId(e.target.value); setStatus('idle') }}
            placeholder="ex: 6314570"
            className="w-[200px]"
          />
          <Button
            variant="outline-neutral"
            size="sm"
            onClick={testar}
            disabled={!hotelId.trim() || status === 'testando'}
          >
            {status === 'testando' ? 'Testando...' : 'Testar conexão'}
          </Button>
        </div>
        <p className="text-[11px] text-ui-neutral-400">
          Número exibido na barra de navegação do extranet
        </p>
      </div>

      {status === 'sucesso' && (
        <InfoBox type="info">
          ✓ <strong>Hotel conectado com sucesso:</strong> Pousada das Pedras · Florianópolis, SC
          · 3 tipos de quarto encontrados
        </InfoBox>
      )}
      {status === 'erro' && (
        <InfoBox type="error">
          ✕ Hotel ID não encontrado ou conexão não autorizada. Verifique o ID e se o Hospedin
          está autorizado como Connectivity Provider.
        </InfoBox>
      )}

      <WizardFooter
        step={0}
        onBack={onBack}
        onNext={() => onNext(hotelId)}
        nextDisabled={status !== 'sucesso'}
      />
    </div>
  )
}

/* ── Step 2 — Mapear quartos ─────────────────────────────────────── */

function Step2({
  quartos,
  onQuartosChange,
  onNext,
  onBack,
}: {
  quartos: Quarto[]
  onQuartosChange: (q: Quarto[]) => void
  onNext: () => void
  onBack: () => void
}) {
  const update = (id: number, field: keyof Quarto, value: unknown) =>
    onQuartosChange(quartos.map(q => q.id === id ? { ...q, [field]: value } : q))

  const todosMapeados = quartos.every(q => q.planoPmsId !== '')

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-bold text-ui-neutral-900">Mapeamento de quartos</h3>
        <p className="text-sm text-ui-neutral-500 mt-1">
          Vincule cada quarto do Booking.com ao tipo correspondente no PMS.
        </p>
      </div>

      <InfoBox type="warning">
        ⚠ Todos os quartos precisam ser mapeados. Quartos sem vínculo causam
        dessincronização e risco de overbooking.
      </InfoBox>

      <div className="flex justify-end">
        <Button variant="outline-neutral" size="sm">↺ Buscar quartos</Button>
      </div>

      <div className="rounded-md border border-ui-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quarto no Booking.com</TableHead>
              <TableHead>Plano no PMS</TableHead>
              <TableHead className="w-[130px]">Ajuste %</TableHead>
              <TableHead className="w-[100px]" centered>Uso único</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quartos.map(q => {
              const mapeado = q.planoPmsId !== ''
              return (
                <TableRow key={q.id}>
                  <TableCell className="py-2.5 h-auto">
                    <div className="flex items-center gap-2.5">
                      <span className={`size-2 rounded-full shrink-0 ${mapeado ? 'bg-ui-semantic-success' : 'bg-ui-semantic-danger'}`} />
                      <div>
                        <p className="text-sm font-medium text-ui-neutral-900 leading-tight">{q.nome}</p>
                        <p className="text-[11px] text-ui-neutral-400 mt-0.5">Room ID: {q.roomId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 h-auto">
                    <Select
                      value={q.planoPmsId}
                      onChange={e => update(q.id, 'planoPmsId', e.target.value)}
                      className="min-w-[210px]"
                    >
                      <option value="">— Selecionar plano —</option>
                      {PLANOS_PMS.map(p => (
                        <option key={p.id} value={p.id}>{p.nome}</option>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell className="py-2 h-auto">
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="number"
                        value={q.ajuste}
                        onChange={e => update(q.id, 'ajuste', Number(e.target.value))}
                        className="w-[68px] text-center"
                        min={-100}
                        max={100}
                      />
                      <span className="text-sm text-ui-neutral-500">%</span>
                    </div>
                  </TableCell>
                  <TableCell centered className="py-2 h-auto">
                    <input
                      type="checkbox"
                      checked={q.usoUnico}
                      onChange={e => update(q.id, 'usoUnico', e.target.checked)}
                      className="size-4 accent-[#32BBAA] cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <p className="text-[11px] text-ui-neutral-400 leading-relaxed">
        <span className="text-ui-semantic-success font-bold">●</span> Mapeado &nbsp;
        <span className="text-ui-semantic-danger font-bold">●</span> Sem vínculo &nbsp;&nbsp;
        <strong>Ajuste</strong> = % sobre a tarifa do PMS antes de enviar ao canal.{' '}
        <strong>Uso único</strong> = desconto para 1 hóspede.
      </p>

      <WizardFooter
        step={1}
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!todosMapeados}
      />
    </div>
  )
}

/* ── Step 3 — Ativar ─────────────────────────────────────────────── */

function Step3({
  hotelId,
  quartos,
  onBack,
  onActivate,
}: {
  hotelId: string
  quartos: Quarto[]
  onBack: () => void
  onActivate: () => void
}) {
  const [loading, setLoading] = useState(false)
  const mapeados  = quartos.filter(q => q.planoPmsId !== '')
  const semVinculo = quartos.filter(q => q.planoPmsId === '')
  const tudo = mapeados.length === quartos.length

  const handle = () => { setLoading(true); setTimeout(onActivate, 1500) }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-bold text-ui-neutral-900">Pronto para ativar</h3>
        <p className="text-sm text-ui-neutral-500 mt-1">
          Revise o resumo abaixo antes de ligar a sincronização ao vivo.
        </p>
      </div>

      <div className="bg-[#E8FDF6] border border-[#A0EDD4] rounded-md p-4 flex flex-col gap-3">
        {/* Hotel conectado */}
        <div className="flex items-center gap-2.5">
          <span className="size-5 rounded-full bg-brand-teal flex items-center justify-center text-white text-[11px] font-bold shrink-0">
            ✓
          </span>
          <span className="text-sm text-ui-neutral-800">
            Hotel ID <strong>{hotelId}</strong> conectado
          </span>
        </div>

        {/* Quartos */}
        <div className="flex items-center gap-2.5">
          <span className={`size-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 ${tudo ? 'bg-brand-teal' : 'bg-[#F4BD0E]'}`}>
            {tudo ? '✓' : '⚠'}
          </span>
          <span className="text-sm text-ui-neutral-800">
            {mapeados.length} de {quartos.length} quartos mapeados
          </span>
        </div>

        {/* Quartos sem vínculo */}
        {semVinculo.map(q => (
          <div key={q.id} className="flex items-center gap-2.5 ml-7">
            <span className="text-[11px] text-[#B7810A]">↳ {q.nome} sem vínculo</span>
          </div>
        ))}
      </div>

      <InfoBox type="warning">
        ⚠ Reservas existentes antes desta conexão não são importadas automaticamente.
        Cadastre-as manualmente para evitar overbooking.
      </InfoBox>

      <WizardFooter
        step={2}
        onBack={onBack}
        onNext={handle}
        nextLabel="✓ Ativar canal"
        loading={loading}
      />
    </div>
  )
}

/* ── Wizard Booking ──────────────────────────────────────────────── */

export default function WizardBooking() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [step, setStep] = useState(0)
  const [connectedHotelId, setConnectedHotelId] = useState('')
  const [quartos, setQuartos] = useState<Quarto[]>(QUARTOS_INICIAL)

  const handleActivate = () => {
    addToast('Booking.com ativado com sucesso!', 'success')
    navigate('/canais/booking')
  }

  return (
    <PageShell
      title="Wizard Booking.com"
      description="Configure a integração com o Booking.com em 3 passos"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Canais', path: '/canais' },
        { label: 'Configuração', path: '/canais/configuracao' },
        { label: 'Booking.com' },
      ]}
    >
      <div className="max-w-[720px]">
        <div className="rounded-md border border-ui-neutral-200 bg-white shadow-card p-6">

          {/* Canal banner */}
          <div className="flex items-center gap-3 pb-5 mb-6 border-b border-ui-neutral-100">
            <div className="size-10 rounded-md flex items-center justify-center text-[11px] font-bold text-white bg-[#003580] shrink-0">
              BDC
            </div>
            <div>
              <p className="text-sm font-bold text-ui-neutral-900">Booking.com</p>
              <p className="text-xs text-ui-neutral-500">Configuração de canal</p>
            </div>
          </div>

          <Stepper steps={STEPS} current={step} />

          {step === 0 && (
            <Step1
              onNext={hotelId => { setConnectedHotelId(hotelId); setStep(1) }}
              onBack={() => navigate('/canais/configuracao')}
            />
          )}
          {step === 1 && (
            <Step2
              quartos={quartos}
              onQuartosChange={setQuartos}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <Step3
              hotelId={connectedHotelId}
              quartos={quartos}
              onBack={() => setStep(1)}
              onActivate={handleActivate}
            />
          )}
        </div>
      </div>
    </PageShell>
  )
}
