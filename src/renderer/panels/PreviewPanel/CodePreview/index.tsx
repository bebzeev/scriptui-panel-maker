import React, { useEffect, useState, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { Copy, Download, Check } from 'lucide-react'
import { useAppStore } from '../../../store'
import { generateJSX } from '../../../codegen'
import { monacoThemeConfig } from './monacoConfig'

export function CodePreview() {
  const storeState = useAppStore()
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)

  // Debounced code generation
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const generated = generateJSX(storeState)
        setCode(generated)
      } catch (e) {
        setCode(`// Error generating code: ${e}`)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [storeState.items, storeState.order, storeState.settings])

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const handleDownload = useCallback(async () => {
    if (!window.electronAPI) return
    const filename = `${storeState.settings.panelName.replace(/\s+/g, '_')}.jsx`
    await window.electronAPI.saveFile(code, filename)
  }, [code, storeState.settings.panelName])

  return (
    <div className="flex flex-col h-full">
      {/* Action bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-app-border flex-shrink-0">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 h-6 text-xs text-app-muted hover:text-app-text hover:bg-app-hover rounded transition-colors"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-2.5 h-6 text-xs text-app-muted hover:text-app-text hover:bg-app-hover rounded transition-colors"
        >
          <Download size={12} />
          Save .jsx
        </button>
      </div>

      {/* Monaco editor */}
      <div className="flex-1">
        <Editor
          language="javascript"
          value={code}
          theme="scriptui-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 12,
            lineNumbers: 'on',
            wordWrap: 'on',
            fontFamily: "'SF Mono', Monaco, Inconsolata, 'Fira Mono', monospace",
            renderLineHighlight: 'none',
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            folding: true,
            lineDecorationsWidth: 8,
            lineNumbersMinChars: 3,
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('scriptui-dark', monacoThemeConfig)
          }}
        />
      </div>
    </div>
  )
}
