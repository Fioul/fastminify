'use client'

import { useState, useEffect, memo } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { usePathname } from 'next/navigation'
import CookieConsent from '@/components/CookieConsent'
import { getVersion } from '@/lib/version'
import { getLocalizedUrl } from '@/lib/routes'

const ClientFooter = memo(function ClientFooter() {
  const pathname = usePathname()
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  const [currentLocale, setCurrentLocale] = useState('en')
  const version = getVersion()
  
  // Détecter la locale depuis l'URL
  useEffect(() => {
    const detectedLocale = pathname.startsWith('/fr') ? 'fr' : 'en'
    setCurrentLocale(detectedLocale)
  }, [pathname])
  
  const { t } = useTranslations(currentLocale)

  return (
    <>
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            {/* Main footer content */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo and Quick Links */}
              <div className="flex flex-col gap-4">
                <div className="flex-shrink-0">
                  <Link href={`/${currentLocale}`} aria-label={t('navigation.home')}>
                    <Logo size="lg" />
                  </Link>
                </div>
                
                {/* Quick Navigation Links */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Link
                    href={`/${currentLocale}/documentation`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('navigation.documentation')}
                  </Link>
                  <Link
                    href={`/${currentLocale}/blog`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('navigation.blog')}
                  </Link>
                  <Link
                    href={getLocalizedUrl(currentLocale as 'en' | 'fr', 'about')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('navigation.about')}
                  </Link>
                  <Link
                    href={`/${currentLocale}/contact`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('navigation.contact')}
                  </Link>
                </div>
              </div>

              {/* Legal Menu - Right aligned, vertical on mobile */}
              <div className="flex flex-col items-center md:items-end gap-2">
                <Link
                  href={getLocalizedUrl(currentLocale as 'en' | 'fr', 'privacy')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.legal.privacy')}
                </Link>
                <Link
                  href={getLocalizedUrl(currentLocale as 'en' | 'fr', 'legal')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.legal.legal')}
                </Link>
                <button
                  onClick={() => setShowCookieConsent(true)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left md:text-right cursor-pointer"
                >
                  {t('footer.legal.cookies')}
                </button>
              </div>
            </div>

            {/* Copyright - Below, smaller and italic */}
            <div className="text-xs text-muted-foreground italic text-center md:text-right">
              &copy; 2025 FastMinify. {t('footer.copyright')} • v{version}
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent - Force show when requested */}
      {showCookieConsent && (
        <CookieConsent 
          locale={currentLocale} 
          forceShow={true} 
          onClose={() => setShowCookieConsent(false)}
        />
      )}
    </>
  )
})

export default ClientFooter
