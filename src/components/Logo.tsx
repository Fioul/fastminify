'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10', 
    lg: 'h-12'
  }

  // Déterminer quel logo utiliser selon le thème
  const logoSrc = theme === 'dark' ? '/logo-white.svg' : '/logo-black.svg'

  return (
    <div className={`${className}`}>
      <Image
        src={logoSrc}
        alt="FastMinify Logo"
        width={size === 'sm' ? 120 : size === 'md' ? 150 : 180}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
        className={`${sizeClasses[size]} w-auto object-contain`}
        priority
      />
    </div>
  )
}
