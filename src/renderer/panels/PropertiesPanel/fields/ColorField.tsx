import React from 'react'
import type { ScriptUIColor } from '../../../types/schema'

interface ColorFieldProps {
  label: string
  value: ScriptUIColor | undefined
  onChange: (value: ScriptUIColor | undefined) => void
}

function toHex({ r, g, b }: ScriptUIColor): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function fromHex(hex: string): ScriptUIColor {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  const hexValue = value ? toHex(value) : '#cccccc'
  const isSet = value !== undefined

  return (
    <div className="flex items-center gap-2">
      <label className="text-2xs text-app-muted w-24 flex-shrink-0">{label}</label>
      <div className="flex items-center gap-1.5">
        <input
          type="color"
          value={hexValue}
          onChange={(e) => onChange(fromHex(e.target.value))}
          className="w-6 h-6 rounded cursor-pointer border border-app-border"
          disabled={!isSet}
        />
        <span className="text-xs text-app-muted font-mono">{isSet ? hexValue : 'default'}</span>
        <button
          onClick={() => onChange(isSet ? undefined : { r: 204, g: 204, b: 204 })}
          className="text-2xs text-app-muted hover:text-app-text px-1"
        >
          {isSet ? 'reset' : 'set'}
        </button>
      </div>
    </div>
  )
}
