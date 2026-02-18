import React, { useState } from 'react'
import type { RendererProps } from '../index'
import type { TreeViewStyle, TreeItemStyle } from '../../../../types/schema'
import { getChildren } from '../../../../store/selectors'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'
import { ChevronRight, ChevronDown } from 'lucide-react'

export function TreeViewRenderer({ item, state, renderChildren }: RendererProps) {
  const style = item.style as TreeViewStyle
  const rootItems = getChildren(state, item.id)

  return (
    <ItemWrapper item={item} style={{ ...alignmentToCSS(style.alignment) }}>
      <div
        style={{
          background: 'var(--sui-listbox-bg)',
          border: '1px solid var(--sui-listbox-border)',
          ...sizeToCSS(style.preferredSize),
          minWidth: 80,
          minHeight: 60,
          overflow: 'auto',
          fontSize: 11,
          color: 'var(--sui-text)',
        }}
      >
        {rootItems.map((treeItem) => (
          <TreeItemPreview key={treeItem.id} itemId={treeItem.id} state={state} depth={0} />
        ))}
      </div>
    </ItemWrapper>
  )
}

function TreeItemPreview({ itemId, state, depth }: { itemId: string; state: RendererProps['state']; depth: number }) {
  const item = state.items[itemId]
  if (!item) return null
  const style = item.style as TreeItemStyle
  const children = getChildren(state, itemId)
  const [expanded, setExpanded] = useState(style.expanded ?? false)

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: depth * 12 + 2,
          padding: '1px 0 1px ' + (depth * 12 + 2) + 'px',
          gap: 2,
          cursor: 'pointer',
        }}
        onClick={() => children.length > 0 && setExpanded(!expanded)}
      >
        <span style={{ width: 12, flexShrink: 0 }}>
          {children.length > 0 ? (expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />) : null}
        </span>
        {style.text}
      </div>
      {expanded && children.map((child) => (
        <TreeItemPreview key={child.id} itemId={child.id} state={state} depth={depth + 1} />
      ))}
    </div>
  )
}
