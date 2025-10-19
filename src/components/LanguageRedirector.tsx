'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface LanguageRedirectorProps {
  currentLocale: string
}

export default function LanguageRedirector({ currentLocale }: LanguageRedirectorProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Vérifier si on est sur la page d'accueil (sans sous-page)
    const isHomePage = pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`
    
    if (isHomePage) {
      // Récupérer la langue préférée du localStorage
      const savedLanguage = localStorage.getItem('preferred-language')
      
      // Si une langue est sauvegardée et différente de la locale actuelle
      if (savedLanguage && savedLanguage !== currentLocale && ['en', 'fr'].includes(savedLanguage)) {
        // Rediriger vers la langue sauvegardée
        router.replace(`/${savedLanguage}`)
      }
    }
  }, [currentLocale, pathname, router])

  // Ce composant ne rend rien
  return null
}
