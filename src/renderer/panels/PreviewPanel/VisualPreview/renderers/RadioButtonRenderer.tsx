import React from 'react'
import type { RendererProps } from '../index'
import type { RadioButtonStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS } from './shared'

export function RadioButtonRenderer({ item }: RendererProps) {
  const style = item.style as RadioButtonStyle
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
        {/* Custom AE-accurate radio button */}
        <div
          style={{
            width: 13,
            height: 13,
            background: 'var(--sui-checkbox-bg)',
            border: '1px solid var(--sui-checkbox-border)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {checked && (
            <div
              style={{
                width: 5,
                height: 5,
                background: 'var(--sui-text)',
                borderRadius: '50%',
              }}
            />
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
          {style.text || 'RadioButton'}
        </span>
      </div>
    </ItemWrapper>
  )
}
