import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLocalizedPath, getRouteKeyFromPath, getLocaleFromPath } from '@/lib/routes'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  
  // Redirection www vers non-www pour le domaine principal
  if (hostname === 'www.fastminify.com') {
    const url = request.nextUrl.clone()
    url.hostname = 'fastminify.com'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }
  
  // If accessing root, check preferred language
  if (pathname === '/') {
    const preferredLanguage = request.cookies.get('preferred-language')?.value
    const defaultLocale = (preferredLanguage && ['en', 'fr'].includes(preferredLanguage)) ? preferredLanguage : 'en'
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }
  
  // Check if URL contains valid locale
  const pathnameIsMissingLocale = ['en', 'fr'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  
  // If no locale, check preferred language
  if (pathnameIsMissingLocale) {
    const preferredLanguage = request.cookies.get('preferred-language')?.value
    const defaultLocale = (preferredLanguage && ['en', 'fr'].includes(preferredLanguage)) ? preferredLanguage : 'en'
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  }
  
  // Handle localized route redirections
  const locale = getLocaleFromPath(pathname)
  if (locale) {
    const routeKey = getRouteKeyFromPath(pathname)
    if (routeKey) {
      const localizedPath = getLocalizedPath(locale, routeKey)
      const currentPath = pathname.replace(`/${locale}`, '')
      
      // If the current path doesn't match the localized path, redirect
      if (currentPath !== localizedPath) {
        return NextResponse.redirect(new URL(`/${locale}${localizedPath}`, request.url), 301)
      }
    }
  }
  
  // Ajouter le pathname dans les headers pour le layout
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
