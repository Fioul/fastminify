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
  const editorRef = useRef<unknown>(null)

  // Enhanced scroll handling for page context only (modal uses native Monaco scroll)
  useEffect(() => {
    const editor = editorRef.current as any
    if (!editor) return

    const editorElement = editor.getDomNode()
    if (!editorElement) return

    // Check if we're in a modal context - if so, don't add custom scroll handling
    const isInModal = editorElement.closest('[data-slot="dialog-content"]')
    if (isInModal) {
      return // Let Monaco handle scroll natively in modal
    }
    
    const handleWheel = (e: WheelEvent) => {
      // Check if there's content to scroll in the editor
      const hasScrollableContent = editor.getScrollHeight() > editor.getLayoutInfo().height
      
      // If there's no scrollable content, always allow page scroll
      if (!hasScrollableContent) {
        return
      }

      // Check if we're at the top/bottom of editor scroll
      const currentScrollTop = editor.getScrollTop()
      const maxScrollTop = editor.getScrollHeight() - editor.getLayoutInfo().height
      
      // If scrolling up and at top, or scrolling down and at bottom, allow page scroll
      if ((e.deltaY < 0 && currentScrollTop <= 0) || 
          (e.deltaY > 0 && currentScrollTop >= maxScrollTop)) {
        return // Allow page scroll
      }

      // Otherwise, handle editor scroll
      e.preventDefault()
      e.stopPropagation()
      
      const newScrollTop = currentScrollTop + e.deltaY
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
      verticalScrollbarSize: 12,
      horizontalScrollbarSize: 12,
      handleMouseWheel: true,
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
