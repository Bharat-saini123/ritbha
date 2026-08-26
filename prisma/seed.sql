-- Ritbha — seed data as raw SQL
-- Run this AFTER the tables exist, i.e. after:
--   npx prisma db push
-- Then run this file, e.g.:
--   psql "$DATABASE_URL" -f prisma/seed.sql

BEGIN;

-- Clear existing rows (safe to re-run)
DELETE FROM "Skill";
DELETE FROM "SkillCategory";
DELETE FROM "Service";
DELETE FROM "PortfolioItem";
DELETE FROM "Testimonial";

-- ---------------- Skill Categories ----------------
INSERT INTO "SkillCategory" (id, label, icon, "order") VALUES
  ('frontend', 'Frontend',        'leaf',   0),
  ('backend',  'Backend',         'trunk',  1),
  ('database', 'Database & ORM', 'roots',  2),
  ('cloud',    'DevOps & Cloud', 'canopy', 3);

-- ---------------- Skills ----------------
INSERT INTO "Skill" (id, name, "categoryId") VALUES
  ('skill_fe_1', 'React.js',       'frontend'),
  ('skill_fe_2', 'Next.js',        'frontend'),
  ('skill_fe_3', 'TypeScript',     'frontend'),
  ('skill_fe_4', 'Redux',          'frontend'),
  ('skill_fe_5', 'Tailwind CSS',   'frontend'),
  ('skill_fe_6', 'MUI',            'frontend'),
  ('skill_fe_7', 'Framer Motion',  'frontend'),

  ('skill_be_1', 'Node.js',       'backend'),
  ('skill_be_2', 'Express.js',    'backend'),
  ('skill_be_3', 'NestJS',        'backend'),
  ('skill_be_4', 'GraphQL',       'backend'),
  ('skill_be_5', 'Socket.IO',     'backend'),
  ('skill_be_6', 'JWT / OAuth',   'backend'),
  ('skill_be_7', 'tRPC',          'backend'),

  ('skill_db_1', 'PostgreSQL',    'database'),
  ('skill_db_2', 'MongoDB',       'database'),
  ('skill_db_3', 'MySQL',         'database'),
  ('skill_db_4', 'Supabase',      'database'),
  ('skill_db_5', 'Prisma ORM',    'database'),
  ('skill_db_6', 'Redis',         'database'),
  ('skill_db_7', 'Firebase',      'database'),

  ('skill_cl_1', 'Docker',           'cloud'),
  ('skill_cl_2', 'AWS S3',          'cloud'),
  ('skill_cl_3', 'Vercel',          'cloud'),
  ('skill_cl_4', 'GitHub Actions',  'cloud'),
  ('skill_cl_5', 'TurboRepo',       'cloud'),
  ('skill_cl_6', 'Grafana',         'cloud'),
  ('skill_cl_7', 'Cloudflare',      'cloud');

-- ---------------- Services (pricing) ----------------
INSERT INTO "Service" (id, title, price, description, features, "order") VALUES
  (
    'svc_website',
    'Business Website',
    'Starts at ₹6,999',
    'A fast, mobile-friendly website for a shop, clinic, studio or local business — pages, forms, and a clean CMS-free setup.',
    ARRAY['Up to 5 pages', 'Contact form', 'Mobile-first design', 'Basic SEO setup'],
    0
  ),
  (
    'svc_ecommerce',
    'E-commerce Store',
    'Starts at ₹15,999',
    'A storefront you can actually run — product catalog, cart, checkout, and an admin view to manage orders.',
    ARRAY['Product catalog & cart', 'Payment gateway integration', 'Order dashboard', 'Postgres-backed inventory'],
    1
  ),
  (
    'svc_webapp',
    'Custom Web App',
    'Starts at ₹29,999',
    'Dashboards, CRMs, booking systems, internal tools — anything with real logic, accounts and a database behind it.',
    ARRAY['Auth & user roles', 'PostgreSQL + Prisma', 'API integrations', 'Admin dashboard'],
    2
  ),
  (
    'svc_support',
    'Care & Support Plan',
    '₹1,499 / month',
    'Ongoing fixes, small feature requests, monitoring and hosting checkups after launch, so the site keeps running smoothly.',
    ARRAY['Bug fixes', 'Small feature updates', 'Uptime monitoring', 'Monthly report'],
    3
  );

-- ---------------- Portfolio (3 items) — liveUrl NULL for all ----------------
INSERT INTO "PortfolioItem" (id, index, title, category, description, stack, image, "liveUrl", "order") VALUES
  (
    'proj_medibook',
    '01',
    'MediBook',
    'Health-tech',
    'A clinic booking platform with real-time slot management, SMS reminders and a doctor dashboard.',
    ARRAY['Next.js', 'Prisma', 'PostgreSQL', 'Twilio'],
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    NULL,
    0
  ),
  (
    'proj_stockflow',
    '02',
    'StockFlow',
    'Retail SaaS',
    'Inventory management SaaS for small retailers with barcode scanning, low-stock alerts and CSV export.',
    ARRAY['React', 'Node.js', 'MySQL', 'Recharts'],
    'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    NULL,
    1
  ),
  (
    'proj_folio',
    '03',
    'Folio',
    'Marketing site',
    'Animated portfolio site for a design agency with a CMS-backed case studies page and contact flow.',
    ARRAY['Next.js', 'Tailwind CSS', 'Framer Motion'],
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    NULL,
    2
  );

-- ---------------- Testimonials (6) ----------------
INSERT INTO "Testimonial" (id, name, role, company, quote, "order") VALUES
  (
    'test_ananya',
    'Ananya Kapoor',
    'Founder',
    'Studio Loop',
    'Ritbha took a rough idea and shipped a working product in weeks, not months. Every update came with a working link, not just a status message.',
    0
  ),
  (
    'test_rohan',
    'Rohan Malhotra',
    'Product Lead',
    'Northbeam CRM',
    'The real-time features they built just work — no flakiness, no surprises after launch. Genuinely production-grade for the price we paid.',
    1
  ),
  (
    'test_priya',
    'Priya Nair',
    'Founder',
    'Kadam Homes',
    'Fast, structured, and easy to reach. Our listings platform runs faster than the one we paid an agency 3x for.',
    2
  ),
  (
    'test_dr_sameer',
    'Dr. Sameer Bhatia',
    'Owner',
    'Bloom Clinic',
    'Patients book their own slots now and reminders go out automatically. Front-desk calls dropped noticeably in the first month.',
    3
  ),
  (
    'test_kavya',
    'Kavya Reddy',
    'Co-founder',
    'LearnHive',
    'We described the course flow once and Ritbha handled the rest — payments, video hosting, progress tracking, all wired together cleanly.',
    4
  ),
  (
    'test_arjun',
    'Arjun Verma',
    'Studio Owner',
    'FitTrack Studio',
    'Members can book classes from their phone now instead of calling the front desk. Setup was quick and the price was honest for a small studio.',
    5
  );

COMMIT;
