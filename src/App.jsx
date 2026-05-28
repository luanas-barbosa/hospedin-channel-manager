import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './contexts/ToastContext.jsx'
import Layout from './components/Layout.jsx'
import CanalLista from './pages/CanalLista.jsx'
import CanalDetalhe from './pages/CanalDetalhe.jsx'
import CanalDetalheAirbnb from './pages/CanalDetalheAirbnb.jsx'
import Wizard from './pages/Wizard.jsx'
import Reservas from './pages/Reservas.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Placeholder from './pages/Placeholder.jsx'

// Add keyframe animations globally
const globalStyles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`

function GlobalStyles() {
  return <style>{globalStyles}</style>
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/canais" replace />} />
        <Route path="/canais" element={<CanalLista />} />
        <Route path="/canais/booking" element={<CanalDetalhe />} />
        <Route path="/canais/booking/conectar" element={<Wizard />} />
        <Route path="/canais/airbnb" element={<CanalDetalheAirbnb />} />
        <Route path="/canais/reservas" element={<Reservas />} />
        <Route path="/canais/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Placeholder />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </BrowserRouter>
    </>
  )
}
