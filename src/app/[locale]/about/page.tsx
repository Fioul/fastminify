import type { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'
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
      title: 'À propos de FastMinify — Minificateur JavaScript, CSS & JSON en ligne',
      description: 'Découvrez FastMinify, le minificateur JavaScript, CSS et JSON en ligne le plus rapide et fiable. Outil gratuit, privé et sécurisé pour optimiser votre code.',
      keywords: [
        'minify javascript',
        'minify css',
        'minify json',
        'minificateur javascript',
        'minificateur css',
        'minificateur json',
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
    title: 'About FastMinify — Online JavaScript, CSS & JSON Minifier Tool',
    description: 'Learn about FastMinify, the fastest and most reliable online JavaScript, CSS and JSON minifier. Free, private, and secure tool to optimize your code.',
    keywords: [
      'minify javascript',
      'minify css',
      'minify json',
      'javascript minifier',
      'css minifier',
      'json minifier',
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