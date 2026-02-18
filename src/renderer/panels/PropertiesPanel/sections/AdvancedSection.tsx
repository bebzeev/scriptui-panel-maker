import React from 'react'
import { NumberField } from '../fields/NumberField'
import { CheckboxField } from '../fields/CheckboxField'
import { NumberField as NF } from '../fields/NumberField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'

export function AdvancedSection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as Record<string, unknown>
  const update = (patch: Record<string, unknown>) =>
    updateItemStyle(itemId, patch as Parameters<typeof updateItemStyle>[1])
  const type = item.type

  return (
    <div className="space-y-2">
      {/* Slider: min, max, value */}
      {type === 'Slider' && (
        <>
          <NumberField label="Min" value={style.minvalue as number} onChange={(v) => update({ minvalue: v })} />
          <NumberField label="Max" value={style.maxvalue as number} onChange={(v) => update({ maxvalue: v })} />
          <NumberField
            label="Value"
            value={style.value as number}
            min={style.minvalue as number}
            max={style.maxvalue as number}
            onChange={(v) => update({ value: v })}
          />
        </>
      )}

      {/* Progressbar: value, maxvalue */}
      {type === 'Progressbar' && (
        <>
          <NumberField label="Max" value={style.maxvalue as number} onChange={(v) => update({ maxvalue: v })} min={0} />
          <NumberField
            label="Value"
            value={style.value as number}
            min={0}
            max={style.maxvalue as number}
            onChange={(v) => update({ value: v })}
          />
        </>
      )}

      {/* Checkbox/RadioButton: checked value */}
      {(type === 'Checkbox' || type === 'RadioButton') && (
        <CheckboxField
          label={type === 'Checkbox' ? 'Checked' : 'Selected'}
          value={style.value as boolean}
          onChange={(v) => update({ value: v })}
        />
      )}

      {/* TreeItem: expanded */}
      {type === 'TreeItem' && (
        <CheckboxField
          label="Expanded"
          value={style.expanded as boolean}
          onChange={(v) => update({ expanded: v })}
        />
      )}

      {/* VerticalTabbedPanel: tabNavWidth */}
      {type === 'VerticalTabbedPanel' && (
        <NF
          label="Nav Width"
          value={style.tabNavWidth as number}
          onChange={(v) => update({ tabNavWidth: v })}
          min={50}
          max={400}
        />
      )}
    </div>
  )
}
