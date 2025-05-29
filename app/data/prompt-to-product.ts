export interface Speaker {
  name: string
  role: string
  company: string
  image: string
  bio: string
  expertise: string[]
}

export interface WeekProgram {
  week: number
  title: string
  subtitle: string
  description: string
  topics: string[]
  speakers: Speaker[]
  color: string
  icon: string
}

export const weeklyProgram: WeekProgram[] = [
  {
    week: 1,
    title: "Project Requirements Capture",
    subtitle: "What it Takes to Start",
    description:
      "Learn how to effectively capture, analyze, and document project requirements. Master the art of translating ideas into actionable specifications that drive successful outcomes.",
    topics: [
      "Stakeholder analysis and requirement gathering",
      "User story creation and acceptance criteria",
      "Technical specification documentation",
      "Risk assessment and mitigation planning",
    ],
    speakers: [
      {
        name: "Sarah Chen",
        role: "Product Strategy Director",
        company: "Microsoft",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Sarah has led product strategy for enterprise solutions at Microsoft for over 8 years, specializing in requirements engineering and stakeholder alignment.",
        expertise: ["Requirements Engineering", "Product Strategy", "Stakeholder Management"],
      },
      {
        name: "Marcus Rodriguez",
        role: "Senior Business Analyst",
        company: "Atlassian",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Marcus brings 10+ years of experience in business analysis and requirements capture, having worked with Fortune 500 companies to streamline their development processes.",
        expertise: ["Business Analysis", "Process Optimization", "Documentation"],
      },
    ],
    color: "from-blue-500 to-cyan-500",
    icon: "ri-file-list-3-line",
  },
  {
    week: 2,
    title: "Workflow & Connected Systems",
    subtitle: "Internal Systems Integration",
    description:
      "Discover how to design and implement efficient internal workflows. Learn to connect disparate systems and create seamless data flow within your organization.",
    topics: [
      "Internal system architecture design",
      "API integration strategies",
      "Data flow optimization",
      "Automation workflow creation",
    ],
    speakers: [
      {
        name: "Dr. Priya Patel",
        role: "Solutions Architect",
        company: "AWS",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Dr. Patel is a cloud solutions architect with expertise in designing scalable internal systems and microservices architectures for enterprise clients.",
        expertise: ["Cloud Architecture", "Microservices", "System Integration"],
      },
      {
        name: "James Thompson",
        role: "DevOps Engineer",
        company: "GitLab",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "James specializes in CI/CD pipeline optimization and internal tooling, helping teams achieve faster deployment cycles and better system reliability.",
        expertise: ["DevOps", "CI/CD", "Infrastructure Automation"],
      },
    ],
    color: "from-purple-500 to-pink-500",
    icon: "ri-git-merge-line",
  },
  {
    week: 3,
    title: "Workflow & Connected Systems",
    subtitle: "External System Integration",
    description:
      "Master the complexities of external system integration. Learn best practices for API management, third-party service integration, and maintaining system reliability.",
    topics: [
      "Third-party API integration",
      "Webhook implementation and management",
      "External service reliability patterns",
      "Security and authentication strategies",
    ],
    speakers: [
      {
        name: "Elena Vasquez",
        role: "Integration Specialist",
        company: "Zapier",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Elena leads integration architecture at Zapier, where she's responsible for connecting thousands of apps and services seamlessly.",
        expertise: ["API Integration", "Webhook Architecture", "Service Reliability"],
      },
      {
        name: "David Kim",
        role: "Platform Engineer",
        company: "Stripe",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "David builds and maintains the platform infrastructure that powers millions of API calls daily, focusing on reliability and developer experience.",
        expertise: ["Platform Engineering", "API Design", "Developer Experience"],
      },
    ],
    color: "from-green-500 to-teal-500",
    icon: "ri-links-line",
  },
  {
    week: 4,
    title: "UX/UI Design",
    subtitle: "User-Centered Design Excellence",
    description:
      "Create intuitive and engaging user experiences. Learn modern design principles, prototyping techniques, and how to validate your designs with real users.",
    topics: [
      "User research and persona development",
      "Information architecture and wireframing",
      "Visual design and design systems",
      "Usability testing and iteration",
    ],
    speakers: [
      {
        name: "Alex Morgan",
        role: "Senior UX Designer",
        company: "Airbnb",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Alex has designed user experiences for millions of Airbnb users, focusing on creating intuitive interfaces that drive engagement and conversion.",
        expertise: ["User Experience", "Design Systems", "User Research"],
      },
      {
        name: "Ryan Foster",
        role: "Product Designer",
        company: "Figma",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Ryan works on Figma's core design tools, helping millions of designers worldwide create better products through improved design workflows.",
        expertise: ["Product Design", "Design Tools", "Collaboration"],
      },
    ],
    color: "from-orange-500 to-red-500",
    icon: "ri-palette-line",
  },
  {
    week: 5,
    title: "AI Content Generation",
    subtitle: "Leveraging AI for Creative Output",
    description:
      "Harness the power of AI to accelerate content creation. Learn to integrate AI tools into your workflow for text, images, and multimedia content generation.",
    topics: [
      "AI prompt engineering and optimization",
      "Content generation workflows",
      "Quality control and human oversight",
      "Ethical AI usage and best practices",
    ],
    speakers: [
      {
        name: "Dr. Sophia Liu",
        role: "AI Research Scientist",
        company: "OpenAI",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Dr. Liu researches large language models and their applications in creative workflows, focusing on making AI tools more accessible to creators.",
        expertise: ["AI Research", "Language Models", "Creative AI"],
      },
      {
        name: "Carlos Mendez",
        role: "AI Product Manager",
        company: "Adobe",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Carlos leads AI product development at Adobe, working on integrating generative AI capabilities into creative software used by millions.",
        expertise: ["AI Product Development", "Creative Tools", "Generative AI"],
      },
    ],
    color: "from-violet-500 to-purple-500",
    icon: "ri-magic-line",
  },
  {
    week: 6,
    title: "Automated Distribution",
    subtitle: "Scaling Your Reach",
    description:
      "Learn to automate content distribution across multiple channels. Master the tools and strategies for reaching your audience efficiently and effectively.",
    topics: [
      "Multi-channel distribution strategies",
      "Marketing automation workflows",
      "Analytics and performance tracking",
      "Scaling and optimization techniques",
    ],
    speakers: [
      {
        name: "Maya Patel",
        role: "Growth Marketing Director",
        company: "HubSpot",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Maya leads growth marketing initiatives at HubSpot, specializing in automated marketing workflows that have driven millions in revenue.",
        expertise: ["Growth Marketing", "Marketing Automation", "Analytics"],
      },
      {
        name: "Jordan Lee",
        role: "Content Strategy Lead",
        company: "Buffer",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Jordan develops content distribution strategies for Buffer's global audience, focusing on automation and cross-platform optimization.",
        expertise: ["Content Strategy", "Social Media", "Distribution Automation"],
      },
    ],
    color: "from-emerald-500 to-green-500",
    icon: "ri-rocket-line",
  },
]

