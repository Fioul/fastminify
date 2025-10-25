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
      "height": 630
    } : undefined,
    "keywords": article.tags.join(', '),
    "articleSection": article.category,
    "wordCount": article.readingTime,
    "inLanguage": locale,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    // Ajout de données structurées HowTo pour les tutoriels
    ...(article.category.toLowerCase().includes('tutorial') || article.category.toLowerCase().includes('tutoriel') ? {
      "about": {
        "@type": "HowTo",
        "name": article.title,
        "description": article.excerpt,
        "step": [
          {
            "@type": "HowToStep",
            "name": locale === 'fr' ? "Introduction" : "Introduction",
            "text": article.excerpt
          }
        ]
      }
    } : {}),
    // Ajout de FAQ si c'est un guide
    ...(article.title.toLowerCase().includes('guide') || article.title.toLowerCase().includes('complet') ? {
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": locale === 'fr' ? "Qu'est-ce que la minification JavaScript ?" : "What is JavaScript minification?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": locale === 'fr' 
                ? "La minification JavaScript est le processus de suppression des caractères inutiles du code source sans changer sa fonctionnalité."
                : "JavaScript minification is the process of removing unnecessary characters from source code without changing its functionality."
            }
          },
          {
            "@type": "Question",
            "name": locale === 'fr' ? "Pourquoi minifier le JavaScript ?" : "Why minify JavaScript?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": locale === 'fr'
                ? "La minification réduit la taille des fichiers, améliore les temps de chargement et optimise les performances web."
                : "Minification reduces file sizes, improves loading times and optimizes web performance."
            }
          }
        ]
      }
    } : {})
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
