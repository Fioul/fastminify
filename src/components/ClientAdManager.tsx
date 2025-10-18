'use client'

import { useTranslations } from '@/hooks/useTranslations'
import AdPlaceholder from '@/components/sections/AdPlaceholder'
import FloatingAdManager from '@/components/sections/FloatingAdManager'

interface ClientAdManagerProps {
  locale: string
}

export default function ClientAdManager({ locale }: ClientAdManagerProps) {
  const { t } = useTranslations(locale)

  return (
    <>
      {/* SIDEBAR ADS - Fixed positioning for all pages */}
      <AdPlaceholder type="sidebar-left" t={t} />
      <AdPlaceholder type="sidebar-right" t={t} />
      
      {/* BOTTOM BANNER AD - Static version for mobile */}
      <AdPlaceholder type="mobile-banner" t={t} />
      
      {/* FLOATING BANNER AD - Desktop only with close button */}
      <FloatingAdManager t={t} />
    </>
  )
}
