import { Metadata } from 'next'
import { ArticleList } from '@/components/blog/ArticleList'
import { BlogHeader } from '@/components/blog/BlogHeader'
import BlogStructuredData from '@/components/blog/BlogStructuredData'
import { getBlogArticles } from '@/lib/blog'
import { useTranslations } from '@/hooks/useTranslations'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = useTranslations(params.locale)
  
  return {
    title: t('blog.meta.title'),
    description: t('blog.meta.description'),
    keywords: [
      'minification javascript',
      'minification css',
      'minification json',
      'optimisation web',
      'performance web',
      'tutoriel minification',
      'guide minification',
      'outil minification',
      'minificateur gratuit',
      'optimisation code'
    ],
    openGraph: {
      title: t('blog.meta.title'),
      description: t('blog.meta.description'),
      type: 'website',
      url: `/${params.locale}/blog`,
      siteName: 'FastMinify',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('blog.meta.title'),
      description: t('blog.meta.description'),
    },
    alternates: {
      canonical: `https://fastminify.com/${params.locale}/blog`,
      languages: {
        'fr': 'https://fastminify.com/fr/blog',
        'en': 'https://fastminify.com/en/blog',
      },
    },
  }
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const articles = await getBlogArticles(params.locale)

  return (
    <>
      <BlogStructuredData articles={articles} locale={params.locale} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <BlogHeader />
            
            
            <div className="mt-8">
              <ArticleList articles={articles} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
