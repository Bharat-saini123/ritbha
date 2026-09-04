"use client";

import { useState } from "react";
import { brand } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const selectClass =
  "w-full appearance-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent/60 cursor-pointer transition-colors hover:border-line/80";

const PROJECT_TYPES = [
  { value: "business-website", label: "🌐  Business Website" },
  { value: "ecommerce",        label: "🛒  E-commerce Store" },
  { value: "web-app",          label: "⚙️  Custom Web App" },
  { value: "saas",             label: "☁️  SaaS / Real-time App" },
  { value: "landing-page",     label: "📄  Landing Page" },
  { value: "support-plan",     label: "🛡️  Care & Support Plan" },
  { value: "other",            label: "💡  Something else" },
];

const BUDGET_RANGES = [
  { value: "under-5k", label: "Under ₹5,000" },
  { value: "5k-10k",   label: "₹5,000 – ₹10,000" },
  { value: "10k-25k",  label: "₹10,000 – ₹25,000" },
  { value: "25k-50k",  label: "₹25,000 – ₹50,000" },
  { value: "50k+",     label: "Above ₹50,000" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-b border-line">

      {/* ── 3D orbit animation background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40"
        style={{ perspective: "900px" }}
      >
        <div className="relative h-[520px] w-[520px]" style={{ transformStyle: "preserve-3d" }}>
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />
          <div className="orbit-ring orbit-ring-3" />
        </div>
      </div>

      {/* Blobs */}
      <div
        aria-hidden
        className="blob pointer-events-none absolute -left-32 top-0 h-80 w-80 bg-accent/10"
        style={{ animationDelay: "0s" }}
      />
      <div
        aria-hidden
        className="blob pointer-events-none absolute -right-32 bottom-0 h-96 w-96 bg-[#c084fc]/8"
        style={{ animationDelay: "4s" }}
      />

      {/* ── Content ── */}
      <div className="relative mx-auto grid max-w-wrap gap-14 px-6 py-24 md:grid-cols-2">

        {/* Left column */}
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
            Have an idea worth growing?
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Tell us what you&apos;re building. We reply within a day, usually sooner.
          </p>

          <div className="mt-10 space-y-4 text-sm">
            <a href={`mailto:${brand.email}`} className="block text-ink hover:text-accent transition-colors">
              {brand.email}
            </a>
            <a href={`tel:${brand.phone}`} className="block text-muted hover:text-ink transition-colors">
              {brand.phone}
            </a>
            <p className="text-muted">{brand.location}</p>
          </div>

          {/* Trust badges */}
          <div className="mt-12 space-y-3">
            {[
              "✓  Fixed-scope quote before work starts",
              "✓  Reply within 24 hours, usually sooner",
              "✓  No surprise invoices, ever",
            ].map((t) => (
              <p key={t} className="text-xs text-muted/80">{t}</p>
            ))}
          </div>
        </div>

        {/* Right column — form */}
        <form
          onSubmit={handleSubmit}
          className="relative space-y-4 rounded-2xl border border-line bg-surface/60 p-8 backdrop-blur-sm"
        >
          {/* Name + Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60 transition-colors"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60 transition-colors"
            />
          </div>

          {/* Project type */}
          <div className="relative">
            <select name="projectType" defaultValue="" className={selectClass}>
              <option value="" disabled className="bg-surface text-muted">
                — Select project type —
              </option>
              {PROJECT_TYPES.map((t) => (
                <option key={t.value} value={t.value} className="bg-surface text-ink">
                  {t.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs">▾</span>
          </div>

          {/* Budget */}
          <div className="relative">
            <select name="budget" defaultValue="" className={selectClass}>
              <option value="" disabled className="bg-surface text-muted">
                — Select budget range —
              </option>
              {BUDGET_RANGES.map((b) => (
                <option key={b.value} value={b.value} className="bg-surface text-ink">
                  {b.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs">▾</span>
          </div>

          {/* Message */}
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project — what are you building, what problem does it solve?"
            className="w-full resize-none rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60 transition-colors"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_rgba(129,140,248,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(129,140,248,0.45)] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message →"}
          </button>

          {status === "sent" && (
            <div className="rounded-xl border border-accent/30 bg-accent/10 px-5 py-4 text-sm">
              <p className="font-semibold text-accent">✓ Message received!</p>
              <p className="mt-1 text-muted">
                We&apos;ll get back to you within 24 hours. A confirmation email is on its way.
              </p>
            </div>
          )}
          {status === "error" && (
            <p className="text-sm text-clay">
              Something went wrong. Please try the email link instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
