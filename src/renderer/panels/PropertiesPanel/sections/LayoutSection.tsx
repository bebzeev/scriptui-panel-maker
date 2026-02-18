import React from 'react'
import { SizeField } from '../fields/SizeField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'
import type { SizeValue, Orientation } from '../../../types/schema'

export function LayoutSection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as Record<string, unknown>
  const update = (patch: Record<string, unknown>) =>
    updateItemStyle(itemId, patch as Parameters<typeof updateItemStyle>[1])

  return (
    <div className="space-y-2">
      {'preferredSize' in style && (
        <SizeField
          value={style.preferredSize as SizeValue}
          onChange={(v) => update({ preferredSize: v })}
        />
      )}

      {'orientation' in style && (
        <div className="flex items-center gap-2">
          <label className="text-2xs text-app-muted w-20 flex-shrink-0">Orientation</label>
          <div className="flex border border-app-border rounded overflow-hidden">
            {(['row', 'column'] as Orientation[]).map((o) => (
              <button
                key={o}
                onClick={() => update({ orientation: o })}
                className={`
                  px-3 h-6 text-xs transition-colors capitalize
                  ${style.orientation === o
                    ? 'bg-app-accent text-white'
                    : 'text-app-muted hover:text-app-text hover:bg-app-hover'
                  }
                `}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
