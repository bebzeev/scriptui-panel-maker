import React from 'react'
import type { SizeValue } from '../../../types/schema'

interface SizeFieldProps {
  value: SizeValue
  onChange: (value: SizeValue) => void
}

export function SizeField({ value, onChange }: SizeFieldProps) {
  const [w, h] = value

  return (
    <div className="space-y-1">
      <label className="block text-2xs text-app-muted">Preferred Size</label>
      <div className="flex gap-2">
        <SizeDimension label="W" value={w} onChange={(v) => onChange([v, h])} />
        <SizeDimension label="H" value={h} onChange={(v) => onChange([w, v])} />
      </div>
      <p className="text-2xs text-app-muted">0 = auto</p>
    </div>
  )
}

function SizeDimension({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex-1 flex items-center gap-1">
      <span className="text-2xs text-app-muted w-4">{label}</span>
      <div className="relative flex-1">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="
            w-full pl-2 pr-1 py-1 text-xs bg-app-active border border-app-border rounded
            text-app-text focus:outline-none focus:border-app-accent
          "
        />
        {value === 0 && (
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-2xs text-app-muted pointer-events-none">
            auto
          </span>
        )}
      </div>
    </div>
  )
}
