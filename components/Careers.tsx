import { careers } from "@/lib/data";

export default function Careers() {
  return (
    <section id="careers" className="border-b border-line">
      <div className="mx-auto max-w-wrap px-6 py-24">
        <div className="rounded-2xl border border-line bg-surface/50 p-10 text-center">
          <p className="eyebrow">{careers.eyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-lg font-display text-2xl leading-tight md:text-3xl">
            {careers.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            {careers.description}
          </p>
          <a
            href="#contact"
            className="mt-7 inline-block rounded-full border border-accent/40 px-6 py-3 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            {careers.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
