import React, { useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useAppStore } from '../../store'
import { getChildren } from '../../store/selectors'
import { TreeNode } from './TreeNode'
import type { AppState } from '../../types/schema'

export function StructurePanel() {
  const { items, order, moveItem } = useAppStore()

  // Find root item
  const rootId = order.find((id) => !items[id]?.parentId)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const activeId = active.id as string
      const overId = over.id as string
      const overItem = items[overId]
      if (!overItem) return
      // Move active item to before overId's position
      moveItem(activeId, overItem.parentId ?? overId, overId)
    },
    [items, moveItem]
  )

  if (!rootId) {
    return (
      <div className="flex items-center justify-center h-full text-app-muted text-xs">
        No items
      </div>
    )
  }

  const state: AppState = useAppStore.getState()
  const rootChildren = getChildren(state, rootId)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-3 py-2 text-2xs font-semibold text-app-muted uppercase tracking-wider border-b border-app-border flex-shrink-0">
        Structure
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            {/* Render root item */}
            <TreeNode key={rootId} id={rootId} depth={0} />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
