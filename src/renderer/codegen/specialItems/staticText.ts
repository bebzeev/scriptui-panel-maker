/**
 * StaticText special codegen.
 * If the text contains \n, generate a Group + multiple single-line StaticText children.
 */
import type { ScriptUIItem } from '../../types/schema'

export function staticTextNeedsMultilineGroup(item: ScriptUIItem): boolean {
  const style = item.style as Record<string, unknown>
  const text = (style.text as string) ?? ''
  return text.includes('\\n') || text.includes('\n')
}

/**
 * Generate group + individual statictext lines for a multiline StaticText.
 * Returns the full block as a string.
 */
export function generateMultilineStaticText(
  item: ScriptUIItem,
  varName: string,
  parentVar: string,
  indent: string
): string {
  const style = item.style as Record<string, unknown>
  const rawText = (style.text as string) ?? ''
  // Support both literal \n and actual newlines
  const lines = rawText.split(/\\n|\n/)
  const commentOut = style.visible === false ? '// ' : ''
  const pfx = `${indent}${commentOut}`

  const out: string[] = []
  out.push(`${pfx}var ${varName} = ${parentVar}.add("group", undefined, {name: "${varName}"});`)
  out.push(`${pfx}${varName}.orientation = "column";`)
  out.push(`${pfx}${varName}.spacing = 0;`)
  out.push(`${pfx}${varName}.alignChildren = ["left", "top"];`)
  for (const line of lines) {
    const escaped = line.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    out.push(`${pfx}${varName}.add("statictext", undefined, "${escaped}");`)
  }
  return out.join('\n')
}
