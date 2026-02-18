import React, { useEffect, useCallback } from 'react'
import { AddItemsPanel } from './panels/AddItemsPanel'
import { StructurePanel } from './panels/StructurePanel'
import { PropertiesPanel } from './panels/PropertiesPanel'
import { PreviewPanel } from './panels/PreviewPanel'
import { Toolbar } from './components/Toolbar'
import { useAppStore } from './store'
import { IPC } from '../main/ipc/channels'
import { deserializeProject } from './utils/importExport'

export default function App() {
  const { resetProject, loadProject, removeItem, duplicateItem, activeId } = useAppStore()

  // Handle menu actions from Electron main process
  useEffect(() => {
    if (!window.electronAPI) return
    const unsubscribe = window.electronAPI.onMenuAction((channel) => {
      switch (channel) {
        case IPC.NEW_PROJECT:
          if (confirm('Start a new project? Unsaved changes will be lost.')) {
            resetProject()
          }
          break
        case IPC.IMPORT_PROJECT:
          handleImport()
          break
        case IPC.EXPORT_JSX:
          document.dispatchEvent(new CustomEvent('app:export-jsx'))
          break
        case IPC.EXPORT_JSON:
          document.dispatchEvent(new CustomEvent('app:export-json'))
          break
        case IPC.UNDO:
          document.dispatchEvent(new CustomEvent('app:undo'))
          break
        case IPC.REDO:
          document.dispatchEvent(new CustomEvent('app:redo'))
          break
        case IPC.DUPLICATE_ITEM:
          if (activeId) duplicateItem(activeId)
          break
        case IPC.DELETE_ITEM:
          if (activeId) removeItem(activeId)
          break
      }
    })
    return unsubscribe
  }, [activeId, resetProject, loadProject, removeItem, duplicateItem])

  const handleImport = useCallback(async () => {
    if (!window.electronAPI) return
    const result = await window.electronAPI.openFile()
    if (!result.success || !result.content) return
    try {
      const project = deserializeProject(result.content)
      loadProject(project)
    } catch {
      alert('Failed to import project. The file may be invalid or corrupted.')
    }
  }, [loadProject])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (isInput) return

      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault()
        if (activeId) duplicateItem(activeId)
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (activeId) removeItem(activeId)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [activeId, removeItem, duplicateItem])

  return (
    <div className="flex flex-col h-screen bg-app-bg text-app-text overflow-hidden">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Panel dividers are handled by border-r */}
        <div className="w-[200px] flex-shrink-0 border-r border-app-border flex flex-col overflow-hidden">
          <AddItemsPanel />
        </div>
        <div className="w-[220px] flex-shrink-0 border-r border-app-border flex flex-col overflow-hidden">
          <StructurePanel />
        </div>
        <div className="w-[280px] flex-shrink-0 border-r border-app-border flex flex-col overflow-hidden">
          <PropertiesPanel />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <PreviewPanel />
        </div>
      </div>
    </div>
  )
}
