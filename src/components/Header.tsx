'use client'

import { useState, useEffect, memo } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Menu, X } from '@/lib/icons'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslations } from '@/hooks/useTranslations'
import { getLocalizedUrl } from '@/lib/routes'

interface HeaderProps {
  locale?: string
}

const Header = memo(function Header({ locale = 'en' }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslations(locale)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  if (!mounted) {
    return null
  }

  // Navigation items configuration
  const navItems = [
    { href: `/${locale}`, label: t('navigation.home') },
    { href: getLocalizedUrl(locale as 'en' | 'fr', 'about'), label: t('navigation.about') },
    { href: getLocalizedUrl(locale as 'en' | 'fr', 'documentation'), label: t('navigation.documentation') },
    { href: getLocalizedUrl(locale as 'en' | 'fr', 'contact'), label: t('navigation.contact') },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and brand */}
        <Link href={`/${locale}`} aria-label={t('navigation.home')}>
          <Logo size="md" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Main navigation menu */}
          <nav className="flex items-center space-x-6">
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
            aria-label={t('common.toggleTheme')}
          >
            {theme === 'light' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Language selector for mobile */}
          <LanguageSwitcher currentLocale={locale} />

          {/* Theme toggle button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-10 h-10 cursor-pointer"
            aria-label={t('common.toggleTheme')}
          >
            {theme === 'light' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
          <nav className="container max-w-[1440px] mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block text-sm font-medium transition-colors hover:text-primary py-2',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
})

export default Header
