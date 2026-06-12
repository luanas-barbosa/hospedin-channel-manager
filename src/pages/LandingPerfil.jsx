import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usePerfil } from '../contexts/PerfilContext.jsx'

function JornadaCard({ titulo, descricao, badge, onClick, disabled }) {
  const [hovered, setHovered] = React.useState(false)

  const badgeStyles = {
    disponivel: { bg: 'rgba(30,224,172,0.15)', color: '#1EE0AC', label: 'disponível' },
    breve: { bg: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', label: 'em breve' },
  }
  const b = badgeStyles[badge] || badgeStyles.disponivel

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        padding: '22px 24px',
        background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 14,
        cursor: disabled ? 'default' : 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s',
        outline: 'none',
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 6 }}>
        <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15, fontFamily: 'Open Sans, sans-serif', lineHeight: '22px' }}>
          {titulo}
        </span>
        <span style={{
          background: b.bg, color: b.color,
          fontSize: 11, fontWeight: 600, padding: '3px 10px',
          borderRadius: 100, letterSpacing: '0.02em', whiteSpace: 'nowrap', flexShrink: 0,
          fontFamily: 'Open Sans, sans-serif',
        }}>
          {b.label}
        </span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: 0, lineHeight: '20px', fontFamily: 'Open Sans, sans-serif' }}>
        {descricao}
      </p>
    </button>
  )
}

export default function LandingPerfil() {
  const navigate = useNavigate()
  const { setPerfil } = usePerfil()

  const selecionar = (p) => {
    setPerfil(p)
    navigate(p === 'implantador' ? '/canais' : '/canais/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#131620',
      display: 'flex',
      justifyContent: 'center',
      padding: '52px 24px 40px',
    }}>
      <div style={{ width: '100%', maxWidth: 540 }}>
        {/* Logo */}
        <div style={{ marginBottom: 44 }}>
          <img
            src="/logo_hospedin_transparent.webp"
            alt="Hospedin"
            style={{ height: 28, display: 'block' }}
          />
        </div>

        {/* Heading */}
        <h1 style={{
          color: '#FFFFFF',
          fontSize: 32,
          fontWeight: 700,
          margin: '0 0 10px',
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: '-0.5px',
          lineHeight: '40px',
        }}>
          Channel Manager
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 14,
          margin: '0 0 40px',
          fontFamily: 'Open Sans, sans-serif',
          lineHeight: '22px',
        }}>
          Selecione o perfil para navegar pelo protótipo correspondente.
        </p>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <JornadaCard
            titulo="Hoteleiro"
            descricao="Acompanhe reservas, status dos canais e receita consolidada."
            badge="disponivel"
            onClick={() => selecionar('hoteleiro')}
          />
          <JornadaCard
            titulo="Implantador"
            descricao="Configure canais, mapeamentos, logs e monitore integrações."
            badge="disponivel"
            onClick={() => selecionar('implantador')}
          />
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          marginTop: 52,
          color: 'rgba(255,255,255,0.18)',
          fontSize: 12,
          fontFamily: 'Open Sans, sans-serif',
        }}>
          Protótipo de validação interna · Hospedin {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
