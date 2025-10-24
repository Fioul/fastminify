import type { Metadata } from 'next'
import DocumentationPageClient from './DocumentationPageClient'
import StructuredData from '@/components/StructuredData'
import { generateSEOMetadata } from '@/lib/seo'
import { useTranslations } from '@/hooks/useTranslations'

interface DocumentationPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: DocumentationPageProps): Promise<Metadata> {
  const { locale } = await params
  
  if (locale === 'fr') {
    return generateSEOMetadata({
      locale,
      pageType: 'documentation',
      title: 'Documentation Technique — FastMinify Minificateur JavaScript, CSS & JSON',
      description: 'Documentation technique complète pour la minification JavaScript, CSS, JSON et la sérialisation PHP. Exemples de code, options et configurations.',
      keywords: [
        'documentation minification',
        'terser javascript',
        'csso css',
        'minification technique',
        'exemples code',
        'options minification',
        'configuration minifier',
        'guide développeur',
      ]
    })
  }

  return generateSEOMetadata({
    locale,
    pageType: 'documentation',
    title: 'Technical Documentation — FastMinify JavaScript, CSS & JSON Minifier',
    description: 'Complete technical documentation for JavaScript, CSS, JSON minification and PHP serialization. Code examples, options and configurations.',
    keywords: [
      'minification documentation',
      'terser javascript',
      'csso css',
      'technical minification',
      'code examples',
      'minification options',
      'minifier configuration',
      'developer guide',
    ]
  })
}

export default async function DocumentationPage({ params }: DocumentationPageProps) {
  const { locale } = await params

  return (
    <>
      <StructuredData locale={locale} pageType="documentation" />
      <DocumentationPageClient locale={locale} />
    </>
  )
}
