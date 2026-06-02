import type { MetadataRoute } from "next"

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    // Top-level program pages — highest priority
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/builders`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/underwriters`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo-days`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/workshops`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Event-specific workshop landing pages
    {
      url: `${baseUrl}/workshops/lead-with-ops`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },

    // Editorial + ecosystem pages
    {
      url: `${baseUrl}/thefeed`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/conferences`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // Sub-pages and historical content
    {
      url: `${baseUrl}/conferences/morehumanthanhuman`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/workshops/hoodkidgoodkid`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/events/mxratmain`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/events/vanitaleochristmas`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
