// lib/api-feed.ts
// 434 Media Feed API integration for Digital Canvas

import { marked } from 'marked'

const API_BASE_URL = process.env.FEED_API_URL || 'https://434media.com/api/public/feed'

// Configure marked for better HTML output
marked.setOptions({
  breaks: true, // Convert line breaks to <br>
  gfm: true,    // Enable GitHub Flavored Markdown
})

// Convert markdown to HTML, handling both plain text and markdown content
function convertMarkdownToHtml(text: string): string {
  if (!text) return ''
  
  // If content already contains HTML tags, return as-is
  if (/<[a-z][\s\S]*>/i.test(text)) {
    return text
  }
  
  // Convert markdown to HTML
  return marked(text) as string
}

export interface FeedItem {
  id: string
  title: string
  slug: string
  type: 'video' | 'article' | 'podcast' | 'newsletter'
  summary: string
  published_date: string
  status: string
  authors: string[]
  topics: string[]
  og_image?: string
  og_title?: string
  og_description?: string
  hero_image_desktop?: string
  hero_image_mobile?: string
  founders_note_text?: string
  founders_note_image?: string
  last_month_gif?: string
  the_drop_gif?: string
  featured_post_title?: string
  featured_post_image?: string
  featured_post_content?: string
  upcoming_event_title?: string
  upcoming_event_description?: string
  upcoming_event_image_desktop?: string
  upcoming_event_image_mobile?: string
  upcoming_event_cta_text?: string
  upcoming_event_cta_link?: string
  spotlight_1_title?: string
  spotlight_1_description?: string
  spotlight_1_image?: string
  spotlight_1_cta_text?: string
  spotlight_1_cta_link?: string
  spotlight_2_title?: string
  spotlight_2_description?: string
  spotlight_2_image?: string
  spotlight_2_cta_text?: string
  spotlight_2_cta_link?: string
  spotlight_3_title?: string
  spotlight_3_description?: string
  spotlight_3_image?: string
  spotlight_3_cta_text?: string
  spotlight_3_cta_link?: string
}

export interface NewsletterContent {
  heroImage: {
    desktop: string
    mobile: string
  }
  foundersNote: {
    text: string
    image: string
  }
  lastMonthGif: string
  theDropGif: string
  featuredPost: {
    title: string
    image: string
    content: string
  }
  spotlights: Array<{
    title: string
    description: string
    image: string
    ctaText: string
    ctaLink: string
  }>
  upcomingEvent: {
    title: string
    description: string
    image: {
      desktop: string
      mobile: string
    }
    ctaText: string
    ctaLink: string
  }
}

// Transform API response to match NewsletterContent interface
export function transformToNewsletterContent(item: FeedItem): NewsletterContent {
  return {
    heroImage: {
      desktop: item.hero_image_desktop || '',
      mobile: item.hero_image_mobile || '',
    },
    foundersNote: {
      text: convertMarkdownToHtml(item.founders_note_text || ''),
      image: item.founders_note_image || '',
    },
    lastMonthGif: item.last_month_gif || '',
    theDropGif: item.the_drop_gif || '',
    featuredPost: {
      title: item.featured_post_title || '',
      image: item.featured_post_image || '',
      content: convertMarkdownToHtml(item.featured_post_content || ''),
    },
    spotlights: [
      {
        title: item.spotlight_1_title || '',
        description: convertMarkdownToHtml(item.spotlight_1_description || ''),
        image: item.spotlight_1_image || '',
        ctaText: item.spotlight_1_cta_text || 'Learn More',
        ctaLink: item.spotlight_1_cta_link || '#',
      },
      {
        title: item.spotlight_2_title || '',
        description: convertMarkdownToHtml(item.spotlight_2_description || ''),
        image: item.spotlight_2_image || '',
        ctaText: item.spotlight_2_cta_text || 'Learn More',
        ctaLink: item.spotlight_2_cta_link || '#',
      },
      {
        title: item.spotlight_3_title || '',
        description: convertMarkdownToHtml(item.spotlight_3_description || ''),
        image: item.spotlight_3_image || '',
        ctaText: item.spotlight_3_cta_text || 'Learn More',
        ctaLink: item.spotlight_3_cta_link || '#',
      },
    ].filter(s => s.title), // Only include spotlights with titles
    upcomingEvent: {
      title: item.upcoming_event_title || '',
      description: convertMarkdownToHtml(item.upcoming_event_description || ''),
      image: {
        desktop: item.upcoming_event_image_desktop || '',
        mobile: item.upcoming_event_image_mobile || '',
      },
      ctaText: item.upcoming_event_cta_text || 'Learn More',
      ctaLink: item.upcoming_event_cta_link || '#',
    },
  }
}

