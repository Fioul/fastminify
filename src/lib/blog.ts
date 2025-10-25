import articlesData from '@/data/blog/articles.json'
import { BlogArticle, BlogCategory, BlogContent } from '@/types/blog'

export async function getBlogArticles(locale: string): Promise<BlogArticle[]> {
  return articlesData.articles.map(article => ({
    id: article.id,
    slug: typeof article.slug === 'string' ? article.slug : article.slug[locale as keyof typeof article.slug] || article.slug.en,
    title: article.title[locale as keyof typeof article.title] || article.title.en,
    excerpt: article.excerpt[locale as keyof typeof article.excerpt] || article.excerpt.en,
    category: article.category[locale as keyof typeof article.category] || article.category.en,
    tags: article.tags,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime[locale as keyof typeof article.readingTime] || article.readingTime.en,
    featured: article.featured,
    heroImage: article.heroImage,
  }))
}

export async function getBlogArticle(slug: string, locale: string): Promise<(BlogArticle & { content: BlogContent }) | null> {
  const article = articlesData.articles.find(a => {
    if (typeof a.slug === 'string') {
      return a.slug === slug
    }
    // Chercher dans tous les slugs (fr et en) pour trouver l'article
    return a.slug.fr === slug || a.slug.en === slug
  })
  
  if (!article) {
    return null
  }

  try {
    const content = await import(`@/data/blog/content/${article.id}/${locale}.json`)
    
    return {
      id: article.id,
      slug: typeof article.slug === 'string' ? article.slug : article.slug,
      title: article.title[locale as keyof typeof article.title] || article.title.en,
      excerpt: article.excerpt[locale as keyof typeof article.excerpt] || article.excerpt.en,
      category: article.category[locale as keyof typeof article.category] || article.category.en,
      tags: article.tags,
      publishedAt: article.publishedAt,
      readingTime: article.readingTime[locale as keyof typeof article.readingTime] || article.readingTime.en,
      featured: article.featured,
      heroImage: article.heroImage,
      content: content.default,
    }
  } catch (error) {
    console.error(`Failed to load content for article ${article.id} in locale ${locale}:`, error)
    return null
  }
}

export async function getBlogCategories(locale: string): Promise<BlogCategory[]> {
  return articlesData.categories.map(category => ({
    id: category.id,
    name: category.name[locale as keyof typeof category.name] || category.name.en,
    description: category.description[locale as keyof typeof category.description] || category.description.en,
  }))
}

export async function getFeaturedArticles(locale: string, limit: number = 3): Promise<BlogArticle[]> {
  const articles = await getBlogArticles(locale)
  return articles.filter(article => article.featured).slice(0, limit)
}
