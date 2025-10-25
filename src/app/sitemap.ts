import { MetadataRoute } from 'next'
import { getBlogArticles } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fastminify.com'
  
  // Récupérer les articles de blog pour les deux langues
  const articlesFr = await getBlogArticles('fr')
  const articlesEn = await getBlogArticles('en')
  
  // Articles de blog - EN puis FR pour chaque article
  const blogPages: MetadataRoute.Sitemap = []
  
  // Trouver le nombre maximum d'articles pour itérer
  const maxArticles = Math.max(articlesEn.length, articlesFr.length)
  
  for (let i = 0; i < maxArticles; i++) {
    // Article EN
    if (articlesEn[i]) {
      const article = articlesEn[i]
      const slug = typeof article.slug === 'string' ? article.slug : article.slug.en
      blogPages.push({
        url: `${baseUrl}/en/blog/${slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })
    }
    
    // Article FR correspondant
    if (articlesFr[i]) {
      const article = articlesFr[i]
      const slug = typeof article.slug === 'string' ? article.slug : article.slug.fr
      blogPages.push({
        url: `${baseUrl}/fr/blog/${slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })
    }
  }
  
  // Pages statiques dans l'ordre souhaité
  const staticPages = [
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
  
  // Structure finale : Accueil, Blog, Articles du blog, puis autres pages
  const allPages = [
    // Accueil
    staticPages[0], // /en
    staticPages[1], // /fr
    // Blog
    staticPages[2], // /en/blog
    staticPages[3], // /fr/blog
    // Articles du blog (EN puis FR pour chaque article)
    ...blogPages,
    // Autres pages
    ...staticPages.slice(4), // About, Documentation, Contact, Privacy, Legal
  ]
  
  return allPages
}
