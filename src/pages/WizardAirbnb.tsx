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

type Listing = {
  id: number
  nome: string
  listingId: string
  ajuste: number
  planoPmsId: string
}

const STEPS = ['Autorizar', 'Mapear listings', 'Ativar']

const LISTINGS_INICIAL: Listing[] = [
  { id: 1, nome: 'Chalé Raízes — Vista para o jardim',        listingId: '987123445', ajuste: 0, planoPmsId: '' },
  { id: 2, nome: 'Suíte das Pedras — banheira de imersão',    listingId: '987124112', ajuste: 0, planoPmsId: '' },
  { id: 3, nome: 'Chalé Estrelas — deck externo',             listingId: '987125800', ajuste: 0, planoPmsId: '' },
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

/* ── Step 1 — Autorizar OAuth ────────────────────────────────────── */

function Step1({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [autorizado, setAutorizado] = useState(false)
  const [conectando, setConectando] = useState(false)

  function conectar() {
    setConectando(true)
    setTimeout(() => { setConectando(false); setAutorizado(true) }, 2000)
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-bold text-ui-neutral-900">Autorizar Airbnb</h3>
        <p className="text-sm text-ui-neutral-500 mt-1">
          A conexão é feita via autorização direta na sua conta Airbnb.
        </p>
      </div>

      <InfoBox type="warning">
        ⚠ Se houver links iCal ativos, remova-os antes de conectar — iCal e API não funcionam
        juntos. Se outro sistema já estiver conectado, desconecte em{' '}
        <strong>Configurações Airbnb › Privacidade › Serviços conectados</strong>.
      </InfoBox>

      {/* OAuth panel */}
      <div className="border-2 border-dashed border-[#F5C6C6] rounded-md bg-[#FFF9F9] py-8 px-6 flex flex-col items-center gap-4 text-center">
        <span className="text-3xl select-none">🔑</span>
        <div>
          <p className="text-sm font-bold text-ui-neutral-900">Autorizar Hospedin no Airbnb</p>
          <p className="text-xs text-ui-neutral-500 mt-1 max-w-[320px]">
            Você será redirecionado ao Airbnb para aprovar o acesso. Retorna automaticamente
            após a autorização.
          </p>
        </div>

        {autorizado ? (
          <div className="flex items-center gap-2 bg-[#E8FDF6] border border-[#A0EDD4] rounded-md px-4 py-2.5 text-sm font-bold text-[#0D9965]">
            <svg className="size-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0Z"/>
            </svg>
            Conta Airbnb autorizada
          </div>
        ) : (
          <button
            type="button"
            onClick={conectar}
            disabled={conectando}
            className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: conectando ? '#f8a0a3' : '#ff5a5f' }}
          >
            🏠 {conectando ? 'Conectando...' : 'Conectar com Airbnb'}
          </button>
        )}
      </div>

      <p className="text-[11px] text-ui-neutral-400 text-center">
        Após conectar, os listings ficam em Instant Book. O Airbnb cobra ~3% do host —
        considere isso no preço base do PMS.
      </p>

      <WizardFooter
        step={0}
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!autorizado}
      />
    </div>
  )
}

/* ── Step 2 — Mapear listings ────────────────────────────────────── */

