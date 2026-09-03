import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-line">
      <div className="mx-auto max-w-wrap px-6 py-24">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
              The journey so far.
            </h2>
          </div>
          <span className="section-counter hidden md:block">06 / 07</span>
        </div>

        {/* Timeline */}
        <div className="relative mt-16 ml-4 pl-8">
          {/* Vertical spine */}
          <div className="timeline-line" />

          <div className="flex flex-col gap-12">
            {experience.map((item, idx) => (
              <div key={idx} className="group relative">
                {/* Glowing dot */}
                <div className="timeline-dot" />

                {/* Card */}
                <div className="rounded-2xl border border-line bg-surface/50 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-surface2 hover:shadow-[0_0_32px_rgba(129,140,248,0.07)]">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl leading-snug">{item.role}</h3>
                      <p className="mt-0.5 text-sm text-accent">{item.company}</p>
                    </div>
                    <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
                      {item.period}
                    </span>
                  </div>

                  {item.description && (
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  )}

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[0.6rem] text-muted/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
