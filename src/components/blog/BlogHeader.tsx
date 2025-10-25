'use client'

import { useTranslations } from '@/hooks/useTranslations'
import { useParams } from 'next/navigation'

export function BlogHeader() {
  const params = useParams()
  const locale = params.locale as string
  const { t } = useTranslations(locale)

  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {t('blog.title')}
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
        {t('blog.description')}
      </p>
    </div>
  )
}
