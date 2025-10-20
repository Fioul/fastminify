'use client'

import { useEditorState } from './useEditorState'
import { useAutoDetect } from './useAutoDetect'
import { useModalState } from './useModalState'
import { useOptions } from './useOptions'
import { useMinificationActions } from './useMinificationActions'

export function useMinificationRefactored() {
  const editorState = useEditorState()
  const autoDetect = useAutoDetect()
  const modalState = useModalState()
  const options = useOptions()
  
  const actions = useMinificationActions({
    ...editorState,
    ...autoDetect,
    ...options
  })

  return {
    ...editorState,
    ...autoDetect,
    ...modalState,
    ...options,
    ...actions,
  }
}
