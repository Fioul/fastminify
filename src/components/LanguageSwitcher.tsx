'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface LanguageSwitcherProps {
  currentLocale: string
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: string) => {
    // Sauvegarder la langue dans localStorage
    localStorage.setItem('preferred-language', newLocale)
    
    // Remplacer la locale dans le pathname
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div className="flex gap-1">
      <Button
        variant={currentLocale === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLanguage('en')}
        className="px-2 py-1 text-xs cursor-pointer"
      >
        EN
      </Button>
      <Button
        variant={currentLocale === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLanguage('fr')}
        className="px-2 py-1 text-xs cursor-pointer"
      >
        FR
      </Button>
    </div>
  )
}
