import React from 'react'
import type { RendererProps } from '../index'
import type { IconButtonStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function IconButtonRenderer({ item }: RendererProps) {
  const style = item.style as IconButtonStyle
  const isToolButton = style.creationProps?.style === 'toolbutton'

  return (
    <ItemWrapper item={item} style={{ display: 'flex', ...alignmentToCSS(style.alignment) }}>
      <button
        disabled={!style.enabled}
        style={{
          border: isToolButton ? 'none' : '1px solid var(--sui-iconbtn-border)',
          borderRadius: isToolButton ? 2 : 'var(--sui-button-radius)',
          background: 'transparent',
          padding: '2px 4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...sizeToCSS(style.preferredSize),
        }}
      >
        {style.image ? (
          <img src={style.image} alt={style.text} style={{ maxWidth: 24, maxHeight: 24 }} />
        ) : (
          <span style={{ color: 'var(--sui-text)', fontSize: 11, padding: '0 4px' }}>
            {style.text || '⬛'}
          </span>
        )}
      </button>
    </ItemWrapper>
  )
}
