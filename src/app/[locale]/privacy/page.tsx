'use client'

import React from 'react'
import { useTranslations } from '@/hooks/useTranslations';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = React.use(params)
  const { t } = useTranslations(locale);

  return (
    <div className="gradient-bg">
      <div className="container max-w-[1600px] mx-auto px-4 py-10">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('privacy.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('privacy.lastUpdated')}
          </p>
        </div>

        {/* CONTENT SECTION */}
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* INTRODUCTION */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('privacy.introduction.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('privacy.introduction.content')}
            </p>
          </section>

          {/* DATA COLLECTION */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('privacy.dataCollection.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('privacy.dataCollection.content')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t('privacy.dataCollection.types.analytics')}</li>
              <li>{t('privacy.dataCollection.types.cookies')}</li>
              <li>{t('privacy.dataCollection.types.ads')}</li>
            </ul>
          </section>

          {/* COOKIES */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('privacy.cookies.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('privacy.cookies.content')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-foreground mb-3">
                {t('privacy.cookies.types.title')}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('privacy.cookies.types.essential')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('privacy.cookies.types.analytics')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{t('privacy.cookies.types.advertising')}</span>
                </li>
              </ul>
            </div>
          </section>

          {/* GOOGLE SERVICES */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('privacy.googleServices.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('privacy.googleServices.content')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Google Analytics
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  {t('privacy.googleServices.analytics')}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Google AdSense
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  {t('privacy.googleServices.adsense')}
                </p>
              </div>
            </div>
          </section>

          {/* DATA RIGHTS */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('privacy.dataRights.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('privacy.dataRights.content')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t('privacy.dataRights.rights.optout')}</li>
              <li>{t('privacy.dataRights.rights.cookies')}</li>
              <li>{t('privacy.dataRights.rights.adblock')}</li>
            </ul>
          </section>

          {/* DATA SECURITY */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('privacy.dataSecurity.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('privacy.dataSecurity.content')}
            </p>
          </section>

          {/* CONTACT */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t('privacy.contact.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('privacy.contact.content')}
            </p>
          </section>

          {/* FOOTER */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-muted-foreground text-center">
              {t('privacy.footer')}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}