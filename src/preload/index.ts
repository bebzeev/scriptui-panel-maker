import { contextBridge, ipcRenderer } from 'electron'
import { IPC, IpcChannel } from '../main/ipc/channels'

export interface ElectronAPI {
  saveFile: (content: string, defaultName: string) => Promise<{ success: boolean; filePath?: string }>
  openFile: () => Promise<{ success: boolean; content?: string }>
  onMenuAction: (callback: (channel: IpcChannel) => void) => () => void
}

const electronAPI: ElectronAPI = {
  saveFile: (content, defaultName) => ipcRenderer.invoke(IPC.SAVE_FILE, content, defaultName),
  openFile: () => ipcRenderer.invoke(IPC.OPEN_FILE),
  onMenuAction: (callback) => {
    const menuChannels: IpcChannel[] = [
      IPC.NEW_PROJECT,
      IPC.IMPORT_PROJECT,
      IPC.EXPORT_JSX,
      IPC.EXPORT_JSON,
      IPC.UNDO,
      IPC.REDO,
      IPC.DUPLICATE_ITEM,
      IPC.DELETE_ITEM,
    ]
    const listeners = menuChannels.map((channel) => {
      const listener = () => callback(channel)
      ipcRenderer.on(channel, listener)
      return () => ipcRenderer.off(channel, listener)
    })
    return () => listeners.forEach((off) => off())
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
