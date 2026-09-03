import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import Experience from "@/components/Experience";
import Careers from "@/components/Careers";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { prisma } from "@/lib/prisma";

// This is an async React Server Component — it fetches live data from
// Postgres (via Prisma) at request time and passes it down as props.
// Static content (brand, about, team, experience, etc.) lives in lib/data.ts
// because those fields have no Prisma model.

export default async function Home() {
  const [categories, services, portfolio, testimonials] = await Promise.all([
    prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: { skills: true },
    }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.portfolioItem.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <main className="grain">
      <Navbar />
      <Marquee />
      <Hero />
      <About />
      <Services services={services} />
      <Skills categories={categories} />
      <Portfolio portfolio={portfolio} />
      <Team />
      <Experience />
      <Careers />
      <Testimonials testimonials={testimonials} />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
