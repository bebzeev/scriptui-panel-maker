/**
 * Generate property assignment statements for each ScriptUI element.
 * Ported and extended from Joonas reference app's apply.style.js.
 */
import type { AppState, ScriptUIItem, MarginsValue, AlignH, AlignV } from '../types/schema'

const EVENT_STUBS: Partial<Record<string, string[]>> = {
  Button:       ['onClick'],
  Checkbox:     ['onClick', 'onChange'],
  RadioButton:  ['onClick', 'onChange'],
  EditText:     ['onChange', 'onChanging'],
  Slider:       ['onChange', 'onChanging'],
  DropDownList: ['onChange'],
  ListBox:      ['onChange', 'onDoubleClick'],
  IconButton:   ['onClick'],
}

function formatMargins(margins: MarginsValue): string {
  if (typeof margins === 'number') return String(margins)
  // ScriptUI expects [left, top, right, bottom] — different from our [top, right, bottom, left]
  const [top, right, bottom, left] = margins
  return `[${left}, ${top}, ${right}, ${bottom}]`
}

export function generateStyleAssignments(
  item: ScriptUIItem,
  varName: string,
  parentItem: ScriptUIItem | null,
  state: AppState,
  indent: string
): string {
  const lines: string[] = []
  const { type } = item
  const style = item.style as Record<string, unknown>
  const commentOut = style.visible === false ? '// ' : ''
  const pfx = `${indent}${commentOut}${varName}`

  // enabled (only if false)
  if (style.enabled === false) {
    lines.push(`${pfx}.enabled = false;`)
  }

  // helpTip
  if (style.helpTip && String(style.helpTip).length > 0) {
    const tip = String(style.helpTip).replace(/\n/g, '\\n')
    lines.push(`${pfx}.helpTip = "${tip}";`)
  }

  // Type-specific properties
  switch (type) {
    case 'Slider':
      // minvalue/maxvalue already set in declaration; just value if non-default
      break

    case 'Progressbar':
      // value/maxvalue already set in declaration
      break

    case 'Checkbox':
    case 'RadioButton':
      if (style.value === true) {
        lines.push(`${pfx}.value = true;`)
      }
      break

    case 'DropDownList': {
      // Add list items
      const items = (style.listItems as string ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      for (const listItem of items) {
        if (listItem === '-') {
          lines.push(`${pfx}.add("separator");`)
        } else {
          lines.push(`${pfx}.add("item", "${listItem.replace(/"/g, '\\"')}");`)
        }
      }
      if (typeof style.selection === 'number' && style.selection >= 0) {
        lines.push(`${pfx}.selection = ${style.selection};`)
      }
      break
    }

    case 'ListBox': {
      const items = (style.listItems as string ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      for (const listItem of items) {
        lines.push(`${pfx}.add("item", "${listItem.replace(/"/g, '\\"')}");`)
      }
      const selection = style.selection as number[]
      if (selection && selection.length > 0) {
        if (selection.length === 1) {
          lines.push(`${pfx}.selection = ${varName}.items[${selection[0]}];`)
        } else {
          lines.push(`${pfx}.selection = [${selection.map((i) => `${varName}.items[${i}]`).join(', ')}];`)
        }
      }
      break
    }

    case 'TabbedPanel':
      lines.push(`${pfx}.alignChildren = ["fill", "fill"];`)
      if ((style.selection as number) > 0) {
        lines.push(`${pfx}.selection = ${varName}.tabs[${style.selection}];`)
      }
      break
  }

  // text (for types that support it but not already in declaration)
  // (already set in declaration for most types)

  // preferredSize
  const pref = style.preferredSize as [number, number] | undefined
  if (pref) {
    if (pref[0] > 0) lines.push(`${pfx}.preferredSize.width = ${pref[0]};`)
    if (pref[1] > 0) lines.push(`${pfx}.preferredSize.height = ${pref[1]};`)
  }

  // justify (not for EditText — handled in declaration via resource string)
  if (type !== 'EditText' && style.justify && style.justify !== 'left') {
    lines.push(`${pfx}.justify = "${style.justify}";`)
  }

  // orientation
  if (style.orientation && type !== 'Divider') {
    lines.push(`${pfx}.orientation = "${style.orientation}";`)
  }

  // alignChildren
  if (style.alignChildren) {
    const [h, v] = style.alignChildren as [AlignH, AlignV]
    lines.push(`${pfx}.alignChildren = ["${h}", "${v}"];`)
  }

  // spacing
  if (typeof style.spacing === 'number') {
    lines.push(`${pfx}.spacing = ${style.spacing};`)
  }

  // margins
  if (style.margins !== undefined && type !== 'Divider') {
    lines.push(`${pfx}.margins = ${formatMargins(style.margins as MarginsValue)};`)
  }

  // alignment (self-alignment within parent)
  if (style.alignment !== null && style.alignment !== undefined) {
    // ScriptUI alignment is [h, v] — combine stored value with parent's alignChildren
    const parentStyle = parentItem?.style as Record<string, unknown> | undefined
    const parentOrientation = parentStyle?.orientation as string ?? 'column'
    const parentAlignChildren = parentStyle?.alignChildren as [AlignH, AlignV] | undefined ?? ['left', 'top']
    const stored = style.alignment as string

    let alignH: string, alignV: string
    if (parentOrientation === 'column') {
      alignH = stored  // stored value controls H in column
      alignV = parentAlignChildren[1]
    } else {
      alignH = parentAlignChildren[0]
      alignV = stored  // stored value controls V in row
    }
    lines.push(`${pfx}.alignment = ["${alignH}", "${alignV}"];`)
  }

  // VerticalTabbedPanel tabNavWidth
  if (type === 'VerticalTabbedPanel' && style.tabNavWidth) {
    // Handled in specialItems
  }

  // Event stubs (TODO comments)
  const events = EVENT_STUBS[type]
  if (events && events.length > 0) {
    for (const event of events) {
      lines.push(`${indent}// TODO: ${varName}.${event} = function() { /* handle ${event} */ };`)
    }
  }

  return lines.join('\n')
}
