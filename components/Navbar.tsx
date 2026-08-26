import Link from "next/link";
import { brand } from "@/lib/data";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#team", label: "Team" },
  { href: "#careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-wrap items-center justify-between px-6 py-4">
        <Link href="#top" className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <circle cx="13" cy="13" r="12" stroke="#C9F169" strokeWidth="1" opacity="0.35" />
            <circle cx="13" cy="13" r="8" stroke="#C9F169" strokeWidth="1" opacity="0.6" />
            <circle cx="13" cy="13" r="3.2" fill="#C9F169" />
          </svg>
          <span className="font-display text-lg tracking-tight">{brand.name}</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#services"
          className="rounded-full border border-accent/40 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          Get Started
        </a>
      </nav>
    </header>
  );
}
