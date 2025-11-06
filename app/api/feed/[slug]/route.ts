import { NextRequest, NextResponse } from 'next/server'
import { getFeedItemBySlug } from '@/lib/airtable-feed'

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