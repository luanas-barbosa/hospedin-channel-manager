import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, Zap, AlertTriangle, Info, ArrowRight } from 'lucide-react'
import { canais } from '../data/mock.js'
import { StatusBadge } from '../components/Badge.jsx'
import { Card, CardBody } from '../components/Card.jsx'
import Button from '../components/Button.jsx'

function CanalIcon({ canal }) {
  const configs = {
    booking: { label: 'B.', bg: '#003580', text: '#FFFFFF' },
    airbnb: { label: 'Air', bg: '#FF5A5F', text: '#FFFFFF' },
    expedia: { label: 'Exp', bg: '#FFC72C', text: '#1B2B4C' },
    rede: { label: 'RH', bg: '#8094AE', text: '#FFFFFF' },
  }
  const cfg = configs[canal.id] || { label: canal.nome[0], bg: canal.cor, text: canal.textoCor }
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 8,
      background: cfg.bg, color: cfg.text,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, fontFamily: 'Montserrat, sans-serif',
      flexShrink: 0,
    }}>
      {cfg.label}
    </div>
  )
}

function CanalCard({ canal }) {
  const navigate = useNavigate()

  return (
    <Card style={{ padding: 0, opacity: canal.disabled ? 0.6 : 1 }}>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <CanalIcon canal={canal} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#1F2B3A' }}>{canal.nome}</div>
            <StatusBadge status={canal.status} />
          </div>
        </div>

        {canal.status === 'conectado' && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div style={{ background: '#F5F6FA', borderRadius: 6, padding: '8px 12px', flex: 1 }}>
              <div style={{ fontSize: 11, color: '#8094AE', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>Última sync</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2B3A', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <RefreshCw size={13} color="#32BBAA" />
                {canal.ultimaSync}
              </div>
            </div>
            <div style={{ background: '#F5F6FA', borderRadius: 6, padding: '8px 12px', flex: 1 }}>
              <div style={{ fontSize: 11, color: '#8094AE', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>Taxa de sucesso</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1EE0AC', marginTop: 2 }}>
                {canal.taxaSucesso}%
              </div>
            </div>
          </div>
        )}

        {canal.status === 'aguardando' && canal.descricao && (
          <div style={{
            background: '#FEF9E7', borderLeft: '3px solid #F4BD0E',
            borderRadius: 4, padding: '10px 12px', marginBottom: 16, fontSize: 13, color: '#1B2B4C',
          }}>
            <AlertTriangle size={13} style={{ marginRight: 6, verticalAlign: 'middle', color: '#F4BD0E' }} />
            {canal.descricao}
          </div>
        )}

        {canal.disabled && canal.descricao && (
          <div style={{
            background: '#F5F6FA', borderRadius: 4, padding: '10px 12px',
            marginBottom: 16, fontSize: 13, color: '#8094AE', textAlign: 'center',
          }}>
            {canal.descricao}
          </div>
        )}
      </div>

      <div style={{ padding: '12px 24px', borderTop: '1px solid #EBEEF2', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        {canal.status === 'conectado' && !canal.disabled && (
          <Button variant="primary" size="sm" onClick={() => navigate(`/canais/${canal.id}`)}>
            Gerenciar
          </Button>
        )}
        {canal.status === 'aguardando' && !canal.disabled && (
          <Button variant="outline" size="sm" onClick={() => navigate(`/canais/${canal.id}`)}>
            Ver status
          </Button>
        )}
        {canal.status === 'disponivel' && !canal.disabled && (
          <Button variant="secondary" size="sm" onClick={() => navigate(`/canais/${canal.id}/conectar`)}>
            <Zap size={13} />
            Conectar
          </Button>
        )}
        {canal.disabled && (
          <Button variant="neutral" size="sm" disabled>
            Em breve
          </Button>
        )}
      </div>
    </Card>
  )
}

export default function CanalLista() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h1>Canais</h1>
        <p style={{ color: '#8094AE', marginTop: 4, marginBottom: 0 }}>
          Gerencie as conexões com os canais de distribuição
        </p>
      </div>

      {/* Canal cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        {canais.map(canal => (
          <CanalCard key={canal.id} canal={canal} />
        ))}
      </div>

      {/* Alertas ativos */}
      <Card>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #EBEEF2', display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertTriangle size={16} color="#F4BD0E" />
          <h3 style={{ margin: 0 }}>Alertas ativos</h3>
          <span style={{
            background: '#E85347', color: 'white',
            fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 100,
          }}>2</span>
        </div>
        <div style={{ padding: '0 8px' }}>
          {/* Warning alert */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '14px 16px',
            borderBottom: '1px solid #F5F6FA',
          }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#FEF9E7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle size={16} color="#F4BD0E" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#1F2B3A', fontSize: 14 }}>
                Airbnb — 2 falhas de sync nas últimas 4h
              </div>
              <div style={{ color: '#8094AE', fontSize: 13, marginTop: 2 }}>
                Verifique os logs para identificar as entradas com falha.
              </div>
            </div>
            <button
              onClick={() => navigate('/canais/airbnb')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#32BBAA', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', padding: '8px 0' }}
            >
              Ver logs <ArrowRight size={13} />
            </button>
          </div>

          {/* Info alert */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '14px 16px',
          }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EBF9F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Info size={16} color="#32BBAA" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#1F2B3A', fontSize: 14 }}>
                Booking.com — Mapeamento incompleto em Suite Tripla
              </div>
              <div style={{ color: '#8094AE', fontSize: 13, marginTop: 2 }}>
                A categoria "Triple Room" tem conflito de ocupação no mapeamento.
              </div>
            </div>
            <button
              onClick={() => navigate('/canais/booking')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#32BBAA', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', padding: '8px 0' }}
            >
              Revisar <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
