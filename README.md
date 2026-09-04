# Ritbha — Full-Stack Web Studio

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma/PostgreSQL,
styled after graphicgrove.in's agency layout (Home / About / Services /
Portfolio / Team / Careers / Contact) with a "growth ring" visual identity.

## Stack
- **Next.js 14** (App Router), TypeScript
- **Tailwind CSS** — custom "growth ring" design system (see `tailwind.config.ts`)
- **Prisma + PostgreSQL** — schema in `prisma/schema.prisma`
- **Grok (xAI) chat widget** — `/api/chat` calls the xAI API for a live chat assistant
- **Google OAuth reviews** — visitors sign in with Google and can publish one rating/review
- Content currently comes from `lib/data.ts` (static/fake data, as requested)

## Run locally
```bash
npm install
npm run dev
```
Opens on http://localhost:3000 — works immediately with **no database**,
since the site reads from `lib/data.ts`. The chat widget will show a
friendly error until you add an xAI key (see below).

## Chat widget (Grok / xAI)
1. Get an API key from https://console.x.ai
2. Copy `.env.example` to `.env` and set `XAI_API_KEY`
3. Restart `npm run dev` — the chat bubble (bottom-right) now answers using
   the services/pricing info in `lib/data.ts` (`chatContext`).

No key set → the widget still opens, but replies with a clear "chat isn't
configured yet" message instead of crashing.

## Wiring up Postgres (optional, for later)
1. Create a Postgres database (Neon, Supabase, Railway, or local Docker all work).
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Push the schema and seed it with the same content already in `lib/data.ts`:
   ```bash
   npm run db:push
   npm run db:seed
   ```
4. In `app/page.tsx`, swap each `lib/data.ts` import for a matching
   `prisma.<model>.findMany()` call — the shapes already match 1:1, so no
   component code needs to change.

The `/api/contact` route already writes submissions to `ContactMessage` in
Postgres when `DATABASE_URL` is set, and degrades gracefully (logs only)
when it isn't.

## Google sign-in and ratings
1. In Google Cloud Console, create OAuth credentials for a Web application.
2. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI (use your production domain for production).
3. Add these values to `.env`:
  ```bash
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=use-a-long-random-secret
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret
  DATABASE_URL=your-postgres-url
  ```
4. Apply the new auth and review tables:
  ```bash
  npm run db:push
  ```

Signed-in visitors can submit one review. Submitting again updates their existing review.

## Structure
```
app/            routes, layout, /api/contact, /api/chat (Grok)
components/     Navbar, Hero, About, Services, Skills, Portfolio, Team,
                Careers, Testimonials, Contact, Footer, ChatWidget
lib/data.ts     static/fake content — brand, services+pricing, portfolio,
                about, team, careers, testimonials, chatContext
lib/prisma.ts   Prisma client singleton
prisma/         schema.prisma + seed.ts
```

## Content notes
- **Portfolio** shows example/concept builds (not real client work yet) —
  swap `lib/data.ts → portfolio` for real projects and screenshots as they ship.
- **Testimonials** are illustrative placeholders — replace with real client
  quotes once you have them.
- **Pricing** in `lib/data.ts → services` is set for an early-stage studio —
  edit freely as your rates change.
- Portfolio images are hotlinked from Lorem Picsum (a free placeholder-image
  service) — swap the `image` field for your own screenshots later.

## Design
- Palette: deep forest `#0E2118` / `#15301F` surfaces, chartreuse accent `#C9F169`.
- Type: Fraunces (display), Inter (body), JetBrains Mono (labels/code/terminal bits).
- Signature motif: concentric "growth rings" (hero, skills grid), plus a
  subtle CSS 3D tilt on portfolio cards on hover — no external 3D library needed.
