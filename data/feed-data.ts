export interface NewsletterSpotlight {
  title: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
}

export interface NewsletterContent {
  heroImage: string
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
  newsletterContent?: NewsletterContent
}

export const feedItems: FeedItem[] = [
  {
    id: "1",
    date: "2025.6.02",
    title: "The Road to RGVSW",
    type: "newsletter",
    summary:
      "You can't tell meaningful stories from a distance which is why our team headed to Brownsville for RGV Startup Week 2025.",
    authors: ["Digital Canvas Team"],
    topics: ["Community", "Innovation", "Creative"],
    link: "/thefeed/the-road-to-rgvsw",
    slug: "the-road-to-rgvsw",
    ogImage: "/images/feed/rgvsw-og.png",
    newsletterContent: {
      heroImage: "/rgv-startup-week-hero-image.jpg",
      foundersNote: {
        text: "This month, we packed our bags and headed south to Brownsville for RGV Startup Week 2025. What we found was a community bursting with energy, innovation, and the kind of authentic storytelling that can only happen when you show up in person. From late-night conversations with founders to witnessing the next generation of Texas entrepreneurs take the stage, this trip reminded us why we do what we do—to amplify the voices shaping the future of our state.",
        image: "/founders-at-rgv-startup-week.jpg",
      },
      lastMonthGif: "/rgv-startup-week-highlights-animated.jpg",
      spotlights: [
        {
          title: "The Valley's Rising Tech Scene",
          description:
            "Discover how the Rio Grande Valley is becoming a hotbed for tech innovation and entrepreneurship.",
          image: "/rgv-tech-scene.jpg",
          ctaText: "Read More",
          ctaLink: "#",
        },
        {
          title: "Founders Making Waves",
          description: "Meet the entrepreneurs who are putting RGV on the map with their groundbreaking startups.",
          image: "/rgv-founders.jpg",
          ctaText: "Learn More",
          ctaLink: "#",
        },
        {
          title: "Community First Approach",
          description: "How RGV Startup Week is building a sustainable ecosystem for long-term growth.",
          image: "/rgv-community.jpg",
          ctaText: "Explore",
          ctaLink: "#",
        },
      ],
      featuredPost: {
        title: "Behind the Scenes: Our Journey to Brownsville",
        image: "/road-trip-to-brownsville.jpg",
        content:
          "The drive from San Antonio to Brownsville is more than just miles on a highway—it's a journey through the heart of Texas entrepreneurship. Along the way, we stopped to meet founders, visit co-working spaces, and document the stories that don't always make it to the headlines. This is what we learned about building community, one conversation at a time.",
      },
      theDropGif: "/the-drop-animated-header.jpg",
      upcomingEvent: {
        title: "Digital Canvas Community Meetup",
        description:
          "Join us for our monthly community gathering where we connect, collaborate, and celebrate the creative entrepreneurs shaping Texas.",
        image: "/community-meetup-event.jpg",
        ctaText: "View Calendar",
        ctaLink: "/calendar",
      },
    },
  },
  {
    id: "2",
    date: "2025.11.03",
    title: "434 Crashes SASW 10th Year",
    type: "newsletter",
    summary:
      "If SASW 2025 proved anything, it's that San Antonio has incredible momentum right now and it's fueled by those bold enough to imagine what's next.",
    authors: ["Digital Canvas Team"],
    topics: ["Development", "Design", "Technology"],
    link: "/thefeed/434-crashes-sasw-10th-year",
    slug: "434-crashes-sasw-10th-year",
    ogImage: "/images/feed/434-crashes-sasw-10th-year-og.png",
    newsletterContent: {
      heroImage: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/goober.jpg",
      foundersNote: {
        text: "Ten years. That's how long San Antonio Startup Week has been bringing together the brightest minds in our city. This year, we didn't just attend—we crashed the party with 434 of our closest friends, collaborators, and dreamers. What unfolded was a week of pure creative chaos, meaningful connections, and a reminder that San Antonio's startup scene isn't just growing—it's thriving.",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/LTAISASW-2.jpg",
      },
      lastMonthGif: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/motion.gif",
      spotlights: [
        {
          title: "2026 AIM Health R&D Summit Announced!",
          description:
            "AIM 2026 returns with an expanded focus on creating an always-on environment that connects AIM programming to the broader innovation ecosystem through VelocityTX and community partnerships.",
          image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/aimannounced.png",
          ctaText: "Register Now!",
          ctaLink: "https://www.aimsatx.com/",
        },
        {
          title: "Curated Insights for the Bilingual Creative Community",
          description:
            "During SASW, we brought that strategy to life: participating in panels, meeting local founders, distributing flyers with QR codes to invite people to join our growing network, and hosting small meetups to foster face-to-face conversations that spark collaboration.",
          image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/vemosinsights.jpg",
          ctaText: "Subscribe Here",
          ctaLink: "https://www.vemosvamos.com/",
        },
        {
          title: "Sending Agents on Their Multi-step Mission",
          description: "San Antonio Startup Week may have wrapped up, but the energy of the event is still with us. This year, we took a new approach to empowering our tech community through a powerful partnership between Learn2AI, 434 MEDIA, and DEVSA.",
          image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/agents.png",
          ctaText: "Learn More",
          ctaLink: "https://www.434media.com/blog/a-new-chapter-for-san-antonios-tech-community",
        },
      ],
      featuredPost: {
        title: "434 MEDIA Crashes 10 Years of SASW",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/saswcrash.jpeg",
        content:
          "As the sun set over downtown from the top of 300 Main, our team joined hundreds of founders, creators, and dreamers at TechBloc’s networking mixer during San Antonio Startup Week 2025. The space was alive with conversation,  ideas traded hands as easily as handshakes, and the view mirrored the energy of a city on the rise. It was also a night of milestones, as Beto Altamirano took the mic for his first public address as TechBloc’s new CEO, sharing a message that resonated across the rooftop: “The next Rackspace, the next tech company to put San Antonio on the global map is already taking shape.” During San Antonio Startup Week, we teamed up with VelocityTX, Univision San Antonio, and Methodist Healthcare Ministries to lead conversations around innovation and inclusion reaching over 800,000 impressions across platforms. If SASW 2025 proved anything, it’s that San Antonio has incredible momentum right now and it’s fueled by those bold enough to imagine what’s next.",
      },
      theDropGif: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/drop.gif",
      upcomingEvent: {
        title: "",
        description:
          "Alamo Python, PyTexas Foundation and DEVSA are hosting a Python conference at Geekdom on Saturday, November 8",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/flyers-10-python+(1).png",
        ctaText: "Explore Events",
        ctaLink: "https://www.434media.com/events",
      },
    },
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
export const feedAuthors = ["Digital Canvas Team", "Dev Team", "Creative Team", "Podcast Team"] as const
