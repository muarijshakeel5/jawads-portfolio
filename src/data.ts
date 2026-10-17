// ============================================================
// data.ts — Single source of truth for all portfolio content
// Edit here; the site auto-reflects your changes.
// ============================================================

import { SITE_URL } from "./config";

// ============================================================
// Single source of truth constants
// ============================================================
export const GPA = "3.49";
export const UPWORK_URL = "https://www.upwork.com/freelancers/~011a5ff370c01f799b?mp_source=share";
export const CV_URL = "/resume.pdf";
export const CV_FILENAME = "Muhammad_Jawad_Fareed_Resume.pdf";

export const personal = {
  name: "Muhammad Jawad Fareed",
  shortName: "MJF",
  tagline: "Full Stack AI Engineer · Founder of AIVIS",
  location: "Lahore, PK",
  timezone: "Asia/Karachi",
  email: "jawadfarid383@gmail.com",
  phone: "", // intentionally hidden from UI
  github: "https://github.com/jawadfareed",
  linkedin: "https://linkedin.com/in/muhammadjawadfareed",
  upwork: UPWORK_URL,
  cvLink: CV_URL,
  linkedinFollowers: 15000,
  gpa: GPA,
  openToWork: true,
};

export const rotatingLines = [
  "I build AI-powered products.",
  "I build mobile apps.",
  "I build full-stack platforms.",
  "I founded AIVIS.",
];

export const pitch =
  "Full Stack AI Engineer and founder of AIVIS. I turn ideas into scalable AI, mobile and web products with React, React Native, Django and Rails.";

export const about = {
  pullQuote:
    "I learn fast, own what I ship, and build AI products that solve real problems.",
  paragraphs: [
    "I'm a BS Computer Science (Honors) graduate from the University of Central Punjab who builds AI-powered products end to end: React and React Native on the front, Django, Rails and FastAPI behind them, and LLMs (OpenAI, Gemini, multimodal systems) in the middle.",
    "I've shipped Electron desktop apps, native mobile apps and full web platforms, and I'm the founder of AIVIS, an AI hiring platform. Currently exploring cloud engineering, big data, ML and ethical data automation.",
  ],
  counters: [
    { value: 3, suffix: "+", label: "Production platforms shipped" },
    { value: 8, suffix: "+", label: "Projects delivered" },
    { value: 15, suffix: "K+", label: "LinkedIn followers" },
    { value: parseFloat(GPA), suffix: "", label: "University GPA", decimal: 2 },
    { value: 5, suffix: "", label: "Certifications" },
  ],
};

export const techMarquee = [
  "React Native",
  "Expo",
  "React.js",
  "TypeScript",
  "Next.js",
  "Django",
  "Ruby on Rails",
  "FastAPI",
  "PostgreSQL",
  "Electron",
  "Kotlin",
  "OpenAI API",
  "Gemini API",
  "Tailwind CSS",
  "Docker",
  "Stripe",
];

export const ivoo = {
  title: "AIVIS",
  subtitle: "Artificial Intelligence Video Interview System",
  tagline: "Fair, fast, transparent hiring — powered by AI.",
  founded: "May 2023",
  linkedinLink: "https://linkedin.com/in/muhammadjawadfareed",
  highlights: [
    "Semantic CV parsing (not keyword counting)",
    "Real-time match % with missing-requirement telemetry",
    "Autonomous pre-screening pipelines",
    "AI avatar interviewer with voice synthesis & STT",
    "Facial emotion detection & voice sentiment analysis",
    "LLM-generated role-specific questions",
    "Role-based dashboards: Admin · HR · Candidate",
    "Glassmorphic UI with dark & light modes",
  ],
  stats: [
    { value: "40%", label: "Less hiring bias", footnote: "internal testing" },
    { value: "30%", label: "Less HR screening workload", footnote: "internal testing" },
  ],
  stack: ["React", "TypeScript", "Django REST", "Python", "LLM APIs", "Recharts"],
};

