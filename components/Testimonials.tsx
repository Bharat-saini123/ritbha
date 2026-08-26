type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  order: number;
};

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-wrap px-6 py-24">
        <p className="eyebrow">What clients say</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
          Notes from people we&apos;ve built with.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-line bg-surface/50 p-7"
            >
              <blockquote className="font-display text-lg leading-snug italic text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="text-ink">{t.name}</span>
                <span className="text-muted"> · {t.role}, {t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
