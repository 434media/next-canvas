export interface NewsletterSpotlight {
  title: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
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
      heroImage: {
        desktop: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/junehero.jpg",
        mobile: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/june-mobile.png",
      },
      foundersNote: {
        text: "Whether it’s SDOH work in the Valley, closing the digital gap with TechBloc, supporting ecosystem builders at Emerge and Rise, or sharing a message with a connected community — it all comes back to one thing: access. Access to health, tech, capital, or simply a seat at the table. The stories we tell are about real people building real things. Actions Speak Louder!",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/june-founder.png",
      },
      lastMonthGif: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/motion.gif",
      spotlights: [
        {
          title: "Emerge and Rise Open House ",
          description:
            "Vemos Vamos & DevSA link up with Lina Rugova and Christine Colburn for a closer look at the vision behind Emerge and Rise.",
          image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/emergeopenhouse.jpeg",
          ctaText: "Learn More",
          ctaLink: "https://emergeandrise.org/",
        },
        {
          title: "Cine Las Americas",
          description: "Our very own Miguel Cedillo struck a chord at this years Cine Las Americas International Film Festival.",
          image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/cinemiguel.jpeg",
          ctaText: "Learn More",
          ctaLink: "https://cinelasamericas.org/",
        },
        {
          title: "Closing the Digital Gap",
          description: "What happens when 110 families suddenly get access to tech they never had? TechBloc, Human-I-T, and SA Hope Center teamed up to find out. See how access to technology is still reshaping health and economic equity.",
          image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/closinggap.jpg",
          ctaText: "Learn More",
          ctaLink: "https://www.sanantoniotechday.com/",
        },
      ],
      featuredPost: {
        title: "The Road to RGVSW: Proximity Matters",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/junefeatured.jpeg",
        content:
          "You can’t tell meaningful stories from a distance which is why our team headed to Brownsville for RGV Startup Week 2025. This wasn’t a one-off trip. We’ve been building relationships in the Rio Grande Valley for months. <br/><br/> At 434 Media, we believe storytelling is a team sport. It takes care, consistency, and cultural awareness to bring someone else’s vision to life, especially when those stories are shaping the future of public health, economic opportunity, and innovation. <br/><br/><strong>Que es SDOH? Glad you asked!</strong>",
      },
      theDropGif: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/drop.gif",
      upcomingEvent: {
        title: "AIM 2025 Health R&D Summit",
        description:
          "Never miss a meetup. Explore our new community events page. Events are added weekly so check back often!",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aim-group.jpg",
        ctaText: "Explore Events",
        ctaLink: "https://www.434media.com/events",
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
      heroImage: {
        desktop: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/November+Cover_Desktop.jpg",
        mobile: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/November+Cover.jpg",
      },
      foundersNote: {
        text: "Ten years. That's how long San Antonio Startup Week has been bringing together the brightest minds in our city. This year, we didn't just attend, we crashed the party with 434 of our closest friends, collaborators, and dreamers. What unfolded was a week of pure creative chaos, meaningful connections, and a reminder that San Antonio's startup scene isn't just growing, it's thriving.",
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
          description:
            "San Antonio Startup Week may have wrapped up, but the energy of the event is still with us. This year, we took a new approach to empowering our tech community through a powerful partnership between Learn2AI, 434 MEDIA, and DEVSA.",
          image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/agents.png",
          ctaText: "Learn More",
          ctaLink: "https://www.434media.com/blog/a-new-chapter-for-san-antonios-tech-community",
        },
      ],
      featuredPost: {
        title: "434 MEDIA Crashes 10 Years of SASW",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/saswcrash.jpeg",
        content:
          "As the sun set over downtown from the top of 300 Main, our team joined hundreds of founders, creators, and dreamers at TechBloc’s networking mixer during <strong>San Antonio Startup Week 2025</strong>. The space was alive with conversation, ideas traded hands as easily as handshakes, and the view mirrored the energy of a city on the rise. <br/> <br/> It was also a night of milestones, as Beto Altamirano took the mic for his first public address as TechBloc’s new CEO, sharing a message that resonated across the rooftop: <br/> <br/> “The next Rackspace, the next tech company to put San Antonio on the global map is already taking shape.” <br/> <br/> During San Antonio Startup Week, we teamed up with <strong>VelocityTX, Univision San Antonio, and Methodist Healthcare Ministries</strong> to lead conversations around innovation and inclusion reaching over 800,000 impressions across platforms. <br/> <br/> If SASW 2025 proved anything, it’s that San Antonio has incredible momentum right now and it’s fueled by those bold enough to imagine what’s next.",
      },
      theDropGif: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/drop.gif",
      upcomingEvent: {
        title: "PyTexas is Coming to San Antonio!",
        description:
          "The PyTexas Foundation, Alamo Python, and DEVSA are hosting a Python conference at Geekdom on Saturday, November 8",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/flyers-27-devsa+(6).png",
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