export const timeline = [
  {
    id: "upwork",
    role: "Freelance Full Stack Developer",
    company: "Upwork",
    period: "Sep 2026 – Present",
    location: "Remote",
    type: "freelance",
    description:
      "Web design, web development and custom software for clients across diverse industries.",
    tags: ["React", "TypeScript", "Django", "PostgreSQL"],
  },
  {
    id: "fruitful",
    role: "Software Engineer (Frontend-led)",
    company: "Fruitful",
    period: "Nov 2025 – Apr 2026",
    location: "Remote",
    type: "fulltime",
    description:
      "Engineered an enterprise onboarding SaaS platform enabling companies to build structured, branded onboarding journeys for new talent. Led frontend architecture with React.js, Redux, Material-UI, multi-language internationalization (i18n), and robust CI/CD pipelines.",
    tags: ["React.js", "Redux.js", "Material-UI", "i18n"],
  },
  {
    id: "arkhitech",
    role: "Software Engineer (Full Stack & Mobile)",
    company: "Arkhitech",
    period: "Aug 2025 – Present",
    location: "Lahore, PK",
    type: "fulltime",
    badge: "Permanent since Oct 2025",
    bullets: [
      "Shipped Caller ID and PayLater Electron desktop apps for the Foodnerd and Howmuch POS systems.",
      "Built AI chat features in React Native + Expo for the Foodnerd and HowMuch mobile apps.",
      "Delivered fixes and UI upgrades across OrderTaker and Customer apps; redesigned Foodnerd.pk in React.js.",
      "Since Apr 2026: building 'AI Wine Inventory & Pairing Platform', rebuilt Rider Delivery App, new Caller ID React Native app.",
      "Full-stack: React.js + Ruby on Rails, REST API design, Agile sprints, code reviews, RSpec, CI/CD.",
    ],
    news: "Foodnerd POS × aik by BankIslami: aikpay dynamic QR across the POS ecosystem",
    tags: ["React Native", "Expo", "Electron", "React.js", "Ruby on Rails", "OpenAI", "TypeScript"],
  },
  {
    id: "ivoo-founder",
    role: "Founder",
    company: "AIVIS",
    period: "May 2023 – Present",
    location: "Lahore, PK",
    type: "founder",
    description:
      "Building an Artificial Intelligence Video Interview System. See Chapter 02 for the full product story.",
    tags: ["React", "Django", "LLMs", "OpenAI", "Gemini"],
    badge: "See CH. 02",
  },
  {
    id: "loftex",
    role: "ERP & MIS Intern",
    company: "Loftex Limited",
    period: "Aug 2024 – Nov 2024",
    location: "Lahore, PK",
    type: "intern",
    description:
      "Enhanced ERP modules, built and debugged SAP ABAP programs, supported ERP integration and data flow across manufacturing systems.",
    tags: ["SAP ABAP", "ERP", "MIS"],
  },
  {
    id: "codesoft",
    role: "C++ Developer",
    company: "CodeSoft",
    period: "Aug 2023 – Oct 2023",
    location: "Remote · Lahore, PK",
    type: "intern",
    description:
      "Developed foundational C++ applications and algorithms as part of an early-career engineering internship.",
    tags: ["C++", "OOP", "DSA"],
  },
  {
    id: "fly-with-ibm",
    role: "Director of Finance",
    company: "Fly With IBM",
    period: "Aug 2022 – Oct 2023",
    location: "On-site · Lahore, PK",
    type: "contract",
    badge: "Contract",
  },
];

