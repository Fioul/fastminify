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
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.nextjs.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.nextjs.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.terser.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.terser.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.csso.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.csso.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.monaco.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.monaco.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 8.184 8.184 0 0 0-1.01-.444c-.4-.15-.76-.315-1.08-.493a5.33 5.33 0 0 1-.893-.686 3.085 3.085 0 0 1-.62-.896 2.716 2.716 0 0 1-.22-1.08c0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.typescript.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.typescript.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                </svg>
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