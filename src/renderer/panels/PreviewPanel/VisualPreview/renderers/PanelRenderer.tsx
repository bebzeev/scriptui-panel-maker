import React from 'react'
import type { RendererProps } from '../index'
import type { PanelStyle } from '../../../../types/schema'
import { ItemWrapper, marginsToCSS, alignChildrenToCSS, alignmentToCSS, sizeToCSS } from './shared'

/** AE etched border: a 1px dark inset framed by a 1px lighter outer stroke */
function getEtchedBorder(borderStyle: string): React.CSSProperties {
  switch (borderStyle) {
    case 'etched':
      return {
        border: '1px solid var(--sui-panel-border-etched-dark)',
        boxShadow: 'inset 0 0 0 1px var(--sui-panel-border-etched-light)',
      }
    case 'raised':
      return { border: '1px solid var(--sui-panel-border-etched-light)' }
    case 'sunken':
      return {
        border: '1px solid var(--sui-panel-border-sunken-inner)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
      }
    case 'gray':
      return { border: '1px solid #808080' }
    case 'black':
      return { border: '1px solid #000' }
    default:
      return { border: '1px solid var(--sui-panel-border-etched-dark)' }
  }
}

export function PanelRenderer({ item, renderChildren }: RendererProps) {
  const style = item.style as PanelStyle
  const borderStyle = style.creationProps?.borderStyle ?? 'etched'
  const hasTitle = Boolean(style.text)
  const TITLE_HEIGHT = 14

  const containerStyle: React.CSSProperties = {
    background: 'var(--sui-panel-bg)',
    borderRadius: 2,
    padding: marginsToCSS(style.margins),
    paddingTop: hasTitle
      ? `${TITLE_HEIGHT + 4}px`
      : marginsToCSS(style.margins),
    display: 'flex',
    flexDirection: style.orientation === 'row' ? 'row' : 'column',
    gap: `${style.spacing ?? 4}px`,
    position: 'relative',
    boxSizing: 'border-box',
    ...getEtchedBorder(borderStyle),
    ...sizeToCSS(style.preferredSize),
    ...alignChildrenToCSS(style.alignChildren, style.orientation),
    ...alignmentToCSS(style.alignment),
  }

  return (
    <ItemWrapper item={item} style={containerStyle}>
      {hasTitle && (
        <div
          style={{
            position: 'absolute',
            top: -1,
            left: 8,
            fontSize: 11,
            color: 'var(--sui-text-label)',
            background: 'var(--sui-panel-bg)',
            paddingInline: 3,
            lineHeight: `${TITLE_HEIGHT}px`,
            height: TITLE_HEIGHT,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {style.text}
        </div>
      )}
      {renderChildren(item.id)}
    </ItemWrapper>
  )
}
