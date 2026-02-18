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
    minWidth: 200,
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
        borderRadius: 3,
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    >
      {/* AE-accurate title bar: very dark charcoal, small text, no close buttons on palette */}
      <div
        style={{
          background: 'var(--sui-titlebar-bg)',
          borderBottom: '1px solid var(--sui-titlebar-border)',
          height: 20,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8,
          paddingRight: 8,
          flexShrink: 0,
          userSelect: 'none',
        }}
      >
        <span
          style={{
            color: 'var(--sui-titlebar-text)',
            fontSize: 11,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 400,
          }}
        >
          {style.text || 'Panel'}
        </span>
        {/* Hamburger/options icon (AE panels have ≡ menu) */}
        <div
          style={{
            marginLeft: 'auto',
            color: 'var(--sui-titlebar-text)',
            fontSize: 14,
            lineHeight: 1,
            opacity: 0.7,
          }}
        >
          ☰
        </div>
      </div>

      {/* Panel body */}
      <ItemWrapper
        item={item}
        style={containerStyle}
      >
        {renderChildren(item.id)}
      </ItemWrapper>
    </div>
  )
}
