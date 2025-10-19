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
      <div className="container max-w-[1440px] mx-auto px-4 py-10">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('legal.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('legal.lastUpdated')}
          </p>
        </div>

        {/* CONTENT SECTION */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* PUBLISHER */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('legal.publisher.title')}
            </h2>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                <div>
                  <p className="mb-2">
                    <strong className="text-foreground">{t('legal.publisher.name')}:</strong> FastMinify
                  </p>
                  <p className="mb-2">
                    <strong className="text-foreground">{t('legal.publisher.website')}:</strong> https://fastminify.com
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong className="text-foreground">{t('legal.publisher.email')}:</strong> contact@fastminify.com
                  </p>
                  <p>
                    <strong className="text-foreground">{t('legal.publisher.country')}:</strong> France
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* HOSTING */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('legal.hosting.title')}
            </h2>
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <div className="text-muted-foreground">
                <p className="mb-2">
                  <strong className="text-foreground">{t('legal.hosting.provider')}:</strong> Render.com
                </p>
                <p className="mb-2">
                  <strong className="text-foreground">{t('legal.hosting.address')}:</strong> 625 Market Street, San Francisco, CA 94105, USA
                </p>
                <p>
                  <strong className="text-foreground">{t('legal.hosting.website')}:</strong> https://render.com
                </p>
              </div>
            </div>
          </section>

          {/* SERVICE DESCRIPTION */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('legal.service.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('legal.service.description')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('legal.service.features.minification')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('legal.service.features.beautification')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('legal.service.features.concatenation')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('legal.service.features.phpSerialization')}</span>
                </li>
              </ul>
            </div>
          </section>

          {/* INTELLECTUAL PROPERTY */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('legal.intellectualProperty.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('legal.intellectualProperty.content')}
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>{t('legal.intellectualProperty.warning')}</strong>
              </p>
            </div>
          </section>

          {/* LIABILITY */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('legal.liability.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('legal.liability.content')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('legal.liability.limitations.accuracy')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('legal.liability.limitations.availability')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('legal.liability.limitations.damages')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('legal.liability.limitations.thirdParty')}</span>
                </li>
              </ul>
            </div>
          </section>

          {/* COOKIES */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('legal.cookies.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('legal.cookies.content')}
            </p>
            <p className="text-muted-foreground">
              {t('legal.cookies.moreInfo')}
            </p>
          </section>

          {/* GOVERNING LAW */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('legal.governingLaw.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('legal.governingLaw.content')}
            </p>
          </section>

          {/* MODIFICATIONS */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('legal.modifications.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('legal.modifications.content')}
            </p>
          </section>

          {/* FOOTER */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-muted-foreground text-center">
              {t('legal.footer')}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}