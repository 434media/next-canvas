import { NextResponse } from 'next/server'
import { getFeedItems } from '@/lib/api-feed'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const feedItems = await getFeedItems()
    
    return NextResponse.json({ 
      success: true, 
      data: feedItems 
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
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