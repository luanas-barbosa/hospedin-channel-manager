import React, { useState } from 'react'
import { AlertTriangle, Plug } from 'lucide-react'
import { reservas } from '../data/mock.js'
import { CanalBadgeColored, SyncBadge } from '../components/Badge.jsx'
import { Card, CardBody, MetricCard } from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { Input, Select } from '../components/Input.jsx'
import { SlideOver } from '../components/Modal.jsx'
import { useToast } from '../contexts/ToastContext.jsx'
import { usePerfil } from '../contexts/PerfilContext.jsx'

function ReservaTimeline({ reserva }) {
  const timelines = {
    'BK-48291': [
      { evento: 'Reserva recebida do canal', timestamp: '28/05/2026 14:27:50', ok: true },
      { evento: 'Sincronizada no PMS', timestamp: '28/05/2026 14:27:52', ok: true },
      { evento: 'Confirmação enviada ao canal', timestamp: '28/05/2026 14:27:55', ok: true },
    ],
    'BK-48301': [
      { evento: 'Reserva recebida do canal', timestamp: '28/05/2026 15:10:20', ok: true },
      { evento: 'Sincronização no PMS pendente', timestamp: '28/05/2026 15:10:22', ok: false },
    ],
  }
  const events = timelines[reserva.codigo] || [
    { evento: 'Reserva recebida do canal', timestamp: '28/05/2026 10:00:00', ok: true },
    { evento: 'Sincronizada no PMS', timestamp: '28/05/2026 10:00:02', ok: true },
  ]
  return (
    <div>
      {events.map((ev, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: ev.ok ? '#E8FDF6' : '#FEF9E7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${ev.ok ? '#1EE0AC' : '#F4BD0E'}`, zIndex: 1 }}>
              <span style={{ fontSize: 11, color: ev.ok ? '#1EE0AC' : '#F4BD0E', fontWeight: 700 }}>{ev.ok ? '✓' : '!'}</span>
            </div>
            {i < events.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: '#EBEEF2' }} />}
          </div>
          <div style={{ paddingBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#1F2B3A' }}>{ev.evento}</div>
            <div style={{ fontSize: 12, color: '#8094AE' }}>{ev.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyStateHoteleiro() {
  return (
    <tr>
      <td colSpan={10} style={{ padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B7C2D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#526484' }}>Nenhum canal conectado ainda</div>
          <div style={{ fontSize: 13, color: '#8094AE' }}>Fale com seu implantador para conectar seus canais de venda.</div>
        </div>
      </td>
    </tr>
  )
}

export default function Reservas() {
  const { addToast } = useToast()
  const { perfil } = usePerfil()
  const isHoteleiro = perfil === 'hoteleiro'

  const [filtroCanal, setFiltroCanal] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [aplicados, setAplicados] = useState({ canal: '', status: '' })
  const [selectedReserva, setSelectedReserva] = useState(null)
  const [forcandoSync, setForcandoSync] = useState(null)
  const [syncOverrides, setSyncOverrides] = useState({})

  const filtered = reservas.filter(r => {
    if (aplicados.canal && r.canal !== aplicados.canal) return false
    if (aplicados.status && r.sync !== aplicados.status) return false
    return true
  })

  const forcarSync = (id) => {
    setForcandoSync(id)
    setTimeout(() => {
      setForcandoSync(null)
      setSyncOverrides(prev => ({ ...prev, [id]: 'pendente' }))
    }, 1500)
  }

  // KPIs
  const totalReservas = reservas.length
  const receitaBruta = reservas.reduce((s, r) => s + r.valorBruto, 0)
  const comissoesPagas = reservas.reduce((s, r) => s + r.comissaoValor, 0)
  const mediaComissao = Math.round(comissoesPagas / receitaBruta * 100)
  const receitaLiquida = reservas.reduce((s, r) => s + r.valorLiquido, 0)

  // Breakdown
  const bookingBruto = reservas.filter(r => r.canal === 'booking').reduce((s, r) => s + r.valorBruto, 0)
  const airbnbBruto = reservas.filter(r => r.canal === 'airbnb').reduce((s, r) => s + r.valorBruto, 0)
  const bookingPct = Math.round(bookingBruto / receitaBruta * 100)
  const airbnbPct = 100 - bookingPct

  const cols = ['Canal', 'Reserva', 'Hóspede', 'UH', 'Tarifa', 'Check-in', 'Check-out', 'Comissão', 'Valor líquido', 'Sync PMS', 'Ações']

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1F2B3A', marginBottom: 2 }}>
          Reservas por canal
        </h1>
        <p style={{ color: '#8094AE', margin: 0, fontSize: 13 }}>
          Reservas recebidas dos seus canais conectados
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Total de reservas" value={String(totalReservas)} sub="No período" />
        <MetricCard label="Receita bruta" value={`R$ ${receitaBruta.toLocaleString('pt-BR')}`} sub="Valor total dos canais" />
        <MetricCard
          label="Comissões pagas"
          value={`R$ ${comissoesPagas.toLocaleString('pt-BR')}`}
          sub={`Média ${mediaComissao}%`}
          color="#E85347"
        />
        <MetricCard label="Receita líquida" value={`R$ ${receitaLiquida.toLocaleString('pt-BR')}`} sub="Após comissões" color="#1EE0AC" />
      </div>

      {/* Breakdown */}
      <Card style={{ marginBottom: 20, padding: '16px 20px', border: '1px solid #EBEEF2' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8094AE', marginBottom: 10 }}>
          Distribuição por canal
        </div>
        <div style={{ display: 'flex', height: 20, borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ width: `${bookingPct}%`, background: '#1B366C' }} />
          <div style={{ width: `${airbnbPct}%`, background: '#E05A5A' }} />
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { label: 'Booking.com', pct: bookingPct, color: '#1B366C' },
            { label: 'Airbnb', pct: airbnbPct, color: '#E05A5A' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#526484' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: 'inline-block' }} />
              <strong style={{ color: '#1F2B3A' }}>{l.label}</strong> {l.pct}%
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card style={{ marginBottom: 18, border: '1px solid #EBEEF2' }}>
        <CardBody style={{ paddingTop: 14, paddingBottom: 14 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 150px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4, color: '#526484', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Canal</div>
              <Select
                value={filtroCanal}
                onChange={e => setFiltroCanal(e.target.value)}
                options={[{ value: 'booking', label: 'Booking.com' }, { value: 'airbnb', label: 'Airbnb' }]}
                placeholder="Todos"
              />
            </div>
            <div style={{ flex: '0 0 150px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4, color: '#526484', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Sync</div>
              <Select
                value={filtroStatus}
                onChange={e => setFiltroStatus(e.target.value)}
                options={[{ value: 'sincronizado', label: 'Sincronizado' }, { value: 'pendente', label: 'Pendente' }, { value: 'falha', label: 'Erro de sync' }]}
                placeholder="Todos"
              />
            </div>
            <div style={{ flex: '0 0 140px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4, color: '#526484', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Check-in a partir</div>
              <Input type="date" defaultValue="2026-06-01" />
            </div>
            <div style={{ flex: '0 0 140px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4, color: '#526484', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Até</div>
              <Input type="date" defaultValue="2026-06-30" />
            </div>
            <Button variant="neutral" size="sm" onClick={() => { setFiltroCanal(''); setFiltroStatus(''); setAplicados({ canal: '', status: '' }) }}>Limpar</Button>
            <Button variant="primary" size="sm" onClick={() => setAplicados({ canal: filtroCanal, status: filtroStatus })}>Filtrar</Button>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <Card style={{ border: '1px solid #EBEEF2' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                {cols.map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && isHoteleiro ? (
                <EmptyStateHoteleiro />
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ padding: 40, textAlign: 'center', color: '#8094AE', fontSize: 13 }}>
                    Nenhuma reserva encontrada para os filtros selecionados.
                  </td>
                </tr>
              ) : filtered.map((r, i) => (
                <tr
                  key={r.id}
                  style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#EBF9F7'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#FFFFFF' : '#F5F6FA'}
                  onClick={() => setSelectedReserva(r)}
                >
                  <td style={{ padding: '14px 12px' }}>
                    <CanalBadgeColored canal={r.canal} />
                  </td>
                  <td style={{ padding: '14px 12px', fontSize: 12, fontWeight: 700, color: '#1F2B3A', whiteSpace: 'nowrap' }}>{r.codigo}</td>
                  <td style={{ padding: '14px 12px', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>{r.hospede}</td>
                  <td style={{ padding: '14px 12px', fontSize: 12, whiteSpace: 'nowrap' }}>{r.uh}</td>
                  <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>
                    <span
                      title={!isHoteleiro ? r.tarifaTecnica : undefined}
                      style={{ fontSize: 12, color: '#526484', cursor: !isHoteleiro ? 'help' : 'default' }}
                    >
                      {r.tarifa}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px', fontSize: 12, color: '#526484', whiteSpace: 'nowrap' }}>{r.checkin}</td>
                  <td style={{ padding: '14px 12px', fontSize: 12, color: '#526484', whiteSpace: 'nowrap' }}>{r.checkout}</td>
                  <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: 12, color: '#526484' }}>
                      {r.comissaoPct}% — R$ {r.comissaoValor.toLocaleString('pt-BR')}
                    </div>
                    {r.desconto && (
                      <span style={{
                        display: 'inline-block', marginTop: 3,
                        background: '#FEF9E7', color: '#B8850A',
                        fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 3,
                      }}>
                        {r.desconto}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px 12px', fontSize: 13, fontWeight: r.statusNegocio === 'cancelada' ? 400 : 700, color: r.statusNegocio === 'cancelada' ? '#8094AE' : '#1F2B3A', textDecoration: r.statusNegocio === 'cancelada' ? 'line-through' : 'none', whiteSpace: 'nowrap' }}>
                    R$ {r.valorLiquido.toLocaleString('pt-BR')}
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <SyncBadge sync={syncOverrides[r.id] ?? r.sync} />
                  </td>
                  <td style={{ padding: '14px 12px' }} onClick={e => e.stopPropagation()}>
                    {syncOverrides[r.id] === 'pendente' ? (
                      <span style={{ fontSize: 11, color: '#8094AE', fontStyle: 'italic' }}>Aguardando...</span>
                    ) : r.sync === 'falha' ? (
                      isHoteleiro ? (
                        <span
                          title="Nossa equipe está verificando"
                          style={{ fontSize: 11, color: '#8094AE', cursor: 'help', display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <AlertTriangle size={12} color="#F4BD0E" />
                          Em análise
                        </span>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          loading={forcandoSync === r.id}
                          onClick={() => forcarSync(r.id)}
                        >
                          Forçar sync
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedReserva(r)}
                      >
                        Ver
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '10px 14px', borderTop: '1px solid #EBEEF2', fontSize: 12, color: '#8094AE' }}>
          {filtered.length} reserva(s) encontrada(s)
        </div>
      </Card>

      {/* Detail slide-over */}
      <SlideOver
        isOpen={!!selectedReserva}
        onClose={() => setSelectedReserva(null)}
        title={selectedReserva ? `Reserva ${selectedReserva.codigo}` : ''}
      >
        {selectedReserva && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CanalBadgeColored canal={selectedReserva.canal} />
              <span style={{ fontSize: 13, color: '#526484' }}>{selectedReserva.codigo}</span>
            </div>

            <div style={{ background: '#F5F6FA', borderRadius: 8, padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Hóspede', selectedReserva.hospede],
                ['UH', selectedReserva.uh],
                ['Tarifa', selectedReserva.tarifa],
                ['Check-in', selectedReserva.checkin + '/2026'],
                ['Check-out', selectedReserva.checkout + '/2026'],
                ['Valor bruto', `R$ ${selectedReserva.valorBruto.toLocaleString('pt-BR')}`],
                ['Comissão', `${selectedReserva.comissaoPct}% — R$ ${selectedReserva.comissaoValor.toLocaleString('pt-BR')}`],
                ...(selectedReserva.desconto ? [['Desconto', selectedReserva.desconto]] : []),
                ['Valor líquido', `R$ ${selectedReserva.valorLiquido.toLocaleString('pt-BR')}`],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#8094AE', fontWeight: 700 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1F2B3A' }}>{value}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ marginBottom: 14, fontSize: 13 }}>Timeline de eventos</h3>
              <ReservaTimeline reserva={selectedReserva} />
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  )
}
