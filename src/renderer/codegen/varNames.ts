/**
 * Variable name registry for code generation.
 * Ports the counter-per-type logic from the reference app (Joonas).
 */
import type { AppState, ScriptUIElementType } from '../types/schema'

const AUTO_VAR_PREFIXES: Record<ScriptUIElementType, string> = {
  Dialog: 'palette',
  Group: 'group',
  Panel: 'panel',
  Tab: 'tab',
  TabbedPanel: 'tabbedpanel',
  VerticalTabbedPanel: 'vtabpanel',
  TreeView: 'treeview',
  TreeItem: 'treeitem',
  Button: 'button',
  StaticText: 'statictext',
  EditText: 'edittext',
  Checkbox: 'checkbox',
  RadioButton: 'radiobutton',
  Slider: 'slider',
  DropDownList: 'dropdown',
  ListBox: 'listbox',
  Image: 'image',
  IconButton: 'iconbutton',
  Progressbar: 'progressbar',
  Divider: 'divider',
}

export function buildVarNameRegistry(state: AppState): Map<string, string> {
  const map = new Map<string, string>()
  const counters: Partial<Record<string, number>> = {}

  for (const id of state.order) {
    const item = state.items[id]
    if (!item) continue

    const style = item.style as Record<string, unknown>
    const customName = style.varName as string | null | undefined

    if (customName && customName.trim()) {
      map.set(id, customName.trim())
    } else {
      // Auto-generate: prefix + counter
      const prefix = AUTO_VAR_PREFIXES[item.type] ?? item.type.toLowerCase()
      counters[prefix] = (counters[prefix] ?? 0) + 1
      const count = counters[prefix]!
      // Dialog (root) is just 'palette' with no number
      const name = item.type === 'Dialog' ? prefix : `${prefix}${count}`
      map.set(id, name)
    }
  }

  return map
}

/** Get indent depth for an item based on its ancestors */
export function getIndentDepth(state: AppState, id: string): number {
  let depth = 0
  let current = state.items[id]
  while (current?.parentId) {
    depth++
    current = state.items[current.parentId]
  }
  return depth
}
