/**
 * TabbedPanel special codegen.
 * TabbedPanel uses .add("tabbedpanel") and then .add("tab") for each Tab child.
 * Tab children of a TabbedPanel are declared as part of the panel, not as standalone vars.
 */
import type { AppState, ScriptUIItem } from '../../types/schema'
import { getChildren } from '../../store/selectors'

/**
 * Returns the list of Tab child items for a TabbedPanel.
 */
export function getTabbedPanelTabs(item: ScriptUIItem, state: AppState): ScriptUIItem[] {
  return getChildren(state, item.id).filter((child) => child.type === 'Tab')
}

/**
 * Generate the TabbedPanel var declaration + tab declarations.
 * Returns all lines as a string (does NOT recurse into tab children — the main loop handles that).
 */
export function generateTabbedPanelDeclaration(
  item: ScriptUIItem,
  varName: string,
  parentVar: string,
  state: AppState,
  varNames: Map<string, string>,
  indent: string
): string {
  const style = item.style as Record<string, unknown>
  const commentOut = style.visible === false ? '// ' : ''
  const pfx = `${indent}${commentOut}`

  const lines: string[] = []
  lines.push(
    `${pfx}var ${varName} = ${parentVar}.add("tabbedpanel", undefined, {name: "${varName}"});`
  )

  // Declare each Tab child directly on the panel
  const tabs = getTabbedPanelTabs(item, state)
  for (const tab of tabs) {
    const tabVar = varNames.get(tab.id) ?? 'tab'
    const tabStyle = tab.style as Record<string, unknown>
    const tabText = (tabStyle.text as string) ?? 'Tab'
    const tabComment = tabStyle.visible === false ? '// ' : ''
    lines.push(
      `${indent}${tabComment}var ${tabVar} = ${varName}.add("tab", undefined, "${tabText.replace(/"/g, '\\"')}", {name: "${tabVar}"});`
    )
    lines.push(`${indent}${tabComment}${tabVar}.orientation = "column";`)
    lines.push(`${indent}${tabComment}${tabVar}.alignChildren = ["left", "top"];`)
  }

  return lines.join('\n')
}