// Transform API FeedItem to the format expected by the app components
export interface TransformedFeedItem {
  id: string
  date: string
  title: string
  type: 'video' | 'article' | 'podcast' | 'newsletter'
  summary: string
  authors: string[]
  topics: string[]
  link: string
  slug: string
  ogImage: string
  og_title?: string
  og_description?: string
  published_date: string
  newsletterContent?: NewsletterContent
}

export function transformFeedItem(item: FeedItem): TransformedFeedItem {
  return {
    id: item.id,
    date: new Date(item.published_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    title: item.title,
    type: item.type,
    summary: item.summary,
    authors: item.authors || [],
    topics: item.topics || [],
    link: `/thefeed/${item.slug}`,
    slug: item.slug,
    ogImage: item.og_image || '',
    og_title: item.og_title,
    og_description: item.og_description,
    published_date: item.published_date,
    newsletterContent: item.type === 'newsletter' ? transformToNewsletterContent(item) : undefined,
  }
}

// Build headers for API requests
function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  
  const apiKey = process.env.FEED_API_KEY
  if (apiKey) {
    headers['X-API-Key'] = apiKey
  }
  
  // Add origin header for CORS validation on the 434 Media side
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://digitalcanvas.community'
  headers['Origin'] = origin
  
  return headers
}

// Fetch all feed items from 434 Media API
export async function getFeedItems(): Promise<TransformedFeedItem[]> {
  try {
    // Request published items from THEFEED table
    const apiUrl = `${API_BASE_URL}?table=THEFEED`
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Fetching feed from:', apiUrl)
      console.log('API Key present:', !!process.env.FEED_API_KEY)
    }
    
    const response = await fetch(apiUrl, {
      cache: 'no-store', // Always fetch fresh data
      headers: getHeaders(),
    })
    
    if (!response.ok) {
      // Log more details about the error in development
      if (process.env.NODE_ENV === 'development') {
        const errorText = await response.text().catch(() => 'Could not read response body')
        console.error('API Response:', response.status, errorText)
      }
      throw new Error(`API error: ${response.status}`)
    }
    
    const result = await response.json()
    
    // Debug: Log the count of items received
    if (process.env.NODE_ENV === 'development') {
      console.log('Feed items received:', result.data?.length || 0, 'total:', result.total || result.count || 'unknown')
    }
    
    if (!result.success || !result.data) {
      return []
    }
    
    // Transform and sort by published_date descending (newest first)
    const items = result.data.map((item: FeedItem) => transformFeedItem(item))
    return items.sort((a: TransformedFeedItem, b: TransformedFeedItem) => {
      const dateA = new Date(a.published_date).getTime()
      const dateB = new Date(b.published_date).getTime()
      return dateB - dateA // Newest first
    })
  } catch (error) {
    console.error('Error fetching feed items:', error)
    return []
  }
}

// Fetch a single feed item by slug from 434 Media API
export async function getFeedItemBySlug(slug: string): Promise<TransformedFeedItem | null> {
  try {
    const apiUrl = `${API_BASE_URL}?table=THEFEED&slug=${encodeURIComponent(slug)}`
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Fetching feed item from:', apiUrl)
    }
    
    const response = await fetch(apiUrl, {
      cache: 'no-store', // Always fetch fresh data
      headers: getHeaders(),
    })
    
    if (!response.ok) {
      if (response.status === 404) return null
      // Log more details about the error in development
      if (process.env.NODE_ENV === 'development') {
        const errorText = await response.text().catch(() => 'Could not read response body')
        console.error('API Response:', response.status, errorText)
      }
      throw new Error(`API error: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (!result.success || !result.data) {
      return null
    }
    
    return transformFeedItem(result.data)
  } catch (error) {
    console.error('Error fetching feed item:', error)
    return null
  }
}

// Get all feed slugs for static generation (if needed)
export async function getAllFeedSlugs(): Promise<string[]> {
  try {
    const items = await getFeedItems()
    return items.map(item => item.slug).filter(Boolean)
  } catch (error) {
    console.error('Error fetching feed slugs:', error)
    return []
  }
}
