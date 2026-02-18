import { ipcMain, dialog } from 'electron'
import { readFile, writeFile } from 'fs/promises'
import { IPC } from './channels'

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC.SAVE_FILE, async (_event, content: string, defaultName: string) => {
    const result = await dialog.showSaveDialog({
      defaultPath: defaultName,
      filters: defaultName.endsWith('.jsx')
        ? [{ name: 'ExtendScript', extensions: ['jsx', 'js'] }]
        : [{ name: 'JSON', extensions: ['json'] }]
    })
    if (result.canceled || !result.filePath) return { success: false }
    await writeFile(result.filePath, content, 'utf-8')
    return { success: true, filePath: result.filePath }
  })

  ipcMain.handle(IPC.OPEN_FILE, async () => {
    const result = await dialog.showOpenDialog({
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile']
    })
    if (result.canceled || result.filePaths.length === 0) return { success: false }
    const content = await readFile(result.filePaths[0], 'utf-8')
    return { success: true, content }
  })
}
