import React from 'react'
import { useLocation } from 'react-router-dom'
import { Construction } from 'lucide-react'

export default function Placeholder() {
  const location = useLocation()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16, color: '#8094AE' }}>
      <Construction size={48} strokeWidth={1.5} />
      <h2 style={{ color: '#8094AE', margin: 0 }}>Seção em construção</h2>
      <p style={{ margin: 0, fontSize: 14, textAlign: 'center' }}>
        Esta seção não faz parte deste protótipo.<br />
        Rota: <code style={{ background: '#EBEEF2', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>{location.pathname}</code>
      </p>
    </div>
  )
}
