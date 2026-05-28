import React from 'react'

export function Card({ children, style = {}, className = '' }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      ...style,
    }} className={className}>
      {children}
    </div>
  )
}

export function CardHeader({ title, children, style = {} }) {
  return (
    <div style={{
      padding: '16px 24px',
      borderBottom: '1px solid #EBEEF2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...style,
    }}>
      {title && <h3 style={{ margin: 0 }}>{title}</h3>}
      {children}
    </div>
  )
}

export function CardBody({ children, style = {} }) {
  return (
    <div style={{ padding: 24, ...style }}>
      {children}
    </div>
  )
}

export function CardFooter({ children, style = {} }) {
  return (
    <div style={{
      padding: '16px 24px',
      borderTop: '1px solid #EBEEF2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 12,
      ...style,
    }}>
      {children}
    </div>
  )
}

export function MetricCard({ label, value, sub, color = '#32BBAA' }) {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#8094AE', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', color, lineHeight: '32px' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: '#8094AE', marginTop: 4 }}>{sub}</div>}
    </Card>
  )
}

export function InfoBox({ children, type = 'info' }) {
  const configs = {
    info: { bg: '#EBF9F7', border: '#32BBAA', text: '#1B2B4C' },
    warning: { bg: '#FEF9E7', border: '#F4BD0E', text: '#1B2B4C' },
    danger: { bg: '#FDEEEC', border: '#E85347', text: '#1B2B4C' },
  }
  const cfg = configs[type] || configs.info
  return (
    <div style={{
      background: cfg.bg,
      borderLeft: `3px solid ${cfg.border}`,
      borderRadius: 4,
      padding: '12px 16px',
      color: cfg.text,
      fontSize: 14,
      lineHeight: '20px',
    }}>
      {children}
    </div>
  )
}
