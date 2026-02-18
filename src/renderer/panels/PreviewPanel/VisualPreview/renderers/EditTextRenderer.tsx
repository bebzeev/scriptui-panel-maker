import React from 'react'
import type { RendererProps } from '../index'
import type { EditTextStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function EditTextRenderer({ item }: RendererProps) {
  const style = item.style as EditTextStyle
  const isMultiline = style.creationProps?.multiline

  const inputStyle: React.CSSProperties = {
    background: 'var(--sui-input-bg)',
    border: '1px solid var(--sui-input-border)',
    color: 'var(--sui-input-text)',
    fontSize: 11,
    padding: '2px 4px',
    outline: 'none',
    resize: 'none',
    textAlign: style.justify ?? 'left',
    ...sizeToCSS(style.preferredSize),
  }

  return (
    <ItemWrapper item={item} style={{ display: 'flex', ...alignmentToCSS(style.alignment) }}>
      {isMultiline ? (
        <textarea
          readOnly
          value={style.creationProps?.noecho ? '••••••••' : style.text}
          rows={3}
          style={inputStyle}
        />
      ) : (
        <input
          readOnly
          type={style.creationProps?.noecho ? 'password' : 'text'}
          value={style.text}
          style={{ ...inputStyle, minWidth: 100 }}
        />
      )}
    </ItemWrapper>
  )
}
