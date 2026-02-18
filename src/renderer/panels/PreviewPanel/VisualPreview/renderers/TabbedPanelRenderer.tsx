import React, { useState } from 'react'
import type { RendererProps } from '../index'
import type { TabbedPanelStyle } from '../../../../types/schema'
import { getChildren } from '../../../../store/selectors'
import { ItemWrapper, alignmentToCSS, sizeToCSS } from './shared'

export function TabbedPanelRenderer({ item, state, renderChildren }: RendererProps) {
  const style = item.style as TabbedPanelStyle
  const tabs = getChildren(state, item.id)
  const [activeTab, setActiveTab] = useState(style.selection ?? 0)

  return (
    <ItemWrapper item={item} style={{ display: 'flex', flexDirection: 'column', ...alignmentToCSS(style.alignment), ...sizeToCSS(style.preferredSize) }}>
      {/* Tab headers */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--sui-divider)' }}>
        {tabs.map((tab, i) => {
          const tabStyle = tab.style as { text?: string }
          return (
            <button
              key={tab.id}
              onClick={(e) => { e.stopPropagation(); setActiveTab(i) }}
              style={{
                padding: '3px 12px',
                fontSize: 11,
                color: i === activeTab ? 'var(--sui-tab-active-text)' : 'var(--sui-text)',
                background: i === activeTab ? 'var(--sui-bg)' : 'rgba(0,0,0,0.2)',
                border: 'none',
                borderBottom: i === activeTab ? '2px solid var(--sui-accent)' : '2px solid transparent',
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
        <div style={{ padding: 8, flex: 1 }}>
          {renderChildren(tabs[activeTab].id)}
        </div>
      )}
    </ItemWrapper>
  )
}
