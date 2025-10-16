'use client'

import React from 'react'
import { useTranslations } from '@/hooks/useTranslations'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = React.use(params)
  const { t, tArray } = useTranslations(locale)

  return (
    <div className="gradient-bg">
      <div className="container max-w-[1440px] mx-auto px-4 py-10">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('about.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* TECHNOLOGIES SECTION */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              {t('about.technologies.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.technologies.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <span className="text-2xl">⚛️</span>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.nextjs.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.nextjs.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.terser.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.terser.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.csso.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.csso.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.monaco.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.monaco.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.typescript.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.typescript.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.tailwind.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.tailwind.description')}
              </p>
            </div>
          </div>
        </section>

        {/* CONVERSION PROCESS SECTION */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              {t('about.process.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.process.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">1</span>
              </div>
              <h3 className="text-xl font-semibold">{t('about.process.analysis.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.process.analysis.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">2</span>
              </div>
              <h3 className="text-xl font-semibold">{t('about.process.optimization.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.process.optimization.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">3</span>
              </div>
              <h3 className="text-xl font-semibold">{t('about.process.compression.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.process.compression.description')}
              </p>
            </div>
          </div>
        </section>

        {/* ALGORITHMS SECTION */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              {t('about.algorithms.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.algorithms.subtitle')}
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">
                  {t('about.algorithms.javascript.title')}
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Optimisations appliquées :</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {tArray('about.algorithms.javascript.optimizations').map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">
                  {t('about.algorithms.css.title')}
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Optimisations appliquées :</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {tArray('about.algorithms.css.optimizations').map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PERFORMANCE SECTION */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              {t('about.performance.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.performance.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t('about.performance.speed.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('about.performance.speed.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t('about.performance.security.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('about.performance.security.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t('about.performance.reliability.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('about.performance.reliability.description')}
              </p>
            </div>
          </div>
        </section>

        {/* OPEN SOURCE SECTION */}
        <section className="max-w-4xl mx-auto">
          <div className="mt-24 bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                {t('about.opensource.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('about.opensource.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">
                  {t('about.opensource.transparency.title')}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {tArray('about.opensource.transparency.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">
                  {t('about.opensource.updates.title')}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {tArray('about.opensource.updates.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}