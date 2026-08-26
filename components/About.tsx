import { about } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto grid max-w-wrap gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
            {about.heading}
          </h2>
        </div>

        <div>
          {about.paragraphs.map((p) => (
            <p key={p} className="mb-4 text-[15px] leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <ul className="mt-6 space-y-3">
            {about.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
