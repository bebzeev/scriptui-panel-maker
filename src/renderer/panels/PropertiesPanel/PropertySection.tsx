import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface PropertySectionProps {
  label: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function PropertySection({ label, children, defaultOpen = true }: PropertySectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-app-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 px-3 py-1.5 text-2xs font-semibold text-app-muted uppercase tracking-wider hover:text-app-text transition-colors"
      >
        {open ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
        {label}
      </button>
      {open && <div className="px-3 pb-3 space-y-2">{children}</div>}
    </div>
  )
}
