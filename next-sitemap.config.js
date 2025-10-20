/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://fastminify.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/logs/*'],
  alternateRefs: [
    {
      href: 'https://fastminify.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://fastminify.com/fr',
      hreflang: 'fr',
    },
  ],
  additionalPaths: async (config) => [
    // Routes françaises localisées
    await config.transform(config, '/fr/a-propos'),
    await config.transform(config, '/fr/mentions-legales'),
    await config.transform(config, '/fr/confidentialite'),
  ],
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }

    // Homepage gets highest priority
    if (path === '/' || path === '/en' || path === '/fr') {
      customConfig.priority = 1.0
      customConfig.changefreq = 'daily'
    }

    // About page gets high priority
    if (path.includes('/about')) {
      customConfig.priority = 0.8
      customConfig.changefreq = 'monthly'
    }

    // Legal pages get lower priority
    if (path.includes('/privacy') || path.includes('/legal')) {
      customConfig.priority = 0.3
      customConfig.changefreq = 'yearly'
    }

    return customConfig
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/logs/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    additionalSitemaps: [
      'https://fastminify.com/sitemap.xml',
    ],
  },
}
