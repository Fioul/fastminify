import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import AdPlaceholder from '@/components/sections/AdPlaceholder'
import FloatingAdManager from '@/components/sections/FloatingAdManager'

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
        
        {/* SIDEBAR ADS - Fixed positioning for all pages */}
        <AdPlaceholder type="sidebar-left" />
        <AdPlaceholder type="sidebar-right" />
        
        {/* BOTTOM BANNER AD - Static version for mobile */}
        <AdPlaceholder type="mobile-banner" />
        
        {/* FLOATING BANNER AD - Desktop only with close button */}
        <FloatingAdManager />
        
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
