import React from 'react'
import type { RendererProps } from '../index'
import type { GroupStyle } from '../../../../types/schema'
import { ItemWrapper, marginsToCSS, alignChildrenToCSS, alignmentToCSS, sizeToCSS } from './shared'

export function GroupRenderer({ item, renderChildren }: RendererProps) {
  const style = item.style as GroupStyle

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: style.orientation === 'row' ? 'row' : 'column',
    gap: `${style.spacing}px`,
    padding: marginsToCSS(style.margins),
    ...sizeToCSS(style.preferredSize),
    ...alignChildrenToCSS(style.alignChildren, style.orientation),
    ...alignmentToCSS(style.alignment),
  }

  return (
    <ItemWrapper item={item} style={containerStyle}>
      {renderChildren(item.id)}
    </ItemWrapper>
  )
}
