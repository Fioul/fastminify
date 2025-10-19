'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card } from '@/components/ui/card'
import { X, Settings, Check, X as XIcon } from 'lucide-react'

interface CookieConsentProps {
  locale: string
}

export default function CookieConsent({ locale }: CookieConsentProps) {
  const { t } = useTranslations(locale)
  const pathname = usePathname()
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const consentData = JSON.parse(consent)
      setAnalyticsEnabled(consentData.analytics)
      updateGoogleConsent(consentData.analytics)
    }
  }, [])

  const updateGoogleConsent = (analytics: boolean) => {
    // Update Google Consent Mode V2
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: 'granted', // AdSense always enabled
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      })
    }

    // If analytics is disabled, clear Analytics cookies
    if (!analytics) {
      clearAnalyticsCookies()
    }
  }

  const clearAnalyticsCookies = () => {
    if (typeof window === 'undefined') return

    // List of common Google Analytics cookies to clear
    const analyticsCookies = [
      '_ga',
      '_ga_*', // Wildcard for GA4 cookies
      '_gid',
      '_gat',
      '_gat_*', // Wildcard for GA4 cookies
      '_gcl_au', // Google Ads conversion tracking
      '_gcl_aw', // Google Ads conversion tracking
      '_gcl_dc', // Google Ads conversion tracking
      '_fbp', // Facebook Pixel (if used)
      '_fbc', // Facebook Pixel (if used)
    ]

    // Clear cookies by setting them to expire in the past
    analyticsCookies.forEach(cookiePattern => {
      if (cookiePattern.includes('*')) {
        // Handle wildcard cookies
        const baseName = cookiePattern.replace('*', '')
        Object.keys(document.cookie.split(';').reduce((cookies, cookie) => {
          const [name] = cookie.trim().split('=')
          if (name && name.startsWith(baseName)) {
            cookies[name] = true
          }
          return cookies
        }, {} as Record<string, boolean>)).forEach(cookieName => {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        })
      } else {
        // Handle specific cookies
        document.cookie = `${cookiePattern}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
        document.cookie = `${cookiePattern}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      }
    })

    // Clear localStorage analytics data
    const analyticsKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('_ga') || 
      key.startsWith('_gid') || 
      key.startsWith('_gat') ||
      key.startsWith('_gcl') ||
      key.startsWith('_fbp') ||
      key.startsWith('_fbc')
    )
    
    analyticsKeys.forEach(key => {
      localStorage.removeItem(key)
    })

    // Clear sessionStorage analytics data
    const sessionAnalyticsKeys = Object.keys(sessionStorage).filter(key => 
      key.startsWith('_ga') || 
      key.startsWith('_gid') || 
      key.startsWith('_gat') ||
      key.startsWith('_gcl') ||
      key.startsWith('_fbp') ||
      key.startsWith('_fbc')
    )
    
    sessionAnalyticsKeys.forEach(key => {
      sessionStorage.removeItem(key)
    })

    // Reset Google Analytics if it exists
    if (typeof window !== 'undefined' && window.gtag) {
      // Send a page view with analytics disabled to stop tracking
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        send_page_view: false
      })
    }
  }

  const logConsent = async (choices: { necessary: boolean; analytics: boolean; advertising: boolean }) => {
    try {
      await fetch('/api/consent-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          choices,
          source: 'cookie-banner'
        })
      })
    } catch (error) {
      console.error('Failed to log consent:', error)
      // Don't block the user experience if logging fails
    }
  }

  const handleAcceptAll = async () => {
    const consent = {
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString()
    }
    
    // Log consent to server
    await logConsent({
      necessary: true,
      analytics: true,
      advertising: true
    })
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setShowBanner(false)
    setAnalyticsEnabled(true)
    updateGoogleConsent(true)
  }

  const handleRejectAll = async () => {
    const consent = {
      necessary: true,
      analytics: false,
      advertising: true, // AdSense always enabled
      timestamp: new Date().toISOString()
    }
    
    // Log consent to server
    await logConsent({
      necessary: true,
      analytics: false,
      advertising: true
    })
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setShowBanner(false)
    setAnalyticsEnabled(false)
    updateGoogleConsent(false)
  }

  const handleSavePreferences = async () => {
    const consent = {
      necessary: true,
      analytics: analyticsEnabled,
      advertising: true, // AdSense always enabled
      timestamp: new Date().toISOString()
    }
    
    // Log consent to server
    await logConsent({
      necessary: true,
      analytics: analyticsEnabled,
      advertising: true
    })
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setShowBanner(false)
    setShowPreferences(false)
    updateGoogleConsent(analyticsEnabled)
  }

  const handleCustomize = () => {
    setShowPreferences(true)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4">
        <Card className="max-w-4xl mx-auto bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/75 border shadow-lg">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  {t('cookies.title')}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                  {t('cookies.description')}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2 text-xs text-muted-foreground">
                  <Link 
                    href={`/${locale}/privacy`}
                    className="hover:text-primary transition-colors underline"
                  >
                    {t('cookies.privacyPolicy')}
                  </Link>
                  <span className="hidden sm:inline">•</span>
                  <span className="sm:hidden"> | </span>
                  <Link 
                    href={`/${locale}/legal`}
                    className="hover:text-primary transition-colors underline"
                  >
                    {t('cookies.legalNotice')}
                  </Link>
                </div>
              </div>
              
              {/* Mobile: Stack buttons vertically */}
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCustomize}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('cookies.customize')}</span>
                  <span className="sm:hidden">{t('cookies.customize')}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <XIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('cookies.reject')}</span>
                  <span className="sm:hidden">{t('cookies.reject')}</span>
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white w-full sm:w-auto"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {t('cookies.acceptAll')}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-2xl bg-background/95 backdrop-blur-md border shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  {t('cookies.preferences.title')}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPreferences(false)}
                  className="shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Necessary Cookies */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm sm:text-base">
                      {t('cookies.preferences.necessary.title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {t('cookies.preferences.necessary.description')}
                    </p>
                  </div>
                  <div className="flex justify-end sm:justify-start">
                    <Switch checked={true} disabled />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm sm:text-base">
                      {t('cookies.preferences.analytics.title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {t('cookies.preferences.analytics.description')}
                    </p>
                  </div>
                  <div className="flex justify-end sm:justify-start">
                    <Switch 
                      checked={analyticsEnabled} 
                      onCheckedChange={setAnalyticsEnabled}
                    />
                  </div>
                </div>

                {/* Advertising Cookies */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm sm:text-base">
                      {t('cookies.preferences.advertising.title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {t('cookies.preferences.advertising.description')}
                    </p>
                  </div>
                  <div className="flex justify-end sm:justify-start">
                    <Switch checked={true} disabled />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 sm:mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowPreferences(false)}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  {t('cookies.preferences.cancel')}
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white w-full sm:w-auto order-1 sm:order-2"
                >
                  {t('cookies.preferences.save')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

// Extend window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
