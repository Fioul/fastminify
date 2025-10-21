'use client'

import { useEditorState } from './useEditorState'
import { useAutoDetect } from './useAutoDetect'
import { useModalState } from './useModalState'
import { useOptions } from './useOptions'
import { useMinificationActions } from './useMinificationActions'
import { useTranslations } from './useTranslations'

export function useMinificationRefactored(locale: string) {
  const { t } = useTranslations(locale)
  const editorState = useEditorState()
  const autoDetect = useAutoDetect()
  const modalState = useModalState()
  const options = useOptions()
  
  const actions = useMinificationActions({
    ...editorState,
    ...autoDetect,
    ...options,
    t
  })

  return {
    ...editorState,
    ...autoDetect,
    ...modalState,
    ...options,
    ...actions,
  }
}
