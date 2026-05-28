import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { RefreshCw, RotateCcw, CheckCircle, MinusCircle, Loader } from 'lucide-react'
import { mapeamentoAirbnb, syncEventos, reservas as todasReservas } from '../data/mock.js'
import { StatusBadge, CanalBadge } from '../components/Badge.jsx'
import { Card, CardHeader, CardBody, CardFooter, MetricCard } from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { Input, Select, Switch, FormField } from '../components/Input.jsx'
import Modal from '../components/Modal.jsx'
import { useToast } from '../contexts/ToastContext.jsx'

const TABS = [
  { id: 'visao-geral', label: 'Visão geral' },
  { id: 'mapeamento', label: 'Mapeamento' },
  { id: 'logs', label: 'Logs' },
  { id: 'configuracoes', label: 'Configurações' },
]

function TabBar({ active, onChange }) {
  return (
    <div style={{ display: 'flex', borderBottom: '2px solid #EBEEF2', marginBottom: 24, gap: 0 }}>
      {TABS.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: '12px 20px', background: 'none', border: 'none',
            borderBottom: active === t.id ? '2px solid #32BBAA' : '2px solid transparent',
            cursor: 'pointer', marginBottom: -2, fontSize: 14,
            fontWeight: active === t.id ? 700 : 400,
            color: active === t.id ? '#32BBAA' : '#526484',
            fontFamily: 'Open Sans, sans-serif', transition: 'all 0.15s', whiteSpace: 'nowrap',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

function VisaoGeralAirbnb() {
  const airbnbReservas = todasReservas.filter(r => r.canal === 'airbnb').slice(0, 4)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <MetricCard label="Reservas hoje" value="2" sub="Anúncios ativos: 3/4" />
        <MetricCard label="Receita hoje" value="R$ 1.890" sub="Valor líquido após taxa Airbnb" />
        <MetricCard label="Taxa de sync" value="98,1%" color="#F4BD0E" sub="2 falhas nas últimas 4h" />
      </div>

      <Card>
        <CardHeader title="Alertas">
          <span />
        </CardHeader>
        <div style={{ padding: '12px 24px' }}>
          <div style={{ background: '#FEF9E7', borderLeft: '3px solid #F4BD0E', borderRadius: 4, padding: '12px 16px', fontSize: 14, display: 'flex', gap: 8 }}>
            <span style={{ color: '#F4BD0E', fontWeight: 700 }}>⚠</span>
            <span>2 falhas de sync nas últimas 4h. Verifique a aba de <strong>Logs</strong> para detalhes.</span>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Anúncios sincronizados" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                {['Anúncio Airbnb', 'Categoria PMS', 'Status', 'Ações'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mapeamentoAirbnb.anuncios.map((a, i) => (
                <tr key={a.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700 }}>{a.nomeAnuncio}</td>
                  <td style={{ padding: '12px 16px', color: a.categoriaPMS ? '#1F2B3A' : '#B7C2D0' }}>{a.categoriaPMS || '—'}</td>
                  <td style={{ padding: '12px 16px' }}><StatusBadge status={a.sincronizado ? 'sincronizado' : 'pendente'} label={a.sincronizado ? 'Sincronizado' : 'Não mapeado'} /></td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ color: a.sincronizado ? '#32BBAA' : '#B7C2D0', cursor: a.sincronizado ? 'pointer' : 'default' }}>
                      <RefreshCw size={15} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

function MapeamentoAirbnb() {
  const { addToast } = useToast()
  const [anuncios, setAnuncios] = useState(mapeamentoAirbnb.anuncios)
  const [hospedeExtra, setHospedeExtra] = useState(mapeamentoAirbnb.hospedeExtra)
  const [syncando, setSyncando] = useState(null)

  const updateAnuncio = (id, categoriaPMS) => {
    setAnuncios(prev => prev.map(a => a.id === id ? { ...a, categoriaPMS, status: categoriaPMS ? 'mapeado' : 'pendente' } : a))
  }

  const syncAnuncio = (id) => {
    const anuncio = anuncios.find(a => a.id === id)
    if (!anuncio?.categoriaPMS) return
    setSyncando(id)
    setTimeout(() => {
      setSyncando(null)
      setAnuncios(prev => prev.map(a => a.id === id ? { ...a, sincronizado: true } : a))
      addToast(`Anúncio "${anuncio.nomeAnuncio}" sincronizado ✓`, 'success')
    }, 1500)
  }

  const updateHospedeExtra = (id, valor) => {
    setHospedeExtra(prev => prev.map(h => h.id === id ? { ...h, valorPorHospede: Number(valor) } : h))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <CardHeader title="Mapeamento de Anúncios">
          <Button variant="outline" size="sm">
            <RefreshCw size={13} />
            Buscar anúncios do canal
          </Button>
        </CardHeader>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                {['Anúncio Airbnb', '→', 'Categoria PMS', 'Status', 'Sync'].map((h, i) => (
                  <th key={i} style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {anuncios.map((a, i) => (
                <tr key={a.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{a.nomeAnuncio}</td>
                  <td style={{ padding: '14px 8px', color: '#B7C2D0', fontSize: 18 }}>→</td>
                  <td style={{ padding: '14px 16px', minWidth: 200 }}>
                    <Select
                      value={a.categoriaPMS}
                      onChange={e => updateAnuncio(a.id, e.target.value)}
                      options={mapeamentoAirbnb.categoriasPMS}
                      placeholder="Selecione categoria..."
                    />
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {a.status === 'mapeado' ? <CheckCircle size={16} color="#1EE0AC" /> : <MinusCircle size={16} color="#B7C2D0" />}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      onClick={() => syncAnuncio(a.id)}
                      disabled={!a.categoriaPMS || syncando === a.id}
                      style={{
                        background: 'none', border: 'none', cursor: a.categoriaPMS ? 'pointer' : 'not-allowed',
                        color: a.categoriaPMS ? '#32BBAA' : '#B7C2D0', padding: 4, display: 'flex', alignItems: 'center',
                      }}
                      title={a.categoriaPMS ? 'Sincronizar anúncio' : 'Mapeie primeiro'}
                    >
                      {syncando === a.id
                        ? <Loader size={15} style={{ animation: 'spin 0.7s linear infinite' }} />
                        : <RefreshCw size={15} />
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CardFooter>
          <Button variant="neutral">Cancelar</Button>
          <Button variant="primary" onClick={() => addToast('Mapeamento salvo ✓', 'success')}>Salvar mapeamento</Button>
        </CardFooter>
      </Card>

      {/* Hóspede extra */}
      <Card>
        <CardHeader title="Hóspede Extra" />
        <CardBody>
          <p style={{ margin: '0 0 16px', color: '#8094AE', fontSize: 14 }}>
            Valor fixo cobrado para cada hóspede além da ocupação mínima. Aplica-se a todas as datas.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {hospedeExtra.map(h => (
              <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid #EBEEF2' }}>
                <div style={{ width: 160, fontWeight: 700, fontSize: 14 }}>{h.categoria}</div>
                <div style={{ fontSize: 13, color: '#8094AE' }}>Ocup. mínima: {h.ocupacaoMinima}</div>
                <div style={{ flex: 1 }}>
                  <Input
                    type="number"
                    value={h.valorPorHospede}
                    onChange={e => updateHospedeExtra(h.id, e.target.value)}
                    prefix="R$"
                    style={{ maxWidth: 140 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter>
          <Button variant="primary" onClick={() => addToast('Valores de hóspede extra salvos ✓', 'success')}>Salvar valores</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function ConfiguracoesAirbnb() {
  const { addToast } = useToast()
  const [canalAtivo, setCanalAtivo] = useState(true)
  const [syncPrecos, setSyncPrecos] = useState(true)
  const [showDesconectar, setShowDesconectar] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <Card style={{ maxWidth: 600 }}>
        <CardHeader title="Configurações do Canal" />
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #EBEEF2' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Canal ativo</div>
                <div style={{ fontSize: 12, color: '#8094AE', marginTop: 2 }}>Sincronização e importação de reservas.</div>
              </div>
              <Switch checked={canalAtivo} onChange={setCanalAtivo} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #EBEEF2' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Sincronizar preços automaticamente</div>
                <div style={{ fontSize: 12, color: '#8094AE', marginTop: 2 }}>Atualiza tarifas no Airbnb ao alterar no PMS.</div>
              </div>
              <Switch checked={syncPrecos} onChange={setSyncPrecos} />
            </div>
            <FormField label="ID da conta Airbnb" helper="Identificador da sua conta na plataforma Airbnb">
              <Input value="AB-992847" readOnly />
            </FormField>
          </div>
        </CardBody>
        <CardFooter style={{ justifyContent: 'space-between' }}>
          <Button variant="destructive-outline" onClick={() => setShowDesconectar(true)}>Desconectar canal</Button>
          <Button variant="primary" onClick={() => addToast('Configurações salvas ✓', 'success')}>Salvar</Button>
        </CardFooter>
      </Card>

      <Modal
        isOpen={showDesconectar}
        onClose={() => setShowDesconectar(false)}
        title="Desconectar Airbnb"
        footer={
          <>
            <Button variant="neutral" onClick={() => setShowDesconectar(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => { setShowDesconectar(false); addToast('Canal Airbnb desconectado.', 'warning'); setTimeout(() => navigate('/canais'), 1500) }}>Desconectar</Button>
          </>
        }
      >
        <p style={{ margin: 0, fontSize: 14, lineHeight: '22px' }}>
          Ao desconectar o canal <strong>Airbnb</strong>, as tarifas e disponibilidade não serão mais atualizadas. Confirma?
        </p>
      </Modal>
    </>
  )
}

export default function CanalDetalheAirbnb() {
  const location = useLocation()
  const navigate = useNavigate()
  const hash = location.hash.replace('#', '') || 'visao-geral'
  const [activeTab, setActiveTab] = useState(TABS.find(t => t.id === hash)?.id || 'visao-geral')

  const handleTabChange = (id) => {
    setActiveTab(id)
    navigate(`${location.pathname}#${id}`, { replace: true })
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: '#FF5A5F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>
            Air
          </div>
          <div>
            <h1 style={{ marginBottom: 2 }}>Airbnb</h1>
            <StatusBadge status="conectado" />
          </div>
        </div>
      </div>

      <TabBar active={activeTab} onChange={handleTabChange} />

      {activeTab === 'visao-geral' && <VisaoGeralAirbnb />}
      {activeTab === 'mapeamento' && <MapeamentoAirbnb />}
      {activeTab === 'logs' && (
        <Card>
          <div style={{ padding: 40, textAlign: 'center', color: '#8094AE' }}>
            Logs do Airbnb em carregamento...
          </div>
        </Card>
      )}
      {activeTab === 'configuracoes' && <ConfiguracoesAirbnb />}
    </div>
  )
}
