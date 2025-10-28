'use client'

import React from 'react'
import { CodeBlock } from '@/components/ui/codeblock'
import { cn } from '@/lib/utils'

interface CodeBlockGridProps {
  children: React.ReactNode
  layout?: 'vertical' | 'horizontal'
  className?: string
}

export function CodeBlockGrid({ children, layout = 'vertical', className }: CodeBlockGridProps) {
  return (
    <div className={cn(
      "grid gap-6",
      layout === 'horizontal' ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1",
      className
    )}>
      {children}
    </div>
  )
}
