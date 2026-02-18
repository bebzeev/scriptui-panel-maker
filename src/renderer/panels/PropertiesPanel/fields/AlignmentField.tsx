import React from 'react'
import { AlignLeft, AlignCenter, AlignRight, AlignStartHorizontal, AlignEndHorizontal, AlignCenterHorizontal, Maximize2 } from 'lucide-react'

type AlignValue = 'left' | 'center' | 'right' | 'fill' | 'top' | 'bottom' | null

interface AlignmentFieldProps {
  label: string
  value: AlignValue
  onChange: (value: AlignValue) => void
  axis: 'horizontal' | 'vertical'
}

const H_OPTIONS: { value: AlignValue; icon: React.ReactNode; title: string }[] = [
  { value: 'left', icon: <AlignLeft size={11} />, title: 'Left' },
  { value: 'center', icon: <AlignCenter size={11} />, title: 'Center' },
  { value: 'right', icon: <AlignRight size={11} />, title: 'Right' },
  { value: 'fill', icon: <Maximize2 size={11} />, title: 'Fill' },
]

const V_OPTIONS: { value: AlignValue; icon: React.ReactNode; title: string }[] = [
  { value: 'top', icon: <AlignStartHorizontal size={11} />, title: 'Top' },
  { value: 'center', icon: <AlignCenterHorizontal size={11} />, title: 'Center' },
  { value: 'bottom', icon: <AlignEndHorizontal size={11} />, title: 'Bottom' },
  { value: 'fill', icon: <Maximize2 size={11} />, title: 'Fill' },
]

export function AlignmentField({ label, value, onChange, axis }: AlignmentFieldProps) {
  const options = axis === 'horizontal' ? H_OPTIONS : V_OPTIONS

  return (
    <div className="flex items-center gap-2">
      <label className="text-2xs text-app-muted w-20 flex-shrink-0">{label}</label>
      <div className="flex gap-0.5">
        <button
          title="None (auto)"
          onClick={() => onChange(null)}
          className={`
            flex items-center justify-center w-6 h-6 rounded text-2xs transition-colors border
            ${value === null
              ? 'bg-app-accent text-white border-app-accent'
              : 'text-app-muted hover:text-app-text hover:bg-app-hover border-app-border'
            }
          `}
        >
          –
        </button>
        {options.map((opt) => (
          <button
            key={opt.value}
            title={opt.title}
            onClick={() => onChange(opt.value)}
            className={`
              flex items-center justify-center w-6 h-6 rounded transition-colors border
              ${value === opt.value
                ? 'bg-app-accent text-white border-app-accent'
                : 'text-app-muted hover:text-app-text hover:bg-app-hover border-app-border'
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
