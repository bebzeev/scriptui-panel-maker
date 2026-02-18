import { app, Menu, BrowserWindow } from 'electron'
import { IPC } from './ipc/channels'

export function createAppMenu(): void {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          accelerator: 'CmdOrCtrl+N',
          click: () => sendToRenderer(IPC.NEW_PROJECT)
        },
        { type: 'separator' },
        {
          label: 'Import…',
          accelerator: 'CmdOrCtrl+O',
          click: () => sendToRenderer(IPC.IMPORT_PROJECT)
        },
        { type: 'separator' },
        {
          label: 'Export JSX…',
          accelerator: 'CmdOrCtrl+S',
          click: () => sendToRenderer(IPC.EXPORT_JSX)
        },
        {
          label: 'Export JSON…',
          click: () => sendToRenderer(IPC.EXPORT_JSON)
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          click: () => sendToRenderer(IPC.UNDO)
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          click: () => sendToRenderer(IPC.REDO)
        },
        { type: 'separator' },
        {
          label: 'Duplicate Item',
          accelerator: 'CmdOrCtrl+D',
          click: () => sendToRenderer(IPC.DUPLICATE_ITEM)
        },
        {
          label: 'Delete Item',
          accelerator: 'Backspace',
          click: () => sendToRenderer(IPC.DELETE_ITEM)
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function sendToRenderer(channel: string): void {
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    win.webContents.send(channel)
  }
}
