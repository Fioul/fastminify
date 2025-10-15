'use client'

import React from 'react'
import { useTranslations } from '@/hooks/useTranslations'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = React.use(params)
  const { t, loading } = useTranslations(locale)
  
  if (loading) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">{t('about.title')}</h1>
        <p className="text-muted-foreground text-lg">
          {t('about.subtitle')}
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('about.whatIs')}</h2>
          <p>
            {t('about.whatIsText')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('about.whyChoose')}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>{t('about.features.clientSide')}</strong></li>
            <li><strong>{t('about.features.lightningFast')}</strong></li>
            <li><strong>{t('about.features.privacyFirst')}</strong></li>
            <li><strong>{t('about.features.modernUI')}</strong></li>
            <li><strong>{t('about.features.advancedOptions')}</strong></li>
            <li><strong>{t('about.features.freeForever')}</strong></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('about.howItWorks')}</h2>
          <p>
            {t('about.howItWorksText')}
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>{t('about.howItWorksList.noServer')}</li>
            <li>{t('about.howItWorksList.noUploads')}</li>
            <li>{t('about.howItWorksList.completePrivacy')}</li>
            <li>{t('about.howItWorksList.worksOffline')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('about.featuresTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">{t('about.jsMinification')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{t('about.jsFeatures.removeWhitespace')}</li>
                <li>{t('about.jsFeatures.shortenVariables')}</li>
                <li>{t('about.jsFeatures.optimizeExpressions')}</li>
                <li>{t('about.jsFeatures.compatibility')}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">{t('about.cssMinification')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{t('about.cssFeatures.removeWhitespace')}</li>
                <li>{t('about.cssFeatures.optimizeSelectors')}</li>
                <li>{t('about.cssFeatures.mergeRules')}</li>
                <li>{t('about.cssFeatures.removeUnused')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('about.builtWith')}</h2>
          <p>
            {t('about.builtWithText')}
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>{t('about.technologies.nextjs')}</strong></li>
            <li><strong>{t('about.technologies.typescript')}</strong></li>
            <li><strong>{t('about.technologies.tailwind')}</strong></li>
            <li><strong>{t('about.technologies.shadcn')}</strong></li>
            <li><strong>{t('about.technologies.terser')}</strong></li>
            <li><strong>{t('about.technologies.csso')}</strong></li>
          </ul>
        </section>

        <section className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('about.openSource')}</h2>
          <p>
            {t('about.openSourceText')}
          </p>
        </section>
      </div>
    </div>
  )
}