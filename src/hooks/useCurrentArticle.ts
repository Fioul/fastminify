'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { BlogArticle } from '@/types/blog'

/**
 * Hook pour récupérer l'article actuel côté client
 * Utilise l'API interne pour récupérer les données de l'article
 */
export function useCurrentArticle() {
  const [article, setArticle] = useState<BlogArticle | null>(null)
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const blogArticleMatch = pathname.match(/^\/[a-z]{2}\/blog\/(.+)$/)
    if (blogArticleMatch) {
      const slug = blogArticleMatch[1]
      const locale = pathname.split('/')[1]
      
      setLoading(true)
      
      // Appel à l'API interne pour récupérer l'article
      fetch(`/api/blog/${locale}/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setArticle(data.article)
          }
        })
        .catch(error => {
          console.error('Error fetching article:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setArticle(null)
    }
  }, [pathname])

  return { article, loading }
}
