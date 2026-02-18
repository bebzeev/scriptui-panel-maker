import React from 'react'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import type { JustifyValue } from '../../../types/schema'

interface JustifyFieldProps {
  value: JustifyValue
  onChange: (value: JustifyValue) => void
}

const OPTIONS: { value: JustifyValue; icon: React.ReactNode; title: string }[] = [
  { value: 'left', icon: <AlignLeft size={12} />, title: 'Left' },
  { value: 'center', icon: <AlignCenter size={12} />, title: 'Center' },
  { value: 'right', icon: <AlignRight size={12} />, title: 'Right' },
]

export function JustifyField({ value, onChange }: JustifyFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-2xs text-app-muted w-20 flex-shrink-0">Justify</label>
      <div className="flex border border-app-border rounded overflow-hidden">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            title={opt.title}
            onClick={() => onChange(opt.value)}
            className={`
              flex items-center justify-center w-8 h-6 transition-colors
              ${value === opt.value
                ? 'bg-app-accent text-white'
                : 'text-app-muted hover:text-app-text hover:bg-app-hover'
              }
            `}
          >
            {opt.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
