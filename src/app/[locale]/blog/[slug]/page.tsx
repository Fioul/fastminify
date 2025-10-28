import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/blog/ArticleContent'
import { ArticleHeader } from '@/components/blog/ArticleHeader'
import ArticleStructuredData from '@/components/blog/ArticleStructuredData'
import BreadcrumbStructuredData from '@/components/blog/BreadcrumbStructuredData'
import RelatedArticles from '@/components/blog/RelatedArticles'
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

  const articleUrl = `https://fastminify.com/${params.locale}/blog/${params.slug}`
  const imageUrl = article.heroImage?.startsWith('http') 
    ? article.heroImage 
    : `https://fastminify.com${article.heroImage || '/og-image.jpg'}`

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [
      ...article.tags,
      article.tags.includes('css') ? 'minification css' : 'minification javascript',
      'optimisation web',
      'performance web',
      'tutoriel',
      'guide',
      'fastminify'
    ],
    authors: [{ name: 'FastMinify', url: 'https://fastminify.com' }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: articleUrl,
      siteName: 'FastMinify',
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: ['FastMinify'],
      tags: article.tags,
      locale: params.locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
      creator: '@fastminify',
      site: '@fastminify',
    },
    alternates: {
      canonical: articleUrl,
      languages: {
        'fr': `https://fastminify.com/fr/blog/${typeof article.slug === 'string' ? article.slug : article.slug.fr}`,
        'en': `https://fastminify.com/en/blog/${typeof article.slug === 'string' ? article.slug : article.slug.en}`,
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
  const currentIndex = allArticles.findIndex(a => a.id === article.id)

  return (
    <>
      <ArticleStructuredData article={article} locale={params.locale} />
      <BreadcrumbStructuredData 
        article={article}
        locale={params.locale}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <ArticleHeader article={article} />
            
            <div className="mt-8">
              <ArticleContent article={article} />
            </div>
            
            
            <div className="mt-12">
              <RelatedArticles 
                articles={allArticles}
                currentArticleId={article.id}
                locale={params.locale}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
