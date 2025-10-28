'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BlogArticle } from '@/types/blog'
import { formatDateForLocale } from '@/lib/date-utils'

interface RelatedArticlesProps {
  articles: BlogArticle[]
  currentArticleId: string
  locale: string
}

export default function RelatedArticles({ articles, currentArticleId, locale }: RelatedArticlesProps) {
  // Filtrer l'article actuel et prendre les 3 premiers
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3)

  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <h3 className="text-xl font-bold mb-6">
        {locale === 'fr' ? 'Articles connexes' : 'Related Articles'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article) => {
          const slug = typeof article.slug === 'string' ? article.slug : article.slug[locale]
          return (
            <Link key={article.id} href={`/${locale}/blog/${slug}`} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 group p-0">
                {article.heroImage && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={article.heroImage} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDateForLocale(article.publishedAt, locale)}</span>
                    <span>{article.readingTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
