/**
 * Generate the variable declaration line for each ScriptUI element.
 * Ported and extended from Joonas reference app's make.item.js.
 */
import type { AppState, ScriptUIItem, ElementStyle, ScriptUIElementType } from '../types/schema'

type VarNames = Map<string, string>

/** Escape a string for use in JSX code */
function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')
}

/** Format creation props object, only including non-default values */
function formatCreationProps(
  type: ScriptUIElementType,
  style: Record<string, unknown>,
  varName: string
): string {
  const cp = style.creationProps as Record<string, unknown> | undefined
  if (!cp) return `{name: "${varName}"}`

  const parts: string[] = [`name: "${varName}"`]

  // Defaults per type — only output if different from default
  const defaults: Record<string, Record<string, unknown>> = {
    Dialog: { su1PanelCoordinates: false, maximizeButton: false, minimizeButton: false, independent: false, closeButton: true, borderless: false, resizeable: true },
    Panel: { borderStyle: 'etched', su1PanelCoordinates: false },
    StaticText: { truncate: 'none', multiline: false, scrolling: false },
    EditText: { noecho: false, readonly: false, multiline: false, scrollable: false, borderless: false, enterKeySignalsOnChange: false, characters: 0 },
    ListBox: { multiselect: false, numberOfColumns: 1, showHeaders: false },
    IconButton: { style: 'toolbutton', toggle: false },
  }

  const typeDefaults = defaults[type] ?? {}

  for (const [key, val] of Object.entries(cp)) {
    if (key === 'columnWidths' || key === 'columnTitles') continue // handled separately
    if (val === typeDefaults[key]) continue // skip defaults
    if (typeof val === 'boolean') {
      parts.push(`${key}: ${val}`)
    } else if (typeof val === 'number' && val !== 0) {
      parts.push(`${key}: ${val}`)
    } else if (typeof val === 'string') {
      parts.push(`${key}: "${val}"`)
    }
  }

  return `{${parts.join(', ')}}`
}

