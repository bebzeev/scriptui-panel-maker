import React from 'react'
import type { RendererProps } from '../index'
import { ItemWrapper } from './shared'

// Tab items are rendered by their parent (TabbedPanel/VerticalTabbedPanel)
// This renderer handles the case where a Tab is shown inline in Structure tree
export function TabRenderer({ item, renderChildren }: RendererProps) {
  return (
    <ItemWrapper item={item} style={{ padding: 4 }}>
      {renderChildren(item.id)}
    </ItemWrapper>
  )
}
