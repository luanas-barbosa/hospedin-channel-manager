import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home, BarChart2, Map, Calendar, Users, Coffee,
  CreditCard, DollarSign, HelpCircle, Globe, ChevronDown,
  ChevronRight, LayoutDashboard, BookOpen,
} from 'lucide-react'

const mainNavItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/home' },
  { id: 'indicadores', label: 'Indicadores', icon: BarChart2, path: '/indicadores', disabled: true },
  { id: 'mapa', label: 'Mapa', icon: Map, path: '/mapa', disabled: true },
  { id: 'reservas', label: 'Reservas', icon: Calendar, path: '/reservas-pms', disabled: true },
  { id: 'hospedes', label: 'Hóspedes', icon: Users, path: '/hospedes', disabled: true },
  { id: 'dayuse', label: 'Day use', icon: Coffee, path: '/day-use', disabled: true },
  { id: 'transacoes', label: 'Transações', icon: CreditCard, path: '/transacoes', disabled: true },
  { id: 'caixa', label: 'Meu caixa', icon: DollarSign, path: '/caixa', disabled: true },
  { id: 'ajuda', label: 'Ajuda', icon: HelpCircle, path: '/ajuda', disabled: true },
]

const canaisSubItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/canais/dashboard', icon: LayoutDashboard },
  { id: 'reservas', label: 'Reservas', path: '/canais/reservas', icon: BookOpen },
  { id: 'booking', label: 'Booking.com', path: '/canais/booking', icon: null },
  { id: 'airbnb', label: 'Airbnb', path: '/canais/airbnb', icon: null },
  { id: 'expedia', label: 'Expedia', path: '/canais/expedia', icon: null, disabled: true },
]

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [canaisOpen, setCanaisOpen] = useState(
    location.pathname.startsWith('/canais')
  )

  const isActive = (path) => {
    if (path === '/canais') return location.pathname.startsWith('/canais')
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const navItemStyle = (active, disabled) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 16px',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: active ? '#374E7A' : 'transparent',
    color: active ? '#FFFFFF' : disabled ? '#526484' : 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: active ? 700 : 400,
    fontFamily: 'Open Sans, sans-serif',
    borderLeft: active ? '3px solid #32BBAA' : '3px solid transparent',
    transition: 'background 0.15s',
    userSelect: 'none',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
  })

  const subItemStyle = (active, disabled) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px 8px 44px',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: active ? 'rgba(50,187,170,0.15)' : 'transparent',
    color: active ? '#32BBAA' : disabled ? '#526484' : 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: active ? 700 : 400,
    fontFamily: 'Open Sans, sans-serif',
    transition: 'background 0.15s',
    opacity: disabled ? 0.5 : 1,
    whiteSpace: 'nowrap',
  })

  return (
    <div style={{
      width: 240,
      background: '#1B2B4C',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#32BBAA',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Home size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 18, color: '#FFFFFF' }}>
            Hospedin
          </span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '16px 8px', flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#6E82A5', padding: '0 12px', marginBottom: 8 }}>
          Menu Principal
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mainNavItems.slice(0, 4).map(item => (
            <div
              key={item.id}
              style={navItemStyle(isActive(item.path) && !item.disabled, item.disabled)}
              onClick={() => {
                if (!item.disabled) navigate(item.path)
              }}
              onMouseEnter={e => { if (!item.disabled && !isActive(item.path)) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { if (!isActive(item.path)) e.currentTarget.style.background = 'transparent' }}
            >
              <item.icon size={17} />
              <span>{item.label}</span>
            </div>
          ))}

          {/* Canais accordion — inserted after Reservas */}
          <div>
            <div
              style={{
                ...navItemStyle(location.pathname.startsWith('/canais'), false),
                justifyContent: 'space-between',
              }}
              onClick={() => {
                setCanaisOpen(o => !o)
                if (!canaisOpen) navigate('/canais')
              }}
              onMouseEnter={e => { if (!location.pathname.startsWith('/canais')) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { if (!location.pathname.startsWith('/canais')) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Globe size={17} />
                <span>Canais</span>
              </span>
              {canaisOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>

            {canaisOpen && (
              <div style={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {canaisSubItems.map(sub => (
                  <div
                    key={sub.id}
                    style={subItemStyle(location.pathname === sub.path || (sub.path !== '/canais/dashboard' && sub.path !== '/canais/reservas' && location.pathname.startsWith(sub.path + '/')), sub.disabled)}
                    onClick={() => { if (!sub.disabled) navigate(sub.path) }}
                    onMouseEnter={e => {
                      if (!sub.disabled && !(location.pathname === sub.path))
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    }}
                    onMouseLeave={e => {
                      if (!(location.pathname === sub.path))
                        e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    {sub.icon && <sub.icon size={14} />}
                    {!sub.icon && <span style={{ width: 14, height: 14, display: 'inline-block' }} />}
                    {sub.label}
                    {sub.disabled && <span style={{ fontSize: 10, color: '#526484', marginLeft: 4 }}>(em breve)</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {mainNavItems.slice(4).map(item => (
            <div
              key={item.id}
              style={navItemStyle(false, item.disabled)}
              onClick={() => { if (!item.disabled) navigate(item.path) }}
              onMouseEnter={e => { if (!item.disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <item.icon size={17} />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#374E7A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}>HB</span>
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}>Hospedin Bell</div>
            <div style={{ color: '#6E82A5', fontSize: 11 }}>Implantador</div>
          </div>
        </div>
      </div>
    </div>
  )
}
