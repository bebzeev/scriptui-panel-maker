import React from 'react'
import type { RendererProps } from '../index'
import type { DropDownListStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function DropDownListRenderer({ item }: RendererProps) {
  const style = item.style as DropDownListStyle
  const rawItems = (style.listItems || '').split(',').map((s) => s.trim()).filter(Boolean)
  const selected = rawItems[style.selection ?? 0] ?? rawItems[0] ?? ''
  const isEnabled = style.enabled !== false

  return (
    <ItemWrapper item={item} style={{ display: 'inline-flex', ...alignmentToCSS(style.alignment) }}>
      {/* Custom AE-accurate dropdown: dark bg + darker arrow box on right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          border: '1px solid var(--sui-dropdown-border)',
          background: 'var(--sui-dropdown-bg)',
          borderRadius: 1,
          opacity: isEnabled ? 1 : 0.4,
          minWidth: 80,
          ...sizeToCSS(style.preferredSize),
        }}
      >
        {/* Text area */}
        <div
          style={{
            flex: 1,
            padding: '2px 6px',
            color: 'var(--sui-input-text)',
            fontSize: 11,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            userSelect: 'none',
          }}
        >
          {selected}
        </div>
        {/* Arrow button: darker box */}
        <div
          style={{
            width: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--sui-dropdown-arrow-bg)',
            borderLeft: '1px solid var(--sui-dropdown-border)',
            flexShrink: 0,
          }}
        >
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
            <path d="M1 1L4 4L7 1" stroke="var(--sui-text)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </ItemWrapper>
  )
}
