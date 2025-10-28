import { Metadata } from 'next'
import { getLocalizedPath } from './routes'

export interface SEOConfig {
  locale: string
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
  alternateUrls?: { locale: string; url: string }[]
  pageType?: 'home' | 'about' | 'legal' | 'privacy' | 'contact' | 'documentation'
}

/**
 * Génère les métadonnées SEO complètes avec canonical et hreflang
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const baseUrl = 'https://fastminify.com'
  
  // Construire l'URL canonique correcte
  let canonicalUrl = config.canonicalUrl
  if (!canonicalUrl) {
    let path = `/${config.locale}`
    
    if (config.pageType && config.pageType !== 'home') {
      const routeMap = {
        about: config.locale === 'fr' ? '/a-propos' : '/about',
        legal: config.locale === 'fr' ? '/mentions-legales' : '/legal',
        privacy: config.locale === 'fr' ? '/confidentialite' : '/privacy',
        contact: '/contact',
        documentation: '/documentation',
      }
      
      if (routeMap[config.pageType as keyof typeof routeMap]) {
        path += routeMap[config.pageType as keyof typeof routeMap]
      }
    }
    
    canonicalUrl = `${baseUrl}${path}`
  }
  
  // URLs alternatives pour hreflang
  const alternateUrls = config.alternateUrls || generateAlternateUrls(config.locale, config.pageType)
  
  const metadata: Metadata = {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: 'FastMinify' }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls.reduce((acc, alt) => {
        acc[alt.locale] = alt.url
        return acc
      }, {} as Record<string, string>),
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      siteName: 'FastMinify',
      locale: config.locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
  }

  return metadata
}

/**
 * Génère les URLs alternatives pour hreflang
 */
function generateAlternateUrls(currentLocale: string, pageType?: string): { locale: string; url: string }[] {
  const baseUrl = 'https://fastminify.com'
  const locales = ['en', 'fr']
  
  return locales.map(locale => {
    let path = `/${locale}`
    
    if (pageType && pageType !== 'home') {
      // Mapper les routes selon la langue
      const routeMap = {
        about: locale === 'fr' ? '/a-propos' : '/about',
        legal: locale === 'fr' ? '/mentions-legales' : '/legal',
        privacy: locale === 'fr' ? '/confidentialite' : '/privacy',
        contact: '/contact',
        documentation: '/documentation',
      }
      
      if (routeMap[pageType as keyof typeof routeMap]) {
        path += routeMap[pageType as keyof typeof routeMap]
      }
    }
    
    return {
      locale: locale,
      url: `${baseUrl}${path}`
    }
  })
}

/**
 * Génère les balises hreflang pour l'internationalisation
 */
export function generateHreflangTags(locale: string, pageType?: string) {
  const alternateUrls = generateAlternateUrls(locale, pageType)
  
  return alternateUrls.map(alt => ({
    key: alt.locale,
    rel: "alternate",
    hrefLang: alt.locale,
    href: alt.url
  }))
}

/**
 * Génère la balise canonical
 */
export function generateCanonicalTag(locale: string, pageType?: string) {
  const baseUrl = 'https://fastminify.com'
  let path = `/${locale}`
  
  if (pageType && pageType !== 'home') {
    const routeMap = {
      about: locale === 'fr' ? '/a-propos' : '/about',
      legal: locale === 'fr' ? '/mentions-legales' : '/legal',
      privacy: locale === 'fr' ? '/confidentialite' : '/privacy',
      contact: '/contact',
      documentation: '/documentation',
    }
    
    if (routeMap[pageType as keyof typeof routeMap]) {
      path += routeMap[pageType as keyof typeof routeMap]
    }
  }
  
  return {
    rel: "canonical",
    href: `${baseUrl}${path}`
  }
}
