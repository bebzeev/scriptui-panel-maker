import React, { useState } from 'react'
import type { RendererProps } from '../index'
import type { VerticalTabbedPanelStyle } from '../../../../types/schema'
import { getChildren } from '../../../../store/selectors'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function VerticalTabbedPanelRenderer({ item, state, renderChildren }: RendererProps) {
  const style = item.style as VerticalTabbedPanelStyle
  const tabs = getChildren(state, item.id)
  const [activeTab, setActiveTab] = useState(style.selection ?? 0)

  return (
    <ItemWrapper item={item} style={{ display: 'flex', flexDirection: 'row', ...alignmentToCSS(style.alignment), ...sizeToCSS(style.preferredSize) }}>
      {/* Vertical tab nav */}
      <div
        style={{
          width: style.tabNavWidth,
          borderRight: '1px solid var(--sui-divider)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          background: 'var(--sui-listbox-bg)',
        }}
      >
        {tabs.map((tab, i) => {
          const tabStyle = tab.style as { text?: string }
          return (
            <button
              key={tab.id}
              onClick={(e) => { e.stopPropagation(); setActiveTab(i) }}
              style={{
                padding: '4px 8px',
                fontSize: 11,
                textAlign: 'left',
                color: i === activeTab ? 'white' : 'var(--sui-text)',
                background: i === activeTab ? 'var(--sui-listbox-sel-bg)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {tabStyle.text ?? `Tab ${i + 1}`}
            </button>
          )
        })}
      </div>

      {/* Active tab content */}
      {tabs[activeTab] && (
        <div style={{ flex: 1, padding: 8 }}>
          {renderChildren(tabs[activeTab].id)}
        </div>
      )}
    </ItemWrapper>
  )
}
