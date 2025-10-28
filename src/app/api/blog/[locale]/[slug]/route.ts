import { NextRequest, NextResponse } from 'next/server'
import { getBlogArticle } from '@/lib/blog'

export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string; slug: string } }
) {
  try {
    const article = await getBlogArticle(params.slug, params.locale)
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      article
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
