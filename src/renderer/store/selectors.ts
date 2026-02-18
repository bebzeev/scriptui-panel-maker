import type { AppState, ScriptUIItem } from '../types/schema'

/** Get direct children of a parent, in order */
export function getChildren(state: AppState, parentId: string): ScriptUIItem[] {
  return state.order
    .filter((id) => state.items[id]?.parentId === parentId)
    .map((id) => state.items[id])
}

/** Get all ancestors of an item, from direct parent to root */
export function getAncestors(state: AppState, id: string): ScriptUIItem[] {
  const ancestors: ScriptUIItem[] = []
  let current = state.items[id]
  while (current?.parentId) {
    const parent = state.items[current.parentId]
    if (!parent) break
    ancestors.unshift(parent)
    current = parent
  }
  return ancestors
}

/** Get the depth of an item in the tree (root = 0) */
export function getDepth(state: AppState, id: string): number {
  return getAncestors(state, id).length
}

/** Get root item (Dialog) */
export function getRootItem(state: AppState): ScriptUIItem | null {
  const rootId = state.order.find((id) => !state.items[id]?.parentId)
  return rootId ? state.items[rootId] : null
}

/** Get ordered items as array */
export function getOrderedItems(state: AppState): ScriptUIItem[] {
  return state.order.map((id) => state.items[id]).filter(Boolean)
}
