import React from 'react'
import { AlignmentField } from '../fields/AlignmentField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'
import type { AlignH, AlignV } from '../../../types/schema'

export function AlignmentSection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const parentItem = useAppStore((s) => {
    const it = s.items[itemId]
    return it?.parentId ? s.items[it.parentId] : null
  })
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as Record<string, unknown>
  const parentStyle = parentItem?.style as Record<string, unknown> | undefined
  const parentOrientation = (parentStyle?.orientation as string) ?? 'column'
  const update = (patch: Record<string, unknown>) =>
    updateItemStyle(itemId, patch as Parameters<typeof updateItemStyle>[1])

  return (
    <div className="space-y-2">
      {'alignment' in style && (
        <AlignmentField
          label="Self"
          value={style.alignment as AlignH | AlignV | null}
          onChange={(v) => update({ alignment: v })}
          axis={parentOrientation === 'column' ? 'horizontal' : 'vertical'}
        />
      )}

      {'alignChildren' in style && (
        <>
          <AlignmentField
            label="Children H"
            value={(style.alignChildren as [AlignH, AlignV])?.[0] ?? null}
            onChange={(v) => update({ alignChildren: [v ?? 'left', (style.alignChildren as [AlignH, AlignV])?.[1] ?? 'top'] })}
            axis="horizontal"
          />
          <AlignmentField
            label="Children V"
            value={(style.alignChildren as [AlignH, AlignV])?.[1] ?? null}
            onChange={(v) => update({ alignChildren: [(style.alignChildren as [AlignH, AlignV])?.[0] ?? 'left', v ?? 'top'] })}
            axis="vertical"
          />
        </>
      )}
    </div>
  )
}
