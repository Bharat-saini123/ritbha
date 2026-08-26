import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Seed data (was previously imported from lib/data.ts before it was migrated
// to Prisma — kept here so the seed script is self-contained).
// ---------------------------------------------------------------------------

const skillCategories = [
  {
    id: "cat-frontend",
    label: "Frontend",
    icon: "🖥",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Chakra UI"],
  },
  {
    id: "cat-backend",
    label: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express.js", "tRPC", "REST APIs", "WebSockets"],
  },
  {
    id: "cat-database",
    label: "Database",
    icon: "🗄",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Redis"],
  },
  {
    id: "cat-devops",
    label: "DevOps & Tools",
    icon: "🚀",
    skills: ["Docker", "Vercel", "Git", "GitHub Actions", "Linux"],
  },
];

const services = [
  {
    title: "Business Website",
    price: "Starts at ₹6,999",
    description:
      "A fast, mobile-friendly website for a shop, clinic, studio or local business — pages, forms, and a clean CMS-free setup.",
    features: [
      "Up to 5 pages",
      "Contact form",
      "Mobile-first design",
      "Basic SEO setup",
    ],
  },
  {
    title: "E-commerce Store",
    price: "Starts at ₹15,999",
    description:
      "A storefront you can actually run — product catalog, cart, checkout, and an admin view to manage orders.",
    features: [
      "Product catalog & cart",
      "Payment gateway integration",
      "Order dashboard",
      "Postgres-backed inventory",
    ],
  },
  {
    title: "Custom Web App",
    price: "Starts at ₹29,999",
    description:
      "Dashboards, CRMs, booking systems, internal tools — anything with real logic, accounts and a database behind it.",
    features: [
      "Auth & user roles",
      "PostgreSQL + Prisma",
      "API integrations",
      "Admin dashboard",
    ],
  },
  {
    title: "Care & Support Plan",
    price: "₹1,499 / month",
    description:
      "Ongoing fixes, small feature requests, monitoring and hosting checkups after launch, so the site keeps running smoothly.",
    features: [
      "Bug fixes",
      "Small feature updates",
      "Uptime monitoring",
      "Monthly report",
    ],
  },
];


const portfolio = [
  {
    index: "01",
    title: "MediBook",
    category: "Health-tech",
    description:
      "A clinic booking platform with real-time slot management, SMS reminders and a doctor dashboard.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Twilio"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
  {
    index: "02",
    title: "StockFlow",
    category: "Retail SaaS",
    description:
      "Inventory management SaaS for small retailers with barcode scanning, low-stock alerts and CSV export.",
    stack: ["React", "Node.js", "MySQL", "Recharts"],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  },
  {
    index: "03",
    title: "Folio",
    category: "Marketing site",
    description:
      "Animated portfolio site for a design agency with a CMS-backed case studies page and contact flow.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Founder",
    company: "MediBook",
    quote:
      "Bharat delivered a polished booking system in under three weeks. The code is clean and the UX is exactly what our patients needed.",
  },
  {
    name: "Rohit Meena",
    role: "Co-founder",
    company: "StockFlow",
    quote:
      "We needed a working MVP fast. Ritbha gave us a solid foundation — barcode scanning, alerts, and a beautiful dashboard — ahead of schedule.",
  },
  {
    name: "Anjali Verma",
    role: "Creative Director",
    company: "Folio Agency",
    quote:
      "The animations and performance are stunning. Every client who sees our site asks who built it — the answer is always Ritbha.",
  },
];

async function main() {
  await prisma.contactMessage.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();

  for (let i = 0; i < skillCategories.length; i++) {
    const cat = skillCategories[i];
    await prisma.skillCategory.create({
      data: {
        id: cat.id,
        label: cat.label,
        icon: cat.icon,
        order: i,
        skills: { create: cat.skills.map((name) => ({ name })) },
      },
    });
  }

  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    await prisma.service.create({ data: { ...s, order: i } });
  }

  for (let i = 0; i < portfolio.length; i++) {
    const p = portfolio[i];
    await prisma.portfolioItem.create({ data: { ...p, order: i } });
  }

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    await prisma.testimonial.create({ data: { ...t, order: i } });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