export function generateDeclaration(
  item: ScriptUIItem,
  parentVarName: string,
  varName: string,
  state: AppState
): string {
  const { type } = item
  const style = item.style as Record<string, unknown>
  const cp = style.creationProps as Record<string, unknown> | undefined
  const commentOut = style.visible === false ? '// ' : ''
  const propsStr = formatCreationProps(type, style, varName)

  switch (type) {
    case 'Dialog': {
      const text = esc(style.text as string ?? 'My Panel')
      const resizeable = cp?.resizeable !== false
      return `${commentOut}var ${varName} = (this instanceof Panel) ? this : new Window("palette", "${text}", undefined, {resizeable: ${resizeable}});`
    }

    case 'Group':
      return `${commentOut}var ${varName} = ${parentVarName}.add("group", undefined, ${propsStr});`

    case 'Panel': {
      const text = style.text ? ` "${esc(style.text as string)}"` : ''
      return `${commentOut}var ${varName} = ${parentVarName}.add("panel", undefined,${text ? text + ',' : ''} ${propsStr});`
    }

    case 'Tab': {
      const text = esc(style.text as string ?? 'Tab')
      return `${commentOut}var ${varName} = ${parentVarName}.add("tab", undefined, "${text}", ${propsStr});`
    }

    case 'TabbedPanel':
      return `${commentOut}var ${varName} = ${parentVarName}.add("tabbedpanel", undefined, ${propsStr});`

    case 'VerticalTabbedPanel':
      // VerticalTabbedPanel is generated as a compound structure — see specialItems/verticalTabbedPanel.ts
      return `${commentOut}// VerticalTabbedPanel: ${varName} (see compound structure below)`

    case 'TreeView':
      return `${commentOut}var ${varName} = ${parentVarName}.add("treeview", undefined, ${propsStr});`

    case 'TreeItem': {
      const text = esc(style.text as string ?? 'Item')
      // TreeItem parent might be another TreeItem or TreeView
      const addMethod = item.parentId && state.items[item.parentId]?.type === 'TreeItem' ? 'add' : 'add'
      return `${commentOut}var ${varName} = ${parentVarName}.${addMethod}("node", "${text}");`
    }

    case 'Button': {
      const text = esc(style.text as string ?? 'Button')
      return `${commentOut}var ${varName} = ${parentVarName}.add("button", undefined, "${text}", ${propsStr});`
    }

    case 'StaticText': {
      const text = style.text as string ?? ''
      // Multiline: handled in specialItems/staticText.ts — check for \n
      if (text.includes('\\n') || text.includes('\n')) {
        return `${commentOut}// StaticText: ${varName} (multiline — see group below)`
      }
      return `${commentOut}var ${varName} = ${parentVarName}.add("statictext", undefined, "${esc(text)}", ${propsStr});`
    }

    case 'EditText': {
      const text = esc(style.text as string ?? '')
      const justify = style.justify as string
      // Use resource string if justify is not default ('left')
      if (justify && justify !== 'left') {
        return `${commentOut}var ${varName} = ${parentVarName}.add('edittext {justify: "${justify}", properties: {name: "${varName}"}}');`
      }
      return `${commentOut}var ${varName} = ${parentVarName}.add("edittext", undefined, "${text}", ${propsStr});`
    }

    case 'Checkbox': {
      const text = esc(style.text as string ?? 'Checkbox')
      return `${commentOut}var ${varName} = ${parentVarName}.add("checkbox", undefined, "${text}", ${propsStr});`
    }

    case 'RadioButton': {
      const text = esc(style.text as string ?? 'RadioButton')
      return `${commentOut}var ${varName} = ${parentVarName}.add("radiobutton", undefined, "${text}", ${propsStr});`
    }

    case 'Slider': {
      const value = style.value as number ?? 50
      const min = style.minvalue as number ?? 0
      const max = style.maxvalue as number ?? 100
      return `${commentOut}var ${varName} = ${parentVarName}.add("slider", undefined, ${value}, ${min}, ${max}, ${propsStr});`
    }

    case 'DropDownList': {
      const items = (style.listItems as string ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      const itemsVar = `${varName}_items`
      // Items added after creation, return just the creation line
      return `${commentOut}var ${varName} = ${parentVarName}.add("dropdownlist", undefined, undefined, ${propsStr});`
    }

    case 'ListBox': {
      return `${commentOut}var ${varName} = ${parentVarName}.add("listbox", undefined, undefined, ${propsStr});`
    }

    case 'Image': {
      if (style.image) {
        return `${commentOut}var ${varName}_file = File.decode("${varName}_image_data");\n${commentOut}var ${varName} = ${parentVarName}.add("image", undefined, ${varName}_file, ${propsStr});`
      }
      return `${commentOut}var ${varName} = ${parentVarName}.add("image", undefined, undefined, ${propsStr});`
    }

    case 'IconButton': {
      const text = style.text ? `"${esc(style.text as string)}"` : 'undefined'
      if (style.image) {
        return `${commentOut}var ${varName}_file = File.decode("${varName}_icon_data");\n${commentOut}var ${varName} = ${parentVarName}.add("iconbutton", undefined, ${varName}_file, ${propsStr});`
      }
      return `${commentOut}var ${varName} = ${parentVarName}.add("iconbutton", undefined, undefined, ${propsStr});`
    }

    case 'Progressbar': {
      const value = style.value as number ?? 50
      const max = style.maxvalue as number ?? 100
      return `${commentOut}var ${varName} = ${parentVarName}.add("progressbar", undefined, ${value}, ${max}, ${propsStr});`
    }

    case 'Divider':
      // Divider is rendered as a panel with no text
      return `${commentOut}var ${varName} = ${parentVarName}.add("panel", undefined, undefined, ${propsStr});\n${commentOut}${varName}.alignment = "fill";`

    default:
      return `${commentOut}// Unknown type: ${type}`
  }
}
