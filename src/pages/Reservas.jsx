import React, { useState } from 'react'
import { reservas } from '../data/mock.js'
import { CanalBadge, SyncBadge } from '../components/Badge.jsx'
import { Card, CardBody } from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { Input, Select } from '../components/Input.jsx'
import { SlideOver } from '../components/Modal.jsx'
import { useToast } from '../contexts/ToastContext.jsx'

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
    <div style={{ position: 'relative' }}>
      {events.map((ev, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < events.length - 1 ? 0 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: ev.ok ? '#E8FDF6' : '#FEF9E7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${ev.ok ? '#1EE0AC' : '#F4BD0E'}`, zIndex: 1 }}>
              <span style={{ fontSize: 11, color: ev.ok ? '#1EE0AC' : '#F4BD0E', fontWeight: 700 }}>{ev.ok ? '✓' : '!'}</span>
            </div>
            {i < events.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: '#EBEEF2' }} />}
          </div>
          <div style={{ paddingBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#1F2B3A' }}>{ev.evento}</div>
            <div style={{ fontSize: 12, color: '#8094AE' }}>{ev.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Reservas() {
  const { addToast } = useToast()
  const [filtroCanal, setFiltroCanal] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [selectedReserva, setSelectedReserva] = useState(null)
  const [forcandoSync, setForcandoSync] = useState(null)

  const filtered = reservas.filter(r => {
    if (filtroCanal && r.canal !== filtroCanal) return false
    if (filtroStatus && r.sync !== filtroStatus) return false
    return true
  })

  const forcarSync = (id) => {
    setForcandoSync(id)
    addToast('Forçando sincronização...', 'info')
    setTimeout(() => {
      setForcandoSync(null)
      addToast('Reserva sincronizada com sucesso ✓', 'success')
    }, 2000)
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1>Central de Reservas</h1>
        <p style={{ color: '#8094AE', marginTop: 4, marginBottom: 0 }}>Reservas de todos os canais conectados</p>
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: 20 }}>
        <CardBody style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 160px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Canal</div>
              <Select
                value={filtroCanal}
                onChange={e => setFiltroCanal(e.target.value)}
                options={[{ value: 'booking', label: 'Booking.com' }, { value: 'airbnb', label: 'Airbnb' }]}
                placeholder="Todos"
              />
            </div>
            <div style={{ flex: '0 0 160px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Status sync</div>
              <Select
                value={filtroStatus}
                onChange={e => setFiltroStatus(e.target.value)}
                options={[{ value: 'sincronizado', label: 'Sincronizado' }, { value: 'pendente', label: 'Pendente' }, { value: 'falha', label: 'Falha' }]}
                placeholder="Todos"
              />
            </div>
            <div style={{ flex: '0 0 150px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Check-in a partir de</div>
              <Input type="date" defaultValue="2026-06-01" />
            </div>
            <div style={{ flex: '0 0 150px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Até</div>
              <Input type="date" defaultValue="2026-06-30" />
            </div>
            <Button variant="neutral" size="sm" onClick={() => { setFiltroCanal(''); setFiltroStatus('') }}>Limpar</Button>
            <Button variant="primary" size="sm">Filtrar</Button>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                {['Canal', 'Reserva', 'Hóspede', 'UH', 'Check-in', 'Check-out', 'Valor bruto', 'Desconto', 'Valor líquido', 'Sync PMS', 'Ações'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={r.id}
                  style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#EBF9F7'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#FFFFFF' : '#F5F6FA'}
                >
                  <td style={{ padding: '12px 14px' }}><CanalBadge canal={r.canal} /></td>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#32BBAA', whiteSpace: 'nowrap' }}>{r.codigo}</td>
                  <td style={{ padding: '12px 14px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>{r.hospede}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, whiteSpace: 'nowrap' }}>{r.uh}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#526484', whiteSpace: 'nowrap' }}>{r.checkin}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#526484', whiteSpace: 'nowrap' }}>{r.checkout}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, whiteSpace: 'nowrap' }}>R$ {r.valorBruto.toLocaleString('pt-BR')}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: '#F4BD0E', whiteSpace: 'nowrap' }}>{r.desconto || '—'}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#32BBAA', whiteSpace: 'nowrap' }}>R$ {r.valorLiquido.toLocaleString('pt-BR')}</td>
                  <td style={{ padding: '12px 14px' }}><SyncBadge sync={r.sync} /></td>
                  <td style={{ padding: '12px 14px' }}>
                    {r.sync === 'pendente' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        loading={forcandoSync === r.id}
                        onClick={e => { e.stopPropagation(); forcarSync(r.id) }}
                      >
                        Forçar sync
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={e => { e.stopPropagation(); setSelectedReserva(r) }}
                      >
                        Ver
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} style={{ padding: 40, textAlign: 'center', color: '#8094AE' }}>
                    Nenhuma reserva encontrada para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #EBEEF2', fontSize: 13, color: '#8094AE' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CanalBadge canal={selectedReserva.canal} />
              <span style={{ fontSize: 14, color: '#526484' }}>{selectedReserva.codigo}</span>
            </div>

            {/* Details */}
            <div style={{ background: '#F5F6FA', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Hóspede', selectedReserva.hospede],
                ['UH', selectedReserva.uh],
                ['Check-in', selectedReserva.checkin + '/2026'],
                ['Check-out', selectedReserva.checkout + '/2026'],
                ['Valor bruto', `R$ ${selectedReserva.valorBruto.toLocaleString('pt-BR')}`],
                ...(selectedReserva.desconto ? [['Desconto', selectedReserva.desconto]] : []),
                ['Valor líquido', `R$ ${selectedReserva.valorLiquido.toLocaleString('pt-BR')}`],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#8094AE', fontWeight: 700 }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1F2B3A' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div>
              <h3 style={{ marginBottom: 16 }}>Timeline de eventos</h3>
              <ReservaTimeline reserva={selectedReserva} />
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  )
}
