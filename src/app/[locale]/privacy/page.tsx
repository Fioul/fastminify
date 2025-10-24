import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/seo'
import PrivacyPageClient from './PrivacyPageClient'

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params
  
  if (locale === 'fr') {
    return generateSEOMetadata({
      locale,
      pageType: 'privacy',
      title: 'Politique de confidentialité — FastMinify Minificateur JavaScript, CSS & JSON',
      description: 'Politique de confidentialité de FastMinify. Découvrez comment vos données sont protégées et votre vie privée respectée lors de l\'utilisation de notre outil de minification.',
      keywords: [
        'politique confidentialité fastminify',
        'protection données',
        'vie privée',
        'cookies',
        'analytics',
        'données personnelles',
        'RGPD',
        'sécurité'
      ]
    })
  }
  
  return generateSEOMetadata({
    locale,
    pageType: 'privacy',
    title: 'Privacy Policy — FastMinify JavaScript, CSS & JSON Minifier',
    description: 'FastMinify privacy policy. Learn how your data is protected and privacy is respected when using our minification tool.',
    keywords: [
      'privacy policy fastminify',
      'data protection',
      'privacy',
      'cookies',
      'analytics',
      'personal data',
      'GDPR',
      'security'
    ]
  })
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  
  return <PrivacyPageClient locale={locale} />
}