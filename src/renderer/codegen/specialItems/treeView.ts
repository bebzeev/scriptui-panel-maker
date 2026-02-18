/**
 * TreeView special codegen.
 * TreeView items are added via treeview.add("node") and can be nested.
 */
import type { AppState, ScriptUIItem } from '../../types/schema'
import { getChildren } from '../../store/selectors'

/**
 * Generate TreeItem add calls for a TreeView.
 * Returns assignment lines for all TreeItem children, recursively.
 */
export function generateTreeItems(
  parentItem: ScriptUIItem,
  parentVar: string,
  state: AppState,
  varNames: Map<string, string>,
  indent: string
): string {
  const children = getChildren(state, parentItem.id).filter(
    (c) => c.type === 'TreeItem'
  )
  const lines: string[] = []

  for (const child of children) {
    const childVar = varNames.get(child.id) ?? 'treeitem'
    const style = child.style as Record<string, unknown>
    const text = (style.text as string) ?? 'Item'
    const commentOut = style.visible === false ? '// ' : ''
    const pfx = `${indent}${commentOut}`
    const expanded = style.expanded === true ? '\n' + pfx + `${childVar}.expanded = true;` : ''

    lines.push(
      `${pfx}var ${childVar} = ${parentVar}.add("node", "${text.replace(/"/g, '\\"')}");${expanded}`
    )

    // Recursively handle nested TreeItems
    const nested = generateTreeItems(child, childVar, state, varNames, indent)
    if (nested) lines.push(nested)
  }

  return lines.join('\n')
}
