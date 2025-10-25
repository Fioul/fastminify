import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/blog/ArticleContent'
import { ArticleHeader } from '@/components/blog/ArticleHeader'
import { ArticleNavigation } from '@/components/blog/ArticleNavigation'
import ArticleStructuredData from '@/components/blog/ArticleStructuredData'
import { getBlogArticle, getBlogArticles } from '@/lib/blog'

type Props = {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getBlogArticle(params.slug, params.locale)
  
  if (!article) {
    return {
      title: 'Article not found',
    }
  }

  const articleUrl = `/${params.locale}/blog/${params.slug}`
  const imageUrl = article.heroImage || 'https://fastminify.com/og-image.jpg'

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [
      ...article.tags,
      'minification javascript',
      'optimisation web',
      'performance web',
      'tutoriel',
      'guide',
      'fastminify'
    ],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: articleUrl,
      siteName: 'FastMinify',
      publishedTime: article.publishedAt,
      authors: ['FastMinify'],
      tags: article.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
      languages: {
        'fr': `/fr/blog/${article.slug?.fr || params.slug}`,
        'en': `/en/blog/${article.slug?.en || params.slug}`,
      },
    },
  }
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const articles = await getBlogArticles(params.locale)
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function BlogArticlePage({ params }: Props) {
  const article = await getBlogArticle(params.slug, params.locale)
  
  if (!article) {
    notFound()
  }

  const allArticles = await getBlogArticles(params.locale)
  const currentIndex = allArticles.findIndex(a => a.slug === params.slug)
  const previousArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null

  return (
    <>
      <ArticleStructuredData article={article} locale={params.locale} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <ArticleHeader article={article} />
            
            <div className="mt-8">
              <ArticleContent article={article} />
            </div>
            
            <div className="mt-12">
              <ArticleNavigation 
                previousArticle={previousArticle}
                nextArticle={nextArticle}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
