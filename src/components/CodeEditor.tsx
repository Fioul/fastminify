'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { loader } from '@monaco-editor/react'
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

// Configure self-hosted Monaco paths (served from /public/monaco)
loader.config({ paths: { vs: '/monaco/vs' } })

// Initialise Monaco de manière défensive pour éviter les erreurs silencieuses
let monacoInitStarted = false

interface CodeEditorProps {
  value: string
  onChange: (value: string | undefined) => void
  language: 'javascript' | 'css' | 'html' | 'json'
  placeholder?: string
  height?: string
  readOnly?: boolean
  'data-testid'?: string
}

export default function CodeEditor({
  value,
  onChange,
  language,
  placeholder = 'Paste or drop your code here...',
  height = '600px',
  readOnly = false,
  'data-testid': dataTestId
}: CodeEditorProps) {
  const { theme } = useTheme()
  const editorRef = useRef<unknown>(null)
  const [hasScrollableContent, setHasScrollableContent] = React.useState(false)
  const [shouldLoad, setShouldLoad] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const effectiveLanguage = language === 'html' ? 'plaintext' : language

  // Charger Monaco en idle ou quand la zone devient visible, et aussi au clic si l'utilisateur souhaite accélérer
  React.useEffect(() => {
    // Idle callback
    const ric: any = (window as any).requestIdleCallback
    let idleId: any
    if (typeof ric === 'function') {
      idleId = ric(() => setShouldLoad(true), { timeout: 2000 })
    } else {
      const timeoutId = setTimeout(() => setShouldLoad(true), 1500)
      idleId = { cancel: () => clearTimeout(timeoutId) }
    }

    // Intersection Observer: load when visible
    const el = containerRef.current
    let observer: IntersectionObserver | null = null
    if (el && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer?.disconnect()
            break
          }
        }
      }, { rootMargin: '100px' })
      observer.observe(el)
    }

    return () => {
      if (idleId && typeof (window as any).cancelIdleCallback === 'function') {
        ;(window as any).cancelIdleCallback(idleId)
      } else if (idleId && idleId.cancel) {
        idleId.cancel()
      }
      observer?.disconnect()
    }
  }, [])

  // Injecte la CSS de Monaco seulement au moment du chargement effectif
  React.useEffect(() => {
    if (!shouldLoad) return
    const id = 'monaco-editor-main-css'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = '/monaco/vs/editor/editor.main.css'
      document.head.appendChild(link)
    }
  }, [shouldLoad])

  // Check if editor has scrollable content and update handleMouseWheel accordingly
  React.useEffect(() => {
    const editor = editorRef.current as any
    if (!editor) return

    const checkScrollableContent = () => {
      try {
        const scrollHeight = editor.getScrollHeight()
        const layoutInfo = editor.getLayoutInfo()
        const isScrollable = scrollHeight > layoutInfo.height + 10 // Add small margin for better detection
        setHasScrollableContent(isScrollable)
      } catch (error) {
        // If there's an error, assume not scrollable to allow page scrolling
        setHasScrollableContent(false)
      }
    }

    // Check initially with a small delay
    const initialTimeout = setTimeout(checkScrollableContent, 50)

    // Listen for content changes
    const model = editor.getModel()
    let contentDisposable: any = null
    let layoutDisposable: any = null

    if (model) {
      contentDisposable = model.onDidChangeContent(() => {
        // Immediate check
        checkScrollableContent()
        // Also check after a delay for layout changes
        setTimeout(checkScrollableContent, 100)
      })
    }

    // Listen for layout changes (resize, etc.)
    layoutDisposable = editor.onDidLayoutChange(checkScrollableContent)

    return () => {
      clearTimeout(initialTimeout)
      if (contentDisposable) {
        contentDisposable.dispose()
      }
      if (layoutDisposable) {
        layoutDisposable.dispose()
      }
    }
  }, [value])

  // Force refresh when value changes significantly (like paste operations)
  React.useEffect(() => {
    const editor = editorRef.current as any
    if (!editor) return

    // Multiple checks at different intervals to catch all cases
    const timeouts = [
      setTimeout(() => {
        editor.layout()
        const scrollHeight = editor.getScrollHeight()
        const layoutInfo = editor.getLayoutInfo()
        const isScrollable = scrollHeight > layoutInfo.height + 10
        setHasScrollableContent(isScrollable)
      }, 50),
      setTimeout(() => {
        editor.layout()
        const scrollHeight = editor.getScrollHeight()
        const layoutInfo = editor.getLayoutInfo()
        const isScrollable = scrollHeight > layoutInfo.height + 10
        setHasScrollableContent(isScrollable)
      }, 200)
    ]

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
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
      handleMouseWheel: hasScrollableContent, // Only handle mouse wheel when there's scrollable content
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
    <div
      ref={containerRef}
      className="w-full h-full border rounded-md overflow-hidden"
      data-testid={dataTestId}
      onClick={() => setShouldLoad(true)}
    >
      {shouldLoad ? (
      <MonacoEditor
        height={height}
        language={effectiveLanguage}
        theme={editorTheme}
        value={value}
        onChange={onChange}
        options={editorOptions}
        onMount={(editor, monaco) => {
          try {
            editorRef.current = editor
            // Défensif: vérifier que workers se résolvent
            if (!monacoInitStarted && monaco?.editor) {
              monacoInitStarted = true
            }
          } catch (e) {
            console.error('Monaco initialization: error:', e)
          }
        }
        }
        loading={<div className="flex items-center justify-center h-full bg-muted/30 rounded-md">Loading editor...</div>}
      />
      ) : (
        <div
          className="flex items-center justify-center h-full w-full bg-muted/30 rounded-md select-none cursor-text hover:bg-muted/40 transition"
          onClick={() => setShouldLoad(true)}
        >
          <div className="text-muted-foreground text-sm">Loading will start automatically… (click to load now)</div>
        </div>
      )}
    </div>
  )
}
