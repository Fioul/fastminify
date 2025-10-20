import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import SupportPageClient from './SupportPageClient'

interface SupportPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: SupportPageProps): Promise<Metadata> {
  const { locale } = await params
  
  const isFrench = locale === 'fr'
  
  return {
    title: isFrench 
      ? 'Soutenez FastMinify — Aidez-nous à maintenir ce service gratuit'
      : 'Support FastMinify — Help us maintain this free service',
    description: isFrench
      ? 'FastMinify est un projet gratuit et open source. Soutenez notre développement pour continuer à offrir des outils de minification gratuits et performants.'
      : 'FastMinify is a free and open source project. Support our development to continue offering free and performant minification tools.',
    keywords: isFrench
      ? [
          'soutenir fastminify',
          'don fastminify',
          'support projet gratuit',
          'minification gratuite',
          'outil gratuit',
          'open source',
          'développement communautaire'
        ]
      : [
          'support fastminify',
          'donate fastminify', 
          'free project support',
          'free minification',
          'free tool',
          'open source',
          'community development'
        ],
    openGraph: {
      title: isFrench
        ? 'Soutenez FastMinify — Aidez-nous à maintenir ce service gratuit'
        : 'Support FastMinify — Help us maintain this free service',
      description: isFrench
        ? 'FastMinify est un projet gratuit et open source. Soutenez notre développement pour continuer à offrir des outils de minification gratuits et performants.'
        : 'FastMinify is a free and open source project. Support our development to continue offering free and performant minification tools.',
      url: `https://fastminify.com/${locale}/support`,
      siteName: 'FastMinify',
      locale: isFrench ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isFrench
        ? 'Soutenez FastMinify — Service gratuit de minification'
        : 'Support FastMinify — Free minification service',
      description: isFrench
        ? 'Aidez-nous à maintenir FastMinify gratuit et performant'
        : 'Help us keep FastMinify free and performant',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { locale } = await params
  
  return (
    <>
      <StructuredData locale={locale} pageType="support" />
      <SupportPageClient locale={locale} />
    </>
  )
}
