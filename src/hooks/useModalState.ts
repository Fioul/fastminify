'use client'

import { useState } from 'react'

export function useModalState() {
  const [leftModalOpen, setLeftModalOpen] = useState(false)
  const [rightModalOpen, setRightModalOpen] = useState(false)

  const handleLeftModalOpen = () => setLeftModalOpen(true)
  const handleLeftModalClose = () => setLeftModalOpen(false)
  const handleRightModalOpen = () => setRightModalOpen(true)
  const handleRightModalClose = () => setRightModalOpen(false)

  return {
    leftModalOpen,
    rightModalOpen,
    handleLeftModalOpen,
    handleLeftModalClose,
    handleRightModalOpen,
    handleRightModalClose,
  }
}
