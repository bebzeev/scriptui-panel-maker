import React from 'react'
import type { RendererProps } from '../index'
import { ItemWrapper } from './shared'

export function DividerRenderer({ item, state }: RendererProps) {
  const parentStyle = item.parentId ? (state.items[item.parentId]?.style as Record<string, unknown>) : null
  const isVertical = (parentStyle?.orientation as string) === 'row'

  return (
    <ItemWrapper item={item}>
      <div
        style={{
          background: 'var(--sui-divider)',
          width: isVertical ? 1 : '100%',
          height: isVertical ? '100%' : 1,
          minWidth: isVertical ? 1 : undefined,
          minHeight: isVertical ? undefined : 1,
          alignSelf: 'stretch',
          margin: isVertical ? '0 2px' : '2px 0',
        }}
      />
    </ItemWrapper>
  )
}
