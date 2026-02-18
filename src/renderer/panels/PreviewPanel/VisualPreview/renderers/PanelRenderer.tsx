import React from 'react'
import type { RendererProps } from '../index'
import type { PanelStyle } from '../../../../types/schema'
import { ItemWrapper, marginsToCSS, alignChildrenToCSS, alignmentToCSS, sizeToCSS } from './shared'

export function PanelRenderer({ item, renderChildren }: RendererProps) {
  const style = item.style as PanelStyle
  const hasTitle = Boolean(style.text)
  // Top padding must account for the title label that sits on the border
  const topPad = hasTitle ? 16 : (typeof style.margins === 'number' ? style.margins : style.margins[0])

  const containerStyle: React.CSSProperties = {
    background: 'var(--sui-panel-bg)',
    // Rounded border matching the AE "New Item Naming" / "Options" panel look
    border: '1px solid var(--sui-panel-border-color)',
    borderRadius: 4,
    padding: marginsToCSS(style.margins),
    paddingTop: topPad,
    display: 'flex',
    flexDirection: style.orientation === 'row' ? 'row' : 'column',
    gap: `${style.spacing ?? 4}px`,
    position: 'relative',
    boxSizing: 'border-box',
    ...sizeToCSS(style.preferredSize),
    ...alignChildrenToCSS(style.alignChildren, style.orientation),
    ...alignmentToCSS(style.alignment),
  }

  return (
    <ItemWrapper item={item} style={containerStyle}>
      {hasTitle && (
        /* Title label sits ON the top border line, like a fieldset/legend */
        <div
          style={{
            position: 'absolute',
            top: -1,
            left: 10,
            // Match panel background so it "cuts" through the border
            background: 'var(--sui-panel-bg)',
            paddingInline: 4,
            fontSize: 11,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: 'var(--sui-text-label)',
            lineHeight: '14px',
            height: 14,
            // Shift up so the text midpoint aligns with the border
            transform: 'translateY(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          {style.text}
        </div>
      )}
      {renderChildren(item.id)}
    </ItemWrapper>
  )
}
