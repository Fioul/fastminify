// Server shell: seul l'éditeur et la toolbar restent côté client

import React from 'react'
import { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import HomeClient from '@/components/HomeClient'
import ContentSections from '@/components/sections/ContentSections'
import StructuredData from '@/components/StructuredData'
import { useTranslations } from '@/hooks/useTranslations'
import { generateSEOMetadata } from '@/lib/seo'

interface PageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    const { t } = useTranslations(locale)
    
    if (locale === 'fr') {
        return generateSEOMetadata({
            locale,
            pageType: 'home',
            title: 'FastMinify — Minificateur JavaScript, CSS & JSON en ligne gratuit',
            description: 'Minifiez JavaScript, CSS et JSON instantanément avec notre outil gratuit. Réduisez la taille des fichiers, améliorez les temps de chargement et optimisez les performances web. Aucune inscription requise.',
            keywords: [
                'minifier javascript',
                'minifier css',
                'minifier json',
                'minificateur javascript',
                'minificateur css',
                'minificateur json',
                'outil minification',
                'minifier js en ligne',
                'minifier css en ligne',
                'minifier json en ligne',
                'minificateur javascript gratuit',
                'minificateur css gratuit',
                'minificateur json gratuit',
                'outil en ligne',
                'performance web',
                'optimisation code',
                'outil minification',
                'compresser javascript',
                'compresser css',
                'compresser json',
            ]
        })
    }
    
    return generateSEOMetadata({
        locale,
        pageType: 'home',
        title: 'FastMinify — Free Online JavaScript, CSS & JSON Minifier Tool',
        description: 'Minify JavaScript, CSS and JSON code online instantly with our free tool. Reduce file size, improve loading times, and optimize web performance. No registration required.',
        keywords: [
            'minify javascript',
            'minify css',
            'minify json',
            'javascript minifier',
            'css minifier',
            'json minifier',
            'online minifier',
            'minify js online',
            'minify css online',
            'minify json online',
            'free javascript minifier',
            'free css minifier',
            'free json minifier',
            'online tool',
            'web performance',
            'code optimization',
            'minification tool',
            'compress javascript',
            'compress css',
            'compress json',
        ]
    })
}

export default async function Page({ params }: PageProps) {
    const { locale } = await params
    const { t } = useTranslations(locale)

    return (
        <>
            <StructuredData locale={locale} pageType="home" />
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
        </>
    )
}
