import React from 'react'

interface CheckboxFieldProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
  description?: string
}

export function CheckboxField({ label, value, onChange, description }: CheckboxFieldProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="w-3 h-3 accent-app-accent"
      />
      <div>
        <span className="text-xs text-app-text group-hover:text-white transition-colors">{label}</span>
        {description && <div className="text-2xs text-app-muted">{description}</div>}
      </div>
    </label>
  )
}
