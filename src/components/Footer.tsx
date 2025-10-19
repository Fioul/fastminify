'use client'

import { useTranslations } from '@/hooks/useTranslations'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { Github, Mail, ExternalLink } from 'lucide-react'

interface FooterProps {
  locale?: string
}

export default function Footer({ locale = 'en' }: FooterProps) {
  const { t } = useTranslations(locale)

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">FastMinify</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/your-username/fastminify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@fastminify.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('footer.product.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.product.home')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.product.about')}
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.product.features')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('footer.legal.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {t('footer.legal.privacy')}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/legal`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {t('footer.legal.legal')}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {t('footer.legal.robots')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('footer.support.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@fastminify.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.support.contact')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/your-username/fastminify/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.support.issues')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/your-username/fastminify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.support.github')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              &copy; 2025 FastMinify. {t('footer.rights')}
            </div>
            <div className="text-sm text-muted-foreground">
              {t('footer.hosting')} <span className="font-medium">Render.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
