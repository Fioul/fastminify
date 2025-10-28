// Server shell: seul l'éditeur et la toolbar restent côté client

import React, { Suspense } from 'react'
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
            title: 'FastMinify — Minifier, Déminifier & Beautifier JavaScript, CSS & JSON en ligne',
            description: 'Minifiez, déminifiez et beautifiez JavaScript, CSS et JSON instantanément avec notre outil gratuit. Optimisation, déminification et beautification de code en ligne. Aucune inscription requise.',
            keywords: [
                // Minify (33%)
                'minifier javascript',
                'minifier css',
                'minifier json',
                'minificateur javascript',
                'minificateur css',
                'minificateur json',
                'minifier js en ligne',
                'minifier css en ligne',
                'minifier json en ligne',
                'minificateur javascript gratuit',
                'minificateur css gratuit',
                'minificateur json gratuit',
                // Unminify (33%)
                'déminifier javascript',
                'déminifier css',
                'déminifier json',
                'déminificateur javascript',
                'déminificateur css',
                'déminificateur json',
                'déminifier js en ligne',
                'déminifier css en ligne',
                'déminifier json en ligne',
                'déminifier code',
                'déminification code',
                // Beautify (33%)
                'beautifier javascript',
                'beautifier css',
                'beautifier json',
                'beautificateur javascript',
                'beautificateur css',
                'beautificateur json',
                'beautifier js en ligne',
                'beautifier css en ligne',
                'beautifier json en ligne',
                'beautifier code',
                'beautification code',
                // Génériques
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
        title: 'FastMinify — Minify, Unminify & Beautify JavaScript, CSS & JSON Online',
        description: 'Minify, unminify and beautify JavaScript, CSS and JSON code online instantly. Free tool for code optimization, unminification and beautification. No registration required.',
        keywords: [
            // Minify (33%)
            'minify javascript',
            'minify css',
            'minify json',
            'javascript minifier',
            'css minifier',
            'json minifier',
            'minify js online',
            'minify css online',
            'minify json online',
            'free javascript minifier',
            'free css minifier',
            'free json minifier',
            // Unminify (33%)
            'unminify javascript',
            'unminify css',
            'unminify json',
            'javascript unminifier',
            'css unminifier',
            'json unminifier',
            'unminify js online',
            'unminify css online',
            'unminify json online',
            'code unminifier',
            'unminify code',
            // Beautify (33%)
            'beautify javascript',
            'beautify css',
            'beautify json',
            'javascript beautifier',
            'css beautifier',
            'json beautifier',
            'beautify js online',
            'beautify css online',
            'beautify json online',
            'code beautifier',
            'beautify code',
            // Génériques
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
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-muted-foreground">Loading...</div></div>}>
                        <HomeClient locale={locale} />
                    </Suspense>

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
