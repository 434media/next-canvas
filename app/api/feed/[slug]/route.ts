import { NextRequest, NextResponse } from 'next/server'
import { getFeedItemBySlug, clearFeedCache } from '@/lib/api-feed'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const fresh = searchParams.get('fresh') === 'true'
    
    // If fresh=true, bypass cache completely
    if (fresh) {
      clearFeedCache()
    }
    
    const feedItem = await getFeedItemBySlug(slug, fresh)
    
    if (!feedItem) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Feed item not found' 
        },
        { status: 404 }
      )
    }
    
    // Build response with appropriate cache headers
    const response = NextResponse.json({ 
      success: true, 
      data: feedItem,
      cached: !fresh,
      timestamp: new Date().toISOString()
    })
    
    if (fresh) {
      // No caching for fresh requests
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
    } else {
      // CDN cache: 1 minute, stale-while-revalidate: 2 minutes
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120')
    }
    
    return response
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