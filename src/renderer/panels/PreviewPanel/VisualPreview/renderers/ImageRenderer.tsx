import React from 'react'
import type { RendererProps } from '../index'
import type { ImageStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function ImageRenderer({ item }: RendererProps) {
  const style = item.style as ImageStyle
  return (
    <ItemWrapper item={item} style={{ display: 'flex', ...alignmentToCSS(style.alignment) }}>
      {style.image ? (
        <img
          src={style.image}
          alt=""
          style={{
            display: 'block',
            objectFit: 'contain',
            ...sizeToCSS(style.preferredSize),
          }}
        />
      ) : (
        <div
          style={{
            border: '1px dashed var(--sui-input-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--sui-text-label)',
            fontSize: 10,
            padding: '8px 12px',
            ...sizeToCSS(style.preferredSize),
            minWidth: 40,
            minHeight: 20,
          }}
        >
          Image
        </div>
      )}
    </ItemWrapper>
  )
}
