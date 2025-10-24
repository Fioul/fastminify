import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/seo'
import LegalPageClient from '../legal/LegalPageClient'

interface LegalPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { locale } = await params
  
  if (locale === 'fr') {
    return generateSEOMetadata({
      locale,
      pageType: 'legal',
      title: 'Mentions légales — FastMinify Minificateur JavaScript, CSS & JSON',
      description: 'Mentions légales de FastMinify. Informations légales, conditions d\'utilisation et propriété intellectuelle pour notre outil de minification.',
      keywords: [
        'mentions légales fastminify',
        'conditions utilisation',
        'propriété intellectuelle',
        'responsabilité',
        'cookies légaux',
        'modifications',
        'informations légales'
      ]
    })
  }
  
  return generateSEOMetadata({
    locale,
    pageType: 'legal',
    title: 'Legal Notice — FastMinify JavaScript, CSS & JSON Minifier',
    description: 'FastMinify legal notice. Legal information, terms of use and intellectual property for our minification tool.',
    keywords: [
      'legal notice fastminify',
      'terms of use',
      'intellectual property',
      'liability',
      'legal cookies',
      'modifications',
      'legal information'
    ]
  })
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { locale } = await params
  
  return <LegalPageClient locale={locale} />
}
