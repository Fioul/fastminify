'use client'

import Link from 'next/link'
import { getLocalizedPath } from '@/lib/routes'
import { ReactNode } from 'react'

interface LocalizedLinkProps {
  href: string
  locale: string
  children: ReactNode
  className?: string
  'aria-label'?: string
}

export default function LocalizedLink({ 
  href, 
  locale, 
  children, 
  className,
  'aria-label': ariaLabel 
}: LocalizedLinkProps) {
  // Si c'est une route localisée, utiliser la fonction de mapping
  if (href.startsWith('/about') || href.startsWith('/legal') || href.startsWith('/privacy')) {
    const routeKey = href.substring(1) as 'about' | 'legal' | 'privacy'
    const localizedPath = getLocalizedPath(locale as 'en' | 'fr', routeKey)
    return (
      <Link href={`/${locale}${localizedPath}`} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }
  
  // Pour les autres liens, utiliser le href tel quel
  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
