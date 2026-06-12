import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/PageShell.tsx'

const CANAIS = [
  { id: 'booking', nome: 'Booking.com', sigla: 'BDC', cor: '#003580', textoCor: '#FFFFFF', status: 'conectado', info: 'ID 6314570 · 4 quartos mapeados', path: '/canais/booking' },
  { id: 'expedia', nome: 'Expedia / Hotels.com', sigla: 'EXP', cor: '#1B3A8C', textoCor: '#FFFFFF', status: 'conectado', info: 'ID 18492031 · 4 quartos mapeados', path: '/canais/expedia' },
  { id: 'airbnb', nome: 'Airbnb', sigla: 'AIR', cor: '#FF5A5F', textoCor: '#FFFFFF', status: 'pendente', info: null, path: '/canais/conectar/airbnb' },
  { id: 'decolar', nome: 'Decolar', sigla: 'DEC', cor: '#E8A317', textoCor: '#FFFFFF', status: 'nao_configurado', info: 'OTA líder América Latina', path: '/canais/conectar/decolar' },
]

const STATUS_BADGE = {
  conectado: { label: 'Conectado', bg: '#E8FDF6', color: '#0D9965', border: '#A0EDD4' },
  pendente: { label: 'Pendente', bg: '#FFF8EC', color: '#B7810A', border: '#F4D98A' },
  nao_configurado: { label: 'Não configurado', bg: '#F5F6FA', color: '#8094AE', border: '#DBDFEA' },
}

function StatusBadge({ status }) {
  const s = STATUS_BADGE[status] || STATUS_BADGE.nao_configurado
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>
      {s.label}
    </span>
  )
}

export default function CanalLista() {
  const navigate = useNavigate()

  const action = (
    <button
      onClick={() => navigate('/canais/conectar/novo')}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 18px', borderRadius: 6, border: 'none',
        background: '#19c2a8', color: '#FFFFFF', fontSize: 13, fontWeight: 700,
        cursor: 'pointer', fontFamily: 'Open Sans, sans-serif',
      }}
    >
      + Conectar canal
    </button>
  )

  return (
    <PageShell
      title="Configuração de Canais"
      description="Conecte e configure os canais de distribuição da propriedade"
      breadcrumbs={[{ label: 'Home', path: '/home' }, { label: 'Canais' }, { label: 'Configuração' }]}
      action={action}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {CANAIS.map(canal => (
          <div key={canal.id} style={{
            background: '#FFFFFF', border: '1px solid #EBEEF2', borderRadius: 10, padding: 20,
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {/* Header: icon + status */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, background: canal.cor, color: canal.textoCor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, fontFamily: 'Montserrat, sans-serif',
              }}>
                {canal.sigla}
              </div>
              <StatusBadge status={canal.status} />
            </div>

            {/* Name + info */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1F2B3A' }}>{canal.nome}</div>
              {canal.status === 'pendente' && (
                <div style={{ fontSize: 12, color: '#B7810A', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                  ⚠ Concluir configuração
                </div>
              )}
              {canal.info && (
                <div style={{ fontSize: 12, color: '#8094AE', marginTop: 4 }}>{canal.info}</div>
              )}
            </div>

            {/* Action button */}
            {canal.status === 'conectado' && (
              <button
                onClick={() => navigate(canal.path)}
                style={{
                  width: '100%', padding: '9px 0', borderRadius: 6,
                  border: '1px solid #D6DDEE', background: '#FFFFFF',
                  fontSize: 13, fontWeight: 600, color: '#526484', cursor: 'pointer',
                }}
              >
                Editar mapeamento
              </button>
            )}
            {canal.status === 'pendente' && (
              <button
                onClick={() => navigate(canal.path)}
                style={{
                  width: '100%', padding: '9px 0', borderRadius: 6,
                  border: 'none', background: '#19c2a8',
                  fontSize: 13, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer',
                }}
              >
                Continuar
              </button>
            )}
            {canal.status === 'nao_configurado' && (
              <button
                onClick={() => navigate(canal.path)}
                style={{
                  width: '100%', padding: '9px 0', borderRadius: 6,
                  border: '1px solid #D6DDEE', background: '#FFFFFF',
                  fontSize: 13, fontWeight: 600, color: '#526484', cursor: 'pointer',
                }}
              >
                Conectar
              </button>
            )}
          </div>
        ))}

        {/* Mais canais placeholder */}
        <div style={{
          background: '#FAFBFC', border: '1.5px dashed #D6DDEE', borderRadius: 10, padding: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8, minHeight: 160,
        }}>
          <span style={{ fontSize: 24, color: '#C4CEDE' }}>+</span>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#8094AE' }}>Mais canais</div>
          <div style={{ fontSize: 12, color: '#B7C2D0', textAlign: 'center' }}>Hurb, Omnibees, GDS...</div>
        </div>
      </div>
    </PageShell>
  )
}
