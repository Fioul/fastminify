// Server component: aucun état ni effet, peut être rendu côté serveur

import { useTranslations } from '@/hooks/useTranslations'

interface HeroSectionProps {
  locale: string
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const { t } = useTranslations(locale)

  return (
    <div className="text-center space-y-4 mb-12">
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {t('common.subtitle')}
      </h1>
      <p className="text-base text-muted-foreground max-w-4xl mx-auto">
        {t('common.extendedDescription')}
      </p>
    </div>
  )
}
