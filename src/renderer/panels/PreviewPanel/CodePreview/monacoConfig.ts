import type { editor } from 'monaco-editor'

export const monacoThemeConfig: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
    { token: 'keyword', foreground: '569CD6' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'number', foreground: 'B5CEA8' },
    { token: 'delimiter', foreground: 'D4D4D4' },
    { token: 'identifier', foreground: '9CDCFE' },
  ],
  colors: {
    'editor.background': '#1e1e1e',
    'editor.foreground': '#D4D4D4',
    'editorLineNumber.foreground': '#555555',
    'editorLineNumber.activeForeground': '#888888',
    'editor.lineHighlightBackground': '#00000000',
    'editorCursor.foreground': '#00000000',
    'editor.selectionBackground': '#264F78',
    'scrollbar.shadow': '#00000000',
    'scrollbarSlider.background': '#555555AA',
    'scrollbarSlider.hoverBackground': '#777777AA',
  }
}
