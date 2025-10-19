import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import ClientAdManager from '@/components/ClientAdManager'
import { AdProvider } from '@/contexts/AdContext'

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
    <AdProvider>
      <Header locale={locale} />
      <div className="pt-16">
        {children}
        
        {/* CLIENT-SIDE AD MANAGER */}
        <ClientAdManager locale={locale} />
      </div>
    </AdProvider>
  )
}

// Generate static parameters for all languages
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' }
  ]
}
