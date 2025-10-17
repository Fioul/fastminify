'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useMemo, useEffect, useRef } from 'react'

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
  const editorRef = useRef<unknown>(null)
  const [hasScrollableContent, setHasScrollableContent] = React.useState(false)

  // Check if editor has scrollable content and update handleMouseWheel accordingly
  React.useEffect(() => {
    const editor = editorRef.current as any
    if (!editor) return

    const checkScrollableContent = () => {
      const scrollHeight = editor.getScrollHeight()
      const layoutInfo = editor.getLayoutInfo()
      const isScrollable = scrollHeight > layoutInfo.height
      setHasScrollableContent(isScrollable)
    }

    // Check initially
    checkScrollableContent()

    // Listen for content changes
    const model = editor.getModel()
    let contentDisposable: any = null
    let layoutDisposable: any = null

    if (model) {
      contentDisposable = model.onDidChangeContent(checkScrollableContent)
    }

    // Listen for layout changes (resize, etc.)
    layoutDisposable = editor.onDidLayoutChange(checkScrollableContent)

    return () => {
      if (contentDisposable) {
        contentDisposable.dispose()
      }
      if (layoutDisposable) {
        layoutDisposable.dispose()
      }
    }
  }, [value])

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
      verticalScrollbarSize: 12,
      horizontalScrollbarSize: 12,
      handleMouseWheel: hasScrollableContent, // Enable mouse wheel only when there's scrollable content
      useShadows: true,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      verticalScrollbarHasSlider: true,
      horizontalScrollbarHasSlider: true
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
    // Remove internal borders
    renderLineHighlight: 'none' as const,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
    contextmenu: false,
    // Remove validation decorations and borders
    renderValidationDecorations: 'off' as const,
    renderWhitespace: 'none' as const,
    // Remove focus borders
    outline: 'none',
    // Remove selection borders
    selectionHighlight: false
  }), [placeholder, readOnly, hasScrollableContent])

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
        onMount={(editor) => {
          editorRef.current = editor
        }}
        loading={<div className="flex items-center justify-center h-full bg-muted/30 rounded-md">Loading editor...</div>}
      />
    </div>
  )
}
