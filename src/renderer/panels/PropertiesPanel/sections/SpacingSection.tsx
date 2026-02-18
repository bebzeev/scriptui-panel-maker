import React from 'react'
import { MarginsField } from '../fields/MarginsField'
import { NumberField } from '../fields/NumberField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'
import type { MarginsValue } from '../../../types/schema'

export function SpacingSection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as Record<string, unknown>
  const update = (patch: Record<string, unknown>) =>
    updateItemStyle(itemId, patch as Parameters<typeof updateItemStyle>[1])

  return (
    <div className="space-y-2">
      {'margins' in style && (
        <MarginsField
          value={style.margins as MarginsValue}
          onChange={(v) => update({ margins: v })}
        />
      )}
      {'spacing' in style && (
        <NumberField
          label="Spacing"
          value={style.spacing as number}
          onChange={(v) => update({ spacing: v })}
          min={0}
        />
      )}
    </div>
  )
}
