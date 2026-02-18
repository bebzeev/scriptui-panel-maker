import React from 'react'
import { ColorField } from '../fields/ColorField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'
import type { ScriptUIColor } from '../../../types/schema'

export function ColorsSection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as Record<string, unknown>
  const update = (patch: Record<string, unknown>) =>
    updateItemStyle(itemId, patch as Parameters<typeof updateItemStyle>[1])

  return (
    <div className="space-y-2">
      {'foregroundColor' in style || true ? (
        <ColorField
          label="Foreground"
          value={style.foregroundColor as ScriptUIColor | undefined}
          onChange={(v) => update({ foregroundColor: v })}
        />
      ) : null}
      {'backgroundColor' in style || true ? (
        <ColorField
          label="Background"
          value={style.backgroundColor as ScriptUIColor | undefined}
          onChange={(v) => update({ backgroundColor: v })}
        />
      ) : null}
      <p className="text-2xs text-app-muted">
        Note: Not all ScriptUI elements support color overrides in all Adobe apps.
      </p>
    </div>
  )
}
