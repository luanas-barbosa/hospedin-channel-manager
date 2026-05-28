import React from 'react'
import { disponibilidade } from '../data/mock.js'
import { StatusBadge } from '../components/Badge.jsx'
import { Card, CardHeader, MetricCard } from '../components/Card.jsx'

// Simple inline bar chart
function BarChart() {
  const data = [
    { label: 'Booking.com', value: 22800, color: '#003580' },
    { label: 'Airbnb', value: 15620, color: '#FF5A5F' },
  ]
  const max = Math.max(...data.map(d => d.value))

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.map(d => (
          <div key={d.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, display: 'inline-block' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1F2B3A' }}>{d.label}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: d.color }}>
                R$ {d.value.toLocaleString('pt-BR')}
              </span>
            </div>
            <div style={{ height: 28, background: '#F5F6FA', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(d.value / max) * 100}%`,
                background: d.color,
                borderRadius: 4,
                transition: 'width 0.6s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8,
              }}>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AvailabilityBadge({ count }) {
  if (count === 0) return (
    <span style={{ background: '#FDEEEC', color: '#E85347', padding: '2px 10px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>0</span>
  )
  if (count === 1) return (
    <span style={{ background: '#FEF9E7', color: '#B8850A', padding: '2px 10px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>1</span>
  )
  return (
    <span style={{ background: '#E8FDF6', color: '#0E8A6E', padding: '2px 10px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>{count}</span>
  )
}

const DAYS = ['Hoje', 'D+1', 'D+2', 'D+3', 'D+4', 'D+5', 'D+6']

const canalStatus = [
  { nome: 'Booking.com', status: 'operacional', label: 'Operacional', sub: 'última sync há 2 min', cor: '#003580' },
  { nome: 'Airbnb', status: 'alerta', label: 'Alerta', sub: '2 falhas nas últimas 4h', cor: '#FF5A5F' },
  { nome: 'Expedia', status: 'pendente', label: 'Pendente', sub: 'aguardando aprovação', cor: '#FFC72C' },
]

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h1>Dashboard de Canais</h1>
        <p style={{ color: '#8094AE', marginTop: 4, marginBottom: 0 }}>Visão consolidada de todos os canais de distribuição</p>
      </div>

      {/* Canal status row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {canalStatus.map(c => (
          <Card key={c.nome} style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: c.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.cor === '#FFC72C' ? '#1B2B4C' : 'white', fontSize: 11, fontWeight: 700 }}>
                {c.nome[0]}
              </div>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{c.nome}</span>
            </div>
            <StatusBadge status={c.status} label={c.label} />
            <div style={{ fontSize: 12, color: '#8094AE', marginTop: 6 }}>{c.sub}</div>
          </Card>
        ))}
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <MetricCard label="Total de reservas" value="47" sub="Mês atual" />
        <MetricCard label="Receita bruta" value="R$ 38.420" sub="Mês atual" />
        <MetricCard label="Receita líquida" value="R$ 33.210" sub="Após comissões" color="#1EE0AC" />
        <MetricCard label="Falhas de sync" value="1" sub="Últimas 24h" color="#E85347" />
      </div>

      {/* Chart + Availability side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Revenue chart */}
        <Card>
          <CardHeader title="Receita por canal" />
          <BarChart />
          <div style={{ padding: '0 24px 20px', display: 'flex', gap: 20 }}>
            {[{ label: 'Booking.com', color: '#003580' }, { label: 'Airbnb', color: '#FF5A5F' }].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#526484' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: 'inline-block' }} />
                {l.label}
              </div>
            ))}
          </div>
        </Card>

        {/* Stats summary */}
        <Card>
          <CardHeader title="Resumo do período" />
          <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Reservas Booking', value: '31', pct: '66%' },
                { label: 'Reservas Airbnb', value: '16', pct: '34%' },
                { label: 'Taxa média de ocupação', value: '78%', pct: null },
                { label: 'Ticket médio', value: 'R$ 817', pct: null },
                { label: 'Taxa de cancelamento', value: '3,2%', pct: null },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid #F5F6FA' }}>
                  <span style={{ fontSize: 14, color: '#526484' }}>{item.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1F2B3A' }}>{item.value}</span>
                    {item.pct && <span style={{ fontSize: 12, color: '#8094AE' }}>{item.pct}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Availability 7 days */}
      <Card>
        <CardHeader title="Disponibilidade — Próximos 7 dias" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', width: 200 }}>Categoria</th>
                {DAYS.map(d => (
                  <th key={d} style={{ padding: '10px 16px', textAlign: 'center', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', minWidth: 72 }}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {disponibilidade.map((row, i) => (
                <tr key={row.categoria} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: 14 }}>{row.categoria}</td>
                  {row.dias.map((d, j) => (
                    <td key={j} style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <AvailabilityBadge count={d} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid #EBEEF2', display: 'flex', gap: 20, fontSize: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ background: '#FDEEEC', color: '#E85347', padding: '1px 8px', borderRadius: 100, fontWeight: 700 }}>0</span> Esgotado</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ background: '#FEF9E7', color: '#B8850A', padding: '1px 8px', borderRadius: 100, fontWeight: 700 }}>1</span> Última UH</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ background: '#E8FDF6', color: '#0E8A6E', padding: '1px 8px', borderRadius: 100, fontWeight: 700 }}>2+</span> Disponível</span>
        </div>
      </Card>
    </div>
  )
}
