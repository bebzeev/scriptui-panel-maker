import React from 'react'
import type { RendererProps } from '../index'
import type { ProgressbarStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function ProgressbarRenderer({ item }: RendererProps) {
  const style = item.style as ProgressbarStyle
  const pct = Math.max(0, Math.min(100, Math.round(((style.value ?? 50) / (style.maxvalue ?? 100)) * 100)))
  const isEnabled = style.enabled !== false

  const size = sizeToCSS(style.preferredSize)

  return (
    <ItemWrapper item={item} style={{ display: 'inline-flex', alignItems: 'center', ...alignmentToCSS(style.alignment) }}>
      <div
        style={{
          background: 'var(--sui-progressbar-bg)',
          border: '1px solid var(--sui-progressbar-border)',
          borderRadius: 'var(--sui-progressbar-radius)',
          height: 8,
          minWidth: 100,
          overflow: 'hidden',
          opacity: isEnabled ? 1 : 0.4,
          ...size,
        }}
      >
        <div
          style={{
            background: 'var(--sui-progressbar-fill)',
            height: '100%',
            width: `${pct}%`,
            borderRadius: 'var(--sui-progressbar-radius)',
          }}
        />
      </div>
    </ItemWrapper>
  )
}
