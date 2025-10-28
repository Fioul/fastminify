'use client'

import React, { useState, useRef } from 'react'
import { Copy, Check } from '@/lib/icons'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  language?: string
  layout?: 'vertical' | 'horizontal'
}

export function CodeBlock({ children, className, language, layout = 'vertical' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    try {
      if (codeRef.current) {
        const textContent = codeRef.current.textContent || ''
        await navigator.clipboard.writeText(textContent)
        setCopied(true)
        
        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      }
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div 
      className={cn(
        "relative group bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden",
        layout === 'horizontal' ? "inline-block max-w-full" : "w-full",
        className
      )}
    >
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-md transition-all duration-200",
          "bg-background/80 backdrop-blur-sm border border-border/50",
          "hover:bg-background hover:border-border",
          "opacity-0 group-hover:opacity-100",
          "cursor-pointer",
          copied && "opacity-100"
        )}
        title={copied ? "Copié!" : "Copier le code"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        )}
      </button>

      {/* Code content */}
      <div ref={codeRef} className="p-4 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre">
        {children}
      </div>
    </div>
  )
}
