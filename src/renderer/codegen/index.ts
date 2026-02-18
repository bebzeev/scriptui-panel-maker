/**
 * Main code generation entry point.
 * generateJSX(state) → string of ExtendScript code.
 *
 * Pipeline:
 *   1. Build variable name registry
 *   2. Generate header banner
 *   3. Walk state.order depth-first, generating declarations + style assignments per item
 *   4. Generate footer (layout, resize, show)
 *
 * Special cases handled per-type:
 *   - Dialog: dockable pattern (this instanceof Panel)
 *   - VerticalTabbedPanel: nav ListBox + stack + onChange helper
 *   - TabbedPanel: declares Tab children inline
 *   - TreeView: generates add("node") calls for TreeItem children
 *   - StaticText: multiline \n → Group + multiple statictext children
 *   - EditText: resource string for non-left justify
 */
import type { AppState, ScriptUIItem } from '../types/schema'
import { buildVarNameRegistry, getIndentDepth } from './varNames'
import { generateHeader } from './header'
import { generateDeclaration } from './makeItem'
import { generateStyleAssignments } from './styleItem'
import { generateFooter } from './footer'
import { staticTextNeedsMultilineGroup, generateMultilineStaticText } from './specialItems/staticText'
import { generateVerticalTabbedPanel } from './specialItems/verticalTabbedPanel'
import { generateTabbedPanelDeclaration, getTabbedPanelTabs } from './specialItems/tabbedPanel'
import { generateTreeItems } from './specialItems/treeView'
import { getChildren } from '../store/selectors'

const INDENT_UNIT = '  ' // 2 spaces

function indent(depth: number): string {
  return INDENT_UNIT.repeat(depth)
}

/** IDs of items whose declaration is handled by a parent's special generator */
type SkipSet = Set<string>

export function generateJSX(state: AppState): string {
  if (state.order.length === 0) {
    return '// No elements in the panel yet.'
  }

  const varNames = buildVarNameRegistry(state)
  const skipIds: SkipSet = new Set()

  // Pre-pass: mark Tab children of TabbedPanels as skip
  // (their declarations are emitted by the TabbedPanel generator)
  for (const id of state.order) {
    const item = state.items[id]
    if (!item) continue
    if (item.type === 'TabbedPanel') {
      const tabs = getTabbedPanelTabs(item, state)
      for (const tab of tabs) {
        skipIds.add(tab.id)
      }
    }
    // VerticalTabbedPanel's Tab children are also declared inside that generator
    if (item.type === 'VerticalTabbedPanel') {
      const tabs = getChildren(state, id).filter((c) => c.type === 'Tab')
      for (const tab of tabs) {
        skipIds.add(tab.id)
      }
    }
    // TreeItem children of TreeView/TreeItem — handled by treeView generator
    if (item.type === 'TreeView') {
      markTreeItemsSkip(item, state, skipIds)
    }
  }

  const sections: string[] = []

  sections.push(generateHeader(state))
  sections.push('')

  // Walk order (depth-first, parent before children)
  for (const id of state.order) {
    if (skipIds.has(id)) continue

    const item = state.items[id]
    if (!item) continue

    const varName = varNames.get(id) ?? id
    const parentId = item.parentId
    const parentItem = parentId ? state.items[parentId] ?? null : null
    const parentVar = parentId ? (varNames.get(parentId) ?? parentId) : 'undefined'
    const depth = getIndentDepth(state, id)
    const ind = indent(depth)

    const blockLines: string[] = []

    // Comment header for each element
    blockLines.push(`${ind}// ${item.type}: ${varName}`)

    // Special generators
    if (item.type === 'VerticalTabbedPanel') {
      blockLines.push(
        generateVerticalTabbedPanel(item, varName, parentVar, state, varNames, ind)
      )
      // Mark all TreeItem children (they are inlined inside)
      const treeTabs = getChildren(state, id).filter((c) => c.type === 'Tab')
      for (const tab of treeTabs) {
        skipIds.add(tab.id)
      }
    } else if (item.type === 'TabbedPanel') {
      blockLines.push(
        generateTabbedPanelDeclaration(item, varName, parentVar, state, varNames, ind)
      )
    } else if (item.type === 'TreeView') {
      // Declare the treeview itself
      const decl = generateDeclaration(item, varName, parentVar, state, varNames, ind)
      if (decl) blockLines.push(decl)
      // Emit TreeItem children inline
      const treeItemCode = generateTreeItems(item, varName, state, varNames, ind)
      if (treeItemCode) blockLines.push(treeItemCode)
    } else if (item.type === 'StaticText' && staticTextNeedsMultilineGroup(item)) {
      // Multiline statictext → group + lines
      // parentVar could be a TabbedPanel tab; already resolved above
      const effectiveParent = resolveEffectiveParentVar(item, state, varNames)
      blockLines.push(
        generateMultilineStaticText(item, varName, effectiveParent, ind)
      )
    } else {
      // Normal declaration
      const effectiveParent = resolveEffectiveParentVar(item, state, varNames)
      const decl = generateDeclaration(item, varName, effectiveParent, state, varNames, ind)
      if (decl) blockLines.push(decl)

      // Style assignments
      const styleCode = generateStyleAssignments(item, varName, parentItem, state, ind)
      if (styleCode) blockLines.push(styleCode)
    }

    sections.push(blockLines.join('\n'))
  }

  sections.push('')
  sections.push(generateFooter(state))

  return sections.join('\n')
}

/** Resolve the actual parent variable name to use when adding an item.
 *  For items whose parentId is a TabbedPanel or VerticalTabbedPanel,
 *  the parent var IS the tab var (Tab items are the containers).
 *  For items whose parentId is a Tab inside a TabbedPanel/VTP, use the tab var directly.
 */
function resolveEffectiveParentVar(
  item: ScriptUIItem,
  state: AppState,
  varNames: Map<string, string>
): string {
  if (!item.parentId) return 'undefined'
  return varNames.get(item.parentId) ?? item.parentId
}

/** Recursively mark TreeItem descendants as skip (tree generator handles them inline). */
function markTreeItemsSkip(
  parentItem: ScriptUIItem,
  state: AppState,
  skipIds: SkipSet
): void {
  const children = getChildren(state, parentItem.id).filter((c) => c.type === 'TreeItem')
  for (const child of children) {
    skipIds.add(child.id)
    markTreeItemsSkip(child, state, skipIds)
  }
}
