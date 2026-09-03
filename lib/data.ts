// Static content for fields that have no Prisma model.
// The four DB-backed collections (skillCategories, services, portfolio,
// testimonials) are now fetched in app/page.tsx via prisma.<model>.findMany().

export const brand = {
  name: "Ritbha",
  tagline: "Root. Build. Grow.",
  description:
    "A full-stack web studio that plants your product idea, engineers it properly, and grows it into something that scales.",
  founder: "Bharat Saini",
  email: "sainibharat277@gmail.com",
  phone: `+91 ${process.env.AUTHOR_NUMBER ?? "8570915006"}`,
  whatsapp: `+91 ${process.env.AUTHOR_NUMBER ?? "8570915006"}`,
  location: "Narnaul, Haryana, India",
  github: "https://github.com/Bharat-saini123",
  linkedin: "https://www.linkedin.com/in/bharat-saini-146412273/",
};

export const stats = [
  { value: "3+", label: "Years writing production code" },
  { value: "30+", label: "Technologies across the stack" },
  { value: "15+", label: "Screens shipped to real users" },
  { value: "24h", label: "Typical reply time" },
];

// -------------------- About --------------------
export const about = {
  eyebrow: "About Ritbha",
  heading: "A small studio, built to move like an in-house team.",
  paragraphs: [
    "Ritbha is a full-stack web studio — one accountable team handling design, engineering and deployment, instead of a chain of freelancers.",
    "We're just getting started, which means new clients get founder-level attention, senior engineering, and pricing that fits a first project — not agency-scale overhead.",
  ],
  points: [
    "Direct access to the person building your product — no account managers in between.",
    "Modern stack: Next.js, Node.js, PostgreSQL — fast, typed, and easy to hand off later.",
    "Fixed-scope quotes before any work starts, so there are no surprise invoices.",
  ],
};

export const pricingNote =
  "Early-studio pricing — final quote depends on scope and is shared upfront before any work begins. No hidden charges.";

// -------------------- Team --------------------
export const team = [
  {
    name: "Bharat Saini",
    role: "Founder · Full-Stack Developer",
    bio: "Full-Stack Developer specializing in building modern, scalable web applications from frontend to backend and database. Experienced with React, Next.js, TypeScript, JavaScript, Node.js, Express.js, REST APIs, tRPC, Prisma, PostgreSQL, MySQL, MongoDB, Tailwind CSS, Chakra UI, Git, Docker and Vercel, with expertise in authentication, API security, database architecture, payment integrations, webhooks, SSR, responsive UI and production deployment.",
  },
];

// -------------------- Careers --------------------
export const careers = {
  eyebrow: "Careers",
  heading: "Ritbha is small right now — and growing.",
  description:
    "We're not hiring full-time yet, but we're open to remote collaborators (designers, developers) for project-based work as the studio grows.",
  cta: "Introduce yourself",
};

// -------------------- Experience --------------------
export const experience = [
  {
    period: "2025 — Present",
    role: "Founder & Full-Stack Developer",
    company: "Ritbha Web Studio",
    description:
      "Building and growing a full-stack web studio focused on delivering scalable, production-ready web products for businesses and startups.",
    highlights: [
      "Architected and shipped multiple client projects end-to-end",
      "Designed pricing model and service tiers",
      "Established modern stack (Next.js + Prisma + PostgreSQL)",
      "Managing deployment pipelines and client relations",
    ],
    tags: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "TypeScript", "Vercel"],
  },
  {
    period: "2023 — 2025",
    role: "Full-Stack Developer",
    company: "Freelance & Client Projects",
    description:
      "Delivered bespoke web solutions for clients across e-commerce, real estate and service industries.",
    highlights: [
      "Built e-commerce platforms with Razorpay & Cashfree payment integrations",
      "Developed real estate listing portals with advanced search",
      "Integrated CRM features, admin dashboards and role-based auth",
      "Deployed on AWS EC2, Nginx and managed cloud databases",
    ],
    tags: ["React", "Express.js", "MongoDB", "Redis", "Docker", "AWS EC2"],
  },
  {
    period: "2022 — 2023",
    role: "Web Developer",
    company: "Learning & Open Source",
    description:
      "Deep dive into modern web technologies through personal projects, open-source contributions and self-directed study.",
    highlights: [
      "Built full-stack side projects to master React and Node.js",
      "Contributed to open-source tools and learned DevOps basics",
      "Mastered database design with PostgreSQL and MySQL",
      "Completed advanced courses in TypeScript and system design",
    ],
    tags: ["React", "Node.js", "MySQL", "TypeScript", "Git", "Linux"],
  },
];


// Used as system-prompt context for the chat widget (/api/chat), so the
// assistant can answer pricing/contact questions accurately.
// Note: services are now fetched from Postgres at runtime, so we list the
// starting prices here as static text to keep this context importable at
// module-level without a DB call.
export const chatContext = `
You are the website assistant for Ritbha (${brand.tagline}), a small full-stack web studio.
Founder: ${brand.founder}. Contact: ${brand.email}, ${brand.phone}. Location: ${brand.location}.

Services & starting prices:
- Business Website: Starts at ₹6,999 — A fast, mobile-friendly website for a shop, clinic, studio or local business — pages, forms, and a clean CMS-free setup. Includes up to 5 pages, contact form, mobile-first design, basic SEO setup.
- E-commerce Store: Starts at ₹15,999 — A storefront you can actually run — product catalog, cart, checkout, and an admin view to manage orders. Includes product catalog & cart, payment gateway integration, order dashboard, Postgres-backed inventory.
- Custom Web App: Starts at ₹29,999 — Dashboards, CRMs, booking systems, internal tools — anything with real logic, accounts and a database behind it. Includes auth & user roles, PostgreSQL + Prisma, API integrations, admin dashboard.
- Care & Support Plan: ₹1,499 / month — Ongoing fixes, small feature requests, monitoring and hosting checkups after launch. Includes bug fixes, small feature updates, uptime monitoring, monthly report.
${pricingNote}

Answer visitor questions about services, pricing, timelines and how to get started.
Keep replies short, friendly and specific. If asked something you don't know
(exact timelines, custom scope), suggest they share details via the contact
form or WhatsApp so the founder can quote them directly.
`.trim();
