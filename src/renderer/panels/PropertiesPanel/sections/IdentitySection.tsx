import React from 'react'
import { TextField } from '../fields/TextField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'

export function IdentitySection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as { varName?: string | null }

  return (
    <TextField
      label="Variable Name"
      value={style.varName ?? ''}
      onChange={(v) => updateItemStyle(itemId, { varName: v || null } as Parameters<typeof updateItemStyle>[1])}
      placeholder="Auto-generated"
      monospace
    />
  )
}
