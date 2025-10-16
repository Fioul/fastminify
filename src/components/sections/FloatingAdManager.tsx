'use client'

import { useState } from 'react'
import AdPlaceholder from './AdPlaceholder'

export default function FloatingAdManager() {
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
    />
  )
}
