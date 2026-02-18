import React from 'react'
import type { RendererProps } from '../index'
import type { ProgressbarStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function ProgressbarRenderer({ item }: RendererProps) {
  const style = item.style as ProgressbarStyle
  const pct = Math.round(((style.value ?? 50) / (style.maxvalue ?? 100)) * 100)

  return (
    <ItemWrapper item={item} style={{ display: 'flex', alignItems: 'center', ...alignmentToCSS(style.alignment) }}>
      <div
        style={{
          background: 'var(--sui-progressbar-bg)',
          borderRadius: 'var(--sui-progressbar-radius)',
          height: 4,
          minWidth: 100,
          overflow: 'hidden',
          ...sizeToCSS(style.preferredSize),
        }}
      >
        <div
          style={{
            background: 'var(--sui-progressbar-fill)',
            height: '100%',
            width: `${pct}%`,
            borderRadius: 'var(--sui-progressbar-radius)',
            transition: 'width 0.2s',
          }}
        />
      </div>
    </ItemWrapper>
  )
}
