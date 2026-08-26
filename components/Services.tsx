"use client";

import { pricingNote, brand } from "@/lib/data";

// Map service titles → Contact form projectType option values
const SERVICE_TO_TYPE: Record<string, string> = {
  "Business Website":      "business-website",
  "E-commerce Store":      "ecommerce",
  "Custom Web App":        "web-app",
  "Care & Support Plan":   "support-plan",
};

// Icon per service
const SERVICE_ICON: Record<string, string> = {
  "Business Website":    "🌐",
  "E-commerce Store":    "🛒",
  "Custom Web App":      "⚙️",
  "Care & Support Plan": "🛡️",
};

type Service = {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  order: number;
};

function scrollToContact(serviceTitle: string) {
  // Pre-fill the projectType select in the contact form
  const select = document.querySelector<HTMLSelectElement>(
    "select[name='projectType']"
  );
  if (select) {
    const value = SERVICE_TO_TYPE[serviceTitle] ?? "";
    select.value = value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }
  // Smooth scroll to contact section
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="border-b border-line">
      <div className="mx-auto max-w-wrap px-6 py-24">
        <p className="eyebrow">Services &amp; Pricing</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
          Straightforward pricing, built for a first project.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{pricingNote}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-surface/60 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface2 hover:shadow-[0_0_32px_rgba(129,140,248,0.08)]"
            >
              <div>
                {/* Icon + title */}
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-2xl leading-none" aria-hidden>
                    {SERVICE_ICON[s.title] ?? "✦"}
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-snug">{s.title}</h3>
                    <p className="mt-0.5 font-mono text-sm text-accent">{s.price}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-muted">{s.description}</p>

                {/* Features */}
                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted">
                      <svg
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M2.5 7.5L5.5 10.5L11.5 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToContact(s.title)}
                className="mt-7 w-full rounded-full border border-accent/30 bg-accent/5 px-4 py-2.5 text-center text-xs font-medium text-accent transition-all duration-200 hover:bg-accent hover:text-bg"
              >
                Get this quoted →
              </button>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-line bg-surface/40 px-6 py-5 text-sm">
          <span className="text-muted">Prefer to talk it through?</span>
          <a href={`tel:${brand.phone}`} className="text-ink hover:text-accent">
            {brand.phone}
          </a>
          <a href={`mailto:${brand.email}`} className="text-ink hover:text-accent">
            {brand.email}
          </a>
        </div>
      </div>
    </section>
  );
}
