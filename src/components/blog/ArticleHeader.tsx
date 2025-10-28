'use client'

import { ImageCredits } from '@/components/ui/image-credits'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BlogArticle } from '@/types/blog'
import { formatDateForLocale } from '@/lib/date-utils'
import { useParams } from 'next/navigation'

interface ArticleHeaderProps {
  article: BlogArticle
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const params = useParams()
  const locale = params.locale as string
  
  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/${locale}/blog`} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {locale === 'fr' ? 'Retour au blog' : 'Back to blog'}
          </Link>
        </Button>
      </div>
      
      {article.heroImage && (
        <div className="mb-8">
          <img 
            src={article.heroImage} 
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            loading="eager"
            decoding="async"
          />
        </div>
      )}
      
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="default" className="bg-primary text-primary-foreground">{article.category}</Badge>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
        {article.title}
      </h1>
      
      <p className="text-xl text-muted-foreground mb-6">
        {article.excerpt}
      </p>
      
      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDateForLocale(article.publishedAt, locale === 'fr' ? 'fr-FR' : 'en-US')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{article.readingTime}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs bg-muted text-muted-foreground border">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
