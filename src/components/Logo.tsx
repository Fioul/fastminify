'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, useMemo } from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

// Cache des SVG pour éviter les re-fetch
const svgCache = new Map<string, string>()

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [svgContent, setSvgContent] = useState<string>('')

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10', 
    lg: 'h-12'
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const logoSrc = useMemo(() => 
    theme === 'dark' ? '/logo-white.svg' : '/logo-black.svg', 
    [theme]
  )

  useEffect(() => {
    if (!mounted) return

    // Vérifier le cache d'abord
    if (svgCache.has(logoSrc)) {
      setSvgContent(svgCache.get(logoSrc)!)
      return
    }

    fetch(logoSrc)
      .then(response => response.text())
      .then(svg => {
        svgCache.set(logoSrc, svg)
        setSvgContent(svg)
      })
      .catch(error => {
        console.error('Error loading SVG:', error)
      })
  }, [mounted, logoSrc])

  if (!mounted || !svgContent) {
    return (
      <div 
        className={`${className} ${sizeClasses[size]} flex items-center`}
        style={{ minHeight: sizeClasses[size].replace('h-', '') + 'px' }}
      >
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    )
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
