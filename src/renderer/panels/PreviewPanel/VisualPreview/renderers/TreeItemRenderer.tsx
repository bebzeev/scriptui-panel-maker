import React from 'react'
import type { RendererProps } from '../index'
import { ItemWrapper } from './shared'

// TreeItem is rendered by TreeViewRenderer recursively
// This is a fallback in case it's somehow rendered at top level
export function TreeItemRenderer({ item }: RendererProps) {
  const style = item.style as { text?: string }
  return (
    <ItemWrapper item={item}>
      <div style={{ fontSize: 11, color: 'var(--sui-text)', padding: '1px 4px' }}>
        {style.text ?? 'Item'}
      </div>
    </ItemWrapper>
  )
}
