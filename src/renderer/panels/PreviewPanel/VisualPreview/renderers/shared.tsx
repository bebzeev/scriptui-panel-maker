/**
 * Shared utilities for ScriptUI preview renderers
 */
import React from 'react'
import type { ScriptUIItem, MarginsValue, SizeValue, AlignH, AlignV } from '../../../../types/schema'
import { useAppStore } from '../../../../store'

/** Apply visibility + disabled opacity to a rendered element */
export function useItemStyle(item: ScriptUIItem): React.CSSProperties {
  const style = item.style as Record<string, unknown>
  const isVisible = style.visible !== false
  const isEnabled = style.enabled !== false
  const result: React.CSSProperties = {}
  if (!isVisible) result.opacity = 0.3
  else if (!isEnabled) result.opacity = 0.4
  return result
}

/** Wrapper that handles selection click and visibility */
export function ItemWrapper({
  item,
  children,
  style: extraStyle,
  className,
}: {
  item: ScriptUIItem
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}) {
  const { activeId, setActiveId } = useAppStore()
  const isActive = item.id === activeId
  const itemStyle = useItemStyle(item)
  const s = item.style as Record<string, unknown>
  const isVisible = s.visible !== false

  return (
    <div
      onClick={(e) => { e.stopPropagation(); setActiveId(item.id) }}
      style={{
        ...itemStyle,
        ...extraStyle,
        ...(isActive ? { boxShadow: '0 0 0 2px var(--sui-accent), 0 0 12px rgba(51,204,89,0.3)' } : {}),
      }}
      className={`relative cursor-pointer transition-shadow ${className ?? ''}`}
      title={isVisible ? undefined : 'Hidden (visible: false)'}
    >
      {children}
      {!isVisible && (
        <div className="absolute top-0 right-0 bg-black/50 text-app-muted text-2xs px-1 rounded-bl pointer-events-none">
          hidden
        </div>
      )}
    </div>
  )
}

/** Convert margins to CSS padding */
export function marginsToCSS(margins: MarginsValue): string {
  if (typeof margins === 'number') return `${margins}px`
  const [t, r, b, l] = margins
  return `${t}px ${r}px ${b}px ${l}px`
}

/** Convert preferredSize to CSS min-width/min-height */
export function sizeToCSS(size: SizeValue): React.CSSProperties {
  const [w, h] = size
  return {
    ...(w > 0 ? { minWidth: w } : {}),
    ...(h > 0 ? { minHeight: h } : {}),
  }
}

/** Convert alignChildren to CSS align-items + justify-content */
export function alignChildrenToCSS(
  alignChildren: [AlignH, AlignV],
  orientation: 'row' | 'column'
): React.CSSProperties {
  const [h, v] = alignChildren
  const alignMap: Record<string, string> = {
    left: 'flex-start',
    right: 'flex-end',
    top: 'flex-start',
    bottom: 'flex-end',
    center: 'center',
    fill: 'stretch',
  }
  if (orientation === 'row') {
    return {
      justifyContent: alignMap[h] ?? 'flex-start',
      alignItems: alignMap[v] ?? 'flex-start',
    }
  } else {
    return {
      alignItems: alignMap[h] ?? 'flex-start',
      justifyContent: alignMap[v] ?? 'flex-start',
    }
  }
}

/** Convert self-alignment to flex CSS */
export function alignmentToCSS(alignment: string | null): React.CSSProperties {
  if (!alignment) return {}
  const map: Record<string, string> = {
    left: 'flex-start',
    right: 'flex-end',
    top: 'flex-start',
    bottom: 'flex-end',
    center: 'center',
    fill: '1',
  }
  if (alignment === 'fill') return { flex: 1, alignSelf: 'stretch' }
  return { alignSelf: map[alignment] ?? 'auto' }
}
