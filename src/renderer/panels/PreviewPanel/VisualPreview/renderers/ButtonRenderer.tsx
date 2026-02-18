import React from 'react'
import type { RendererProps } from '../index'
import type { ButtonStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function ButtonRenderer({ item }: RendererProps) {
  const style = item.style as ButtonStyle
  return (
    <ItemWrapper item={item} style={{ display: 'flex', ...alignmentToCSS(style.alignment) }}>
      <button
        disabled={!style.enabled}
        style={{
          border: '1px solid var(--sui-button-border)',
          borderRadius: 'var(--sui-button-radius)',
          background: 'transparent',
          color: 'var(--sui-text)',
          fontSize: 11,
          padding: '3px 16px',
          cursor: 'pointer',
          textAlign: style.justify ?? 'center',
          ...sizeToCSS(style.preferredSize),
        }}
      >
        {style.text || 'Button'}
      </button>
    </ItemWrapper>
  )
}
