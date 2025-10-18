'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [svgContent, setSvgContent] = useState<string>('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const logoSrc = theme === 'dark' ? '/logo-white.svg' : '/logo-black.svg'
    
    fetch(logoSrc)
      .then(response => response.text())
      .then(svg => {
        setSvgContent(svg)
      })
      .catch(error => {
        console.error('Error loading SVG:', error)
      })
  }, [mounted, theme])

  if (!mounted || !svgContent) {
    return null
  }

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10', 
    lg: 'h-12'
  }

  return (
    <div 
      className={`${className} ${sizeClasses[size]} flex items-center`}
      dangerouslySetInnerHTML={{ 
        __html: svgContent.replace(
          /<svg([^>]*)>/,
          '<svg$1 style="width: 100%; height: 100%; object-fit: contain;">'
        )
      }}
    />
  )
}
