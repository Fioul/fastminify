'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslations } from '@/hooks/useTranslations'

interface HeaderProps {
  locale?: string
}

export default function Header({ locale = 'en' }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslations(locale)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Navigation items configuration
  const navItems = [
    { href: `/${locale}`, label: t('navigation.home') },
    { href: `/${locale}/about`, label: t('navigation.about') },
    { href: `/${locale}/contact`, label: t('navigation.contact') },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and brand */}
        <Link href={`/${locale}`}>
          <Logo size="md" />
        </Link>

        {/* Right navigation section */}
        <div className="flex items-center space-x-6">
          {/* Main navigation menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language selector */}
                <LanguageSwitcher currentLocale={locale} />

          {/* Theme toggle button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-10 h-10 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
