'use client'

import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-muted/30 rounded-md">
      <div className="text-muted-foreground text-sm">Loading editor...</div>
    </div>
  )
})

interface CodeEditorProps {
  value: string
  onChange: (value: string | undefined) => void
  language: 'javascript' | 'css' | 'html' | 'json'
  placeholder?: string
  height?: string
  readOnly?: boolean
}

export default function CodeEditor({
  value,
  onChange,
  language,
  placeholder = 'Paste or drop your code here...',
  height = '600px',
  readOnly = false
}: CodeEditorProps) {
  const { theme } = useTheme()

  // Monaco Editor options
  const editorOptions = useMemo(() => ({
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on' as const,
    wordWrap: 'on' as const,
    automaticLayout: true,
    readOnly,
    placeholder: placeholder,
    padding: { top: 16, bottom: 16 },
    scrollbar: {
      vertical: 'auto' as const,
      horizontal: 'auto' as const,
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    },
    // Syntax highlighting
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true
    },
    // Cursor and selection
    cursorBlinking: 'blink' as const,
    cursorSmoothCaretAnimation: 'on' as const,
    // Accessibility
    accessibilitySupport: 'auto' as const,
    // Supprimer les bordures internes
    renderLineHighlight: 'none' as const,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
    contextmenu: false,
    // Supprimer les décorations de validation et bordures
    renderValidationDecorations: 'off' as const,
    renderWhitespace: 'none' as const,
    // Supprimer les bordures de focus
    outline: 'none',
    // Supprimer les bordures de sélection
    selectionHighlight: false
  }), [placeholder, readOnly])

  // Theme mapping
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs-light'

  return (
    <div className="w-full h-full border rounded-md overflow-hidden">
      <MonacoEditor
        height={height}
        language={language}
        theme={editorTheme}
        value={value}
        onChange={onChange}
        options={editorOptions}
        loading={<div className="flex items-center justify-center h-full bg-muted/30 rounded-md">Loading editor...</div>}
      />
    </div>
  )
}
