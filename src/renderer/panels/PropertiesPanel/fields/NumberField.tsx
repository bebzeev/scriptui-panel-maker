import React from 'react'

interface NumberFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export function NumberField({ label, value, onChange, min, max, step = 1 }: NumberFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-2xs text-app-muted w-20 flex-shrink-0">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="
          flex-1 px-2 py-1 text-xs bg-app-active border border-app-border rounded
          text-app-text focus:outline-none focus:border-app-accent
        "
      />
    </div>
  )
}
