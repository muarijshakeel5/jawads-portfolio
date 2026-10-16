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
    "I'm a Computer Science graduate from the University of Central Punjab who builds AI-powered products end to end: React and React Native on the front, Django, Rails and FastAPI behind them, and LLMs (OpenAI, Gemini, multimodal systems) in the middle.",
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
  subtitle: "AI Autonomous Hiring & Video Assessment Platform",
  tagline: "Fair, fast, transparent hiring — powered by AI.",
  founded: "February 2022",
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
    id: "ivoo-founder",
    role: "Founder",
    company: "AIVIS",
    period: "Feb 2022 – Present",
    location: "Lahore, PK",
    type: "founder",
    description:
      "Building an AI autonomous hiring and video-assessment platform. See Chapter 02 for the full product story.",
    tags: ["React", "Django", "LLMs", "OpenAI", "Gemini"],
    badge: "See CH. 02",
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
    id: "fruitful",
    role: "Software Engineer (Frontend-led)",
    company: "Fruitful",
    period: "Nov 2025 – Apr 2026",
    location: "Remote",
    type: "fulltime",
    description:
      "Built a wellbeing-focused platform helping employees with focus, mental health and sustainable productivity. React.js UI with Rails backend and Inertia Rails; redesign and new features delivered end to end, on time.",
    tags: ["React.js", "Ruby on Rails", "Inertia.js", "TypeScript"],
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
    role: "C++ Development Intern",
    company: "CodeSoft",
    period: "",
    location: "Lahore, PK",
    type: "intern",
    description:
      "Developed foundational C++ applications and algorithms as part of an early-career engineering internship.",
    tags: ["C++", "OOP", "DSA"],
  },
];

export const projects = [
  {
    id: "perfect-pairing",
    title: "AI Wine Inventory & Pairing Platform",
    category: ["AI", "Web"],
    size: "large",
    status: "In Progress",
    short: "AI drink & food pairing platform powered by LLMs.",
    problem:
      "Foodnerd needed an intelligent recommendation engine that pairs drinks with meals contextually, not just by preset rules.",
    built:
      "Built a full AI-powered pairing platform using React.js, Ruby on Rails, and an LLM backend. The system understands flavor profiles, dietary preferences and context to generate intelligent pairing suggestions.",
    stack: ["React.js", "Ruby on Rails", "OpenAI API", "PostgreSQL", "TypeScript"],
    outcome: "Currently in active development at Arkhitech for the Foodnerd ecosystem.",
    color: "from-white/[0.04] to-transparent",
    image: "/projects/perfect-pairing.png",
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
    image: "/projects/foodnerd-ecosystem.png",
    live: "",
    github: "",
  },
  {
    id: "moons-burger",
    title: "Moon's Burger",
    category: ["Web", "Mobile", "AI"],
    size: "large",
    short: "Full-stack food ordering platform: Next.js 14 web + React Native app with Maps.",
    problem:
      "A premium burger brand needed a modern ordering experience across web and mobile, with real-time tracking and payment processing.",
    built:
      "Next.js 14 web app + React Native (Expo) mobile app with Maps integration; FastAPI backend, Stripe payments, Redis + Celery for async tasks, admin portal, Docker Compose + Nginx for production.",
    stack: ["Next.js", "React Native", "Expo", "FastAPI", "Stripe", "Redis", "Docker", "Nginx"],
    outcome: "Fully production-ready platform with real-time order tracking and seamless payments.",
    color: "from-white/[0.04] to-transparent",
    image: "/projects/moons-burger.png",
    live: "",
    github: "",
  },
  {
    id: "ivoo-project",
    title: "AIVIS",
    category: ["AI", "Web"],
    size: "large",
    short: "AI autonomous hiring & video assessment platform. See CH. 02.",
    problem: "Traditional hiring is biased, slow and opaque.",
    built:
      "Full AI hiring platform with semantic CV parsing, video interviews with AI avatar, real-time match scoring, facial emotion detection and role-based dashboards.",
    stack: ["React", "TypeScript", "Django REST", "Python", "LLM APIs", "Recharts"],
    outcome: "40% less hiring bias · 30% less HR screening workload (internal testing).",
    color: "from-white/[0.04] to-transparent",
    isIvoo: true,
    image: "/projects/aivis.png",
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
    liveLink: "https://www.dnt-network.com",
    github: "",
    color: "from-white/[0.04] to-transparent",
    image: "/projects/dnt-network.png",
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
    image: "/projects/core-montessori.png",
    live: "",
    github: "",
  },
  {
    id: "service-company",
    title: "Service Company Web App",
    category: ["Web"],
    size: "small",
    short: "Custom service management platform.",
    built: "Full-stack service management web app with booking, scheduling and admin portal.",
    stack: ["React", "Django", "PostgreSQL"],
    color: "from-white/[0.04] to-transparent",
    image: "/projects/service-company.webp",
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
    image: "/projects/music-sharing.webp",
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
  degree: "BS Computer Science",
  university: "University of Central Punjab",
  location: "Lahore, PK",
  period: "Nov 2021 – Jul 2025",
  gpa: `${GPA} / 4.0`,
  courses: [
    "Data Structures & Algorithms",
    "Database Systems",
    "Software Engineering",
    "Operating Systems",
    "Computer Networks",
    "Machine Learning",
    "Artificial Intelligence",
    "Web Engineering",
    "Mobile Computing",
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
  ogImage: `${SITE_URL}/og-image.png`,
  twitterHandle: "@jawadfareed",
  canonicalUrl: SITE_URL,
};
