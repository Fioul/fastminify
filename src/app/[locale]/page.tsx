// Server shell: seul l'éditeur et la toolbar restent côté client

import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import HomeClient from '@/components/HomeClient'
import ContentSections from '@/components/sections/ContentSections'
import { useTranslations } from '@/hooks/useTranslations'

interface PageProps {
    params: Promise<{ locale: string }>
}

export default async function Page({ params }: PageProps) {
    const { locale } = await params
    const { t } = useTranslations(locale)

    return (
        <div className="gradient-bg">
            <div className="container max-w-[1600px] mx-auto px-4 py-10">
            {/* HERO SECTION */}
                <HeroSection locale={locale} />

                {/* Contenu interactif côté client */}
                <HomeClient locale={locale} />

                {/* INTRODUCTION SECTION */}
                <div className="max-w-4xl mx-auto mb-16 mt-16">
                    <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-center mb-6">
                            {t('content.introduction.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-primary">
                                    {t('content.introduction.performance.title')}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {t('content.introduction.performance.description')}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-primary">
                                    {t('content.introduction.seo.title')}
                                </h3>
                                <p className="text-muted-foreground">
                                    {t('content.introduction.seo.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            {/* CONTENT SECTIONS FOR SEO */}
                <ContentSections locale={locale} />
                
                {/* Le modal et l'éditeur sont gérés dans HomeClient */}
            </div>
        </div>
    )
}
