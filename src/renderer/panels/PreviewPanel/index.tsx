import React from 'react'
import { useAppStore } from '../../store'
import { VisualPreview } from './VisualPreview'
import { CodePreview } from './CodePreview'

export function PreviewPanel() {
  const previewTab = useAppStore((s) => s.previewTab)
  const setPreviewTab = useAppStore((s) => s.setPreviewTab)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center border-b border-app-border flex-shrink-0">
        <TabButton label="Visual" active={previewTab === 'visual'} onClick={() => setPreviewTab('visual')} />
        <TabButton label="Code" active={previewTab === 'code'} onClick={() => setPreviewTab('code')} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {previewTab === 'visual' ? <VisualPreview /> : <CodePreview />}
      </div>
    </div>
  )
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 h-8 text-xs font-medium transition-colors border-b-2
        ${active
          ? 'text-app-text border-app-accent'
          : 'text-app-muted border-transparent hover:text-app-text hover:border-app-border'
        }
      `}
    >
      {label}
    </button>
  )
}
