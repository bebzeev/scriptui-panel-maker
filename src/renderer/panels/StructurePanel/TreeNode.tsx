import React, { useCallback } from 'react'
import * as Icons from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChevronRight, ChevronDown, Trash2, Eye, EyeOff, Copy } from 'lucide-react'
import { useAppStore } from '../../store'
import { getChildren } from '../../store/selectors'
import { ELEMENT_REGISTRY, CONTAINER_TYPES } from '../../elements'
import type { AppState, ScriptUIItem } from '../../types/schema'

interface TreeNodeProps {
  id: string
  depth: number
}

export function TreeNode({ id, depth }: TreeNodeProps) {
  const { items, order, activeId, setActiveId, removeItem, duplicateItem, setItemCollapsed, updateItemStyle } =
    useAppStore()

  const item: ScriptUIItem | undefined = items[id]
  if (!item) return null

  const def = ELEMENT_REGISTRY[item.type]
  const isContainer = CONTAINER_TYPES.has(item.type)
  const state: AppState = useAppStore.getState()
  const children = getChildren(state, id)
  const hasChildren = children.length > 0
  const isActive = id === activeId
  const isCollapsed = item.collapsed

  // Get visibility from style
  const isVisible = (item.style as { visible?: boolean }).visible !== false

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setActiveId(id)
    },
    [id, setActiveId]
  )

  const handleToggleCollapse = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setItemCollapsed(id, !isCollapsed)
    },
    [id, isCollapsed, setItemCollapsed]
  )

  const handleToggleVisible = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      updateItemStyle(id, { visible: !isVisible } as Partial<typeof item.style>)
    },
    [id, isVisible, updateItemStyle, item.style]
  )

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      removeItem(id)
    },
    [id, removeItem]
  )

  const handleDuplicate = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      duplicateItem(id)
    },
    [id, duplicateItem]
  )

  const IconComponent = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[def.addPanelIcon]

  // Get display name
  const varName = (item.style as { varName?: string | null }).varName
  const text = (item.style as { text?: string }).text
  const displayName = varName || text || item.type

  return (
    <div ref={setNodeRef} style={style}>
      <div
        onClick={handleClick}
        className={`
          group flex items-center gap-0.5 h-7 pr-1 rounded mx-1 cursor-pointer select-none transition-colors
          ${isActive ? 'bg-app-accent/20 text-app-accent' : 'hover:bg-app-hover text-app-text'}
          ${!isVisible ? 'opacity-50' : ''}
        `}
        style={{ paddingLeft: `${depth * 14 + 4}px` }}
      >
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="w-3 h-full flex items-center justify-center cursor-grab opacity-0 group-hover:opacity-40 hover:!opacity-70"
        >
          <Icons.GripVertical size={10} />
        </div>

        {/* Collapse toggle */}
        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
          {isContainer && hasChildren ? (
            <button onClick={handleToggleCollapse} className="text-app-muted hover:text-app-text">
              {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
            </button>
          ) : null}
        </div>

        {/* Element icon */}
        <div className="flex-shrink-0 text-app-muted mr-1">
          {IconComponent && <IconComponent size={12} />}
        </div>

        {/* Label */}
        <span className="flex-1 text-xs truncate">
          {varName ? (
            <>
              <span className="text-app-muted">{item.type}: </span>
              <span className="font-medium">{varName}</span>
            </>
          ) : text ? (
            <>
              <span className="text-app-muted">{item.type}: </span>
              <span className="opacity-70 italic">{text}</span>
            </>
          ) : (
            <span>{item.type}</span>
          )}
        </span>

        {/* Action buttons — visible on hover or when active */}
        <div className={`flex items-center gap-0.5 ${isActive ? 'opacity-70' : 'opacity-0 group-hover:opacity-60'}`}>
          <ActionButton onClick={handleToggleVisible} title={isVisible ? 'Hide' : 'Show'}>
            {isVisible ? <Eye size={11} /> : <EyeOff size={11} />}
          </ActionButton>
          <ActionButton onClick={handleDuplicate} title="Duplicate">
            <Copy size={11} />
          </ActionButton>
          {item.parentId && (
            <ActionButton onClick={handleDelete} title="Delete" danger>
              <Trash2 size={11} />
            </ActionButton>
          )}
        </div>
      </div>

      {/* Children */}
      {isContainer && !isCollapsed && children.length > 0 && (
        <div>
          {children.map((child) => (
            <TreeNode key={child.id} id={child.id} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

function ActionButton({
  onClick,
  title,
  danger = false,
  children,
}: {
  onClick: (e: React.MouseEvent) => void
  title: string
  danger?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        w-5 h-5 flex items-center justify-center rounded transition-colors
        ${danger ? 'hover:text-red-400 hover:bg-red-400/10' : 'hover:text-app-text hover:bg-app-hover'}
      `}
    >
      {children}
    </button>
  )
}
