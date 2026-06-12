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

type ModeloPrecificacao = 'OBP' | 'BAR'

type CredenciaisExpedia = {
  hotelId: string
  username: string
  senha: string
  modelo: ModeloPrecificacao
}

type Quarto = {
  id: number
  nome: string
  obpInfo: string
  ajuste: number
  planoPmsId: string
}

const STEPS = ['Conectar', 'Mapear quartos', 'Ativar']

const QUARTOS_INICIAL: Quarto[] = [
  { id: 1, nome: 'Budget Double Room', obpInfo: 'OBP · 2 pax', ajuste: 0, planoPmsId: '' },
  { id: 2, nome: 'Budget Double Room', obpInfo: 'OBP · Flex · 3 pax', ajuste: 0, planoPmsId: '' },
  { id: 3, nome: 'Standard Triple',    obpInfo: 'OBP · 3 pax', ajuste: 0, planoPmsId: '' },
]

/* ── Helpers ─────────────────────────────────────────────────────── */

function InfoBox({ type = 'info', children }: { type?: 'info' | 'warning'; children: React.ReactNode }) {
  const cls = {
    info:    'bg-[#E8FDF6] border-[#A0EDD4] text-[#0D7A68]',
    warning: 'bg-[#FFFDE7] border-[#F9C846] text-[#B7810A]',
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

function Step1({
  credenciais,
  onChange,
  onNext,
  onBack,
}: {
  credenciais: CredenciaisExpedia
  onChange: (c: CredenciaisExpedia) => void
  onNext: () => void
  onBack: () => void
}) {
  const set = (k: keyof CredenciaisExpedia, v: string) =>
    onChange({ ...credenciais, [k]: v })

  const camposPreenchidos =
    credenciais.hotelId.trim() !== '' &&
    credenciais.username.trim() !== '' &&
    credenciais.senha.trim() !== ''

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-bold text-ui-neutral-900">Conectar Expedia</h3>
        <p className="text-sm text-ui-neutral-500 mt-1">
          As credenciais EQC são diferentes do login do Partner Central.
        </p>
      </div>

      <InfoBox type="info">
        No <strong>Expedia Partner Central</strong>, solicite a conexão em{' '}
        <em>Connectivity › Request Connectivity</em>. O username EQC chegará por e-mail e
        sempre começa com "EQC".
      </InfoBox>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ui-neutral-700 uppercase tracking-wide">
            Hotel ID <span className="text-ui-semantic-danger normal-case font-normal">*</span>
          </label>
          <Input
            value={credenciais.hotelId}
            onChange={e => set('hotelId', e.target.value)}
            placeholder="ex: 18492031"
          />
          <p className="text-[11px] text-ui-neutral-400">Número do hotel no Partner Central</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ui-neutral-700 uppercase tracking-wide">
            Username EQC <span className="text-ui-semantic-danger normal-case font-normal">*</span>
          </label>
          <Input
            value={credenciais.username}
            onChange={e => set('username', e.target.value)}
            placeholder="EQC_pousada_..."
          />
          <p className="text-[11px] text-ui-neutral-400">Começa sempre com "EQC"</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ui-neutral-700 uppercase tracking-wide">
            Senha EQC <span className="text-ui-semantic-danger normal-case font-normal">*</span>
          </label>
          <Input
            type="password"
            value={credenciais.senha}
            onChange={e => set('senha', e.target.value)}
            placeholder="••••••••"
          />
          <p className="text-[11px] text-ui-neutral-400">Credencial separada do extranet</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ui-neutral-700 uppercase tracking-wide">
            Modelo de precificação <span className="text-ui-semantic-danger normal-case font-normal">*</span>
          </label>
          <Select
            value={credenciais.modelo}
            onChange={e => set('modelo', e.target.value as ModeloPrecificacao)}
          >
            <option value="OBP">OBP — por ocupação</option>
            <option value="BAR">BAR — tarifa única</option>
          </Select>
          <p className="text-[11px] text-ui-neutral-400">
            Deve coincidir com o configurado no Partner Central
          </p>
        </div>
      </div>

      <WizardFooter
        step={0}
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!camposPreenchidos}
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
          Vincule cada quarto da Expedia ao tipo correspondente no PMS.
        </p>
      </div>

      <InfoBox type="warning">
        ⚠ Mapeie todos os quartos — incluindo variações por ocupação. Reservas em quartos
        não mapeados não chegam ao PMS.
      </InfoBox>

      <div className="flex justify-end">
        <Button variant="outline-neutral" size="sm">↺ Buscar quartos</Button>
      </div>

      <div className="rounded-md border border-ui-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quarto na Expedia</TableHead>
              <TableHead>Plano no PMS</TableHead>
              <TableHead className="w-[130px]">Ajuste %</TableHead>
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
                        <p className="text-[11px] text-ui-neutral-400 mt-0.5">{q.obpInfo}</p>
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
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <p className="text-[11px] text-ui-neutral-400 leading-relaxed">
        <span className="text-ui-semantic-success font-bold">●</span> Mapeado &nbsp;
        <span className="text-ui-semantic-danger font-bold">●</span> Sem vínculo &nbsp;&nbsp;
        A conexão Expedia atualiza automaticamente Hotels.com, Orbitz, Travelocity e
        Expedia Affiliate Network.
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
  credenciais,
  quartos,
  onBack,
  onActivate,
}: {
  credenciais: CredenciaisExpedia
  quartos: Quarto[]
  onBack: () => void
  onActivate: () => void
}) {
  const [loading, setLoading] = useState(false)
  const mapeados  = quartos.filter(q => q.planoPmsId !== '')
  const semVinculo = quartos.filter(q => q.planoPmsId === '')
  const tudo = mapeados.length === quartos.length

  const handle = () => { setLoading(true); setTimeout(onActivate, 1500) }

  const modeloLabel = credenciais.modelo === 'OBP' ? 'OBP — por ocupação' : 'BAR — tarifa única'

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
          <span className="text-sm text-ui-neutral-800">
            Hotel ID <strong>{credenciais.hotelId}</strong> e credenciais EQC validados
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className={`size-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 ${tudo ? 'bg-brand-teal' : 'bg-[#F4BD0E]'}`}>
            {tudo ? '✓' : '⚠'}
          </span>
          <span className="text-sm text-ui-neutral-800">
            {mapeados.length} de {quartos.length} quartos mapeados
          </span>
        </div>

        {semVinculo.map(q => (
          <div key={q.id} className="flex items-center gap-2.5 ml-7">
            <span className="text-[11px] text-[#B7810A]">↳ {q.nome} · {q.obpInfo} sem vínculo</span>
          </div>
        ))}

        <div className="flex items-center gap-2.5">
          <span className="size-5 rounded-full bg-brand-teal flex items-center justify-center text-white text-[11px] font-bold shrink-0">✓</span>
          <span className="text-sm text-ui-neutral-800">
            Modelo <strong>{modeloLabel}</strong> confirmado
          </span>
        </div>
      </div>

      <InfoBox type="warning">
        ⚠ Reservas anteriores à conexão não são importadas automaticamente — cadastre
        manualmente no PMS para evitar overbooking.
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

/* ── Wizard Expedia ──────────────────────────────────────────────── */

export default function WizardExpedia() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [step, setStep] = useState(0)
  const [credenciais, setCredenciais] = useState<CredenciaisExpedia>({
    hotelId: '18492031',
    username: '',
    senha: '',
    modelo: 'OBP',
  })
  const [quartos, setQuartos] = useState<Quarto[]>(QUARTOS_INICIAL)

  const handleActivate = () => {
    addToast('Expedia ativada com sucesso!', 'success')
    navigate('/canais/expedia')
  }

  return (
    <PageShell
      title="Wizard Expedia"
      description="Configure a integração com a Expedia em 3 passos"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Canais', path: '/canais' },
        { label: 'Configuração', path: '/canais/configuracao' },
        { label: 'Expedia' },
      ]}
    >
      <div className="max-w-[720px]">
        <div className="rounded-md border border-ui-neutral-200 bg-white shadow-card p-6">

          {/* Canal banner */}
          <div className="flex items-center gap-3 pb-5 mb-6 border-b border-ui-neutral-100">
            <div className="size-10 rounded-md flex items-center justify-center text-[11px] font-bold text-white bg-[#f6931f] shrink-0">
              EXP
            </div>
            <div>
              <p className="text-sm font-bold text-ui-neutral-900">Expedia / Hotels.com</p>
              <p className="text-xs text-ui-neutral-500">Configuração de canal</p>
            </div>
          </div>

          <Stepper steps={STEPS} current={step} />

          {step === 0 && (
            <Step1
              credenciais={credenciais}
              onChange={setCredenciais}
              onNext={() => setStep(1)}
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
              credenciais={credenciais}
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
