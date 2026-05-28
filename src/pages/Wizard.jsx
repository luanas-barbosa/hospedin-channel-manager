import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, AlertTriangle, MinusCircle, Check, Loader } from 'lucide-react'
import { mapeamentoBooking } from '../data/mock.js'
import { Card, CardHeader, CardBody, CardFooter, InfoBox } from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { Input, Select, Switch, FormField } from '../components/Input.jsx'
import Stepper from '../components/Stepper.jsx'
import { useToast } from '../contexts/ToastContext.jsx'

const STEPS = ['Autenticação', 'Quartos', 'Tarifas', 'Ativar']

// ──────────── Passo 1: Autenticação ────────────
function Step1({ onNext }) {
  const [accountId, setAccountId] = useState('')
  const [tipoTarifa, setTipoTarifa] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | aguardando | conectado
  const [errors, setErrors] = useState({})

  const solicitar = () => {
    const errs = {}
    if (!accountId.trim()) errs.accountId = 'Informe o ID da conta'
    if (!tipoTarifa) errs.tipoTarifa = 'Selecione o tipo de tarifa'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    setTimeout(() => {
      setStatus('aguardando')
      setTimeout(() => setStatus('conectado'), 3000)
    }, 2000)
  }

  return (
    <Card style={{ maxWidth: 560 }}>
      <CardHeader title="Conectar Booking.com" />
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <InfoBox type="info">
            Para conectar, você precisa ter recebido o convite de acesso da conta Booking.com do hoteleiro.
          </InfoBox>

          <FormField
            label="ID da conta Booking.com"
            helper="Você encontra o ID em: Booking Extranet → Serviço de conectividade"
            error={errors.accountId}
          >
            <Input
              value={accountId}
              onChange={e => setAccountId(e.target.value)}
              placeholder="Ex: 4721893"
              error={!!errors.accountId}
            />
          </FormField>

          <FormField label="Tipo de tarifa" error={errors.tipoTarifa}>
            <Select
              value={tipoTarifa}
              onChange={e => setTipoTarifa(e.target.value)}
              options={['Standard', 'OBP (adulto extra)']}
              placeholder="Selecione o tipo..."
              error={!!errors.tipoTarifa}
            />
          </FormField>

          {status === 'idle' && (
            <Button variant="primary" size="lg" onClick={solicitar} fullWidth>
              Solicitar conexão
            </Button>
          )}

          {status === 'loading' && (
            <Button variant="primary" size="lg" loading fullWidth>
              Enviando solicitação...
            </Button>
          )}

          {status === 'aguardando' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                background: '#FEF9E7', border: '1px solid #F4BD0E', borderRadius: 6,
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <Loader size={16} color="#F4BD0E" style={{ animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1B2B4C' }}>Aguardando confirmação do canal...</span>
              </div>
              <Button variant="neutral" size="lg" fullWidth disabled>Próximo passo →</Button>
            </div>
          )}

          {status === 'conectado' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                background: '#E8FDF6', border: '1px solid #1EE0AC', borderRadius: 6,
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <CheckCircle size={16} color="#1EE0AC" />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1B2B4C' }}>Conexão confirmada ✓</span>
              </div>
              <Button variant="primary" size="lg" onClick={onNext} fullWidth>
                Próximo passo →
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

// ──────────── Passo 2: Quartos ────────────
function Step2({ onNext, onBack }) {
  const [quartos, setQuartos] = useState(mapeamentoBooking.quartos)
  const [showError, setShowError] = useState(false)

  const updateQuarto = (id, categoria) => {
    setQuartos(prev => prev.map(q => q.id === id ? { ...q, categoriaSelecionada: categoria } : q))
    if (showError) setShowError(false)
  }

  const handleNext = () => {
    const incompleto = quartos.some(q => !q.categoriaSelecionada)
    if (incompleto) { setShowError(true); return }
    onNext()
  }

  return (
    <Card>
      <CardHeader title="Mapeamento de Quartos" />
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <InfoBox type="info">
            Os quartos abaixo foram importados automaticamente do canal. Associe cada um à categoria correspondente no PMS.
          </InfoBox>
          {showError && (
            <InfoBox type="warning">
              Complete o mapeamento de todos os quartos antes de continuar.
            </InfoBox>
          )}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#32BBAA' }}>
                  <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Categoria Booking.com</th>
                  <th style={{ padding: '10px 16px', color: 'white' }}></th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Categoria PMS Hospedin</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {quartos.map((q, i) => {
                  const pendente = showError && !q.categoriaSelecionada
                  return (
                    <tr key={q.id} style={{ background: pendente ? '#FEF9E7' : (i % 2 === 0 ? '#FFFFFF' : '#F5F6FA'), boxShadow: 'inset 0 -1px 0 #D6DDEE' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700 }}>{q.nomeCanalQuarto}</div>
                        <div style={{ fontSize: 12, color: '#8094AE' }}>Máx. {q.ocupacaoMax} hóspedes</div>
                      </td>
                      <td style={{ padding: '14px 8px', textAlign: 'center', color: '#B7C2D0', fontSize: 18 }}>→</td>
                      <td style={{ padding: '14px 16px', minWidth: 200 }}>
                        <Select
                          value={q.categoriaSelecionada}
                          onChange={e => updateQuarto(q.id, e.target.value)}
                          options={mapeamentoBooking.categoriasPMS}
                          placeholder="Selecione categoria..."
                          error={pendente}
                        />
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        {q.categoriaSelecionada ? <CheckCircle size={16} color="#1EE0AC" /> : <MinusCircle size={16} color="#B7C2D0" />}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="neutral" onClick={onBack}>← Voltar</Button>
        <Button variant="primary" onClick={handleNext}>Próximo →</Button>
      </CardFooter>
    </Card>
  )
}

// ──────────── Passo 3: Tarifas ────────────
function Step3({ onNext, onBack }) {
  const [markup, setMarkup] = useState(0)
  const tarifaBase = 380
  const tarifaComMarkup = Math.round(tarifaBase * (1 + markup / 100))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <CardHeader title="Mapeamento de Tarifas" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Plano de tarifa Booking</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Tipo</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Tarifário PMS</th>
                <th style={{ padding: '10px 16px', textAlign: 'center', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mapeamentoBooking.tarifas.map((t, i) => (
                <React.Fragment key={t.id}>
                  {t.tipo === 'Derivada' && (
                    <tr>
                      <td colSpan={4} style={{ padding: '4px 16px' }}>
                        <div style={{ background: '#FEF9E7', borderLeft: '3px solid #F4BD0E', borderRadius: 4, padding: '8px 12px', margin: '8px 0 4px', fontSize: 13, color: '#1B2B4C' }}>
                          <AlertTriangle size={13} style={{ marginRight: 6, color: '#F4BD0E', verticalAlign: 'middle' }} />
                          Tarifas derivadas podem causar erros. Recomendamos excluir na Booking antes de ativar.
                        </div>
                      </td>
                    </tr>
                  )}
                  <tr style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>{t.nome}</td>
                    <td style={{ padding: '14px 16px' }}>
                      {t.tipo === 'Derivada' ? (
                        <span style={{ background: '#FEF9E7', color: '#F4BD0E', border: '1px solid #F4BD0E', fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>Derivada</span>
                      ) : <span style={{ color: '#526484' }}>{t.tipo}</span>}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <Select value={t.tarifarioPMS} onChange={() => {}} options={mapeamentoBooking.tarifariosPMS} placeholder="Selecione..." disabled={t.tipo === 'Derivada'} />
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {t.status === 'mapeado' ? <CheckCircle size={16} color="#1EE0AC" /> : <AlertTriangle size={16} color="#F4BD0E" />}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader title="Markup do Canal" />
        <CardBody>
          <div style={{ maxWidth: 400 }}>
            <FormField label="Markup aplicado ao canal" helper="Percentual aplicado sobre a tarifa base antes de enviar ao canal">
              <Input type="number" value={markup} onChange={e => setMarkup(Number(e.target.value))} prefix="%" style={{ maxWidth: 160 }} />
            </FormField>
            <div style={{ marginTop: 12, padding: '12px 16px', background: '#F5F6FA', borderRadius: 6, fontSize: 14 }}>
              Tarifa base: <strong>R$ {tarifaBase.toLocaleString('pt-BR')}</strong>
              {' → '}
              Com {markup}% markup: <strong style={{ color: markup > 0 ? '#32BBAA' : '#1F2B3A' }}>R$ {tarifaComMarkup.toLocaleString('pt-BR')}</strong>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button variant="neutral" onClick={onBack}>← Voltar</Button>
          <Button variant="primary" onClick={onNext}>Próximo →</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// ──────────── Passo 4: Ativar ────────────
function Step4({ onActivate, onBack }) {
  const [importarFuturas, setImportarFuturas] = useState(false)
  const [ativando, setAtivando] = useState(false)

  const checklist = [
    { icon: 'ok', label: 'Todos os quartos mapeados', detail: '(4/4)' },
    { icon: 'ok', label: 'Todas as tarifas mapeadas', detail: '(3/3)' },
    { icon: 'warn', label: 'Tarifa derivada presente', detail: '— recomendamos excluir na Booking' },
    { icon: 'ok', label: 'Markup configurado', detail: '(0%)' },
    { icon: 'ok', label: 'ID da conta validado', detail: '' },
  ]

  const ativar = () => {
    setAtivando(true)
    setTimeout(() => onActivate(), 2000)
  }

  return (
    <Card style={{ maxWidth: 560 }}>
      <CardHeader title="Checklist de ativação" />
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {checklist.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #F5F6FA' }}>
              {item.icon === 'ok' && <CheckCircle size={18} color="#1EE0AC" />}
              {item.icon === 'warn' && <AlertTriangle size={18} color="#F4BD0E" />}
              {item.icon === 'pending' && <MinusCircle size={18} color="#B7C2D0" />}
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1F2B3A' }}>{item.label}</span>
              <span style={{ fontSize: 13, color: '#8094AE' }}>{item.detail}</span>
            </div>
          ))}

          {/* Toggle reservas futuras */}
          <div style={{ marginTop: 8, padding: '12px 0', borderTop: '1px solid #EBEEF2' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: importarFuturas ? 12 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MinusCircle size={18} color={importarFuturas ? '#32BBAA' : '#B7C2D0'} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1F2B3A' }}>Reservas futuras conferidas</span>
              </div>
              <Switch checked={importarFuturas} onChange={setImportarFuturas} />
            </div>
            {importarFuturas && (
              <div style={{
                background: '#EBF9F7', borderLeft: '3px solid #32BBAA',
                borderRadius: 4, padding: '10px 12px', fontSize: 13, color: '#1B2B4C',
              }}>
                8 reservas encontradas na Booking. 6 já estão no PMS. <strong>Importar 2 restantes?</strong>
              </div>
            )}
          </div>

          {ativando && (
            <div style={{
              background: '#F5F6FA', borderRadius: 8, padding: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              fontSize: 14, fontWeight: 700, color: '#1B2B4C',
            }}>
              <Loader size={18} color="#32BBAA" style={{ animation: 'spin 0.7s linear infinite' }} />
              Enviando primeira sincronização...
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="neutral" onClick={onBack} disabled={ativando}>← Voltar</Button>
        <Button variant="primary" size="lg" onClick={ativar} loading={ativando} fullWidth>
          Ativar canal
        </Button>
      </CardFooter>
    </Card>
  )
}

// ──────────── Tela de Sucesso ────────────
function Sucesso() {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
      <Card style={{ maxWidth: 480, textAlign: 'center', padding: 48 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E8FDF6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check size={36} color="#1EE0AC" strokeWidth={2.5} />
        </div>
        <h2 style={{ color: '#1F2B3A', marginBottom: 12 }}>Booking.com conectado com sucesso!</h2>
        <p style={{ color: '#8094AE', fontSize: 14, lineHeight: '22px', marginBottom: 32 }}>
          Primeira sincronização concluída — 4 categorias · 3 tarifas · disponibilidade enviada
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate('/canais/booking')} fullWidth>
          Ver painel do canal
        </Button>
      </Card>
    </div>
  )
}

// ──────────── Main Wizard ────────────
export default function Wizard() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  if (done) return <Sucesso />

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1>Conectar Booking.com</h1>
      </div>

      <Stepper steps={STEPS} current={step} />

      {step === 0 && <Step1 onNext={() => setStep(1)} />}
      {step === 1 && <Step2 onNext={() => setStep(2)} onBack={() => setStep(0)} />}
      {step === 2 && <Step3 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
      {step === 3 && <Step4 onActivate={() => setDone(true)} onBack={() => setStep(2)} />}
    </div>
  )
}
