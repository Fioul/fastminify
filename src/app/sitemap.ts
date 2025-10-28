import { MetadataRoute } from 'next'
import { getBlogArticles } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fastminify.com'
  
  // Récupérer les articles de blog pour les deux langues
  const articlesFr = await getBlogArticles('fr')
  const articlesEn = await getBlogArticles('en')
  
  // Pages statiques - ordre personnalisé
  const staticPages: MetadataRoute.Sitemap = [
    // Accueil
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ]
  
  // Articles de blog - juste après les pages d'accueil
  const blogPages: MetadataRoute.Sitemap = []
  
  // Articles français
  for (const article of articlesFr) {
    const slug = typeof article.slug === 'string' ? article.slug : article.slug.fr
    blogPages.push({
      url: `${baseUrl}/fr/blog/${slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }
  
  // Articles anglais
  for (const article of articlesEn) {
    const slug = typeof article.slug === 'string' ? article.slug : article.slug.en
    blogPages.push({
      url: `${baseUrl}/en/blog/${slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }
  
  // Autres pages statiques
  const otherPages: MetadataRoute.Sitemap = [
    // Blog
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fr/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // About
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fr/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Documentation
    {
      url: `${baseUrl}/en/documentation`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/documentation`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Contact
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/fr/contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    // Privacy
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/fr/confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    // Legal
    {
      url: `${baseUrl}/en/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/fr/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
  
  // Séparer les pages blog index des autres pages statiques
  const blogIndexPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fr/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]
  
  // Filtrer les pages blog des autres pages
  const filteredOtherPages = otherPages.filter(
    page => !page.url.includes('/blog')
  )
  
  // Combiner dans l'ordre : accueil, pages blog index, articles de blog détaillés, autres pages
  return [...staticPages, ...blogIndexPages, ...blogPages, ...filteredOtherPages]
}
