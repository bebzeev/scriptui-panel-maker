import React from 'react'
import type { RendererProps } from '../index'
import type { DropDownListStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function DropDownListRenderer({ item }: RendererProps) {
  const style = item.style as DropDownListStyle
  const items = (style.listItems || '').split(',').map((s) => s.trim()).filter((s) => s && s !== '-')

  return (
    <ItemWrapper item={item} style={{ display: 'flex', ...alignmentToCSS(style.alignment) }}>
      <select
        style={{
          background: 'var(--sui-dropdown-bg)',
          border: '1px solid var(--sui-input-border)',
          color: 'var(--sui-input-text)',
          fontSize: 11,
          padding: '2px 4px',
          ...sizeToCSS(style.preferredSize),
          minWidth: 80,
        }}
      >
        {items.map((item, i) => (
          <option key={i} selected={i === (style.selection ?? 0)}>
            {item}
          </option>
        ))}
      </select>
    </ItemWrapper>
  )
}
