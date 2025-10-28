import { MetadataRoute } from 'next'
import { getBlogArticles } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fastminify.com'
  
  // Récupérer les articles de blog pour les deux langues
  const articlesFr = await getBlogArticles('fr')
  const articlesEn = await getBlogArticles('en')
  
  // Articles de blog détaillés
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
  
  // Pages dans l'ordre demandé : Code minifier, Documentation, Blog, About, Contact
  const orderedPages: MetadataRoute.Sitemap = [
    // 1. Code minifier (accueil)
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
    
    // 2. Documentation
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
    
    // 3. Blog (index)
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
    
    // 4. About
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
    
    // 5. Contact
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
    
    // Pages légales (priorité plus faible)
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
  
  // Combiner dans l'ordre : pages principales, puis articles de blog détaillés
  return [...orderedPages, ...blogPages]
}
