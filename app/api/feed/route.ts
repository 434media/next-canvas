import { NextRequest, NextResponse } from 'next/server'
import { getFeedItems } from '@/lib/airtable-feed'

export async function GET() {
  try {
    const feedItems = await getFeedItems()
    
    return NextResponse.json({ 
      success: true, 
      data: feedItems 
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