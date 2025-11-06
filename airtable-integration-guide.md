# Airtable Integration Guide: The Feed Newsletter Template

## Overview
This guide outlines how to integrate the newsletter template system from the current Next.js application into Airtable for content management. The goal is to replace the static `feed-data.ts` file with dynamic content pulled from the Airtable base `thefeeds` with table `thefeed`.

## Current Newsletter Data Structure Analysis

### Main Feed Item Structure
The current `FeedItem` interface contains the following required fields for newsletter content:

```typescript
interface FeedItem {
  id: string
  date: string
  title: string
  type: "video" | "article" | "podcast" | "newsletter"
  summary: string
  authors: string[]
  topics: string[]
  link: string
  slug: string
  ogImage: string
  newsletterContent?: NewsletterContent // This is key for newsletters
}
```

### Newsletter Content Structure
The `NewsletterContent` interface defines the template sections:

```typescript
interface NewsletterContent {
  heroImage: {
    desktop: string
    mobile: string
  }
  foundersNote: {
    text: string
    image: string
  }
  lastMonthGif: string
  spotlights: NewsletterSpotlight[]
  featuredPost: {
    title: string
    image: string
    content: string
  }
  theDropGif: string
  upcomingEvent: {
    title: string
    description: string
    image: string
    ctaText: string
    ctaLink: string
  }
}
```

### Newsletter Spotlight Structure
Each spotlight section contains:
```typescript
interface NewsletterSpotlight {
  title: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
}
```

## Recommended Airtable Schema for thefeed Table

### Primary Fields (Main Feed Item)
| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| `id` | Single line text | Unique identifier | Yes |
| `published_date` | Date | Publication date | Yes |
| `title` | Single line text | Newsletter title | Yes |
| `type` | Single select | Options: video, article, podcast, newsletter | Yes |
| `summary` | Long text | Brief description | Yes |
| `authors` | Multiple select | Content authors | Yes |
| `topics` | Multiple select | Content categories | Yes |
| `slug` | Single line text | URL slug | Yes |
| `og_image` | Attachment | Social sharing image | Yes |
| `status` | Single select | Options: draft, published, archived | Yes |

### Newsletter Specific Fields

#### Hero Section
| Field Name | Type | Description |
|------------|------|-------------|
| `hero_image_desktop` | Attachment | Desktop hero image (16:9 ratio) |
| `hero_image_mobile` | Attachment | Mobile hero image (4:5 ratio) |

#### Founder's Note Section
| Field Name | Type | Description |
|------------|------|-------------|
| `founders_note_text` | Long text (Rich text) | HTML content for founder's message |
| `founders_note_image` | Attachment | Portrait image for founder's section |

#### Motion/GIF Sections
| Field Name | Type | Description |
|------------|------|-------------|
| `last_month_gif` | Attachment | "Last Month in Motion" GIF/video |
| `the_drop_gif` | Attachment | "The Drop" section GIF/video |

#### Featured Post Section
| Field Name | Type | Description |
|------------|------|-------------|
| `featured_post_title` | Single line text | Featured article title |
| `featured_post_image` | Attachment | Featured post hero image (2:1 ratio) |
| `featured_post_content` | Long text (Rich text) | HTML content for featured post |

#### Upcoming Event Section
| Field Name | Type | Description |
|------------|------|-------------|
| `upcoming_event_title` | Single line text | Event title |
| `upcoming_event_description` | Long text | Event description |
| `upcoming_event_image` | Attachment | Event promotional image (4:5 ratio) |
| `upcoming_event_cta_text` | Single line text | Call-to-action button text |
| `upcoming_event_cta_link` | URL | Link destination |

## Newsletter Spotlights - Inline Approach (Recommended)

**Given that your Airtable base `thefeeds` has multiple brand tables (`8count`, `434blog`, `culturedeck`, `thefeed`), using separate spotlight tables would create management complexity. Instead, we recommend storing spotlights as structured data within the main table.**

