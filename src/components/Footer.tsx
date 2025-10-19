'use client'

import { useTranslations } from '@/hooks/useTranslations'
import Link from 'next/link'
import Logo from '@/components/Logo'
import DynamicPadding from '@/components/DynamicPadding'
import { usePathname } from 'next/navigation'

interface FooterProps {
  locale?: string
}

export default function Footer({ locale }: FooterProps) {
  const pathname = usePathname()
  
  // Détecter la locale depuis l'URL
  const currentLocale = locale || (pathname.startsWith('/fr') ? 'fr' : 'en')
  
  const { t } = useTranslations(currentLocale)

  return (
    <>
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={`/${currentLocale}`}>
                <Logo size="sm" />
              </Link>
            </div>

            {/* Legal Menu */}
            <div className="flex flex-wrap gap-6">
              <Link
                href={`/${currentLocale}/privacy`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('footer.legal.privacy')}
              </Link>
              <Link
                href={`/${currentLocale}/legal`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('footer.legal.legal')}
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              &copy; 2025 FastMinify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      {/* Dynamic padding based on floating ad visibility */}
      <DynamicPadding />
    </>
  )
}
