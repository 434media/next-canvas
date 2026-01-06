import { NextRequest, NextResponse } from 'next/server'
import { getFeedItemBySlug } from '@/lib/api-feed'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const feedItem = await getFeedItemBySlug(slug)
    
    if (!feedItem) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Feed item not found' 
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      data: feedItem 
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error in feed item API:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch feed item',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}