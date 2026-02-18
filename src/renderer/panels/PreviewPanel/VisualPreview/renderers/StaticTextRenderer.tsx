import React from 'react'
import type { RendererProps } from '../index'
import type { StaticTextStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function StaticTextRenderer({ item }: RendererProps) {
  const style = item.style as StaticTextStyle
  // Handle \n in text
  const lines = (style.text || 'StaticText').split('\\n')

  return (
    <ItemWrapper item={item} style={{ display: 'flex', ...alignmentToCSS(style.alignment) }}>
      <div
        style={{
          color: style.foregroundColor
            ? `rgb(${style.foregroundColor.r},${style.foregroundColor.g},${style.foregroundColor.b})`
            : 'var(--sui-text)',
          fontSize: style.font?.size ?? 11,
          fontFamily: style.font?.name ?? undefined,
          fontWeight: style.font?.style?.includes('bold') ? 'bold' : 'normal',
          fontStyle: style.font?.style?.includes('italic') ? 'italic' : 'normal',
          textAlign: style.justify ?? 'left',
          ...sizeToCSS(style.preferredSize),
        }}
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </ItemWrapper>
  )
}
