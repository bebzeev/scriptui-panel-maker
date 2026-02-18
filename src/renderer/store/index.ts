import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { temporal } from 'zundo'
import type { AppState, ScriptUIItem, ExportSettings, ElementStyle, ScriptUIElementType } from '../types/schema'
import { DEFAULT_SETTINGS } from '../types/schema'
import { ELEMENT_REGISTRY } from '../elements'
import { generateId } from '../utils/idGenerator'

// ============================================================
// Helper: collect all descendant IDs (for delete cascade)
// ============================================================
function collectDescendants(
  items: Record<string, ScriptUIItem>,
  order: string[],
  rootId: string
): Set<string> {
  const result = new Set<string>([rootId])
  let changed = true
  while (changed) {
    changed = false
    for (const id of order) {
      const item = items[id]
      if (item && !result.has(id) && item.parentId && result.has(item.parentId)) {
        result.add(id)
        changed = true
      }
    }
  }
  return result
}

// ============================================================
// Helper: get children of a given parent (in order)
// ============================================================
function getChildIds(items: Record<string, ScriptUIItem>, order: string[], parentId: string): string[] {
  return order.filter((id) => items[id]?.parentId === parentId)
}

// ============================================================
// Store interface
// ============================================================
interface AppStore extends AppState {
  // Item CRUD
  addItem: (type: ScriptUIElementType, parentId: string | null) => string
  removeItem: (id: string) => void
  duplicateItem: (id: string) => string | null
  updateItemStyle: (id: string, patch: Partial<ElementStyle>) => void
  moveItem: (id: string, newParentId: string, beforeId: string | null) => void
  setItemCollapsed: (id: string, collapsed: boolean) => void

  // Selection
  setActiveId: (id: string | null) => void

  // Settings
  updateSettings: (patch: Partial<ExportSettings>) => void

  // Preview tab
  previewTab: 'visual' | 'code'
  setPreviewTab: (tab: 'visual' | 'code') => void

  // Project management
  resetProject: () => void
  loadProject: (state: AppState) => void
}

// ============================================================
// Initial state: empty project with a root Dialog
// ============================================================
function createInitialState(): Pick<AppState, 'items' | 'order' | 'activeId' | 'settings'> {
  const rootId = generateId()
  const rootDef = ELEMENT_REGISTRY['Dialog']
  const rootItem: ScriptUIItem = {
    id: rootId,
    type: 'Dialog',
    parentId: null,
    collapsed: false,
    style: { ...rootDef.defaultStyle },
  }
  return {
    items: { [rootId]: rootItem },
    order: [rootId],
    activeId: rootId,
    settings: { ...DEFAULT_SETTINGS },
  }
}

