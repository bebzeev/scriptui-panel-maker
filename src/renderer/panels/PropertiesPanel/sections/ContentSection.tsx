import React from 'react'
import { TextField } from '../fields/TextField'
import { TextareaField } from '../fields/TextareaField'
import { ImageUploadField } from '../fields/ImageUploadField'
import { CheckboxField } from '../fields/CheckboxField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'

export function ContentSection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as Record<string, unknown>
  const type = item.type

  const update = (patch: Record<string, unknown>) =>
    updateItemStyle(itemId, patch as Parameters<typeof updateItemStyle>[1])

  return (
    <div className="space-y-2">
      {'text' in style && (
        <TextareaField
          label="Text"
          value={style.text as string}
          onChange={(v) => update({ text: v })}
          rows={type === 'StaticText' || type === 'EditText' ? 3 : 1}
          hint={type === 'StaticText' ? 'Use \\n for line breaks' : undefined}
        />
      )}

      {'listItems' in style && (
        <TextareaField
          label="List Items"
          value={style.listItems as string}
          onChange={(v) => update({ listItems: v })}
          rows={4}
          hint={'Comma-separated. Use " - " for dividers.'}
        />
      )}

      {'image' in style && (
        <ImageUploadField
          value={style.image as string | null}
          onChange={(v) => update({ image: v })}
        />
      )}

      {'expanded' in style && (
        <CheckboxField
          label="Expanded"
          value={style.expanded as boolean}
          onChange={(v) => update({ expanded: v })}
          description="Start expanded in TreeView"
        />
      )}
    </div>
  )
}
