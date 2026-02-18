import React from 'react'
import { CheckboxField } from '../fields/CheckboxField'
import { TextareaField } from '../fields/TextareaField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'

export function BehaviorSection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as Record<string, unknown>
  const update = (patch: Record<string, unknown>) =>
    updateItemStyle(itemId, patch as Parameters<typeof updateItemStyle>[1])

  return (
    <div className="space-y-2">
      <CheckboxField
        label="Enabled"
        value={style.enabled as boolean}
        onChange={(v) => update({ enabled: v })}
      />
      <CheckboxField
        label="Visible"
        value={style.visible as boolean}
        onChange={(v) => update({ visible: v })}
        description="Hidden elements are commented out in the generated code"
      />
      {'helpTip' in style && (
        <TextareaField
          label="Tooltip"
          value={(style.helpTip as string) ?? ''}
          onChange={(v) => update({ helpTip: v || null })}
          rows={2}
          placeholder="Tooltip text (\\n for line break)"
        />
      )}
    </div>
  )
}
