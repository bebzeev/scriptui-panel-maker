import React, { useState } from 'react'
import { Link, Unlink } from 'lucide-react'
import type { MarginsValue } from '../../../types/schema'

interface MarginsFieldProps {
  value: MarginsValue
  onChange: (value: MarginsValue) => void
}

export function MarginsField({ value, onChange }: MarginsFieldProps) {
  const isUniform = typeof value === 'number'
  const [linked, setLinked] = useState(isUniform)

  const [top, right, bottom, left_] = isUniform ? [value, value, value, value] : value

  const handleUniform = (v: number) => {
    onChange(v)
  }

  const handleSide = (side: 'top' | 'right' | 'bottom' | 'left', v: number) => {
    const current: [number, number, number, number] = isUniform
      ? [value, value, value, value]
      : [...value]
    const idx = { top: 0, right: 1, bottom: 2, left: 3 }[side]
    current[idx] = v
    onChange(current)
  }

  const toggleLinked = () => {
    if (!linked) {
      // Switch to uniform — use current top value
      onChange(top)
    } else {
      // Switch to individual
      onChange([top, right, bottom, left_])
    }
    setLinked(!linked)
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 justify-between">
        <label className="text-2xs text-app-muted">Margins</label>
        <button onClick={toggleLinked} title={linked ? 'Use individual values' : 'Use uniform value'} className="text-app-muted hover:text-app-text">
          {linked ? <Link size={10} /> : <Unlink size={10} />}
        </button>
      </div>
      {linked ? (
        <input
          type="number"
          min={0}
          value={top}
          onChange={(e) => handleUniform(parseInt(e.target.value) || 0)}
          className="w-full px-2 py-1 text-xs bg-app-active border border-app-border rounded text-app-text focus:outline-none focus:border-app-accent"
        />
      ) : (
        <div className="grid grid-cols-2 gap-1">
          {(['top', 'right', 'bottom', 'left'] as const).map((side, i) => (
            <div key={side} className="flex items-center gap-1">
              <span className="text-2xs text-app-muted w-8 capitalize">{side}</span>
              <input
                type="number"
                min={0}
                value={[top, right, bottom, left_][i]}
                onChange={(e) => handleSide(side, parseInt(e.target.value) || 0)}
                className="flex-1 px-1 py-1 text-xs bg-app-active border border-app-border rounded text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
