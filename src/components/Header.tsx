'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState('en')
  const pathname = usePathname()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Navigation items configuration
  const navItems = [
    { href: '/', label: 'Code Minifier' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and brand */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
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

          {/* Language selector - Segmented Control */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                'px-3 py-1 text-xs rounded-md transition-all duration-200 font-medium cursor-pointer',
                language === 'en'
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={cn(
                'px-3 py-1 text-xs rounded-md transition-all duration-200 font-medium cursor-pointer',
                language === 'fr'
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              FR
            </button>
          </div>

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
