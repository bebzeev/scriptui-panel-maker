/**
 * Generate the footer section of the ScriptUI panel script.
 * Includes layout.layout(), resize handler, and show() call.
 */
import type { AppState } from '../types/schema'
import { buildVarNameRegistry } from './varNames'

export function generateFooter(state: AppState): string {
  const varNames = buildVarNameRegistry(state)
  const rootId = state.order.find((id) => !state.items[id]?.parentId)
  if (!rootId) return ''
  const rootVar = varNames.get(rootId) ?? 'palette'

  const lines: string[] = [
    '// --- SHOW PANEL ---',
    `${rootVar}.layout.layout(true);`,
    `${rootVar}.layout.resize();`,
    `${rootVar}.onResizing = ${rootVar}.onResize = function() { ${rootVar}.layout.resize(); };`,
    `if (${rootVar} instanceof Window) ${rootVar}.show();`,
  ]

  return lines.join('\n')
}
