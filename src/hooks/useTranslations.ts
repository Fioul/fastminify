'use client'

import { useState, useEffect } from 'react'
import enMessages from '@/messages/en.json'
import frMessages from '@/messages/fr.json'

interface Translations {
  [key: string]: any
}

export function useTranslations(locale: string) {
  // Utiliser directement les traductions sans état de loading
  const translations = locale === 'fr' ? frMessages : enMessages

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return the key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return { t, loading: false }
}
