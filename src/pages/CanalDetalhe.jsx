import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { RefreshCw, RotateCcw, AlertTriangle, CheckCircle, AlertCircle, MinusCircle, Loader } from 'lucide-react'
import { mapeamentoBooking, syncEventos, reservas as todasReservas, logs as todosLogs } from '../data/mock.js'
import { StatusBadge, CanalBadge } from '../components/Badge.jsx'
import { Card, CardHeader, CardBody, CardFooter, MetricCard, InfoBox } from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { Input, Select, Switch, FormField } from '../components/Input.jsx'
import Modal from '../components/Modal.jsx'
import { useToast } from '../contexts/ToastContext.jsx'

// ──────────── Tab bar ────────────
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
            padding: '12px 20px',
            background: 'none',
            border: 'none',
            borderBottom: active === t.id ? '2px solid #32BBAA' : '2px solid transparent',
            cursor: 'pointer',
            marginBottom: -2,
            fontSize: 14,
            fontWeight: active === t.id ? 700 : 400,
            color: active === t.id ? '#32BBAA' : '#526484',
            fontFamily: 'Open Sans, sans-serif',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

// ──────────── Visão Geral ────────────
function VisaoGeral() {
  const { addToast } = useToast()
  const [reenviando, setReenviando] = useState(null)
  const bookingReservas = todasReservas.filter(r => r.canal === 'booking').slice(0, 5)

  const reenviar = (id) => {
    setReenviando(id)
    addToast('Reenviando evento...', 'info')
    setTimeout(() => {
      setReenviando(null)
      addToast('Evento reenviado com sucesso ✓', 'success')
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <MetricCard label="Reservas hoje" value="4" sub="↑ 1 desde ontem" />
        <MetricCard label="Receita hoje" value="R$ 2.840" sub="Valor líquido após comissões" />
        <MetricCard label="Taxa de sync" value="99,8%" sub="Últimas 24h" color="#1EE0AC" />
      </div>

      {/* Sync events */}
      <Card>
        <CardHeader title="Status de sincronização">
          <Button variant="outline" size="sm" onClick={() => addToast('Sincronizando...', 'info')}>
            <RefreshCw size={13} />
            Sincronizar agora
          </Button>
        </CardHeader>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                {['Timestamp', 'Tipo', 'Categoria', 'Status', 'Ação'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {syncEventos.map((ev, i) => (
                <tr key={ev.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#526484', whiteSpace: 'nowrap' }}>{ev.timestamp}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>{ev.tipo}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>{ev.categoria}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <StatusBadge status={ev.status} />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {ev.status === 'falha' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        loading={reenviando === ev.id}
                        onClick={() => reenviar(ev.id)}
                      >
                        <RotateCcw size={13} />
                        Reenviar
                      </Button>
                    )}
                    <span style={{ fontSize: 13, color: '#8094AE' }}>{ev.detalhes}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent reservations */}
      <Card>
        <CardHeader title="Reservas recentes" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                {['Canal', 'Hóspede', 'UH', 'Datas', 'Valor líquido', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookingReservas.map((r, i) => (
                <tr key={r.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#EBF9F7'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#FFFFFF' : '#F5F6FA'}
                >
                  <td style={{ padding: '12px 16px' }}><CanalBadge canal={r.canal} /></td>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700 }}>{r.hospede}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>{r.uh}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#526484', whiteSpace: 'nowrap' }}>{r.checkin} → {r.checkout}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700, color: '#32BBAA' }}>R$ {r.valorLiquido.toLocaleString('pt-BR')}</td>
                  <td style={{ padding: '12px 16px' }}><StatusBadge status={r.sync} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// ──────────── Mapeamento ────────────
function Mapeamento() {
  const { addToast } = useToast()
  const [quartos, setQuartos] = useState(mapeamentoBooking.quartos)
  const [tarifas, setTarifas] = useState(mapeamentoBooking.tarifas)
  const [markup, setMarkup] = useState(0)

  const tarifaBase = 380
  const tarifaComMarkup = Math.round(tarifaBase * (1 + markup / 100))

  const updateQuarto = (id, categoria) => {
    setQuartos(prev => prev.map(q =>
      q.id === id ? { ...q, categoriaSelecionada: categoria, status: categoria ? (q.status === 'pendente' ? 'mapeado' : q.status) : 'pendente' } : q
    ))
  }

  const statusIcon = (status) => {
    if (status === 'mapeado') return <CheckCircle size={16} color="#1EE0AC" />
    if (status === 'conflito') return <AlertTriangle size={16} color="#F4BD0E" />
    return <MinusCircle size={16} color="#B7C2D0" />
  }

  const salvar = () => {
    addToast('Mapeamento salvo com sucesso ✓', 'success')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Quartos */}
      <Card>
        <CardHeader title="Mapeamento de Quartos">
          <Button variant="outline" size="sm">
            <RefreshCw size={13} />
            Buscar quartos do canal
          </Button>
        </CardHeader>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Categoria Booking.com</th>
                <th style={{ padding: '10px 16px', color: 'white', fontSize: 12, fontWeight: 700, width: 40 }}></th>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Categoria PMS Hospedin</th>
                <th style={{ padding: '10px 16px', textAlign: 'center', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {quartos.map((q, i) => (
                <tr key={q.id} style={{
                  background: q.status === 'conflito' ? '#FEF9E7' : (i % 2 === 0 ? '#FFFFFF' : '#F5F6FA'),
                  boxShadow: 'inset 0 -1px 0 #D6DDEE',
                }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{q.nomeCanalQuarto}</div>
                    <div style={{ fontSize: 12, color: '#8094AE' }}>Máx. {q.ocupacaoMax} hóspedes</div>
                  </td>
                  <td style={{ padding: '14px 8px', textAlign: 'center', color: '#B7C2D0', fontSize: 18, fontWeight: 300 }}>→</td>
                  <td style={{ padding: '14px 16px', minWidth: 200 }}>
                    <Select
                      value={q.categoriaSelecionada}
                      onChange={e => updateQuarto(q.id, e.target.value)}
                      options={mapeamentoBooking.categoriasPMS}
                      placeholder="Selecione categoria..."
                      error={q.status === 'conflito'}
                    />
                    {q.conflito && (
                      <div style={{ fontSize: 12, color: '#F4BD0E', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <AlertTriangle size={12} /> {q.conflito}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    {statusIcon(q.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tarifas */}
      <Card>
        <CardHeader title="Mapeamento de Tarifas" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Plano de tarifa Booking</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Tipo</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Derivada do Tarifário PMS</th>
                <th style={{ padding: '10px 16px', textAlign: 'center', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.map((t, i) => (
                <React.Fragment key={t.id}>
                  {t.tipo === 'Derivada' && (
                    <tr>
                      <td colSpan={4} style={{ padding: '0 16px' }}>
                        <div style={{
                          background: '#FEF9E7', borderLeft: '3px solid #F4BD0E',
                          borderRadius: 4, padding: '8px 12px', margin: '8px 0 4px',
                          fontSize: 13, color: '#1B2B4C', display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                          <AlertTriangle size={14} color="#F4BD0E" />
                          <span>Tarifas derivadas podem causar erros. Recomendamos excluir na Booking antes de ativar.</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  <tr style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: 14 }}>{t.nome}</td>
                    <td style={{ padding: '14px 16px' }}>
                      {t.tipo === 'Derivada' ? (
                        <span style={{ background: '#FEF9E7', color: '#F4BD0E', border: '1px solid #F4BD0E', fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                          Derivada
                        </span>
                      ) : (
                        <span style={{ fontSize: 14, color: '#526484' }}>{t.tipo}</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', minWidth: 200 }}>
                      <Select
                        value={t.tarifarioPMS}
                        onChange={() => {}}
                        options={mapeamentoBooking.tarifariosPMS}
                        placeholder="Selecione tarifário..."
                        disabled={t.tipo === 'Derivada'}
                      />
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

      {/* Markup */}
      <Card>
        <CardHeader title="Markup do Canal" />
        <CardBody>
          <div style={{ maxWidth: 400 }}>
            <FormField
              label="Markup aplicado ao canal"
              helper="Percentual aplicado sobre a tarifa base antes de enviar ao canal"
            >
              <Input
                type="number"
                value={markup}
                onChange={e => setMarkup(Number(e.target.value))}
                prefix="%"
                style={{ maxWidth: 160 }}
              />
            </FormField>
            <div style={{
              marginTop: 12, padding: '12px 16px',
              background: '#F5F6FA', borderRadius: 6,
              fontSize: 14, color: '#1F2B3A',
            }}>
              Tarifa base: <strong>R$ {tarifaBase.toLocaleString('pt-BR')}</strong>
              {' → '}
              Com {markup}% markup: <strong style={{ color: markup > 0 ? '#32BBAA' : '#1F2B3A' }}>R$ {tarifaComMarkup.toLocaleString('pt-BR')}</strong>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button variant="neutral" onClick={() => setMarkup(0)}>Cancelar</Button>
          <Button variant="primary" onClick={salvar}>Salvar mapeamento</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// ──────────── Logs ────────────
function Logs() {
  const { addToast } = useToast()
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [reenviando, setReenviando] = useState(null)

  const logsBooking = todosLogs.filter(l => l.canal === 'booking')

  const filtered = logsBooking.filter(l => {
    if (filtroTipo && l.tipo !== filtroTipo) return false
    if (filtroStatus && l.status !== filtroStatus) return false
    return true
  })

  const reenviar = (id) => {
    setReenviando(id)
    addToast('Reenviando evento...', 'info')
    setTimeout(() => {
      setReenviando(null)
      addToast('Evento reenviado com sucesso ✓', 'success')
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Filters */}
      <Card>
        <CardBody style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 160px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Canal</div>
              <Select value="booking" onChange={() => {}} options={[{ value: 'booking', label: 'Booking.com' }]} disabled />
            </div>
            <div style={{ flex: '0 0 180px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Tipo</div>
              <Select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)} options={['Disponibilidade', 'Tarifa', 'Reserva']} placeholder="Todos" />
            </div>
            <div style={{ flex: '0 0 160px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Status</div>
              <Select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)} options={['sucesso', 'falha', 'pendente']} placeholder="Todos" />
            </div>
            <div style={{ flex: '0 0 150px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>De</div>
              <Input type="date" defaultValue="2026-05-28" />
            </div>
            <div style={{ flex: '0 0 150px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Até</div>
              <Input type="date" defaultValue="2026-05-28" />
            </div>
            <Button variant="outline" onClick={() => { setFiltroTipo(''); setFiltroStatus('') }}>Limpar</Button>
            <Button variant="primary">Filtrar</Button>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                {['Timestamp', 'Tipo', 'Categoria', 'Status', 'Detalhes', 'Ação'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={log.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#EBF9F7'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#FFFFFF' : '#F5F6FA'}
                >
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#526484', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>{log.tipo}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>{log.categoria}</td>
                  <td style={{ padding: '12px 16px' }}><StatusBadge status={log.status} /></td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#526484' }}>{log.detalhes}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {log.status === 'falha' && (
                      <Button variant="ghost" size="sm" loading={reenviando === log.id} onClick={() => reenviar(log.id)}>
                        <RotateCcw size={12} /> Reenviar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#8094AE' }}>Nenhum log encontrado para os filtros selecionados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #EBEEF2', fontSize: 13, color: '#8094AE' }}>
          {filtered.length} evento(s) encontrado(s)
        </div>
      </Card>
    </div>
  )
}

// ──────────── Configurações ────────────
function Configuracoes() {
  const { addToast } = useToast()
  const [canalAtivo, setCanalAtivo] = useState(true)
  const [importarReservas, setImportarReservas] = useState(true)
  const [rollback, setRollback] = useState(false)
  const [showDesconectar, setShowDesconectar] = useState(false)
  const navigate = useNavigate()

  const desconectar = () => {
    setShowDesconectar(false)
    addToast('Canal desconectado com sucesso.', 'warning')
    setTimeout(() => navigate('/canais'), 1500)
  }

  return (
    <>
      <Card style={{ maxWidth: 600 }}>
        <CardHeader title="Configurações do Canal" />
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #EBEEF2' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Canal ativo</div>
                <div style={{ fontSize: 12, color: '#8094AE', marginTop: 2 }}>Quando desligado, o canal para de enviar e receber dados.</div>
              </div>
              <Switch checked={canalAtivo} onChange={setCanalAtivo} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #EBEEF2' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Importar reservas ao conectar</div>
                <div style={{ fontSize: 12, color: '#8094AE', marginTop: 2 }}>Importa reservas existentes no canal ao reativar.</div>
              </div>
              <Switch checked={importarReservas} onChange={setImportarReservas} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16, borderBottom: '1px solid #EBEEF2' }}>
              <div style={{ flex: 1, marginRight: 24 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Rollback automático em cancelamentos</div>
                <div style={{ fontSize: 12, color: '#8094AE', marginTop: 2 }}>
                  {rollback
                    ? 'A disponibilidade abre automaticamente ao cancelar.'
                    : 'Quando desligado, a disponibilidade só abre quando a reserva sai do mapa no PMS.'}
                </div>
              </div>
              <Switch checked={rollback} onChange={setRollback} />
            </div>
            <FormField label="ID da conta Booking.com" helper="Identificador único da sua conta na plataforma">
              <Input value="4721893" readOnly />
            </FormField>
          </div>
        </CardBody>
        <CardFooter style={{ justifyContent: 'space-between' }}>
          <Button variant="destructive-outline" onClick={() => setShowDesconectar(true)}>
            Desconectar canal
          </Button>
          <Button variant="primary" onClick={() => addToast('Configurações salvas ✓', 'success')}>
            Salvar configurações
          </Button>
        </CardFooter>
      </Card>

      <Modal
        isOpen={showDesconectar}
        onClose={() => setShowDesconectar(false)}
        title="Desconectar canal"
        footer={
          <>
            <Button variant="neutral" onClick={() => setShowDesconectar(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={desconectar}>Desconectar</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#FDEEEC', borderLeft: '3px solid #E85347', borderRadius: 4, padding: '12px 16px', fontSize: 14 }}>
            <strong>Atenção:</strong> Esta ação irá interromper todas as sincronizações com a Booking.com.
          </div>
          <p style={{ margin: 0, fontSize: 14, color: '#1F2B3A', lineHeight: '22px' }}>
            Ao desconectar o canal <strong>Booking.com</strong>, as tarifas e disponibilidade não serão mais atualizadas automaticamente. Novas reservas não serão importadas.
          </p>
          <p style={{ margin: 0, fontSize: 14, color: '#8094AE' }}>
            Você poderá reconectar o canal a qualquer momento. Deseja continuar?
          </p>
        </div>
      </Modal>
    </>
  )
}

// ──────────── Main ────────────
export default function CanalDetalhe() {
  const location = useLocation()
  const hash = location.hash.replace('#', '') || 'visao-geral'
  const [activeTab, setActiveTab] = useState(TABS.find(t => t.id === hash)?.id || 'visao-geral')
  const navigate = useNavigate()

  const handleTabChange = (id) => {
    setActiveTab(id)
    navigate(`${location.pathname}#${id}`, { replace: true })
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13, fontFamily: 'Montserrat, sans-serif' }}>
            B.
          </div>
          <div>
            <h1 style={{ marginBottom: 2 }}>Booking.com</h1>
            <StatusBadge status="conectado" />
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate('/canais/booking/conectar')}>
          Reconectar
        </Button>
      </div>

      <TabBar active={activeTab} onChange={handleTabChange} />

      {activeTab === 'visao-geral' && <VisaoGeral />}
      {activeTab === 'mapeamento' && <Mapeamento />}
      {activeTab === 'logs' && <Logs />}
      {activeTab === 'configuracoes' && <Configuracoes />}
    </div>
  )
}
