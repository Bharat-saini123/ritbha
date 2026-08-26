"use client";

import { useState } from "react";

const INITIAL_COUNT = 6;

type PortfolioItem = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl?: string | null;
  order: number;
};

export default function Portfolio({ portfolio }: { portfolio: PortfolioItem[] }) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? portfolio : portfolio.slice(0, INITIAL_COUNT);
  const hasMore = portfolio.length > INITIAL_COUNT;

  return (
    <section id="portfolio" className="border-b border-line">
      <div className="mx-auto max-w-wrap px-6 py-24">
        <p className="eyebrow">Portfolio</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
          Concept builds that show the range.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
          Ritbha is a new studio — these are example builds standing in for real client work
          while the first projects ship.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [perspective:1400px]">
          {visible.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface/50 transition-transform duration-300 [transform-style:preserve-3d] hover:-translate-y-1 hover:[transform:rotateX(4deg)_rotateY(-4deg)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={`${p.title} — ${p.category}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[11px] text-accent backdrop-blur">
                  {p.index}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg">{p.title}</h3>
                  <span className="text-[11px] text-muted">{p.category}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono text-[11px] text-muted/80">
                      {s}
                      <span className="text-muted/40"> · </span>
                    </span>
                  ))}
                </div>

                {/* Live site link */}
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-xs font-medium text-accent transition-all duration-200 hover:bg-accent hover:text-bg"
                  >
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 10L10 2M10 2H5M10 2V7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    View live site
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Show more / less button */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="group flex items-center gap-3 rounded-full border border-line px-8 py-3 text-sm text-muted transition-all duration-300 hover:border-accent/50 hover:text-ink"
            >
              {showAll ? (
                <>
                  <span>Show less</span>
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
                </>
              ) : (
                <>
                  <span>
                    View all {portfolio.length} projects
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