export const pricingPlans = [
  {
    id: "per-session",
    name: "Per Session",
    price: "$100",
    originalPrice: null,
    description: "Perfect for trying specific topics",
    features: [
      "Single session access",
      "Session recording",
      "Digital resources for that week",
      "Community access during session",
    ],
    popular: false,
    total: "Total varies by sessions attended",
    savings: null,
    gradient: "from-slate-500 to-gray-600",
    iconColor: "text-slate-400",
  },
  {
    id: "full-series",
    name: "Full Series",
    price: "$500",
    originalPrice: "$600",
    description: "Save $100 vs per-session",
    features: [
      "All 6 workshop sessions",
      "Complete session recordings",
      "All digital resources & templates",
      "Certificate of completion",
      "6 months community access",
      "Catered lunch each session",
    ],
    popular: true,
    total: "Save $100 vs per-session pricing",
    savings: "$100",
    gradient: "from-blue-500 to-purple-600",
    iconColor: "text-blue-400",
  },
  {
    id: "full-plus",
    name: "Full Series + Memberships",
    price: "$500",
    originalPrice: "$1000",
    description: "$500 in membership value included",
    features: [
      "Everything in Full Series",
      "1 year DevSA membership",
      "1 year TechBloc membership",
      "Exclusive member events access",
      "Priority support & mentorship",
      "Extended community access",
    ],
    popular: false,
    total: "Best value - $500 in membership benefits included",
    savings: "$500",
    badge: "BEST VALUE",
    gradient: "from-purple-500 to-pink-600",
    iconColor: "text-purple-400",
  },
]

export const faqs = [
  {
    question: "What experience level is required for this program?",
    answer:
      "This program is designed for all experience levels. Whether you're a beginner looking to learn the fundamentals or an experienced professional wanting to modernize your workflow, our curriculum adapts to your needs.",
  },
  {
    question: "Will sessions be recorded?",
    answer:
      "Yes, all sessions will be recorded and made available to enrolled participants. You'll have access to recordings for 6 months after the program ends.",
  },
  {
    question: "What if I miss a session?",
    answer:
      "We understand schedules can be challenging. Missed sessions can be made up through recordings, and our instructors offer office hours for additional support.",
  },
  {
    question: "Are there any prerequisites?",
    answer:
      "No specific prerequisites are required. Basic computer literacy and enthusiasm to learn are all you need. We'll provide all necessary tools and resources.",
  },
  {
    question: "What tools and software will we use?",
    answer:
      "We'll cover a variety of modern tools including Figma, various AI platforms, automation tools like Zapier, and development frameworks. Most tools offer free tiers or trial periods.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes, we offer a full refund if you're not satisfied after the first session. After that, we offer prorated refunds on a case-by-case basis.",
  },
]
