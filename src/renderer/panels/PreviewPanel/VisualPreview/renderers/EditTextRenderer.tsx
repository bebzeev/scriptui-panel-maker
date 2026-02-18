import React from 'react'
import type { RendererProps } from '../index'
import type { EditTextStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function EditTextRenderer({ item }: RendererProps) {
  const style = item.style as EditTextStyle
  const isMultiline = style.creationProps?.multiline
  const isEnabled = style.enabled !== false

  const inputStyle: React.CSSProperties = {
    background: 'var(--sui-input-bg)',
    /* AE input: top/left border is lighter (highlight), bottom/right is darker */
    border: '1px solid var(--sui-input-border)',
    borderTop: '1px solid var(--sui-input-top-border)',
    borderLeft: '1px solid var(--sui-input-top-border)',
    color: 'var(--sui-input-text)',
    fontSize: 11,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '2px 5px',
    outline: 'none',
    resize: 'none',
    textAlign: (style.justify ?? 'left') as React.CSSProperties['textAlign'],
    opacity: isEnabled ? 1 : 0.5,
    boxSizing: 'border-box',
    ...sizeToCSS(style.preferredSize),
  }

  const displayValue = style.creationProps?.noecho
    ? '••••••••'
    : (style.text ?? '')

  return (
    <ItemWrapper item={item} style={{ display: 'inline-flex', ...alignmentToCSS(style.alignment) }}>
      {isMultiline ? (
        <textarea
          readOnly
          value={displayValue}
          rows={3}
          style={{ ...inputStyle, minWidth: 120, minHeight: 48 }}
        />
      ) : (
        <input
          readOnly
          type={style.creationProps?.noecho ? 'password' : 'text'}
          value={displayValue}
          style={{ ...inputStyle, minWidth: 120 }}
        />
      )}
    </ItemWrapper>
  )
}
