import React, { useState } from 'react'

export default function TooltipInfo({ text }) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', verticalAlign: 'middle', marginLeft: 5 }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span style={{
        width: 16, height: 16, borderRadius: '50%',
        background: '#EBF0F7', color: '#6E82A5',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 700, cursor: 'help', userSelect: 'none',
        fontFamily: 'Georgia, serif', lineHeight: 1, flexShrink: 0,
      }}>
        i
      </span>
      {visible && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1F2B3A',
          color: '#FFFFFF',
          padding: '8px 12px',
          borderRadius: 6,
          fontSize: 12,
          lineHeight: '18px',
          width: 220,
          zIndex: 300,
          pointerEvents: 'none',
          boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
          whiteSpace: 'normal',
        }}>
          {text}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #1F2B3A',
          }} />
        </div>
      )}
    </span>
  )
}
