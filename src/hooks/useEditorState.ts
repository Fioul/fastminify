'use client'

import { useState } from 'react'
import { LanguageType, OperationType, Stats } from '@/lib/types'

export function useEditorState() {
  const [leftCode, setLeftCode] = useState('')
  const [rightCode, setRightCode] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [leftType, setLeftType] = useState<LanguageType | null>(null)
  const [rightType, setRightType] = useState<LanguageType | null>(null)
  const [lastOperation, setLastOperation] = useState<OperationType>(null)

  return {
    // State
    leftCode,
    rightCode,
    stats,
    isLoading,
    leftType,
    rightType,
    lastOperation,
    
    // Setters
    setLeftCode,
    setRightCode,
    setStats,
    setIsLoading,
    setLeftType,
    setRightType,
    setLastOperation,
  }
}
