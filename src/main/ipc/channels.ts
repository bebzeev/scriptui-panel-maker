export const IPC = {
  // Menu → Renderer
  NEW_PROJECT: 'menu:new-project',
  IMPORT_PROJECT: 'menu:import-project',
  EXPORT_JSX: 'menu:export-jsx',
  EXPORT_JSON: 'menu:export-json',
  UNDO: 'menu:undo',
  REDO: 'menu:redo',
  DUPLICATE_ITEM: 'menu:duplicate-item',
  DELETE_ITEM: 'menu:delete-item',

  // Renderer → Main (invoke)
  SAVE_FILE: 'fs:save-file',
  OPEN_FILE: 'fs:open-file',
} as const

export type IpcChannel = (typeof IPC)[keyof typeof IPC]
