import { notFound } from 'next/navigation'
import Header from '@/components/Header'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params
  
  // Vérifier que la langue est supportée
  if (!['en', 'fr'].includes(locale)) {
    notFound()
  }

  return (
    <>
      <Header locale={locale} />
      <div className="pt-16">
        {children}
      </div>
    </>
  )
}

// Générer les paramètres statiques pour toutes les langues
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' }
  ]
}
