'use client'

interface BreadcrumbStructuredDataProps {
  articleTitle: string
  articleUrl: string
  locale: string
}

export default function BreadcrumbStructuredData({ articleTitle, articleUrl, locale }: BreadcrumbStructuredDataProps) {
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
        "name": articleTitle,
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
