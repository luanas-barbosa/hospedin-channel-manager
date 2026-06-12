import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle, Check } from 'lucide-react'
import { Card, CardHeader, CardBody, CardFooter, InfoBox } from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { Input, FormField } from '../components/Input.jsx'
import Stepper from '../components/Stepper.jsx'
import { useToast } from '../contexts/ToastContext.jsx'

const CANAL_CONFIG = {
  expedia: {
    nome: 'Expedia',
    cor: '#FFC72C',
    textoCor: '#1B2B4C',
    accountId: '115920772',
    desc: 'Aguardando aprovação de Connectivity Partner.',
  },
  'google-hotels': {
    nome: 'Google Hotels',
    cor: '#4285F4',
    textoCor: '#FFFFFF',
    accountId: '',
    desc: 'Integração via Google My Business e Hotel Center.',
  },
  decolar: {
    nome: 'Decolar',
    cor: '#FF6B00',
    textoCor: '#FFFFFF',
    accountId: '',
    desc: 'Maior OTA da América Latina.',
  },
  'hoteis-com': {
    nome: 'Hoteis.com',
    cor: '#D32F2F',
    textoCor: '#FFFFFF',
    accountId: '',
    desc: 'Parte do ecossistema Expedia.',
  },
}

const STEPS = ['Autenticação', 'Ativar']

function Step1({ config, onNext }) {
  const [accountId, setAccountId] = useState(config.accountId || '')
  const [status, setStatus] = useState('idle')

  const solicitar = () => {
    if (!accountId.trim() || status !== 'idle') return
    setStatus('loading')
    setTimeout(() => setStatus('conectado'), 2000)
  }

  return (
    <Card style={{ maxWidth: 560 }}>
      <CardHeader title={`Conectar ${config.nome}`} />
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <InfoBox type="info">{config.desc}</InfoBox>

          <FormField label={`ID da conta ${config.nome}`} helper="Identificador único da sua conta na plataforma">
            <Input
              value={accountId}
              onChange={e => setAccountId(e.target.value)}
              placeholder="Ex: 115920772"
              disabled={status !== 'idle'}
            />
          </FormField>

          {status !== 'conectado' && (
            <Button
              variant="primary"
              size="lg"
              onClick={solicitar}
              loading={status === 'loading'}
              disabled={!accountId.trim()}
              fullWidth
            >
              {status === 'loading' ? 'Solicitando conexão...' : 'Solicitar conexão'}
            </Button>
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

function Step2({ config, onActivate, onBack }) {
  const [ativando, setAtivando] = useState(false)

  const checklist = [
    { label: 'Conta conectada', detail: '' },
    { label: 'ID da conta validado', detail: '' },
    { label: 'Disponibilidade pronta para envio', detail: '' },
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
              <CheckCircle size={18} color="#1EE0AC" />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1F2B3A' }}>{item.label}</span>
              <span style={{ fontSize: 13, color: '#8094AE' }}>{item.detail}</span>
            </div>
          ))}

          {ativando && (
            <div style={{
              background: '#F5F6FA', borderRadius: 8, padding: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              fontSize: 14, fontWeight: 700, color: '#1B2B4C', marginTop: 8,
            }}>
              <Loader size={18} color="#32BBAA" style={{ animation: 'spin 0.7s linear infinite' }} />
              Ativando canal...
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

function Sucesso({ config }) {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
      <Card style={{ maxWidth: 480, textAlign: 'center', padding: 48 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E8FDF6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check size={36} color="#1EE0AC" strokeWidth={2.5} />
        </div>
        <h2 style={{ color: '#1F2B3A', marginBottom: 12 }}>{config.nome} conectado com sucesso!</h2>
        <p style={{ color: '#8094AE', fontSize: 14, lineHeight: '22px', marginBottom: 32 }}>
          Canal ativado — disponibilidade e tarifas serão sincronizadas em breve.
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate('/canais')} fullWidth>
          Voltar para canais
        </Button>
      </Card>
    </div>
  )
}

export default function WizardGenerico() {
  const { canal } = useParams()
  const config = CANAL_CONFIG[canal] || { nome: canal, cor: '#32BBAA', textoCor: '#FFFFFF', accountId: '', desc: '' }
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  if (done) return <Sucesso config={config} />

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1>Conectar {config.nome}</h1>
      </div>

      <Stepper steps={STEPS} current={step} />

      {step === 0 && <Step1 config={config} onNext={() => setStep(1)} />}
      {step === 1 && <Step2 config={config} onActivate={() => setDone(true)} onBack={() => setStep(0)} />}
    </div>
  )
}
