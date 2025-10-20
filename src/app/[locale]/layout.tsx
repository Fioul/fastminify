import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import CookieConsent from '@/components/CookieConsent'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params
  
  // Check if language is supported
  if (!['en', 'fr'].includes(locale)) {
    notFound()
  }

  return (
    <>
      <Header locale={locale} />
      <div className="pt-16">
        {children}
      </div>
      <CookieConsent locale={locale} />
    </>
  )
}

// Generate static parameters for all languages
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' }
  ]
}
