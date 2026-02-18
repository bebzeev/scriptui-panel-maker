import React from 'react'
import type { RendererProps } from '../index'
import type { SliderStyle } from '../../../../types/schema'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function SliderRenderer({ item }: RendererProps) {
  const style = item.style as SliderStyle
  const min = style.minvalue ?? 0
  const max = style.maxvalue ?? 100
  const val = style.value ?? 50
  const pct = max > min ? ((val - min) / (max - min)) * 100 : 0
  const isEnabled = style.enabled !== false

  const size = sizeToCSS(style.preferredSize)
  const trackWidth = (size.minWidth as number) || 140

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
      {/* Custom AE-accurate slider: dark track, circular thumb */}
      <div
        style={{
          position: 'relative',
          width: trackWidth,
          height: 16,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Track */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 4,
            background: 'var(--sui-slider-track)',
            border: '1px solid var(--sui-slider-track-border)',
            borderRadius: 2,
          }}
        />
        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            left: `calc(${pct}% - 7px)`,
            width: 14,
            height: 14,
            background: 'var(--sui-slider-thumb)',
            border: '1px solid var(--sui-slider-thumb-border)',
            borderRadius: '50%',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </ItemWrapper>
  )
}
