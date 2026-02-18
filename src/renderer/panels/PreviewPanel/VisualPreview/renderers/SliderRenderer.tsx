import React from 'react'
import type { RendererProps } from '../index'
import type { SliderStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function SliderRenderer({ item }: RendererProps) {
  const style = item.style as SliderStyle
  return (
    <ItemWrapper item={item} style={{ display: 'flex', alignItems: 'center', ...alignmentToCSS(style.alignment) }}>
      <input
        type="range"
        min={style.minvalue}
        max={style.maxvalue}
        value={style.value}
        readOnly
        style={{
          accentColor: 'var(--sui-slider-thumb-active)',
          ...sizeToCSS(style.preferredSize),
          minWidth: 100,
        }}
      />
    </ItemWrapper>
  )
}
