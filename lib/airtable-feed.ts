import Airtable from 'airtable'
import { marked } from 'marked'
import type { FeedItem, NewsletterContent, NewsletterSpotlight } from '@/data/feed-data'

// Initialize Airtable base for thefeeds (server-side only)
function getThefeedsBase() {
  if (typeof window !== 'undefined') {
    throw new Error('Airtable should only be used server-side')
  }
  
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.THEFEEDS_BASE_ID
  
  if (!apiKey || !baseId) {
    throw new Error('Missing Airtable configuration: AIRTABLE_API_KEY and THEFEEDS_BASE_ID are required')
  }

  return new Airtable({ apiKey }).base(baseId)
}

interface AirtableAttachment {
  id: string
  url: string
  filename: string
  size: number
  type: string
  thumbnails?: {
    small: { url: string; width: number; height: number }
    large: { url: string; width: number; height: number }
    full: { url: string; width: number; height: number }
  }
}

interface AirtableRecord {
  id: string
  fields: {
    // Primary fields
    published_date?: string
    title?: string
    type?: 'video' | 'article' | 'podcast' | 'newsletter'
    summary?: string
    authors?: string[]
    topics?: string[]
    slug?: string
    og_image?: AirtableAttachment[]
    status?: 'draft' | 'published' | 'archived'

    // Newsletter specific fields
    hero_image_desktop?: AirtableAttachment[]
    hero_image_mobile?: AirtableAttachment[]
    founders_note_text?: string
    founders_note_image?: AirtableAttachment[]
    last_month_gif?: AirtableAttachment[]
    the_drop_gif?: AirtableAttachment[]

    // Featured post
    featured_post_title?: string
    featured_post_image?: AirtableAttachment[]
    featured_post_content?: string

    // Upcoming event
    upcoming_event_title?: string
    upcoming_event_description?: string
    upcoming_event_image?: AirtableAttachment[]
    upcoming_event_cta_text?: string
    upcoming_event_cta_link?: string

    // Spotlights (inline fields)
    spotlight_1_title?: string
    spotlight_1_description?: string
    spotlight_1_image?: AirtableAttachment[]
    spotlight_1_cta_text?: string
    spotlight_1_cta_link?: string
    spotlight_2_title?: string
    spotlight_2_description?: string
    spotlight_2_image?: AirtableAttachment[]
    spotlight_2_cta_text?: string
    spotlight_2_cta_link?: string
    spotlight_3_title?: string
    spotlight_3_description?: string
    spotlight_3_image?: AirtableAttachment[]
    spotlight_3_cta_text?: string
    spotlight_3_cta_link?: string
  }
}

function getImageUrl(attachment?: AirtableAttachment[]): string {
  return attachment?.[0]?.url || '/placeholder.svg'
}

function convertMarkdownToHtml(markdown: string): string {
  if (!markdown) return ''
  
  // Configure marked for better HTML output
  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true,    // Enable GitHub Flavored Markdown
  })
  
  return marked(markdown) as string
}

function transformSpotlights(fields: AirtableRecord['fields']): NewsletterSpotlight[] {
  const spotlights: NewsletterSpotlight[] = []
  
  // Check each spotlight (1, 2, 3) and add if title exists
  for (let i = 1; i <= 3; i++) {
    const title = fields[`spotlight_${i}_title` as keyof typeof fields] as string
    if (title) {
      const description = (fields[`spotlight_${i}_description` as keyof typeof fields] as string) || ''
      
      spotlights.push({
        title,
        description: convertMarkdownToHtml(description),
        image: getImageUrl(fields[`spotlight_${i}_image` as keyof typeof fields] as AirtableAttachment[]),
        ctaText: (fields[`spotlight_${i}_cta_text` as keyof typeof fields] as string) || 'Learn More',
        ctaLink: (fields[`spotlight_${i}_cta_link` as keyof typeof fields] as string) || '#'
      })
    }
  }
  
  return spotlights
}

function transformAirtableRecord(record: AirtableRecord): FeedItem {
  const fields = record.fields
  
  // Create newsletter content if this is a newsletter type
  const newsletterContent: NewsletterContent | undefined = fields.type === 'newsletter' ? {
    heroImage: {
      desktop: getImageUrl(fields.hero_image_desktop),
      mobile: getImageUrl(fields.hero_image_mobile)
    },
    foundersNote: {
      text: convertMarkdownToHtml(fields.founders_note_text || ''),
      image: getImageUrl(fields.founders_note_image)
    },
    lastMonthGif: getImageUrl(fields.last_month_gif),
    spotlights: transformSpotlights(fields),
    featuredPost: {
      title: fields.featured_post_title || '',
      image: getImageUrl(fields.featured_post_image),
      content: convertMarkdownToHtml(fields.featured_post_content || '')
    },
    theDropGif: getImageUrl(fields.the_drop_gif),
    upcomingEvent: {
      title: fields.upcoming_event_title || '',
      description: fields.upcoming_event_description || '',
      image: getImageUrl(fields.upcoming_event_image),
      ctaText: fields.upcoming_event_cta_text || 'Learn More',
      ctaLink: fields.upcoming_event_cta_link || '#'
    }
  } : undefined

  return {
    id: record.id,
    date: fields.published_date || '',
    title: fields.title || '',
    type: fields.type || 'article',
    summary: fields.summary || '',
    authors: fields.authors || [],
    topics: fields.topics || [],
    link: `/thefeed/${fields.slug}`,
    slug: fields.slug || '',
    ogImage: getImageUrl(fields.og_image),
    newsletterContent
  }
}

export async function getFeedItems(): Promise<FeedItem[]> {
  try {
    const thefeedsBase = getThefeedsBase()
    const tableName = process.env.THEFEEDS_TABLE_NAME || 'thefeed'
    
    const records = await thefeedsBase(tableName)
      .select({
        filterByFormula: "{status} = 'published'",
        sort: [{ field: 'published_date', direction: 'desc' }]
      })
      .all()
    
    return records.map((record: any) => transformAirtableRecord(record as unknown as AirtableRecord))
  } catch (error) {
    console.error('Error fetching feed items from Airtable:', error)
    // Return empty array as fallback
    return []
  }
}

export async function getFeedItemBySlug(slug: string): Promise<FeedItem | null> {
  try {
    const thefeedsBase = getThefeedsBase()
    const tableName = process.env.THEFEEDS_TABLE_NAME || 'thefeed'
    
    const records = await thefeedsBase(tableName)
      .select({
        filterByFormula: `AND({slug} = '${slug}', {status} = 'published')`
      })
      .all()
    
    return records.length > 0 ? transformAirtableRecord(records[0] as unknown as AirtableRecord) : null
  } catch (error) {
    console.error('Error fetching feed item by slug from Airtable:', error)
    return null
  }
}

export async function getAllFeedSlugs(): Promise<string[]> {
  try {
    const thefeedsBase = getThefeedsBase()
    const tableName = process.env.THEFEEDS_TABLE_NAME || 'thefeed'
    
    const records = await thefeedsBase(tableName)
      .select({
        filterByFormula: "{status} = 'published'",
        fields: ['slug']
      })
      .all()
    
    return records
      .map((record: any) => record.fields.slug)
      .filter((slug: any): slug is string => Boolean(slug))
  } catch (error) {
    console.error('Error fetching feed slugs from Airtable:', error)
    return []
  }
}