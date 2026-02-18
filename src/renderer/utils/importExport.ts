import type { AppState } from '../types/schema'
import { DEFAULT_SETTINGS } from '../types/schema'

export function serializeProject(state: AppState): string {
  return JSON.stringify(state, null, 2)
}

export function deserializeProject(json: string): AppState {
  const parsed = JSON.parse(json) as AppState
  // Ensure settings have all required fields (for forward compatibility)
  parsed.settings = { ...DEFAULT_SETTINGS, ...parsed.settings }
  return parsed
}
