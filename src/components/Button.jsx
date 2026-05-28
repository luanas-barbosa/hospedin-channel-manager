import React from 'react'

const variants = {
  primary: {
    background: '#32BBAA',
    color: '#FFFFFF',
    border: 'none',
    '--hover-bg': '#228A7C',
  },
  secondary: {
    background: '#1B2B4C',
    color: '#FFFFFF',
    border: 'none',
    '--hover-bg': '#374E7A',
  },
  cancel: {
    background: '#765AA6',
    color: '#FFFFFF',
    border: 'none',
  },
  destructive: {
    background: '#E85347',
    color: '#FFFFFF',
    border: 'none',
  },
  'destructive-outline': {
    background: 'transparent',
    color: '#E85347',
    border: '1.5px solid #E85347',
  },
  outline: {
    background: 'transparent',
    color: '#32BBAA',
    border: '1.5px solid #32BBAA',
  },
  neutral: {
    background: '#FFFFFF',
    color: '#364A63',
    border: '1.5px solid #B7C2D0',
  },
  ghost: {
    background: 'transparent',
    color: '#32BBAA',
    border: 'none',
  },
}

const sizes = {
  sm: { height: 30, padding: '0 12px', fontSize: 13 },
  md: { height: 40, padding: '0 16px', fontSize: 14 },
  lg: { height: 44, padding: '0 20px', fontSize: 15 },
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  loading = false,
  style: extraStyle = {},
  ...props
}) {
  const v = variants[variant] || variants.primary
  const s = sizes[size] || sizes.md

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: s.height,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    borderRadius: 'var(--radius-btn)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    background: disabled ? '#DBDFEA' : v.background,
    color: disabled ? '#8094AE' : v.color,
    border: disabled ? '1.5px solid #DBDFEA' : (v.border || 'none'),
    outline: 'none',
    transition: 'background 0.15s, opacity 0.15s',
    whiteSpace: 'nowrap',
    textDecoration: variant === 'ghost' ? 'none' : undefined,
    width: fullWidth ? '100%' : undefined,
    opacity: loading ? 0.7 : 1,
    ...extraStyle,
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={e => {
        if (!disabled && !loading) {
          if (variant === 'primary') e.currentTarget.style.background = '#228A7C'
          if (variant === 'secondary') e.currentTarget.style.background = '#374E7A'
          if (variant === 'ghost') e.currentTarget.style.textDecoration = 'underline'
          if (variant === 'outline') e.currentTarget.style.background = '#D9F3EF'
          if (variant === 'neutral') e.currentTarget.style.background = '#F5F6FA'
          if (variant === 'destructive') e.currentTarget.style.background = '#c9413a'
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          e.currentTarget.style.background = disabled ? '#DBDFEA' : v.background
          if (variant === 'ghost') e.currentTarget.style.textDecoration = 'none'
          if (variant === 'outline') e.currentTarget.style.background = 'transparent'
          if (variant === 'neutral') e.currentTarget.style.background = '#FFFFFF'
        }
      }}
      {...props}
    >
      {loading && (
        <span style={{
          width: 14, height: 14, borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: 'currentColor',
          animation: 'spin 0.7s linear infinite',
          display: 'inline-block',
        }} />
      )}
      {children}
    </button>
  )
}
