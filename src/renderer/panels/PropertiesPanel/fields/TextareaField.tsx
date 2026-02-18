import React from 'react'

interface TextareaFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  hint?: string
}

export function TextareaField({ label, value, onChange, placeholder, rows = 3, hint }: TextareaFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-2xs text-app-muted">{label}</label>
      <textarea
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full px-2 py-1 text-xs bg-app-active border border-app-border rounded
          text-app-text placeholder-app-muted focus:outline-none focus:border-app-accent resize-none
          font-mono
        "
      />
      {hint && <p className="text-2xs text-app-muted">{hint}</p>}
    </div>
  )
}
