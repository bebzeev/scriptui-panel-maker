import React from 'react'
import type { RendererProps } from '../index'
import type { ButtonStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function ButtonRenderer({ item }: RendererProps) {
  const style = item.style as ButtonStyle
  const isEnabled = style.enabled !== false

  return (
    <ItemWrapper item={item} style={{ display: 'inline-flex', ...alignmentToCSS(style.alignment) }}>
      <button
        disabled={!isEnabled}
        style={{
          /* AE button: solid medium-gray bg, pill shape, gray border */
          background: isEnabled ? 'var(--sui-button-bg)' : 'transparent',
          border: '1px solid var(--sui-button-border)',
          borderRadius: 'var(--sui-button-radius)',
          color: isEnabled ? 'var(--sui-text)' : 'var(--sui-text-disabled)',
          fontSize: 11,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '3px 18px',
          cursor: isEnabled ? 'pointer' : 'not-allowed',
          textAlign: (style.justify ?? 'center') as React.CSSProperties['textAlign'],
          whiteSpace: 'nowrap',
          opacity: isEnabled ? 1 : 0.5,
          ...sizeToCSS(style.preferredSize),
        }}
      >
        {style.text || 'Button'}
      </button>
    </ItemWrapper>
  )
}
