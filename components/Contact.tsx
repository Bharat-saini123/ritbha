"use client";

import { useState } from "react";
import { brand } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const selectClass =
  "w-full appearance-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent/60 cursor-pointer transition-colors hover:border-line/80";

const PROJECT_TYPES = [
  { value: "business-website", label: "Business Website" },
  { value: "ecommerce", label: "E-commerce Store" },
  { value: "web-app", label: "Custom Web App" },
  { value: "saas", label: "SaaS / Real-time App" },
  { value: "landing-page", label: "Landing Page" },
  { value: "support-plan", label: "Care & Support Plan" },
  { value: "other", label: "Something else" },
];

const BUDGET_RANGES = [
  { value: "under-2k", label: "Under ₹2,000" },
  { value: "2k-5k", label: "₹2,000 – ₹5,000" },
  { value: "5k-10k", label: "₹5,000 – ₹10,000" },
  { value: "10k-25k", label: "₹10,000 – ₹25,000" },
  { value: "25k-50k", label: "₹25,000 – ₹50,000" },
  { value: "50k-1l", label: "₹50,000 – ₹1,00,000" },
  { value: "1l+", label: "Above ₹1,00,000" },
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
    <section id="contact" className="border-b border-line">
      <div className="mx-auto grid max-w-wrap gap-14 px-6 py-24 md:grid-cols-2">
        {/* ── Left column ── */}
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
            Have an idea worth growing?
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Tell us what you&apos;re building. We reply within a day, usually sooner.
          </p>

          <div className="mt-10 space-y-4 text-sm">
            <a href={`mailto:${brand.email}`} className="block text-ink hover:text-accent">
              {brand.email}
            </a>
            <a href={`tel:${brand.phone}`} className="block text-muted hover:text-ink">
              {brand.phone}
            </a>
            <p className="text-muted">{brand.location}</p>
          </div>
        </div>

        {/* ── Right column — form ── */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name + Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60 transition-colors"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60 transition-colors"
            />
          </div>

          {/* Project type — full width */}
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
            {/* custom chevron */}
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs">
              ▾
            </span>
          </div>

          {/* Budget — full width */}
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
            {/* custom chevron */}
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs">
              ▾
            </span>
          </div>

          {/* Message */}
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project — what are you building, what problem does it solve?"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60 transition-colors resize-none"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message →"}
          </button>

          {/* Status messages */}
          {status === "sent" && (
            <div className="rounded-xl border border-accent/30 bg-accent/10 px-5 py-4 text-sm">
              <p className="font-medium text-accent">✓ Message received!</p>
              <p className="mt-1 text-muted">
                We&apos;ll get back to you within 24 hours. Check your inbox — a
                confirmation email is on its way.
              </p>
            </div>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try the email link instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
