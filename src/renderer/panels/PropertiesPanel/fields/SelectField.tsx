import React from 'react'

interface SelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-2xs text-app-muted w-20 flex-shrink-0">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          flex-1 px-2 py-1 text-xs bg-app-active border border-app-border rounded
          text-app-text focus:outline-none focus:border-app-accent
        "
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
