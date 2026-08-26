"use client";

import { useState } from "react";
import { brand } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-xl border border-line bg-surface/50 px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-accent/50"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="rounded-xl border border-line bg-surface/50 px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-accent/50"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <select
              name="projectType"
              className="rounded-xl border border-line bg-surface/50 px-4 py-3 text-sm text-muted outline-none focus:border-accent/50"
              defaultValue=""
            >
              <option value="" disabled>
                Project type
              </option>
              <option value="web-app">Web app</option>
              <option value="website">Marketing website</option>
              <option value="realtime">Real-time / SaaS</option>
              <option value="other">Something else</option>
            </select>
            <select
              name="budget"
              className="rounded-xl border border-line bg-surface/50 px-4 py-3 text-sm text-muted outline-none focus:border-accent/50"
              defaultValue=""
            >
              <option value="" disabled>
                Budget range
              </option>
              <option value="<50k">Under ₹50k</option>
              <option value="50k-2l">₹50k – ₹2L</option>
              <option value="2l+">₹2L+</option>
            </select>
          </div>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="What are you building?"
            className="w-full rounded-xl border border-line bg-surface/50 px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-accent/50"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-accent">Message received — we&apos;ll be in touch.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-clay">Something went wrong. Try the email link instead.</p>
          )}
        </form>
      </div>
    </section>
  );
}
