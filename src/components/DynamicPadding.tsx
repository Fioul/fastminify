'use client'

import { useAdContext } from '@/contexts/AdContext'

export default function DynamicPadding() {
  const { isFloatingAdVisible } = useAdContext()

  // Hauteur de la bannière flottante (90px + padding + marge supplémentaire)
  const floatingAdHeight = 140 // 90px + 30px de padding + 20px de marge supplémentaire

  return (
    <div 
      className={`transition-all duration-300 ${
        isFloatingAdVisible ? `h-[${floatingAdHeight}px]` : 'h-0'
      }`}
      style={{
        height: isFloatingAdVisible ? `${floatingAdHeight}px` : '0px'
      }}
    />
  )
}
