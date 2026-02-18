import React from 'react'
import type { RendererProps } from '../index'
import type { CheckboxStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS } from './shared'

export function CheckboxRenderer({ item }: RendererProps) {
  const style = item.style as CheckboxStyle
  const checked = style.value === true
  const isEnabled = style.enabled !== false

  return (
    <ItemWrapper
      item={item}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        opacity: isEnabled ? 1 : 0.4,
        ...alignmentToCSS(style.alignment),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'default' }}>
        {/* Custom AE-accurate checkbox: dark bg, gray border, gray check */}
        <div
          style={{
            width: 13,
            height: 13,
            background: 'var(--sui-checkbox-bg)',
            border: '1px solid var(--sui-checkbox-border)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {checked && (
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <polyline
                points="1,3.5 3.5,6 8,1"
                stroke="var(--sui-text)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
        </div>
        <span
          style={{
            color: 'var(--sui-text)',
            fontSize: 11,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            userSelect: 'none',
          }}
        >
          {style.text || 'Checkbox'}
        </span>
      </div>
    </ItemWrapper>
  )
}
