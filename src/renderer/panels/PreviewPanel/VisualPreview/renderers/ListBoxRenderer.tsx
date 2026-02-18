import React from 'react'
import type { RendererProps } from '../index'
import type { ListBoxStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function ListBoxRenderer({ item }: RendererProps) {
  const style = item.style as ListBoxStyle
  const items = (style.listItems || '').split(',').map((s) => s.trim()).filter(Boolean)

  return (
    <ItemWrapper item={item} style={{ display: 'flex', ...alignmentToCSS(style.alignment) }}>
      <div
        style={{
          background: 'var(--sui-listbox-bg)',
          border: '1px solid var(--sui-listbox-border)',
          fontSize: 11,
          overflow: 'auto',
          ...sizeToCSS(style.preferredSize),
          minWidth: 80,
          minHeight: 60,
        }}
      >
        {items.map((itm, i) => (
          <div
            key={i}
            style={{
              padding: '1px 6px',
              color: style.selection.includes(i) ? 'white' : 'var(--sui-text)',
              background: style.selection.includes(i) ? 'var(--sui-listbox-sel-bg)' : 'transparent',
            }}
          >
            {itm}
          </div>
        ))}
      </div>
    </ItemWrapper>
  )
}
