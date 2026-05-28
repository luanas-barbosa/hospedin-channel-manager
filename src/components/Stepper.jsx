import React from 'react'
import { Check } from 'lucide-react'

export default function Stepper({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, width: '100%', marginBottom: 32 }}>
      {steps.map((step, i) => {
        const done = i < current
        const active = i === current
        const future = i > current

        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: done ? '#32BBAA' : active ? '#32BBAA' : '#DBDFEA',
                color: done || active ? '#FFFFFF' : '#8094AE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 14,
                fontFamily: 'Montserrat, sans-serif',
                border: active ? '2px solid #228A7C' : 'none',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}>
                {done ? <Check size={16} /> : i + 1}
              </div>
              <span style={{
                marginTop: 8,
                fontSize: 12,
                fontWeight: active ? 700 : 400,
                color: active ? '#32BBAA' : done ? '#1B2B4C' : '#8094AE',
                textAlign: 'center',
                lineHeight: '16px',
                whiteSpace: 'nowrap',
              }}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                height: 2,
                background: i < current ? '#32BBAA' : '#DBDFEA',
                flex: 1,
                marginTop: 17,
                transition: 'background 0.2s',
              }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
