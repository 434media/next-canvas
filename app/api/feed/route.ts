import { NextResponse } from 'next/server'
import { getFeedItems, clearFeedCache } from '@/lib/api-feed'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const fresh = searchParams.get('fresh') === 'true'
    
    // If fresh=true, bypass cache completely
    if (fresh) {
      clearFeedCache()
    }
    
    const feedItems = await getFeedItems(fresh)
    
    // Build response with appropriate cache headers
    const response = NextResponse.json({ 
      success: true, 
      data: feedItems,
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
      // This allows fast responses while revalidating in the background
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120')
    }
    
    return response
  } catch (error) {
    console.error('Error in feed API:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch feed items',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}