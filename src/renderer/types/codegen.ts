import type { AppState, ScriptUIElementType } from './schema'

export interface CodegenContext {
  state: AppState
  getVarName: (id: string) => string
  getIndentLevel: (id: string) => number
  getIndentStr: (id: string) => string
  indentChar: string // '  ' or '    '
  // Tracking for multi-step generation
  extraCode: string[] // code appended after main block (e.g. VerticalTabbedPanel showTab fn)
}

export interface VarNameRegistry {
  counters: Partial<Record<ScriptUIElementType, number>>
  names: Record<string, string> // itemId → varName
}
