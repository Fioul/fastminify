'use client'

import React from 'react'
import { useTranslations } from '@/hooks/useTranslations';

interface LegalPageProps {
  params: Promise<{ locale: string }>
}

export default function LegalPage({ params }: LegalPageProps) {
  const { locale } = React.use(params)
  const { t } = useTranslations(locale);

  return (
    <div className="gradient-bg">
      <div className="container max-w-[1600px] mx-auto px-4 py-10">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('legal.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('legal.description')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.lastUpdated')}
          </p>
        </div>

        <section className="max-w-5xl mx-auto mb-16">
          <div className="bg-card text-card-foreground rounded-2xl p-8 space-y-6 border border-border shadow-lg">
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {t('legal.service.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('legal.service.description')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t('legal.service.features.minification')}</li>
                  <li>{t('legal.service.features.beautification')}</li>
                  <li>{t('legal.service.features.concatenation')}</li>
                  <li>{t('legal.service.features.phpSerialization')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {t('legal.intellectualProperty.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('legal.intellectualProperty.content')}
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>{t('legal.intellectualProperty.warning')}</strong>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {t('legal.liability.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('legal.liability.content')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t('legal.liability.limitations.accuracy')}</li>
                  <li>{t('legal.liability.limitations.availability')}</li>
                  <li>{t('legal.liability.limitations.damages')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {t('legal.cookies.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('legal.cookies.content')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('legal.cookies.moreInfo')}
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {t('legal.modifications.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('legal.modifications.content')}
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  {t('legal.footer')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}