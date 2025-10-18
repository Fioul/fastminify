'use client'

import { useState } from 'react'
import AdPlaceholder from './AdPlaceholder'

interface FloatingAdManagerProps {
  t: (key: string) => string
}

export default function FloatingAdManager({ t }: FloatingAdManagerProps) {
  const [isFloatingAdVisible, setIsFloatingAdVisible] = useState(true)

  const handleCloseFloatingAd = () => {
    setIsFloatingAdVisible(false)
  }

  if (!isFloatingAdVisible) {
    return null
  }

  return (
    <AdPlaceholder 
      type="floating-banner" 
      onClose={handleCloseFloatingAd}
      t={t}
    />
  )
}
