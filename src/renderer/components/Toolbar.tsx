import React, { useCallback, useEffect } from 'react'
import { FilePlus, FolderOpen, Download, FileJson } from 'lucide-react'
import { useAppStore } from '../store'
import { generateJSX } from '../codegen'
import { serializeProject, deserializeProject } from '../utils/importExport'

export function Toolbar() {
  const { resetProject, loadProject, items, order, settings, activeId } = useAppStore()

  const handleNew = useCallback(() => {
    if (confirm('Start a new project? Unsaved changes will be lost.')) {
      resetProject()
    }
  }, [resetProject])

  const handleImport = useCallback(async () => {
    if (!window.electronAPI) return
    const result = await window.electronAPI.openFile()
    if (!result.success || !result.content) return
    try {
      const project = deserializeProject(result.content)
      loadProject(project)
    } catch {
      alert('Invalid project file.')
    }
  }, [loadProject])

  const handleExportJSX = useCallback(async () => {
    if (!window.electronAPI) return
    const state = useAppStore.getState()
    const code = generateJSX(state)
    const filename = `${state.settings.panelName.replace(/\s+/g, '_')}.jsx`
    await window.electronAPI.saveFile(code, filename)
  }, [])

  const handleExportJSON = useCallback(async () => {
    if (!window.electronAPI) return
    const state = useAppStore.getState()
    const json = serializeProject(state)
    const filename = `${state.settings.panelName.replace(/\s+/g, '_')}.json`
    await window.electronAPI.saveFile(json, filename)
  }, [])

  // Listen for app-level events from menu handler in App.tsx
  useEffect(() => {
    const onExportJSX = () => handleExportJSX()
    const onExportJSON = () => handleExportJSON()
    document.addEventListener('app:export-jsx', onExportJSX)
    document.addEventListener('app:export-json', onExportJSON)
    return () => {
      document.removeEventListener('app:export-jsx', onExportJSX)
      document.removeEventListener('app:export-json', onExportJSON)
    }
  }, [handleExportJSX, handleExportJSON])

  return (
    <div className="flex items-center h-9 px-3 gap-1 bg-app-panel border-b border-app-border flex-shrink-0 app-region-drag">
      {/* Spacer for macOS traffic lights */}
      <div className="w-16 flex-shrink-0" />

      <div className="flex items-center gap-1 app-region-no-drag">
        <ToolbarButton icon={<FilePlus size={13} />} label="New" onClick={handleNew} />
        <ToolbarButton icon={<FolderOpen size={13} />} label="Import" onClick={handleImport} />
        <div className="w-px h-4 bg-app-border mx-1" />
        <ToolbarButton icon={<Download size={13} />} label="Export JSX" onClick={handleExportJSX} primary />
        <ToolbarButton icon={<FileJson size={13} />} label="Export JSON" onClick={handleExportJSON} />
      </div>

      <div className="flex-1" />

      {/* Panel name */}
      <PanelNameInput />
    </div>
  )
}

function ToolbarButton({
  icon,
  label,
  onClick,
  primary = false,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-2.5 h-6 rounded text-xs font-medium transition-colors
        ${primary
          ? 'bg-app-accent text-white hover:opacity-90'
          : 'text-app-muted hover:text-app-text hover:bg-app-hover'
        }
      `}
    >
      {icon}
      {label}
    </button>
  )
}

function PanelNameInput() {
  const { settings, updateSettings } = useAppStore()
  return (
    <input
      type="text"
      value={settings.panelName}
      onChange={(e) => updateSettings({ panelName: e.target.value })}
      className="
        bg-transparent border border-transparent hover:border-app-border focus:border-app-accent
        text-app-text text-xs px-2 py-0.5 rounded w-40 text-right outline-none transition-colors
      "
      placeholder="Panel name"
    />
  )
}
