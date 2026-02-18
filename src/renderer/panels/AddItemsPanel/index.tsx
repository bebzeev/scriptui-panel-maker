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

  // Determine which element can be a parent for the next added item
  const activeItem = activeId ? items[activeId] : null
  const parentId = activeItem
    ? (ELEMENT_REGISTRY[activeItem.type].isContainer ? activeItem.id : activeItem.parentId)
    : Object.values(items).find((i) => !i.parentId)?.id ?? null

  const parentType = parentId ? items[parentId]?.type : null

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
            <div className="grid grid-cols-2 gap-0.5">
              {types
                .filter((type) => type !== 'Dialog') // Dialog is always the root, can't be added
                .map((type) => {
                  const def = ELEMENT_REGISTRY[type]
                  const disabled = !parentType || !canContain(parentType, type)
                  return (
                    <AddItemButton
                      key={type}
                      type={type}
                      icon={def.addPanelIcon}
                      label={def.addPanelLabel}
                      disabled={disabled}
                      parentId={parentId}
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
        flex items-center gap-1.5 px-2 py-1.5 rounded text-xs text-left transition-colors
        ${disabled
          ? 'text-app-muted opacity-40 cursor-not-allowed'
          : 'text-app-text hover:bg-app-hover cursor-pointer'
        }
      `}
    >
      {IconComponent && <IconComponent size={12} className="flex-shrink-0 text-app-muted" />}
      <span className="truncate">{label}</span>
    </button>
  )
}
