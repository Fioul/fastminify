'use client'

import enMessages from '@/messages/en.json'
import frMessages from '@/messages/fr.json'


export function useTranslations(locale: string) {
  // Use translations directly without loading state
  const translations = locale === 'fr' ? frMessages : enMessages

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key // Return the key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  const tArray = (key: string): string[] => {
    const keys = key.split('.')
    let value: unknown = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return [] // Return empty array if translation not found
      }
    }
    
    return Array.isArray(value) ? value : []
  }

  return { t, tArray, loading: false }
}
