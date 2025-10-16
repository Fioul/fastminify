'use client'

import { useTranslations } from '@/hooks/useTranslations'

interface FooterProps {
  locale?: string
}

export default function Footer({ locale = 'en' }: FooterProps) {
  const { t } = useTranslations(locale)

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-[1440px] mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
          <p>&copy; 2025 FastMinify. All rights reserved.</p>
          <p className="text-center">
            {t('footer.description')}
          </p>
        </div>
      </div>
    </footer>
  )
}
