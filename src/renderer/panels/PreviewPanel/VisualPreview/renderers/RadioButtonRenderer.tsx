import React from 'react'
import type { RendererProps } from '../index'
import type { RadioButtonStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS } from './shared'

export function RadioButtonRenderer({ item }: RendererProps) {
  const style = item.style as RadioButtonStyle
  return (
    <ItemWrapper item={item} style={{ display: 'flex', alignItems: 'center', ...alignmentToCSS(style.alignment) }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', color: 'var(--sui-text)', fontSize: 11 }}>
        <input type="radio" checked={style.value} readOnly style={{ accentColor: '#4a9eff' }} />
        {style.text}
      </label>
    </ItemWrapper>
  )
}
