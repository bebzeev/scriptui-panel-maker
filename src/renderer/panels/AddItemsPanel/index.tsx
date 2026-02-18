import React from 'react'
import * as Icons from 'lucide-react'
import { ELEMENT_REGISTRY, ELEMENT_CATEGORIES, canContain } from '../../elements'
import { useAppStore } from '../../store'
import type { ScriptUIElementType } from '../../types/schema'

const CATEGORY_LABELS = {
  containers: 'Containers',
  inputs: 'Inputs',
  visuals: 'Visuals',
} as const

export function AddItemsPanel() {
  const { activeId, items } = useAppStore()

  // Find the best parent for the next added item:
  // - If something is selected and it's a container → use it
  // - If something is selected and it's a leaf → use its parent
  // - If nothing is selected → use the root Dialog
  const activeItem = activeId ? items[activeId] : null
  const parentId = activeItem
    ? (ELEMENT_REGISTRY[activeItem.type].isContainer ? activeItem.id : activeItem.parentId)
    : Object.values(items).find((i) => !i.parentId)?.id ?? null

  const parentType = parentId ? items[parentId]?.type : null

  // Walk up the ancestor chain to find the nearest ancestor that CAN contain
  // a given type — used so we can still add Panel when e.g. a Group is selected
  // inside a Dialog even though the immediate parent might be something restrictive.
  function findValidParentId(type: ScriptUIElementType): string | null {
    // Try the current parent first
    if (parentId && parentType && canContain(parentType, type)) return parentId
    // Walk up: check each ancestor
    let cur = parentId
    while (cur) {
      const item = items[cur]
      if (!item) break
      if (canContain(item.type, type)) return cur
      cur = item.parentId
    }
    return null
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-3 py-2 text-2xs font-semibold text-app-muted uppercase tracking-wider border-b border-app-border flex-shrink-0">
        Add Items
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {(Object.entries(ELEMENT_CATEGORIES) as [string, readonly ScriptUIElementType[]][]).map(([category, types]) => (
          <div key={category}>
            <div className="px-1 mb-1 text-2xs font-semibold text-app-muted uppercase tracking-wider">
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
            </div>
            <div className="flex flex-col gap-0.5">
              {types
                .filter((type) => type !== 'Dialog')
                .map((type) => {
                  const def = ELEMENT_REGISTRY[type]
                  // Find the nearest valid parent (walk up tree)
                  const validParentId = findValidParentId(type)
                  const disabled = !validParentId
                  return (
                    <AddItemButton
                      key={type}
                      type={type}
                      icon={def.addPanelIcon}
                      label={def.addPanelLabel}
                      disabled={disabled}
                      parentId={validParentId}
                    />
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AddItemButton({
  type,
  icon,
  label,
  disabled,
  parentId,
}: {
  type: ScriptUIElementType
  icon: string
  label: string
  disabled: boolean
  parentId: string | null
}) {
  const { addItem } = useAppStore()
  const IconComponent = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[icon]

  const handleClick = () => {
    if (disabled || !parentId) return
    addItem(type, parentId)
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      title={disabled ? `Cannot add ${label} here` : `Add ${label}`}
      className={`
        flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition-colors w-full
        ${disabled
          ? 'text-app-muted opacity-30 cursor-not-allowed'
          : 'text-app-text hover:bg-app-hover cursor-pointer'
        }
      `}
    >
      {IconComponent && <IconComponent size={12} className="flex-shrink-0 text-app-muted" />}
      <span className="truncate">{label}</span>
    </button>
  )
}
