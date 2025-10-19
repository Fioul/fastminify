import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  
  // Redirection de fast-minify.com vers fastminify.com
  if (hostname === 'fast-minify.com' || hostname === 'www.fast-minify.com') {
    const url = request.nextUrl.clone()
    url.hostname = 'fastminify.com'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301) // Redirection permanente
  }
  
  // Redirection www vers non-www pour le domaine principal
  if (hostname === 'www.fastminify.com') {
    const url = request.nextUrl.clone()
    url.hostname = 'fastminify.com'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }
  
  // Si on accède à la racine, rediriger vers /en
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }
  
  // Vérifier si l'URL contient une locale valide
  const pathnameIsMissingLocale = ['en', 'fr'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  
  // Si pas de locale, rediriger vers /en
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
  }
  
  // Ajouter le pathname dans les headers pour le layout
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
