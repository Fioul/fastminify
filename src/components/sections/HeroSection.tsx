'use client'

import { useTranslations } from '@/hooks/useTranslations'

interface HeroSectionProps {
  locale: string
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const { t } = useTranslations(locale)

  return (
    <div className="text-center space-y-4 mb-12">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {t('common.subtitle')}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {t('common.description')}
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-sm font-medium">{t('content.hero.badges.free')}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-sm font-medium">{t('content.hero.badges.private')}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-sm font-medium">{t('content.hero.badges.instant')}</span>
        </div>
      </div>
    </div>
  )
}
