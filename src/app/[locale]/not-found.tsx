'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations } from '@/hooks/useTranslations'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import ClientAdManager from '@/components/ClientAdManager'
import Header from '@/components/Header'
import { FaCode, FaRocket, FaBolt, FaMagic } from 'react-icons/fa'

interface NotFoundProps {
  params: Promise<{ locale: string }>
}

export default function NotFound({ params }: NotFoundProps) {
  const { locale } = React.use(params)
  const { t, tArray } = useTranslations(locale)
  
  console.log('404 Page - Locale:', locale)

  return (
    <>
      <Header locale={locale} />
      <div className="gradient-bg min-h-screen flex items-center justify-center pt-16">
      <div className="container max-w-[1440px] mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 404 Number with Animation */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-none">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t('notFound.title')}
            </h2>
            
            <p className="text-xl text-muted-foreground">
              {t('notFound.subtitle')}
            </p>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('notFound.description')}
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-card text-card-foreground rounded-2xl p-8 mb-12 border border-border shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('notFound.suggestions.title')}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {tArray('notFound.suggestions.items').map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground text-left">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Link href={`/${locale}`} className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                {t('notFound.actions.home')}
              </Link>
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-8 text-4xl opacity-60">
            <FaCode className="animate-bounce text-primary" style={{ animationDelay: '0s' }} />
            <FaBolt className="animate-bounce text-accent" style={{ animationDelay: '0.2s' }} />
            <FaRocket className="animate-bounce text-primary" style={{ animationDelay: '0.4s' }} />
            <FaMagic className="animate-bounce text-accent" style={{ animationDelay: '0.6s' }} />
          </div>

        </div>
      </div>
      
      {/* AD MANAGER */}
      <ClientAdManager locale={locale} />
      </div>
    </>
  )
}