export const projects = [
  {
    id: "fruitful",
    title: "Fruitful",
    category: ["Web"],
    size: "featured",
    role: "Software Engineer (Frontend-led)",
    period: "Nov 2025 – Apr 2026",
    short: "Onboarding SaaS that lets companies build structured, branded onboarding journeys for new talent.",
    overview:
      "Fruitful is a comprehensive SaaS application designed to streamline and manage the onboarding process for new talent. It allows organizations to create structured, engaging and customizable onboarding \"journeys\" for their employees.",
    problem:
      "Traditional onboarding is often fragmented, unorganized and not tailored to the individual, leading to poor early employee experiences. Fruitful provides a centralized platform where companies can standardize onboarding, customize it to their brand and scale it globally without losing the personal touch.",
    highlights: [
      {
        title: "Global scale",
        desc: "Architected to operate across multiple countries with built-in internationalization (i18next), supporting over 10 languages.",
      },
      {
        title: "Customizable UI/UX",
        desc: "A multi-tenant theming engine built with Material-UI and JSS gives each customer a fully branded experience.",
      },
      {
        title: "Robust architecture",
        desc: "React and Redux with a scalable, modular folder structure, code splitting and a custom middleware pattern for state management.",
      },
      {
        title: "Quality assurance",
        desc: "Jest/Enzyme unit testing and Storybook visual testing, integrated with a continuous deployment pipeline via CircleCI.",
      },
    ],
    skills: [
      "React.js",
      "JavaScript",
      "Material-UI",
      "User Interface Design",
      "Redux.js",
      "Software as a Service (SaaS)",
      "Internationalization (i18n)",
      "State Management",
      "Jest",
      "Test-Driven Development",
      "CircleCI",
      "CI/CD",
    ],
    stack: [
      "React.js",
      "JavaScript",
      "Material-UI",
      "User Interface Design",
      "Redux.js",
      "Software as a Service (SaaS)",
      "Internationalization (i18n)",
      "State Management",
      "Jest",
      "Test-Driven Development",
      "CircleCI",
      "CI/CD",
    ],
    color: "from-white/[0.04] to-transparent",
    image: "/projects/fruitful.jpg",
    drawerImage: "/projects/fruitful.png",
    live: "",
    github: "",
    outcome: "",
  },
  {
    id: "ivoo-project",
    title: "AIVIS",
    category: ["AI", "Web"],
    size: "large",
    short: "Artificial Intelligence Video Interview System. See CH. 02.",
    problem: "Traditional hiring is biased, slow and opaque.",
    built:
      "Full AI hiring platform with semantic CV parsing, video interviews with AI avatar, real-time match scoring, facial emotion detection and role-based dashboards.",
    stack: ["React", "TypeScript", "Django REST", "Python", "LLM APIs", "Recharts"],
    outcome: "40% less hiring bias · 30% less HR screening workload (internal testing).",
    color: "from-white/[0.04] to-transparent",
    isIvoo: true,
    image: "/projects/aivis-card.webp",
    drawerImage: "/projects/aivis-drawer.webp",
    live: "",
    github: "",
  },
  {
    id: "foodnerd-ecosystem",
    title: "Foodnerd & HowMuch Ecosystem",
    category: ["Mobile", "Desktop", "Web"],
    size: "large",
    short: "Electron POS, React Native apps with AI chat, OrderTaker, Customer & Rider apps.",
    problem:
      "A restaurant-tech company needed a cohesive multi-platform ecosystem covering POS, customer apps, rider logistics and AI-powered chat.",
    built:
      "Shipped Caller ID and PayLater Electron desktop apps; built AI chat in React Native for Foodnerd and HowMuch; delivered OrderTaker and Customer app upgrades; fully redesigned the Foodnerd.pk web app in React.js.",
    stack: ["Electron", "React Native", "Expo", "React.js", "Ruby on Rails", "OpenAI", "TypeScript"],
    outcome:
      "Featured in news: Foodnerd POS × aik by BankIslami — aikpay dynamic QR across the POS ecosystem.",
    color: "from-white/[0.04] to-transparent",
    image: "/projects/foodnerd-ecosystem-card.webp",
    drawerImage: "/projects/foodnerd-ecosystem-drawer.webp",
    live: "",
    github: "",
  },
  {
    id: "ghost-sdr",
    title: "Ghost SDR",
    category: ["AI", "Automation", "Sales"],
    drawerTags: ["Python", "Node.js", "Playwright", "n8n", "Supabase"],
    size: "small",
    short: "Automated B2B lead discovery & outbound sales enrichment engine.",
    problem:
      "Manual B2B outbound prospecting and lead qualification are slow, prone to data decay, and lack deep technical stack insights before cold outreach.",
    built:
      "Engineered an asynchronous Python and Node.js backend utilizing Playwright for automated web scraping and directory extraction. Integrated multi-tiered verification waterfalls and automated tech-stack detection to streamline lead routing for outbound campaigns.",
    stack: ["Python", "Node.js", "Playwright", "n8n", "Supabase", "REST APIs"],
    outcome:
      "Significantly reduced lead research time and optimized outbound conversion metrics through automated multi-source data enrichment.",
    color: "from-white/[0.04] to-transparent",
    image: "/projects/ghost-sdr-card.webp",
    drawerImage: "/projects/ghost-sdr-drawer.webp",
    live: "https://ghostsdr.ai",
    github: "",
  },
  {
    id: "moons-burger",
    title: "Moon's Burger",
    category: ["Web", "Mobile", "AI"],
    size: "small",
    short: "Full-stack food ordering platform: Next.js 14 web + React Native app with Maps.",
    problem:
      "A premium burger brand needed a modern ordering experience across web and mobile, with real-time tracking and payment processing.",
    built:
      "Next.js 14 web app + React Native (Expo) mobile app with Maps integration; FastAPI backend, Stripe payments, Redis + Celery for async tasks, admin portal, Docker Compose + Nginx for production.",
    stack: ["Next.js", "React Native", "Expo", "FastAPI", "Stripe", "Redis", "Docker", "Nginx"],
    outcome: "Fully production-ready platform with real-time order tracking and seamless payments.",
    color: "from-white/[0.04] to-transparent",
    image: "/projects/moons-burger-card.webp",
    drawerImage: "/projects/moons-burger-drawer.webp",
    live: "",
    github: "",
  },
  {
    id: "perfect-pairing",
    title: "AI Wine Inventory & Pairing Platform",
    category: ["AI", "Web"],
    size: "small",
    status: "In Progress",
    short: "AI drink & food pairing platform powered by LLMs.",
    problem:
      "Foodnerd needed an intelligent recommendation engine that pairs drinks with meals contextually, not just by preset rules.",
    built:
      "Built a full AI-powered pairing platform using React.js, Ruby on Rails, and an LLM backend. The system understands flavor profiles, dietary preferences and context to generate intelligent pairing suggestions.",
    stack: ["React.js", "Ruby on Rails", "OpenAI API", "PostgreSQL", "TypeScript"],
    outcome: "Currently in active development at Arkhitech for the Foodnerd ecosystem.",
    color: "from-white/[0.04] to-transparent",
    image: "/projects/perfect-pairing-card.webp",
    drawerImage: "/projects/perfect-pairing-drawer.webp",
    live: "",
    github: "",
  },
  {
    id: "dnt-network",
    title: "D & T Network",
    category: ["Web"],
    size: "small",
    short: "Premium B2B FMCG distribution site.",
    built: "Built with Next.js, TypeScript, Tailwind CSS and Framer Motion — fast, SEO-optimised and visually sharp.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://www.dnt-network.com",
    github: "",
    color: "from-white/[0.04] to-transparent",
    image: "/projects/dnt-network-card.webp",
    drawerImage: "/projects/dnt-network-drawer.webp",
  },
  {
    id: "core-montessori",
    title: "Core Montessori Portal",
    category: ["Web"],
    size: "small",
    short: "School management system with SMS gateway.",
    built: "Comprehensive school management portal handling student records, attendance, grading and SMS notifications.",
    stack: ["React", "PHP", "MySQL", "SMS Gateway"],
    color: "from-white/[0.04] to-transparent",
    image: "/projects/core-montessori-card.webp",
    drawerImage: "/projects/core-montessori-drawer.webp",
    live: "",
    github: "",
  },
  {
    id: "music-sharing",
    title: "Music Sharing App",
    category: ["Mobile"],
    size: "small",
    short: "Android music sharing application.",
    built: "Native Android app for sharing and discovering music, with social features and audio streaming.",
    stack: ["Kotlin", "Android"],
    color: "from-white/[0.04] to-transparent",
    image: "/projects/music-sharing-card.webp",
    drawerImage: "/projects/music-sharing-drawer.webp",
    live: "",
    github: "",
  },
];

