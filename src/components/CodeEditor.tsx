'use client'

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
  const editorRef = useRef<any>(null)

  // Simple scroll handling - allow page scroll by default
  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    const editorElement = editor.getDomNode()
    if (!editorElement) return

    // Add wheel event listener that allows page scroll by default
    const handleWheel = (e: WheelEvent) => {
      // Check if there's content to scroll in the editor
      const hasScrollableContent = editor.getScrollHeight() > editor.getLayoutInfo().height
      
      // If there's no scrollable content, always allow page scroll
      if (!hasScrollableContent) {
        // Let the page handle the scroll
        return
      }

      // If there's scrollable content, handle editor scroll manually
      e.preventDefault()
      e.stopPropagation()
      
      const currentScrollTop = editor.getScrollTop()
      const maxScrollTop = editor.getScrollHeight() - editor.getLayoutInfo().height
      const newScrollTop = currentScrollTop + e.deltaY
      
      // Scroll within editor bounds
      editor.setScrollTop(Math.max(0, Math.min(newScrollTop, maxScrollTop)))
    }

    editorElement.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      editorElement.removeEventListener('wheel', handleWheel)
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
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
      handleMouseWheel: false
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
        onMount={(editor) => {
          editorRef.current = editor
        }}
        loading={<div className="flex items-center justify-center h-full bg-muted/30 rounded-md">Loading editor...</div>}
      />
    </div>
  )
}
