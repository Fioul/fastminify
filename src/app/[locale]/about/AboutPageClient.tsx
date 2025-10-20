'use client'

import React from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'
import { getVersion } from '@/lib/version'

interface AboutPageClientProps {
  locale: string
}

export default function AboutPageClient({ locale }: AboutPageClientProps) {
  const { t, tArray } = useTranslations(locale)
  const version = getVersion()

  return (
    <div className="gradient-bg">
      <div className="container max-w-[1600px] mx-auto px-4 py-10">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('about.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            Version {version}
          </div>
        </div>

        {/* TECHNOLOGIES SECTION */}
        <section className="max-w-5xl mx-auto mb-16">
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
                <SiNextdotjs className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.nextjs.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.nextjs.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 512 512">
                  <g>
                    <path d="M256,329l63,36v128H193V365L256,329z M319,147V19H193v128l63,36L319,147z"/>
                    <path d="M256,183l63-36v73L256,183z M193,292v73l63-36L193,292z"/>
                    <path d="M319,220v-73l110-64l63,109l-111,64L319,220z M130,256L19,320l63,109l111-64v-73L130,256z"/>
                    <path d="M319,220l62,36l-62,36V220z M193,220l-63,36l63,36V220z"/>
                    <path d="M193,220l-63,36L19,192L83,83l110,64V220z M319,292v73l110,64l63-109l-111-64L319,292z"/>
                    <path d="M319,292v73l-63-36L319,292z M256,183l-63-36v73L256,183z"/>
                    <polygon points="256,183 193,220 193,292 256,329 319,292 319,220"/>
                  </g>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
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
                <SiTypescript className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.typescript.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.typescript.description')}
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 flex items-center justify-center mx-auto">
                <SiTailwindcss className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold">{t('about.technologies.tailwind.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('about.technologies.tailwind.description')}
              </p>
            </div>
          </div>
        </section>

        {/* CONVERSION PROCESS SECTION */}
        <section className="max-w-5xl mx-auto mb-16">
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
        <section className="max-w-5xl mx-auto mb-16">
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
        <section className="max-w-5xl mx-auto mb-16">
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
        <section className="max-w-5xl mx-auto">
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
