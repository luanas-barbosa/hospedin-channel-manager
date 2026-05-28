import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, Bell, ChevronDown } from 'lucide-react'
import Sidebar from './Sidebar.jsx'

const breadcrumbMap = {
  '/canais': [{ label: 'Home', path: '/home' }, { label: 'Canais' }],
  '/canais/booking': [{ label: 'Home', path: '/home' }, { label: 'Canais', path: '/canais' }, { label: 'Booking.com' }],
  '/canais/booking/conectar': [{ label: 'Home', path: '/home' }, { label: 'Canais', path: '/canais' }, { label: 'Booking.com', path: '/canais/booking' }, { label: 'Conectar' }],
  '/canais/airbnb': [{ label: 'Home', path: '/home' }, { label: 'Canais', path: '/canais' }, { label: 'Airbnb' }],
  '/canais/reservas': [{ label: 'Home', path: '/home' }, { label: 'Canais', path: '/canais' }, { label: 'Reservas' }],
  '/canais/dashboard': [{ label: 'Home', path: '/home' }, { label: 'Canais', path: '/canais' }, { label: 'Dashboard' }],
  '/home': [{ label: 'Home' }],
}

export default function Layout({ children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const crumbs = breadcrumbMap[location.pathname] || [{ label: 'Home', path: '/home' }]

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      {sidebarOpen && <Sidebar />}

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Topbar */}
        <div style={{
          height: 56, background: '#FFFFFF',
          borderBottom: '1px solid #DBDFEA',
          display: 'flex', alignItems: 'center',
          padding: '0 24px', gap: 16,
          flexShrink: 0, zIndex: 100,
        }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#526484', display: 'flex' }}
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1 }}>
            {crumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color: '#B7C2D0', margin: '0 6px', fontSize: 14 }}>/</span>}
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    style={{ color: '#32BBAA', fontSize: 14, fontWeight: 400, textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.target.style.textDecoration = 'none'}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: '#1F2B3A', fontSize: 14, fontWeight: 700 }}>{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: '#526484', display: 'flex', position: 'relative' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: '#E85347', borderRadius: '50%' }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#32BBAA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>HB</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1F2B3A' }}>Hospedin Bell</span>
              <ChevronDown size={14} color="#8094AE" />
            </div>
          </div>
        </div>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', background: '#F5F6FA', padding: 32 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
