import React from 'react'

interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  monospace?: boolean
}

export function TextField({ label, value, onChange, placeholder, monospace }: TextFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-2xs text-app-muted">{label}</label>
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-2 py-1 text-xs bg-app-active border border-app-border rounded
          text-app-text placeholder-app-muted focus:outline-none focus:border-app-accent
          ${monospace ? 'font-mono' : ''}
        `}
      />
    </div>
  )
}
