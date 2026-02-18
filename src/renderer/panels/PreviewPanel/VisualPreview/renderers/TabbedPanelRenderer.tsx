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
    <ItemWrapper
      item={item}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        ...alignmentToCSS(style.alignment),
        ...sizeToCSS(style.preferredSize),
      }}
    >
      {/* Tab header bar — AE style: dark background, tabs with borders */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          background: 'var(--sui-tab-bar-bg)',
          borderBottom: '1px solid var(--sui-tab-border)',
          gap: 1,
          paddingLeft: 4,
          paddingTop: 4,
        }}
      >
        {tabs.map((tab, i) => {
          const tabStyle = tab.style as { text?: string }
          const isActive = i === activeTab
          return (
            <button
              key={tab.id}
              onClick={(e) => { e.stopPropagation(); setActiveTab(i) }}
              style={{
                padding: '3px 14px',
                fontSize: 11,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: isActive ? 'var(--sui-tab-active-text)' : 'var(--sui-tab-inactive-text)',
                background: isActive ? 'var(--sui-tab-active-bg)' : 'transparent',
                border: isActive ? '1px solid var(--sui-tab-border)' : '1px solid transparent',
                borderBottom: isActive ? '1px solid var(--sui-tab-active-bg)' : '1px solid var(--sui-tab-border)',
                borderRadius: '2px 2px 0 0',
                cursor: 'pointer',
                position: 'relative',
                bottom: -1,
              }}
            >
              {tabStyle.text ?? `Tab ${i + 1}`}
            </button>
          )
        })}
      </div>

      {/* Active tab content */}
      {tabs[activeTab] && (
        <div
          style={{
            padding: 8,
            flex: 1,
            background: 'var(--sui-tab-active-bg)',
            border: '1px solid var(--sui-tab-border)',
            borderTop: 'none',
          }}
        >
          {renderChildren(tabs[activeTab].id)}
        </div>
      )}
    </ItemWrapper>
  )
}
