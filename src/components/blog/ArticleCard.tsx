'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import { BlogArticle } from '@/types/blog'
import { formatDateForLocale } from '@/lib/date-utils'
import { useParams } from 'next/navigation'

interface ArticleCardProps {
  article: BlogArticle
}

export function ArticleCard({ article }: ArticleCardProps) {
  const params = useParams()
  const locale = params.locale as string
  
  return (
    <Link href={`/${locale}/blog/${typeof article.slug === 'string' ? article.slug : article.slug[locale as keyof typeof article.slug]}`} className="block h-full">
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden p-0 group cursor-pointer">
        {article.heroImage && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={article.heroImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        <CardHeader className="p-3 pb-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="default" className="bg-primary text-primary-foreground">{article.category}</Badge>
          </div>
          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {article.title}
          </h3>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDateForLocale(article.publishedAt, locale === 'fr' ? 'fr-FR' : 'en-US')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2 mb-2">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-muted text-muted-foreground border">
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground border">
                +{article.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
