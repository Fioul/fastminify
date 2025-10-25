'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BlogArticle } from '@/types/blog'

interface ArticleNavigationProps {
  previousArticle: BlogArticle | null
  nextArticle: BlogArticle | null
}

export function ArticleNavigation({ previousArticle, nextArticle }: ArticleNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {previousArticle ? (
        <Card className="flex-1">
          <CardContent className="p-4">
            <Button variant="ghost" asChild className="w-full justify-start h-auto p-0">
              <Link href={`/blog/${previousArticle.slug}`}>
                <div className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">Article précédent</div>
                    <div className="font-medium line-clamp-2">{previousArticle.title}</div>
                  </div>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex-1" />
      )}
      
      {nextArticle ? (
        <Card className="flex-1">
          <CardContent className="p-4">
            <Button variant="ghost" asChild className="w-full justify-end h-auto p-0">
              <Link href={`/blog/${nextArticle.slug}`}>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Article suivant</div>
                    <div className="font-medium line-clamp-2">{nextArticle.title}</div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