export const services = [
  {
    icon: "Globe",
    title: "Web Design & Development",
    description:
      "Pixel-perfect, performant web applications with React, Next.js, Rails and Django. From landing pages to complex SaaS platforms.",
    highlights: ["React / Next.js", "Django / Rails", "TypeScript", "SEO & Performance"],
  },
  {
    icon: "Smartphone",
    title: "Mobile Apps",
    description:
      "Cross-platform React Native & Expo apps for iOS and Android. From concept to App Store — I've shipped them both.",
    highlights: ["React Native", "Expo", "GlueStack UI", "iOS & Android"],
  },
  {
    icon: "Brain",
    title: "AI Integration & Custom Software",
    description:
      "LLM-powered features, AI-avatar interviews, semantic search, RAG pipelines and multimodal systems using OpenAI and Gemini APIs.",
    highlights: ["OpenAI / Gemini", "RAG Pipelines", "Voice & Vision AI", "Prompt Engineering"],
  },
];

export const processSteps = [
  { step: "01", label: "Discover", desc: "Deep-dive into your problem, goals and constraints." },
  { step: "02", label: "Design", desc: "Architecture, UX flows and system design — no guessing." },
  { step: "03", label: "Build", desc: "Clean, tested, production-ready code. Shipped in sprints." },
  { step: "04", label: "Ship", desc: "Deploy, monitor and iterate until it's exactly right." },
];

