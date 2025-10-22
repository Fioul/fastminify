// Configuration des routes localisées
export const localizedRoutes = {
  en: {
    about: '/about',
    legal: '/legal',
    privacy: '/privacy',
    contact: '/contact',
    documentation: '/documentation',
  },
  fr: {
    about: '/a-propos',
    legal: '/mentions-legales', 
    privacy: '/confidentialite',
    contact: '/contact',
    documentation: '/documentation',
  },
} as const

export type Locale = keyof typeof localizedRoutes
export type RouteKey = keyof typeof localizedRoutes.en

// Fonction pour obtenir l'URL localisée
export function getLocalizedPath(locale: Locale, routeKey: RouteKey): string {
  return localizedRoutes[locale][routeKey]
}

// Fonction pour obtenir l'URL complète avec locale
export function getLocalizedUrl(locale: Locale, routeKey: RouteKey): string {
  return `/${locale}${getLocalizedPath(locale, routeKey)}`
}

// Fonction pour obtenir la clé de route à partir d'un pathname
export function getRouteKeyFromPath(pathname: string): RouteKey | null {
  // Supprimer le préfixe de locale si présent
  const cleanPath = pathname.replace(/^\/[a-z]{2}\//, '/')
  
  // Chercher dans les routes anglaises
  for (const [key, path] of Object.entries(localizedRoutes.en)) {
    if (path === cleanPath) {
      return key as RouteKey
    }
  }
  
  // Chercher dans les routes françaises
  for (const [key, path] of Object.entries(localizedRoutes.fr)) {
    if (path === cleanPath) {
      return key as RouteKey
    }
  }
  
  return null
}

// Fonction pour obtenir le locale à partir d'un pathname
export function getLocaleFromPath(pathname: string): Locale | null {
  const match = pathname.match(/^\/([a-z]{2})\//)
  if (match && match[1] in localizedRoutes) {
    return match[1] as Locale
  }
  return null
}
