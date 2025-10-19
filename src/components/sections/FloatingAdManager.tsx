'use client'

import AdPlaceholder from './AdPlaceholder'
import { useAdContext } from '@/contexts/AdContext'

interface FloatingAdManagerProps {
  t: (key: string) => string
}

export default function FloatingAdManager({ t }: FloatingAdManagerProps) {
  const { isFloatingAdVisible, setIsFloatingAdVisible } = useAdContext()

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
