import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import ClientAdManager from '@/components/ClientAdManager'
import LanguageRedirector from '@/components/LanguageRedirector'

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
      <LanguageRedirector currentLocale={locale} />
      <div className="pt-16">
        {children}
        
        {/* CLIENT-SIDE AD MANAGER */}
        <ClientAdManager locale={locale} />
        
        {/* Add bottom padding to prevent content from being hidden behind floating ad */}
        <div className="h-24 xl:block hidden"></div>
      </div>
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
