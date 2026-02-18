import React from 'react'
import type { RendererProps } from '../index'
import { ItemWrapper } from './shared'

export function DividerRenderer({ item, state }: RendererProps) {
  const parentStyle = item.parentId ? (state.items[item.parentId]?.style as Record<string, unknown>) : null
  const isVertical = (parentStyle?.orientation as string) === 'row'

  return (
    <ItemWrapper item={item} style={{ display: 'flex', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
      {/* AE divider: two 1px lines (dark + light) for etched look */}
      <div
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'row' : 'column',
          alignSelf: 'stretch',
          margin: isVertical ? '0 4px' : '4px 0',
          width: isVertical ? undefined : '100%',
          height: isVertical ? '100%' : undefined,
          gap: 1,
        }}
      >
        <div style={{
          background: 'var(--sui-divider-dark)',
          width: isVertical ? 1 : '100%',
          height: isVertical ? '100%' : 1,
          flexShrink: 0,
        }} />
        <div style={{
          background: 'var(--sui-divider-light)',
          width: isVertical ? 1 : '100%',
          height: isVertical ? '100%' : 1,
          flexShrink: 0,
        }} />
      </div>
    </ItemWrapper>
  )
}
