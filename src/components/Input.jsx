import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export function FormField({ label, error, helper, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 700, color: '#1F2B3A', lineHeight: '24px' }}>
          {label}
        </label>
      )}
      {children}
      {error && <span style={{ fontSize: 12, color: '#E85347' }}>{error}</span>}
      {helper && !error && <span style={{ fontSize: 12, color: '#6E82A5', lineHeight: '20px' }}>{helper}</span>}
    </div>
  )
}

export function Input({
  value,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  error = false,
  prefix,
  suffix,
  type = 'text',
  style: extraStyle = {},
  ...props
}) {
  const borderColor = error ? '#E85347' : '#DBDFEA'
  const bg = readOnly || disabled ? '#F5F6FA' : '#FFFFFF'
  const textColor = readOnly || disabled ? '#8094AE' : '#1F2B3A'

  if (prefix || suffix) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {prefix && (
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: '#8094AE', fontSize: 14, pointerEvents: 'none',
          }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          style={{
            height: 40,
            width: '100%',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--radius-input)',
            padding: prefix ? '0 12px 0 32px' : suffix ? '0 32px 0 12px' : '0 12px',
            fontSize: 14,
            background: bg,
            color: textColor,
            outline: 'none',
            fontFamily: 'Open Sans, sans-serif',
            ...extraStyle,
          }}
          onFocus={e => { if (!readOnly && !disabled) { e.target.style.borderColor = '#32BBAA'; e.target.style.outline = '2px solid #D9F3EF'; } }}
          onBlur={e => { e.target.style.borderColor = borderColor; e.target.style.outline = 'none'; }}
          {...props}
        />
        {suffix && (
          <span style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            color: '#8094AE', fontSize: 14, pointerEvents: 'none',
          }}>
            {suffix}
          </span>
        )}
      </div>
    )
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      style={{
        height: 40,
        width: '100%',
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-input)',
        padding: '0 12px',
        fontSize: 14,
        background: bg,
        color: textColor,
        outline: 'none',
        fontFamily: 'Open Sans, sans-serif',
        ...extraStyle,
      }}
      onFocus={e => { if (!readOnly && !disabled) { e.target.style.borderColor = '#32BBAA'; e.target.style.outline = '2px solid #D9F3EF'; } }}
      onBlur={e => { e.target.style.borderColor = borderColor; e.target.style.outline = 'none'; }}
      {...props}
    />
  )
}

export function Select({ value, onChange, options = [], disabled = false, placeholder = 'Selecione...', style: extraStyle = {}, error = false }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          height: 40,
          width: '100%',
          border: `1px solid ${error ? '#E85347' : '#DBDFEA'}`,
          borderRadius: 'var(--radius-input)',
          padding: '0 36px 0 12px',
          fontSize: 14,
          background: disabled ? '#F5F6FA' : '#FFFFFF',
          color: value ? '#1F2B3A' : '#8094AE',
          outline: 'none',
          appearance: 'none',
          fontFamily: 'Open Sans, sans-serif',
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...extraStyle,
        }}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          typeof opt === 'string'
            ? <option key={opt} value={opt}>{opt}</option>
            : <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown size={16} color="#8094AE" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    </div>
  )
}

export function SearchableSelect({
  value,
  onChange,
  options = [],
  disabled = false,
  placeholder = 'Selecione...',
  error = false,
  style: extraStyle = {},
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const getLabel = (opt) => typeof opt === 'string' ? opt : opt.label
  const getValue = (opt) => typeof opt === 'string' ? opt : opt.value

  const selectedLabel = (() => {
    if (!value) return null
    const found = options.find(o => getValue(o) === value)
    return found ? getLabel(found) : value
  })()

  const filtered = options.filter(opt =>
    getLabel(opt).toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (opt) => {
    onChange({ target: { value: getValue(opt) } })
    setOpen(false)
    setSearch('')
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', ...extraStyle }}>
      <div
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          height: 40,
          width: '100%',
          border: `1px solid ${error ? '#E85347' : open ? '#32BBAA' : '#DBDFEA'}`,
          borderRadius: 'var(--radius-input)',
          padding: '0 36px 0 12px',
          fontSize: 14,
          background: disabled ? '#F5F6FA' : '#FFFFFF',
          color: selectedLabel ? '#1F2B3A' : '#8094AE',
          display: 'flex',
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontFamily: 'Open Sans, sans-serif',
          outline: open ? '2px solid #D9F3EF' : 'none',
          userSelect: 'none',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={16}
          color="#8094AE"
          style={{
            position: 'absolute', right: 10, top: '50%',
            transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
            transition: 'transform 0.15s',
            pointerEvents: 'none',
          }}
        />
      </div>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 200,
          background: '#FFFFFF',
          border: '1px solid #DBDFEA',
          borderRadius: 6,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          marginTop: 2,
          overflow: 'hidden',
        }}>
          <div style={{ padding: '6px 8px', borderBottom: '1px solid #F5F6FA' }}>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              style={{
                width: '100%',
                height: 30,
                border: '1px solid #DBDFEA',
                borderRadius: 4,
                padding: '0 10px',
                fontSize: 13,
                outline: 'none',
                fontFamily: 'Open Sans, sans-serif',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '10px 12px', color: '#8094AE', fontSize: 13 }}>Nenhum resultado</div>
            ) : filtered.map((opt, i) => {
              const optValue = getValue(opt)
              const optLabel = getLabel(opt)
              const isSelected = value === optValue
              return (
                <div
                  key={optValue || i}
                  onClick={() => handleSelect(opt)}
                  style={{
                    padding: '9px 12px',
                    fontSize: 13,
                    color: isSelected ? '#32BBAA' : '#1F2B3A',
                    fontWeight: isSelected ? 700 : 400,
                    background: isSelected ? '#EBF9F7' : '#FFFFFF',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#F5F6FA' }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = isSelected ? '#EBF9F7' : '#FFFFFF' }}
                >
                  {optLabel}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export function Switch({ checked, onChange, disabled = false }) {
  return (
    <label className={`switch-track ${checked ? 'on' : 'off'}`} style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={disabled ? undefined : e => onChange(e.target.checked)} disabled={disabled} />
      <span className="switch-knob" />
    </label>
  )
}
