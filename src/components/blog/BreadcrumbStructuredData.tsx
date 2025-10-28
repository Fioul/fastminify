'use client'

import { BlogArticle } from '@/types/blog'

interface BreadcrumbStructuredDataProps {
  article: BlogArticle
  locale: string
}

export default function BreadcrumbStructuredData({ article, locale }: BreadcrumbStructuredDataProps) {
  const articleUrl = `https://fastminify.com/${locale}/blog/${typeof article.slug === 'string' ? article.slug : article.slug[locale]}`
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'fr' ? "Accueil" : "Home",
        "item": `https://fastminify.com/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === 'fr' ? "Blog" : "Blog",
        "item": `https://fastminify.com/${locale}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": articleUrl
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
