import React, { createContext, useContext, useState, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info') => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function Toast({ toast, onClose }) {
  const configs = {
    success: { bg: '#E8FDF6', border: '#1EE0AC', icon: <CheckCircle size={16} color="#1EE0AC" />, textColor: '#1B2B4C' },
    error: { bg: '#FDEEEC', border: '#E85347', icon: <AlertCircle size={16} color="#E85347" />, textColor: '#1B2B4C' },
    warning: { bg: '#FEF9E7', border: '#F4BD0E', icon: <AlertTriangle size={16} color="#F4BD0E" />, textColor: '#1B2B4C' },
    info: { bg: '#EBF9F7', border: '#32BBAA', icon: <Info size={16} color="#32BBAA" />, textColor: '#1B2B4C' },
  }
  const cfg = configs[toast.type] || configs.info

  return (
    <div style={{
      width: 320,
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 'var(--radius-lg)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      boxShadow: 'var(--shadow-modal)',
      animation: 'slideIn 0.2s ease',
    }}>
      <span style={{ marginTop: 1, flexShrink: 0 }}>{cfg.icon}</span>
      <span style={{ flex: 1, fontSize: 14, color: cfg.textColor, lineHeight: '20px' }}>{toast.message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#8094AE', flexShrink: 0 }}>
        <X size={14} />
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
