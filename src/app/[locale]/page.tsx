// Server shell: seul l'éditeur et la toolbar restent côté client

import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import HomeClient from '@/components/HomeClient'
import ContentSections from '@/components/sections/ContentSections'

interface PageProps {
    params: Promise<{ locale: string }>
}

export default async function Page({ params }: PageProps) {
    const { locale } = await params


    return (
        <div className="gradient-bg">
            <div className="container max-w-[1600px] mx-auto px-4 py-10">
            {/* HERO SECTION */}
                <HeroSection locale={locale} />

                {/* Contenu interactif côté client */}
                <HomeClient locale={locale} />

            {/* CONTENT SECTIONS FOR SEO */}
                <ContentSections locale={locale} />
                
                {/* Le modal et l'éditeur sont gérés dans HomeClient */}
            </div>
        </div>
    )
}