### Spotlight Fields in thefeed Table
Add these fields directly to your `thefeed` table:

| Field Name | Type | Description |
|------------|------|-------------|
| `spotlight_1_title` | Single line text | First spotlight title |
| `spotlight_1_description` | Long text (Rich text) | First spotlight HTML content |
| `spotlight_1_image` | Attachment | First spotlight image (4:5 ratio) |
| `spotlight_1_cta_text` | Single line text | First spotlight button text |
| `spotlight_1_cta_link` | URL | First spotlight link |
| `spotlight_2_title` | Single line text | Second spotlight title |
| `spotlight_2_description` | Long text (Rich text) | Second spotlight HTML content |
| `spotlight_2_image` | Attachment | Second spotlight image (4:5 ratio) |
| `spotlight_2_cta_text` | Single line text | Second spotlight button text |
| `spotlight_2_cta_link` | URL | Second spotlight link |
| `spotlight_3_title` | Single line text | Third spotlight title |
| `spotlight_3_description` | Long text (Rich text) | Third spotlight HTML content |
| `spotlight_3_image` | Attachment | Third spotlight image (4:5 ratio) |
| `spotlight_3_cta_text` | Single line text | Third spotlight button text |
| `spotlight_3_cta_link` | URL | Third spotlight link |

### Why This Approach is Better for Multi-Brand Setup

1. **Simplified Management**: Project managers only deal with one table per brand
2. **Clear Ownership**: Each brand's content stays within its own table
3. **Reduced Complexity**: No need to manage relationships across tables
4. **Consistent Pattern**: Same structure can be replicated for `8count`, `434blog`, `culturedeck`
5. **Easier Permissions**: Brand-specific access controls are simpler

## API Integration Strategy

### 1. Airtable API Configuration
Set up environment variables:
```env
# Existing newsletter integration
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_existing_base_id

# New thefeeds base integration
THEFEEDS_BASE_ID=your_thefeeds_base_id
THEFEEDS_TABLE_NAME=thefeed
# No separate spotlights table needed
```

### 2. Data Fetching Functions
Create utility functions to fetch and transform Airtable data:

```typescript
// lib/airtable.ts
import Airtable from 'airtable'

const thefeedsBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.THEFEEDS_BASE_ID!)

export async function getFeedItems(): Promise<FeedItem[]> {
  // Fetch from thefeeds base, thefeed table
  const records = await thefeedsBase(process.env.THEFEEDS_TABLE_NAME!)
    .select({
      filterByFormula: "AND({status} = 'published', {type} = 'newsletter')"
    })
    .all()
  
  return records.map(transformAirtableRecord)
}

export async function getFeedItemBySlug(slug: string): Promise<FeedItem | null> {
  // Fetch specific newsletter by slug from thefeeds base
  const records = await thefeedsBase(process.env.THEFEEDS_TABLE_NAME!)
    .select({
      filterByFormula: `AND({slug} = '${slug}', {status} = 'published')`
    })
    .all()
    
  return records.length > 0 ? transformAirtableRecord(records[0]) : null
}

function transformAirtableRecord(record: any): FeedItem {
  const fields = record.fields
  
  return {
    id: record.id,
    date: fields.published_date,
    title: fields.title,
    type: fields.type,
    summary: fields.summary,
    authors: fields.authors || [],
    topics: fields.topics || [],
    link: `/thefeed/${fields.slug}`,
    slug: fields.slug,
    ogImage: getImageUrl(fields.og_image),
    newsletterContent: fields.type === 'newsletter' ? {
      heroImage: {
        desktop: getImageUrl(fields.hero_image_desktop),
        mobile: getImageUrl(fields.hero_image_mobile)
      },
      foundersNote: {
        text: fields.founders_note_text || '',
        image: getImageUrl(fields.founders_note_image)
      },
      lastMonthGif: getImageUrl(fields.last_month_gif),
      spotlights: transformSpotlights(fields),
      featuredPost: {
        title: fields.featured_post_title || '',
        image: getImageUrl(fields.featured_post_image),
        content: fields.featured_post_content || ''
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
  }
}

function transformSpotlights(fields: any): NewsletterSpotlight[] {
  const spotlights: NewsletterSpotlight[] = []
  
  // Check each spotlight (1, 2, 3) and add if title exists
  for (let i = 1; i <= 3; i++) {
    const title = fields[`spotlight_${i}_title`]
    if (title) {
      spotlights.push({
        title,
        description: fields[`spotlight_${i}_description`] || '',
        image: getImageUrl(fields[`spotlight_${i}_image`]),
        ctaText: fields[`spotlight_${i}_cta_text`] || 'Learn More',
        ctaLink: fields[`spotlight_${i}_cta_link`] || '#'
      })
    }
  }
  
  return spotlights
}
```

