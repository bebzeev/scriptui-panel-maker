import React from 'react'
import type { RendererProps } from '../index'
import type { DialogStyle } from '../../../../types/schema'
import { ItemWrapper, marginsToCSS, alignChildrenToCSS, sizeToCSS } from './shared'

export function DialogRenderer({ item, renderChildren }: RendererProps) {
  const style = item.style as DialogStyle

  const containerStyle: React.CSSProperties = {
    background: 'var(--sui-bg)',
    color: 'var(--sui-text)',
    display: 'flex',
    flexDirection: style.orientation === 'row' ? 'row' : 'column',
    gap: `${style.spacing}px`,
    padding: marginsToCSS(style.margins),
    boxShadow: 'var(--sui-dialog-shadow)',
    borderRadius: 4,
    minWidth: 200,
    ...sizeToCSS(style.preferredSize),
    ...alignChildrenToCSS(style.alignChildren, style.orientation),
  }

  return (
    <ItemWrapper item={item} style={containerStyle}>
      {/* Title bar simulation */}
      <div
        style={{
          position: 'absolute',
          top: -22,
          left: 0,
          right: 0,
          height: 22,
          background: 'linear-gradient(to bottom, #e5e5e5 0%, #d3d3d3 100%)',
          borderRadius: '4px 4px 0 0',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8,
          fontSize: 11,
          color: '#333',
          borderBottom: '1px solid #b6b6b6',
          userSelect: 'none',
        }}
      >
        <span style={{ marginRight: 'auto', paddingLeft: 4 }}>{style.text}</span>
      </div>
      <div style={{ ...containerStyle, padding: 0, boxShadow: 'none', marginTop: 22 }}>
        {renderChildren(item.id)}
      </div>
    </ItemWrapper>
  )
}
