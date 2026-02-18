/**
 * Shared utilities for ScriptUI preview renderers
 */
import React from 'react'
import type { ScriptUIItem, MarginsValue, SizeValue, AlignH, AlignV } from '../../../../types/schema'
import { useAppStore } from '../../../../store'

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
  const s = item.style as Record<string, unknown>
  const isVisible = s.visible !== false
  const isEnabled = s.enabled !== false

  return (
    <div
      onClick={(e) => { e.stopPropagation(); setActiveId(item.id) }}
      style={{
        opacity: !isVisible ? 0.3 : !isEnabled ? 0.4 : 1,
        outline: isActive ? '2px solid #33cc59' : undefined,
        outlineOffset: isActive ? '1px' : undefined,
        boxShadow: isActive ? '0 0 10px rgba(51,204,89,0.35)' : undefined,
        position: 'relative',
        ...extraStyle,
      }}
      className={`cursor-pointer ${className ?? ''}`}
      title={isVisible ? undefined : 'Hidden (visible: false)'}
    >
      {children}
      {!isVisible && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'rgba(0,0,0,0.55)',
            color: '#aaa',
            fontSize: 9,
            padding: '1px 3px',
            borderRadius: '0 0 0 2px',
            pointerEvents: 'none',
            lineHeight: 1.4,
          }}
        >
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
  if (alignment === 'fill') return { flex: 1, alignSelf: 'stretch' }
  const map: Record<string, string> = {
    left: 'flex-start',
    right: 'flex-end',
    top: 'flex-start',
    bottom: 'flex-end',
    center: 'center',
  }
  return { alignSelf: map[alignment] ?? 'auto' }
}
