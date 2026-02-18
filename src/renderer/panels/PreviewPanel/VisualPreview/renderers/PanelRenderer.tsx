import React from 'react'
import type { RendererProps } from '../index'
import type { PanelStyle } from '../../../../types/schema'
import { ItemWrapper, marginsToCSS, alignChildrenToCSS, alignmentToCSS, sizeToCSS } from './shared'

const BORDER_STYLE_MAP: Record<string, string> = {
  etched: 'var(--sui-panel-border-etched)',
  raised: 'var(--sui-panel-border-raised)',
  sunken: 'var(--sui-panel-border-sunken)',
  gray: 'var(--sui-panel-border-gray)',
  black: 'var(--sui-panel-border-black)',
}

export function PanelRenderer({ item, renderChildren }: RendererProps) {
  const style = item.style as PanelStyle
  const borderStyle = style.creationProps?.borderStyle ?? 'etched'

  const containerStyle: React.CSSProperties = {
    background: 'var(--sui-panel-bg)',
    boxShadow: BORDER_STYLE_MAP[borderStyle],
    borderRadius: 2,
    padding: marginsToCSS(style.margins),
    paddingTop: style.text ? 18 : marginsToCSS(style.margins),
    display: 'flex',
    flexDirection: style.orientation === 'row' ? 'row' : 'column',
    gap: `${style.spacing}px`,
    position: 'relative',
    ...sizeToCSS(style.preferredSize),
    ...alignChildrenToCSS(style.alignChildren, style.orientation),
    ...alignmentToCSS(style.alignment),
  }

  return (
    <ItemWrapper item={item} style={containerStyle}>
      {style.text && (
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 8,
            fontSize: 11,
            color: 'var(--sui-text-label)',
            background: 'var(--sui-panel-bg)',
            paddingInline: 4,
            lineHeight: 1,
          }}
        >
          {style.text}
        </div>
      )}
      {renderChildren(item.id)}
    </ItemWrapper>
  )
}
