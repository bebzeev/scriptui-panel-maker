import React from 'react'
import type { RendererProps } from '../index'
import type { IconButtonStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function IconButtonRenderer({ item }: RendererProps) {
  const style = item.style as IconButtonStyle
  const isToolButton = style.creationProps?.style === 'toolbutton'
  const isEnabled = style.enabled !== false

  return (
    <ItemWrapper item={item} style={{ display: 'inline-flex', ...alignmentToCSS(style.alignment) }}>
      <button
        disabled={!isEnabled}
        style={{
          border: isToolButton ? 'none' : '1px solid var(--sui-iconbtn-border)',
          borderRadius: 2,
          background: isEnabled ? 'var(--sui-iconbtn-bg)' : 'transparent',
          color: 'var(--sui-text)',
          padding: '3px 6px',
          cursor: isEnabled ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isEnabled ? 1 : 0.4,
          ...sizeToCSS(style.preferredSize),
        }}
      >
        {style.image ? (
          <img src={style.image} alt={style.text} style={{ maxWidth: 24, maxHeight: 24 }} />
        ) : (
          <span style={{ fontSize: 11, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {style.text || '⬛'}
          </span>
        )}
      </button>
    </ItemWrapper>
  )
}
