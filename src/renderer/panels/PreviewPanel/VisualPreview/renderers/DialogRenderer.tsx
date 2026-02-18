import React from 'react'
import type { RendererProps } from '../index'
import type { DialogStyle } from '../../../../types/schema'
import { ItemWrapper, marginsToCSS, alignChildrenToCSS, sizeToCSS } from './shared'

export function DialogRenderer({ item, renderChildren }: RendererProps) {
  const style = item.style as DialogStyle

  const containerStyle: React.CSSProperties = {
    background: 'var(--sui-bg)',
    display: 'flex',
    flexDirection: style.orientation === 'row' ? 'row' : 'column',
    gap: `${style.spacing ?? 10}px`,
    padding: marginsToCSS(style.margins),
    minWidth: 220,
    boxSizing: 'border-box',
    ...sizeToCSS(style.preferredSize),
    ...alignChildrenToCSS(style.alignChildren, style.orientation),
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        boxShadow: 'var(--sui-dialog-shadow)',
        // AE panels have a 1–2px blue/teal focus highlight on the active panel edge
        border: '1px solid #1e6fa5',
        borderRadius: 3,
        overflow: 'visible',
        maxWidth: '100%',
      }}
    >
      {/* AE-accurate title bar: very dark, small gray text, ☰ menu icon */}
      <div
        style={{
          background: 'var(--sui-titlebar-bg)',
          borderBottom: '1px solid var(--sui-titlebar-border)',
          borderRadius: '2px 2px 0 0',
          height: 24,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 8,
          flexShrink: 0,
          userSelect: 'none',
          gap: 8,
        }}
      >
        <span
          style={{
            color: 'var(--sui-titlebar-text)',
            fontSize: 11,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 400,
            flex: 1,
          }}
        >
          {style.text || 'Panel'}
        </span>
        {/* AE panels have a ≡ options menu icon on the right */}
        <span
          style={{
            color: 'var(--sui-titlebar-text)',
            fontSize: 13,
            opacity: 0.6,
            lineHeight: 1,
            cursor: 'default',
          }}
        >
          ☰
        </span>
      </div>

      {/* Panel body */}
      <ItemWrapper item={item} style={containerStyle}>
        {renderChildren(item.id)}
      </ItemWrapper>
    </div>
  )
}
