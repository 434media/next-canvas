export interface FeedItem {
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
}

export const feedItems: FeedItem[] = [
  {
    id: "1",
    date: "2025.1.15",
    title: "The Future of Digital Canvas: Building Creative Communities",
    type: "newsletter",
    summary:
      "Exploring how Digital Canvas is revolutionizing the way creative professionals connect, collaborate, and build meaningful relationships in the digital age.",
    authors: ["Digital Canvas Team"],
    topics: ["Community", "Innovation", "Creative"],
    link: "/thefeed/future-of-digital-canvas",
    slug: "future-of-digital-canvas",
    ogImage: "/images/feed/future-og.png",
  },
  {
    id: "2",
    date: "2025.1.10",
    title: "Behind the Scenes: How We Built Our Network",
    type: "article",
    summary:
      "A deep dive into the technical and creative decisions that shaped the Digital Canvas platform, from concept to launch.",
    authors: ["Engineering Team"],
    topics: ["Development", "Design", "Technology"],
    link: "/thefeed/behind-the-scenes",
    slug: "behind-the-scenes",
    ogImage: "/images/feed/behind-scenes-og.png",
  },
  {
    id: "3",
    date: "2025.1.5",
    title: "Creative Collaboration in 2025",
    type: "video",
    summary:
      "Watch our latest video exploring the trends and tools shaping creative collaboration in the modern workplace.",
    authors: ["Creative Team"],
    topics: ["Collaboration", "Trends", "Video"],
    link: "/thefeed/creative-collaboration-2025",
    slug: "creative-collaboration-2025",
    ogImage: "/images/feed/collaboration-og.png",
  },
  {
    id: "4",
    date: "2024.12.20",
    title: "Year in Review: Digital Canvas 2024",
    type: "newsletter",
    summary:
      "Reflecting on a year of growth, innovation, and community building. See what we accomplished together in 2024.",
    authors: ["Digital Canvas Team"],
    topics: ["Review", "Community", "Milestones"],
    link: "/thefeed/year-in-review-2024",
    slug: "year-in-review-2024",
    ogImage: "/images/feed/year-review-og.png",
  },
  {
    id: "5",
    date: "2024.12.15",
    title: "Podcast: Conversations with Creators",
    type: "podcast",
    summary:
      "Join us for intimate conversations with leading creators about their process, challenges, and what inspires them.",
    authors: ["Podcast Team"],
    topics: ["Podcast", "Creators", "Interviews"],
    link: "/thefeed/conversations-with-creators",
    slug: "conversations-with-creators",
    ogImage: "/images/feed/podcast-og.png",
  },
]

export const feedTypes = ["video", "article", "podcast", "newsletter"] as const
export const feedTopics = [
  "Community",
  "Innovation",
  "Creative",
  "Development",
  "Design",
  "Technology",
  "Collaboration",
  "Trends",
  "Review",
  "Milestones",
  "Podcast",
  "Creators",
  "Interviews",
] as const
export const feedAuthors = ["Digital Canvas Team", "Engineering Team", "Creative Team", "Podcast Team"] as const