### 3. Newsletter Template Updates
The `NewsletterTemplate` component should remain largely unchanged, but data will come from Airtable instead of static files.

### 4. Image URL Transformation
Airtable attachment fields return arrays with URL and metadata. Transform these:

```typescript
function getImageUrl(attachment: AirtableAttachment[]): string {
  return attachment?.[0]?.url || '/placeholder.svg'
}
```

## Content Management Workflow

### 1. Creating a Newsletter
1. Create new record in `thefeed` table within the `thefeeds` base
2. Set type to "newsletter"
3. Fill in all required fields
4. Upload images to appropriate attachment fields
5. Fill in spotlight sections (1, 2, 3 as needed) - not all spotlights are required
6. Set status to "published" when ready

### 2. Rich Text Content
Use Airtable's rich text fields for:
- `founders_note_text`
- `featured_post_content`
- Spotlight `description` fields

These should support HTML formatting for proper rendering in the template.

### 3. Image Guidelines
Maintain consistent aspect ratios:
- Hero Desktop: 16:9 ratio
- Hero Mobile: 4:5 ratio
- Founder's Image: 4:5 ratio
- Featured Post: 2:1 ratio
- Spotlight Images: 4:5 ratio
- Event Image: 4:5 ratio

## Implementation Steps

### Phase 1: Schema Setup
1. Update existing `thefeed` table in the `thefeeds` base with newsletter-specific fields (including inline spotlight fields)
2. Migrate existing newsletter data to Airtable
3. Replicate schema for other brand tables (`8count`, `434blog`, `culturedeck`) within the same `thefeeds` base if they need newsletters

### Phase 2: API Integration
1. Install Airtable SDK: `npm install airtable`
2. Add new environment variables for `thefeeds` base
3. Create utility functions for data fetching from `thefeeds` base
4. Update data types to match Airtable response format

### Phase 3: Component Updates
1. Modify feed list to use Airtable data
2. Update slug page to fetch from Airtable
3. Ensure proper error handling for missing data

### Phase 4: Static Generation
1. Implement ISR (Incremental Static Regeneration) for performance
2. Set up webhook from Airtable to trigger rebuilds
3. Add caching layer for frequently accessed data

## Benefits of This Approach

1. **Content Management**: Non-technical users can create and edit newsletters
2. **Consistency**: Standardized template structure ensures brand consistency
3. **Scalability**: Easy to add new newsletters without code changes
4. **Flexibility**: Rich text fields allow for formatted content
5. **Asset Management**: Centralized image storage and optimization
6. **Workflow**: Draft/published status enables editorial workflow

## Considerations

1. **Performance**: Implement caching to avoid API rate limits
2. **Fallbacks**: Ensure graceful degradation if Airtable is unavailable
3. **Validation**: Add data validation to ensure required fields are present
4. **SEO**: Maintain proper metadata generation from Airtable data
5. **Images**: Consider implementing automatic image optimization

This integration will transform the static newsletter system into a dynamic, manageable content platform while preserving the existing design and user experience.