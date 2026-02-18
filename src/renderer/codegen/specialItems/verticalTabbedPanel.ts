/**
 * VerticalTabbedPanel special codegen.
 *
 * Generates the pattern:
 *   var vtabpanel1 = parent.add("group");               // outer wrapper
 *   vtabpanel1.orientation = "row";
 *   vtabpanel1.spacing = 0; vtabpanel1.margins = 0;
 *
 *   var vtabpanel1_nav = vtabpanel1.add("listbox", ...);  // nav sidebar
 *   vtabpanel1_nav.preferredSize.width = <tabNavWidth>;
 *
 *   var vtabpanel1_stack = vtabpanel1.add("group");       // content stack
 *   vtabpanel1_stack.orientation = "stack";
 *   vtabpanel1_stack.alignment = ["fill","fill"];
 *
 *   // One tab group per Tab child
 *   var tab1 = vtabpanel1_stack.add("group");
 *   tab1.orientation = "column";
 *   tab1.alignChildren = ["left","top"];
 *   ...
 *
 *   // showTab helper function
 *   vtabpanel1_nav.onChange = function() {
 *     var idx = vtabpanel1_nav.selection.index;
 *     vtabpanel1_stack.children[idx].visible = true;
 *     // hide others
 *   };
 *   vtabpanel1_nav.selection = 0;
 */
import type { AppState, ScriptUIItem } from '../../types/schema'
import { getChildren } from '../../store/selectors'

export function generateVerticalTabbedPanel(
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
  const navVar = `${varName}_nav`
  const stackVar = `${varName}_stack`
  const tabNavWidth = (style.tabNavWidth as number) ?? 100

  const tabs = getChildren(state, item.id).filter((c) => c.type === 'Tab')
  const tabLabels = tabs
    .map((t) => {
      const ts = t.style as Record<string, unknown>
      return `"${((ts.text as string) ?? 'Tab').replace(/"/g, '\\"')}"`
    })
    .join(', ')

  const tabCount = tabs.length
  const lines: string[] = []

  // Outer wrapper group
  lines.push(`${pfx}var ${varName} = ${parentVar}.add("group", undefined, {name: "${varName}"});`)
  lines.push(`${pfx}${varName}.orientation = "row";`)
  lines.push(`${pfx}${varName}.spacing = 0;`)
  lines.push(`${pfx}${varName}.margins = 0;`)
  lines.push(`${pfx}${varName}.alignment = ["fill","fill"];`)
  lines.push(`${pfx}${varName}.alignChildren = ["left","fill"];`)
  lines.push('')

  // Nav ListBox
  lines.push(
    `${pfx}var ${navVar} = ${varName}.add("listbox", undefined, [${tabLabels}], {name: "${navVar}"});`
  )
  lines.push(`${pfx}${navVar}.preferredSize.width = ${tabNavWidth};`)
  lines.push(`${pfx}${navVar}.alignment = ["left","fill"];`)
  lines.push('')

  // Stack group
  lines.push(`${pfx}var ${stackVar} = ${varName}.add("group", undefined, {name: "${stackVar}"});`)
  lines.push(`${pfx}${stackVar}.orientation = "stack";`)
  lines.push(`${pfx}${stackVar}.alignment = ["fill","fill"];`)
  lines.push(`${pfx}${stackVar}.alignChildren = ["fill","fill"];`)
  lines.push('')

  // One group per tab
  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i]
    const tabVar = varNames.get(tab.id) ?? `tab${i + 1}`
    const tabStyle = tab.style as Record<string, unknown>
    const tabComment = tabStyle.visible === false ? '// ' : ''
    lines.push(
      `${indent}${tabComment}var ${tabVar} = ${stackVar}.add("group", undefined, {name: "${tabVar}"});`
    )
    lines.push(`${indent}${tabComment}${tabVar}.orientation = "column";`)
    lines.push(`${indent}${tabComment}${tabVar}.alignChildren = ["left","top"];`)
    lines.push(`${indent}${tabComment}${tabVar}.alignment = ["fill","fill"];`)
    if (i > 0) {
      lines.push(`${indent}${tabComment}${tabVar}.visible = false;`)
    }
  }

  lines.push('')

  // onChange to show active tab, hide others
  lines.push(`${pfx}${navVar}.onChange = function() {`)
  lines.push(`${indent}${commentOut}  var idx = ${navVar}.selection ? ${navVar}.selection.index : 0;`)
  for (let i = 0; i < tabCount; i++) {
    const tab = tabs[i]
    const tabVar = varNames.get(tab.id) ?? `tab${i + 1}`
    lines.push(`${indent}${commentOut}  ${tabVar}.visible = (idx === ${i});`)
  }
  lines.push(`${pfx}};`)
  lines.push(`${pfx}${navVar}.selection = 0;`)

  return lines.join('\n')
}
