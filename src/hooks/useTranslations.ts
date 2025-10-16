'use client'

import enMessages from '@/messages/en.json'
import frMessages from '@/messages/fr.json'


export function useTranslations(locale: string) {
  // Use translations directly without loading state
  const translations = locale === 'fr' ? frMessages : enMessages

  const t = (key: string): unknown => {
    const keys = key.split('.')
    let value: unknown = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key // Return the key if translation not found
      }
    }
    
    return value
  }

  const tArray = (key: string): string[] => {
    const value = t(key)
    return Array.isArray(value) ? value : []
  }

  return { t, tArray, loading: false }
}