// ============================================================
// Main store
// ============================================================
export const useAppStore = create<AppStore>()(
  temporal(
    persist(
      immer((set, get) => ({
        ...createInitialState(),
        previewTab: 'visual' as const,

        addItem: (type, parentId) => {
          const id = generateId()
          const def = ELEMENT_REGISTRY[type]
          const newItem: ScriptUIItem = {
            id,
            type,
            parentId,
            collapsed: false,
            style: JSON.parse(JSON.stringify(def.defaultStyle)) as ElementStyle,
          }
          set((state) => {
            state.items[id] = newItem as unknown as ScriptUIItem
            // Insert after the last child of parentId (or at end)
            let insertIdx = state.order.length
            if (parentId) {
              // Find last descendant of parentId to insert after
              const descendants = collectDescendants(state.items as Record<string, ScriptUIItem>, state.order, parentId)
              for (let i = state.order.length - 1; i >= 0; i--) {
                if (descendants.has(state.order[i])) {
                  insertIdx = i + 1
                  break
                }
              }
            }
            state.order.splice(insertIdx, 0, id)
            state.activeId = id
          })
          return id
        },

        removeItem: (id) => {
          set((state) => {
            const toRemove = collectDescendants(
              state.items as Record<string, ScriptUIItem>,
              state.order,
              id
            )
            toRemove.forEach((rid) => delete state.items[rid])
            state.order = state.order.filter((oid) => !toRemove.has(oid))
            if (state.activeId && toRemove.has(state.activeId)) {
              state.activeId = null
            }
          })
        },

        duplicateItem: (id) => {
          const state = get()
          const item = state.items[id]
          if (!item) return null

          // Collect all items in this subtree
          const descendants = collectDescendants(state.items, state.order, id)
          const orderedDescendants = state.order.filter((oid) => descendants.has(oid))

          // Build id remapping
          const idMap = new Map<string, string>()
          orderedDescendants.forEach((oid) => idMap.set(oid, generateId()))

          set((st) => {
            // Clone each item with new IDs
            orderedDescendants.forEach((oid) => {
              const orig = st.items[oid]
              const newId = idMap.get(oid)!
              const newParentId = orig.parentId ? (idMap.get(orig.parentId) ?? orig.parentId) : orig.parentId
              st.items[newId] = {
                ...JSON.parse(JSON.stringify(orig)),
                id: newId,
                parentId: newParentId,
              }
            })

            // Insert the cloned subtree after the original subtree
            const lastDescendantIdx = Math.max(...orderedDescendants.map((oid) => st.order.indexOf(oid)))
            const clonedIds = orderedDescendants.map((oid) => idMap.get(oid)!)
            st.order.splice(lastDescendantIdx + 1, 0, ...clonedIds)
            st.activeId = idMap.get(id)!
          })

          return idMap.get(id)!
        },

        updateItemStyle: (id, patch) => {
          set((state) => {
            if (state.items[id]) {
              Object.assign(state.items[id].style, patch)
            }
          })
        },

        moveItem: (id, newParentId, beforeId) => {
          set((state) => {
            const item = state.items[id]
            if (!item) return

            // Update parentId
            item.parentId = newParentId

            // Remove from current order position
            const currentIdx = state.order.indexOf(id)
            state.order.splice(currentIdx, 1)

            // Insert before beforeId, or at end of newParent's children
            if (beforeId) {
              const beforeIdx = state.order.indexOf(beforeId)
              state.order.splice(beforeIdx, 0, id)
            } else {
              // Append after last child of newParentId
              const children = getChildIds(
                state.items as Record<string, ScriptUIItem>,
                state.order,
                newParentId
              )
              if (children.length > 0) {
                const lastChildIdx = state.order.lastIndexOf(children[children.length - 1])
                state.order.splice(lastChildIdx + 1, 0, id)
              } else {
                // Insert right after parent
                const parentIdx = state.order.indexOf(newParentId)
                state.order.splice(parentIdx + 1, 0, id)
              }
            }
          })
        },

        setItemCollapsed: (id, collapsed) => {
          set((state) => {
            if (state.items[id]) {
              state.items[id].collapsed = collapsed
            }
          })
        },

        setActiveId: (id) => {
          set((state) => {
            state.activeId = id
          })
        },

        updateSettings: (patch) => {
          set((state) => {
            Object.assign(state.settings, patch)
          })
        },

        setPreviewTab: (tab) => {
          set((state) => {
            state.previewTab = tab
          })
        },

        resetProject: () => {
          set((_state) => {
            const fresh = createInitialState()
            return { ...fresh, previewTab: 'visual' }
          })
        },

        loadProject: (projectState) => {
          set((_state) => ({
            items: projectState.items,
            order: projectState.order,
            activeId: projectState.activeId,
            settings: { ...DEFAULT_SETTINGS, ...projectState.settings },
            previewTab: 'visual',
          }))
        },
      })),
      {
        name: 'scriptui-panel-maker-state',
        version: 1,
      }
    ),
    {
      // Only track state changes that affect the project (not UI state)
      partialize: (state) => ({
        items: state.items,
        order: state.order,
        activeId: state.activeId,
        settings: state.settings,
      }),
    }
  )
)

// Expose temporal store for undo/redo
export const useTemporalStore = (useAppStore as ReturnType<typeof temporal>).temporal
