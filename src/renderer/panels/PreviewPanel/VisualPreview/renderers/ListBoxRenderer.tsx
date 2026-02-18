import React from 'react'
import type { RendererProps } from '../index'
import type { ListBoxStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function ListBoxRenderer({ item }: RendererProps) {
  const style = item.style as ListBoxStyle
  const items = (style.listItems || '').split(',').map((s) => s.trim()).filter(Boolean)
  const isEnabled = style.enabled !== false

  return (
    <ItemWrapper item={item} style={{ display: 'inline-flex', ...alignmentToCSS(style.alignment) }}>
      <div
        style={{
          background: 'var(--sui-listbox-bg)',
          border: '1px solid var(--sui-listbox-border)',
          borderRadius: 1,
          fontSize: 11,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'auto',
          opacity: isEnabled ? 1 : 0.4,
          ...sizeToCSS(style.preferredSize),
          minWidth: 80,
          minHeight: 64,
        }}
      >
        {items.map((itm, i) => (
          <div
            key={i}
            style={{
              padding: '2px 6px',
              color: 'var(--sui-text)',
              background: style.selection?.includes(i) ? 'var(--sui-listbox-sel-bg)' : 'transparent',
              userSelect: 'none',
            }}
          >
            {itm}
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ padding: '2px 6px', color: 'var(--sui-text-disabled)', fontStyle: 'italic' }}>
            (empty)
          </div>
        )}
      </div>
    </ItemWrapper>
  )
}
