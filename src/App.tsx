import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './contexts/ToastContext.jsx'
import { PerfilProvider } from './contexts/PerfilContext.jsx'
import Layout from './components/Layout'
import LandingPerfil from './pages/LandingPerfil.jsx'
import Placeholder from './pages/Placeholder.jsx'

/* Pages — built session by session */
const Dashboard     = React.lazy(() => import('./pages/Dashboard'))
const Configuracao  = React.lazy(() => import('./pages/Configuracao'))
const WizardBooking = React.lazy(() => import('./pages/WizardBooking'))
const WizardExpedia = React.lazy(() => import('./pages/WizardExpedia'))
const WizardAirbnb  = React.lazy(() => import('./pages/WizardAirbnb'))
const CanalDetalhe  = React.lazy(() => import('./pages/CanalDetalhe'))
const Logs          = React.lazy(() => import('./pages/Logs'))

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPerfil />} />
      <Route path="*" element={
        <Layout>
          <React.Suspense fallback={null}>
            <Routes>
              {/* Canais */}
              <Route path="/canais"                      element={<Dashboard />} />
              <Route path="/canais/configuracao"         element={<Configuracao />} />
              <Route path="/canais/conectar/booking"     element={<WizardBooking />} />
              <Route path="/canais/conectar/expedia"     element={<WizardExpedia />} />
              <Route path="/canais/conectar/airbnb"      element={<WizardAirbnb />} />
              <Route path="/canais/:canal"               element={<CanalDetalhe />} />
              <Route path="/canais/logs"                 element={<Logs />} />
              {/* Legacy redirects */}
              <Route path="/canais/dashboard"            element={<Navigate to="/canais" replace />} />
              <Route path="/logs"                        element={<Navigate to="/canais/logs" replace />} />
              {/* Placeholder para rotas ainda não implementadas */}
              <Route path="*" element={<Placeholder />} />
            </Routes>
          </React.Suspense>
        </Layout>
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <PerfilProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </PerfilProvider>
    </BrowserRouter>
  )
}
