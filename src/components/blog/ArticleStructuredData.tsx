'use client'

import { BlogArticle } from '@/types/blog'

interface ArticleStructuredDataProps {
  article: BlogArticle
  locale: string
}

export default function ArticleStructuredData({ article, locale }: ArticleStructuredDataProps) {
  const articleUrl = `https://fastminify.com/${locale}/blog/${typeof article.slug === 'string' ? article.slug : article.slug[locale]}`
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "url": articleUrl,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "FastMinify",
      "url": "https://fastminify.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FastMinify",
      "url": "https://fastminify.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fastminify.com/logo.png",
        "width": 200,
        "height": 60
      }
    },
    "image": article.heroImage ? {
      "@type": "ImageObject",
      "url": article.heroImage,
      "width": 1200,
      "height": 630,
      "alt": article.title
    } : undefined,
    "keywords": article.tags.join(', '),
    "articleSection": article.category,
    "wordCount": article.readingTime,
    "inLanguage": locale,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "breadcrumb": {
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