function Step2({
  listings,
  onListingsChange,
  onNext,
  onBack,
}: {
  listings: Listing[]
  onListingsChange: (l: Listing[]) => void
  onNext: () => void
  onBack: () => void
}) {
  const update = (id: number, field: keyof Listing, value: unknown) =>
    onListingsChange(listings.map(l => l.id === id ? { ...l, [field]: value } : l))

  const todosMapeados = listings.every(l => l.planoPmsId !== '')

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-bold text-ui-neutral-900">Mapeamento de listings</h3>
        <p className="text-sm text-ui-neutral-500 mt-1">
          Vincule cada listing ao quarto correspondente no PMS.
        </p>
      </div>

      <div className="flex justify-end">
        <Button variant="outline-neutral" size="sm">↺ Buscar listings</Button>
      </div>

      <div className="rounded-md border border-ui-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Listing no Airbnb</TableHead>
              <TableHead>Plano no PMS</TableHead>
              <TableHead className="w-[130px]">Ajuste %</TableHead>
              <TableHead className="w-[56px]" centered />
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map(l => {
              const mapeado = l.planoPmsId !== ''
              return (
                <TableRow key={l.id}>
                  <TableCell className="py-2.5 h-auto">
                    <div className="flex items-center gap-2.5">
                      <span className={`size-2 rounded-full shrink-0 ${mapeado ? 'bg-ui-semantic-success' : 'bg-ui-semantic-danger'}`} />
                      <div>
                        <p className="text-sm font-medium text-ui-neutral-900 leading-tight">{l.nome}</p>
                        <p className="text-[11px] text-ui-neutral-400 mt-0.5">ID: {l.listingId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 h-auto">
                    <Select
                      value={l.planoPmsId}
                      onChange={e => update(l.id, 'planoPmsId', e.target.value)}
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
                        value={l.ajuste}
                        onChange={e => update(l.id, 'ajuste', Number(e.target.value))}
                        className="w-[68px] text-center"
                        min={-100}
                        max={100}
                      />
                      <span className="text-sm text-ui-neutral-500">%</span>
                    </div>
                  </TableCell>
                  <TableCell centered className="py-2 h-auto">
                    <button
                      type="button"
                      title="Configurações avançadas do listing"
                      className="inline-flex size-7 items-center justify-center rounded border border-ui-neutral-200 text-ui-neutral-500 hover:bg-ui-neutral-100 hover:text-ui-neutral-800 transition-colors"
                    >
                      <svg className="size-3.5" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492ZM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0Z"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319Zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.474l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319Z"/>
                      </svg>
                    </button>
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
        Clique no ⚙ para configurar taxa de limpeza, hóspedes extras e preço de fim de
        semana por listing.
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
  listings,
  onBack,
  onActivate,
}: {
  listings: Listing[]
  onBack: () => void
  onActivate: () => void
}) {
  const [loading, setLoading] = useState(false)
  const mapeados   = listings.filter(l => l.planoPmsId !== '')
  const semVinculo = listings.filter(l => l.planoPmsId === '')
  const tudo = mapeados.length === listings.length

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
        <div className="flex items-center gap-2.5">
          <span className="size-5 rounded-full bg-brand-teal flex items-center justify-center text-white text-[11px] font-bold shrink-0">✓</span>
          <span className="text-sm text-ui-neutral-800">OAuth Airbnb autorizado</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className={`size-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 ${tudo ? 'bg-brand-teal' : 'bg-[#F4BD0E]'}`}>
            {tudo ? '✓' : '⚠'}
          </span>
          <span className="text-sm text-ui-neutral-800">
            {mapeados.length} de {listings.length} listings mapeados
          </span>
        </div>

        {semVinculo.map(l => (
          <div key={l.id} className="flex items-center gap-2.5 ml-7">
            <span className="text-[11px] text-[#B7810A]">↳ {l.nome} sem vínculo</span>
          </div>
        ))}
      </div>

      <InfoBox type="error">
        ⚠ Após ativar, preços e calendário passam a ser gerenciados pelo Hospedin. Os campos
        de preço no app do Airbnb ficam bloqueados — edite sempre pelo PMS.
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

/* ── Wizard Airbnb ───────────────────────────────────────────────── */

export default function WizardAirbnb() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [step, setStep] = useState(0)
  const [listings, setListings] = useState<Listing[]>(LISTINGS_INICIAL)

  const handleActivate = () => {
    addToast('Airbnb ativado com sucesso!', 'success')
    navigate('/canais/airbnb')
  }

  return (
    <PageShell
      title="Wizard Airbnb"
      description="Configure a integração com o Airbnb em 3 passos"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Canais', path: '/canais' },
        { label: 'Configuração', path: '/canais/configuracao' },
        { label: 'Airbnb' },
      ]}
    >
      <div className="max-w-[720px]">
        <div className="rounded-md border border-ui-neutral-200 bg-white shadow-card p-6">

          {/* Canal banner */}
          <div className="flex items-center gap-3 pb-5 mb-6 border-b border-ui-neutral-100">
            <div className="size-10 rounded-md flex items-center justify-center text-[11px] font-bold text-white bg-[#ff5a5f] shrink-0">
              AIR
            </div>
            <div>
              <p className="text-sm font-bold text-ui-neutral-900">Airbnb</p>
              <p className="text-xs text-ui-neutral-500">Configuração de canal</p>
            </div>
          </div>

          <Stepper steps={STEPS} current={step} />

          {step === 0 && (
            <Step1
              onNext={() => setStep(1)}
              onBack={() => navigate('/canais/configuracao')}
            />
          )}
          {step === 1 && (
            <Step2
              listings={listings}
              onListingsChange={setListings}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <Step3
              listings={listings}
              onBack={() => setStep(1)}
              onActivate={handleActivate}
            />
          )}
        </div>
      </div>
    </PageShell>
  )
}