export const skillGroups = [
  {
    label: "AI & LLMs",
    skills: [
      "OpenAI API",
      "Gemini API",
      "LLM Fine-tuning",
      "Multimodal Systems",
      "Prompt Engineering",
      "RAG",
      "Voice Synthesis",
      "STT",
    ],
  },
  {
    label: "Mobile",
    skills: [
      "React Native",
      "Expo",
      "GlueStack UI",
      "Kotlin",
      "Deep Linking",
      "Push Notifications",
      "iOS Deployment",
    ],
  },
  {
    label: "Frontend",
    skills: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Material-UI"],
  },
  {
    label: "Backend",
    skills: [
      "Django",
      "Django REST Framework",
      "Ruby on Rails",
      "FastAPI",
      "PostgreSQL",
      "SQL",
      "Redis",
      "Celery",
    ],
  },
  {
    label: "Desktop",
    skills: ["Electron"],
  },
  {
    label: "Tools",
    skills: [
      "Git",
      "Postman",
      "Xcode",
      "Android Studio",
      "Reactotron",
      "Docker",
      "Nginx",
      "CI/CD",
    ],
  },
  {
    label: "Concepts",
    skills: [
      "OOP",
      "DSA",
      "Agile / Scrum",
      "REST API Design",
      "RSpec",
      "Performance Optimization",
    ],
  },
];

export const linkedinPostThemes = [
  {
    icon: "Bot",
    title: "AI in Hiring — Unfiltered",
    description:
      "Real takes on bias, transparency and why most AI hiring tools miss the point. These posts spark the best debates.",
  },
  {
    icon: "Layers",
    title: "AIVIS Build-ins",
    description:
      "Behind-the-scenes of building an AI hiring platform: architecture decisions, LLM experiments, failures and wins.",
  },
  {
    icon: "Users",
    title: "Engineering & Team Culture",
    description:
      "Thoughts on what makes great teams, code review culture, remote collaboration and growing as an engineer.",
  },
];

export const education = {
  degree: "BS Computer Science (Honors)",
  university: "University of Central Punjab",
  location: "Lahore, PK",
  period: "Oct 2021 – Jul 2025",
  gpa: `${GPA} / 4.0`,
  courses: [
    "Data Structures and Algorithms",
    "Design and Analysis of Algorithms",
    "Object Oriented Programming",
    "Introduction to Database Systems",
    "Operating Systems",
    "Computer Communications and Networks",
    "Introduction to Software Engineering",
    "Mobile Application Development",
    "Artificial Intelligence",
    "Introduction to Deep Learning",
    "Introduction to Natural Language Processing",
    "Mathematics for Machine Learning",
    "Programming for Big Data",
    "Information Security",
    "Parallel and Distributed Computing",
  ],
};

export const certifications = [
  {
    title: "Introduction to Generative AI",
    issuer: "Google",
    year: "2026",
    color: "from-white/[0.04] to-transparent",
  },
  {
    title: "Agents and Workflows",
    issuer: "OpenAI",
    year: "2026",
    color: "from-white/[0.04] to-transparent",
  },
  {
    title: "Applied AI Foundations",
    issuer: "OpenAI",
    year: "2026",
    color: "from-white/[0.04] to-transparent",
  },
  {
    title: "AI Foundations",
    issuer: "OpenAI",
    year: "2026",
    color: "from-white/[0.04] to-transparent",
  },
  {
    title: "Certified Cloud Applied Generative AI Engineer",
    issuer: "PIAIC",
    year: "2025",
    color: "from-white/[0.04] to-transparent",
  },
];

export const seo = {
  title: "Muhammad Jawad Fareed | Full Stack AI Engineer & Founder of AIVIS, Lahore",
  description:
    "Portfolio of Muhammad Jawad Fareed, Full Stack AI Engineer and founder of AIVIS. React, React Native, Django and AI products. Based in Lahore, Pakistan.",
  ogImage: `${SITE_URL}/og-image.jpg`,
  canonicalUrl: SITE_URL,
};
