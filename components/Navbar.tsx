"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { brand } from "@/lib/data";

const links = [
  { href: "#top",       label: "Home",      num: "01" },
  { href: "#about",     label: "About",     num: "02" },
  { href: "#services",  label: "Services",  num: "03" },
  { href: "#portfolio", label: "Portfolio", num: "04" },
  { href: "#team",      label: "Team",      num: "05" },
  { href: "#experience",label: "Experience",num: "06" },
  { href: "#contact",   label: "Contact",   num: "07" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line transition-all duration-300 ${
        scrolled ? "bg-bg/95 backdrop-blur shadow-[0_2px_24px_rgba(0,0,0,0.4)]" : "bg-bg/80 backdrop-blur"
      }`}
    >
      <nav className="mx-auto flex max-w-wrap items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="#top" className="flex items-center gap-2" onClick={close}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <circle cx="13" cy="13" r="12" stroke="#818cf8" strokeWidth="1" opacity="0.35" />
            <circle cx="13" cy="13" r="8"  stroke="#818cf8" strokeWidth="1" opacity="0.6"  />
            <circle cx="13" cy="13" r="3.2" fill="#818cf8" />
          </svg>
          <span className="font-display text-lg tracking-tight">{brand.name}</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group flex items-baseline gap-1 text-sm text-muted transition-colors hover:text-ink"
            >
              <span className="nav-num">{l.num}</span>
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side: Hire Me CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(129,140,248,0.4)]"
          >
            Hire Me
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="flex flex-col items-center justify-center gap-1.5 rounded-md p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-0 border-t border-line bg-bg/98 px-6 pb-6 pt-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="flex items-baseline gap-2 border-b border-line/40 py-3 text-sm text-muted transition-colors last:border-none hover:text-ink"
            >
              <span className="nav-num">{l.num}</span>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            className="mt-4 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-medium text-bg"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
