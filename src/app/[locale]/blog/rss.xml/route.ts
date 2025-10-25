import { NextRequest } from 'next/server'
import { getBlogArticles } from '@/lib/blog'

export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string } }
) {
  const articles = await getBlogArticles(params.locale)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fastminify.com'
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FastMinify Blog</title>
    <description>Guides et tutoriels pour optimiser vos performances web avec la minification JavaScript, CSS et JSON.</description>
    <link>${baseUrl}/${params.locale}/blog</link>
    <language>${params.locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/${params.locale}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${baseUrl}/${params.locale}/blog/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${params.locale}/blog/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category>${article.category}</category>
      ${article.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
