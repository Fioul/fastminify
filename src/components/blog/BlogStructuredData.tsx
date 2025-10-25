'use client'

import { BlogArticle } from '@/types/blog'

interface BlogStructuredDataProps {
  articles: BlogArticle[]
  locale: string
}

export default function BlogStructuredData({ articles, locale }: BlogStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": locale === 'fr' ? "Blog FastMinify" : "FastMinify Blog",
    "description": locale === 'fr' 
      ? "Découvrez nos guides et tutoriels pour optimiser vos performances web avec la minification JavaScript, CSS et JSON."
      : "Discover our guides and tutorials to optimize your web performance with JavaScript, CSS and JSON minification.",
    "url": `https://fastminify.com/${locale}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "FastMinify",
      "url": "https://fastminify.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fastminify.com/logo.png"
      }
    },
    "blogPost": articles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "url": `https://fastminify.com/${locale}/blog/${typeof article.slug === 'string' ? article.slug : article.slug[locale]}`,
      "datePublished": article.publishedAt,
      "dateModified": article.publishedAt,
      "author": {
        "@type": "Organization",
        "name": "FastMinify"
      },
      "publisher": {
        "@type": "Organization",
        "name": "FastMinify",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fastminify.com/logo.png"
        }
      },
      "image": article.heroImage ? {
        "@type": "ImageObject",
        "url": article.heroImage,
        "width": 1200,
        "height": 630
      } : undefined,
      "keywords": article.tags.join(', '),
      "articleSection": article.category,
      "wordCount": article.readingTime
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
