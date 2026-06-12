import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Home, BarChart2, Map, Calendar, Users, Coffee,
  CreditCard, DollarSign, HelpCircle, Globe, ChevronDown,
  ChevronRight, LayoutDashboard, LogOut, ScrollText,
} from 'lucide-react'
import { usePerfil } from '../contexts/PerfilContext.jsx'

const mainNavItemsAll = [
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

const canaisSubItemsAll = [
  { id: 'dashboard', label: 'Dashboard', path: '/canais/dashboard', icon: LayoutDashboard },
  { id: 'booking', label: 'Booking.com', path: '/canais/booking', icon: null },
  { id: 'airbnb', label: 'Airbnb', path: '/canais/airbnb', icon: null },
  { id: 'expedia', label: 'Expedia', path: '/canais/expedia', icon: null, disabled: true },
]

const canaisSubItemsHoteleiro = [
  { id: 'dashboard', label: 'Dashboard', path: '/canais/dashboard', icon: LayoutDashboard },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { perfil, setPerfil } = usePerfil()
  const isHoteleiro = perfil === 'hoteleiro'

  const [canaisOpen, setCanaisOpen] = useState(location.pathname.startsWith('/canais'))

  const canaisSubItems = isHoteleiro ? canaisSubItemsHoteleiro : canaisSubItemsAll

  const isActive = (path) => {
    if (path === '/canais') return location.pathname.startsWith('/canais')
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const navItemStyle = (active, disabled, special) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '8px 14px',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: active ? 'rgba(0,0,0,0.25)' : 'transparent',
    color: special ? '#F0B429' : active ? '#FFFFFF' : disabled ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: active ? 700 : 400,
    fontFamily: 'Open Sans, sans-serif',
    borderLeft: active ? '3px solid #32BBAA' : '3px solid transparent',
    transition: 'background 0.15s',
    userSelect: 'none',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
  })

  const subItemStyle = (active, disabled) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '7px 14px 7px 40px',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: active ? 'rgba(50,187,170,0.15)' : 'transparent',
    color: active ? '#32BBAA' : disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: active ? 700 : 400,
    fontFamily: 'Open Sans, sans-serif',
    transition: 'background 0.15s',
    opacity: disabled ? 0.5 : 1,
    whiteSpace: 'nowrap',
  })

  const isBeforeCanais = (id) => ['home', 'indicadores', 'mapa', 'reservas'].includes(id)
  const navBeforeCanais = mainNavItemsAll.filter(i => isBeforeCanais(i.id))
  const navAfterCanais = mainNavItemsAll.filter(i => !isBeforeCanais(i.id))

  return (
    <div style={{
      width: 232,
      background: '#2B3849',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Home size={22} color="#F0B429" strokeWidth={1.8} />
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 17, color: '#FFFFFF', letterSpacing: '0.01em' }}>
            Hospedin
          </span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '12px 6px', flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', padding: '0 10px', marginBottom: 6 }}>
          Menu Principal
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {navBeforeCanais.map(item => (
            <div
              key={item.id}
              style={navItemStyle(isActive(item.path) && !item.disabled, item.disabled, item.id === 'ajuda')}
              onClick={() => { if (!item.disabled) navigate(item.path) }}
              onMouseEnter={e => { if (!item.disabled && !isActive(item.path)) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { if (!isActive(item.path)) e.currentTarget.style.background = 'transparent' }}
            >
              <item.icon size={15} strokeWidth={1.5} />
              <span>{item.label}</span>
            </div>
          ))}

          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '6px 8px' }} />

          {/* Canais accordion */}
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
              onMouseEnter={e => { if (!location.pathname.startsWith('/canais')) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { if (!location.pathname.startsWith('/canais')) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <Globe size={15} strokeWidth={1.5} />
                <span>Canais</span>
              </span>
              {canaisOpen ? <ChevronDown size={13} strokeWidth={1.5} /> : <ChevronRight size={13} strokeWidth={1.5} />}
            </div>

            {canaisOpen && (
              <div style={{ marginTop: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {canaisSubItems.map(sub => (
                  <div
                    key={sub.id}
                    style={subItemStyle(
                      location.pathname === sub.path || (sub.path !== '/canais/dashboard' && location.pathname.startsWith(sub.path + '/')),
                      sub.disabled
                    )}
                    onClick={() => { if (!sub.disabled) navigate(sub.path) }}
                    onMouseEnter={e => {
                      if (!sub.disabled && !(location.pathname === sub.path))
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }}
                    onMouseLeave={e => {
                      if (!(location.pathname === sub.path))
                        e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    {sub.icon && <sub.icon size={13} strokeWidth={1.5} />}
                    {!sub.icon && <span style={{ width: 13, display: 'inline-block' }} />}
                    {sub.label}
                    {sub.disabled && <span style={{ fontSize: 10, color: '#526484', marginLeft: 4 }}>(em breve)</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logs — apenas implantador */}
          {!isHoteleiro && (
            <div
              style={navItemStyle(location.pathname === '/logs', false)}
              onClick={() => navigate('/logs')}
              onMouseEnter={e => { if (location.pathname !== '/logs') e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { if (location.pathname !== '/logs') e.currentTarget.style.background = 'transparent' }}
            >
              <ScrollText size={15} strokeWidth={1.5} />
              <span>Logs</span>
            </div>
          )}

          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '6px 8px' }} />

          {navAfterCanais.map(item => (
            <div
              key={item.id}
              style={navItemStyle(false, item.disabled, item.id === 'ajuda')}
              onClick={() => { if (!item.disabled) navigate(item.path) }}
              onMouseEnter={e => { if (!item.disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <item.icon size={15} strokeWidth={1.5} />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#FFFFFF', fontSize: 11, fontWeight: 700 }}>HB</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 700 }}>Hospedin Bell</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, textTransform: 'capitalize' }}>{perfil || 'Implantador'}</div>
          </div>
        </div>
        <Link
          to="/"
          onClick={() => setPerfil(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#6E82A5', fontSize: 11, textDecoration: 'none',
            padding: '4px 0',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#32BBAA'}
          onMouseLeave={e => e.currentTarget.style.color = '#6E82A5'}
        >
          <LogOut size={12} strokeWidth={1.5} />
          Trocar perfil
        </Link>
      </div>
    </div>
  )
}
