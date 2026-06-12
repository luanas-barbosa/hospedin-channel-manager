import React from 'react'

const statusConfigs = {
  conectado: { dot: '#1EE0AC', bg: '#E8FDF6', text: '#1B2B4C', label: 'Conectado' },
  aguardando: { dot: '#F4BD0E', bg: '#FEF9E7', text: '#1B2B4C', label: 'Aguardando' },
  desconectado: { dot: '#E85347', bg: '#FDEEEC', text: '#1B2B4C', label: 'Desconectado' },
  pendente: { dot: '#8094AE', bg: '#F5F6FA', text: '#1B2B4C', label: 'Pendente' },
  disponivel: { dot: '#8094AE', bg: '#F5F6FA', text: '#1B2B4C', label: 'Disponível' },
  sucesso: { dot: '#1EE0AC', bg: '#E8FDF6', text: '#1B2B4C', label: 'Sucesso' },
  falha: { dot: '#E85347', bg: '#FDEEEC', text: '#1B2B4C', label: 'Falha' },
  sincronizado: { dot: '#1EE0AC', bg: '#E8FDF6', text: '#1B2B4C', label: 'Sincronizado' },
  operacional: { dot: '#1EE0AC', bg: '#E8FDF6', text: '#1B2B4C', label: 'Operacional' },
  alerta: { dot: '#F4BD0E', bg: '#FEF9E7', text: '#1B2B4C', label: 'Alerta' },
  ativacao: { dot: '#8094AE', bg: '#EEF1FF', text: '#374E7A', label: 'Em ativação' },
  'erro-sync': { dot: '#E85347', bg: '#FDEEEC', text: '#1B2B4C', label: 'Erro de sync' },
  confirmada: { dot: '#1EE0AC', bg: '#E8FDF6', text: '#1B2B4C', label: 'Confirmada' },
  'pendente-confirmacao': { dot: '#F4BD0E', bg: '#FEF9E7', text: '#1B2B4C', label: 'Pendente de confirmação' },
  cancelada: { dot: '#E85347', bg: 'transparent', text: '#8094AE', label: 'Cancelada' },
}

const canalConfigs = {
  booking: { bg: '#003580', text: '#FFFFFF', label: 'Booking.com' },
  airbnb: { bg: '#FF5A5F', text: '#FFFFFF', label: 'Airbnb' },
  expedia: { bg: '#FFC72C', text: '#1B2B4C', label: 'Expedia' },
  hospedin: { bg: '#32BBAA', text: '#FFFFFF', label: 'Hospedin' },
}

export function StatusBadge({ status, label }) {
  const cfg = statusConfigs[status] || statusConfigs.pendente
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: cfg.bg, color: cfg.text,
      padding: '3px 10px', borderRadius: 100,
      fontSize: 12, fontWeight: 700, lineHeight: '20px', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {label || cfg.label}
    </span>
  )
}

export function CanalBadge({ canal, label }) {
  const cfg = canalConfigs[canal] || { bg: '#8094AE', text: '#FFFFFF', label: canal }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: cfg.bg, color: cfg.text,
      padding: '2px 10px', borderRadius: 4,
      fontSize: 12, fontWeight: 700, lineHeight: '20px', whiteSpace: 'nowrap',
    }}>
      {label || cfg.label}
    </span>
  )
}

export function SyncBadge({ sync }) {
  if (sync === 'sincronizado') return <StatusBadge status="sincronizado" label="Sincronizado" />
  if (sync === 'pendente') return <StatusBadge status="aguardando" label="Pendente" />
  if (sync === 'falha') return <StatusBadge status="erro-sync" label="Erro de sync" />
  return null
}

export function CanalBadgeColored({ canal }) {
  const configs = {
    booking: { bg: '#1B366C', text: '#FFFFFF', label: 'Booking.com' },
    airbnb: { bg: '#E05A5A', text: '#FFFFFF', label: 'Airbnb' },
    expedia: { bg: '#FFC72C', text: '#1B2B4C', label: 'Expedia' },
  }
  const cfg = configs[canal] || { bg: '#8094AE', text: '#FFFFFF', label: canal }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: cfg.bg, color: cfg.text,
      padding: '2px 10px', borderRadius: 4,
      fontSize: 12, fontWeight: 700, lineHeight: '20px', whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  )
}
