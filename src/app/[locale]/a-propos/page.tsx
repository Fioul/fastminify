import type { Metadata } from 'next'
import AboutPageClient from '../about/AboutPageClient'
import StructuredData from '@/components/StructuredData'
import { generateSEOMetadata } from '@/lib/seo'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  
  if (locale === 'fr') {
    return generateSEOMetadata({
      locale,
      pageType: 'about',
      title: 'À propos de FastMinify — Minifier, Déminifier & Beautifier JavaScript, CSS & JSON',
      description: 'Découvrez FastMinify, l\'outil en ligne le plus rapide et fiable pour minifier, déminifier et beautifier JavaScript, CSS et JSON. Gratuit, privé et sécurisé.',
      keywords: [
        'minify javascript',
        'minify css',
        'minify json',
        'déminifier javascript',
        'déminifier css',
        'déminifier json',
        'beautifier javascript',
        'beautifier css',
        'beautifier json',
        'minificateur javascript',
        'minificateur css',
        'minificateur json',
        'déminificateur javascript',
        'déminificateur css',
        'déminificateur json',
        'beautificateur javascript',
        'beautificateur css',
        'beautificateur json',
        'outil minification',
        'optimisation code',
        'performance web',
        'gratuit',
        'privé',
        'sécurisé'
      ]
    })
  }
  
  return generateSEOMetadata({
    locale,
    pageType: 'about',
    title: 'About FastMinify — Minify, Unminify & Beautify JavaScript, CSS & JSON Online',
    description: 'Learn about FastMinify, the fastest and most reliable online tool to minify, unminify and beautify JavaScript, CSS and JSON. Free, private, and secure.',
    keywords: [
      'minify javascript',
      'minify css',
      'minify json',
      'unminify javascript',
      'unminify css',
      'unminify json',
      'beautify javascript',
      'beautify css',
      'beautify json',
      'javascript minifier',
      'css minifier',
      'json minifier',
      'javascript unminifier',
      'css unminifier',
      'json unminifier',
      'javascript beautifier',
      'css beautifier',
      'json beautifier',
      'minification tool',
      'code optimization',
      'web performance',
      'free tool',
      'private',
      'secure'
    ]
  })
}

// Server component that renders the client component
export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  
  return (
    <>
      <StructuredData locale={locale} pageType="about" />
      <AboutPageClient locale={locale} />
    </>
  )
}
