import React from 'react'
import { JustifyField } from '../fields/JustifyField'
import { CheckboxField } from '../fields/CheckboxField'
import { NumberField } from '../fields/NumberField'
import { TextField } from '../fields/TextField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'
import type { JustifyValue, FontDescriptor } from '../../../types/schema'

const FONT_STYLES: { value: FontDescriptor['style']; label: string }[] = [
  { value: 'regular', label: 'Regular' },
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'bold-italic', label: 'Bold Italic' },
]

export function TextStyleSection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as Record<string, unknown>
  const update = (patch: Record<string, unknown>) =>
    updateItemStyle(itemId, patch as Parameters<typeof updateItemStyle>[1])

  const font = style.font as FontDescriptor | undefined

  return (
    <div className="space-y-2">
      {'justify' in style && (
        <JustifyField
          value={style.justify as JustifyValue}
          onChange={(v) => update({ justify: v })}
        />
      )}

      {'softWrap' in style && (
        <CheckboxField
          label="Soft Wrap"
          value={style.softWrap as boolean}
          onChange={(v) => update({ softWrap: v })}
        />
      )}

      {/* Font */}
      <div className="space-y-1.5">
        <div className="text-2xs text-app-muted">Font</div>
        <TextField
          label="Family"
          value={font?.name ?? ''}
          onChange={(v) =>
            update({ font: { name: v, size: font?.size ?? 12, style: font?.style ?? 'regular' } })
          }
          placeholder="System default"
        />
        <NumberField
          label="Size (pt)"
          value={font?.size ?? 0}
          onChange={(v) =>
            update({ font: { name: font?.name ?? '', size: v, style: font?.style ?? 'regular' } })
          }
          min={6}
          max={72}
        />
        {font && (
          <div className="flex items-center gap-2">
            <label className="text-2xs text-app-muted w-20">Style</label>
            <select
              value={font.style}
              onChange={(e) =>
                update({ font: { ...font, style: e.target.value as FontDescriptor['style'] } })
              }
              className="flex-1 px-2 py-1 text-xs bg-app-active border border-app-border rounded text-app-text focus:outline-none"
            >
              {FONT_STYLES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
