/**
 * EditText special codegen.
 * For non-default justify, use the resource string pattern for cross-app compatibility.
 */
import type { ScriptUIItem } from '../../types/schema'

/**
 * Returns true if this EditText needs the resource string pattern
 * (justify !== 'left' or explicitly set).
 */
export function editTextNeedsResourceString(item: ScriptUIItem): boolean {
  const style = item.style as Record<string, unknown>
  return typeof style.justify === 'string' && style.justify !== 'left'
}

/**
 * Generate the resource string for an EditText with non-default justify.
 * Example: 'edittext {justify: "center", properties: {name: "myEdit"}}'
 */
export function generateEditTextResourceString(
  item: ScriptUIItem,
  varName: string
): string {
  const style = item.style as Record<string, unknown>
  const justify = (style.justify as string) ?? 'left'
  const multiline = style.multiline === true ? ', multiline: true' : ''
  const readonly = style.readonly === true ? ', readonly: true' : ''
  return `'edittext {justify: "${justify}"${multiline}${readonly}, properties: {name: "${varName}"}}'`
}
