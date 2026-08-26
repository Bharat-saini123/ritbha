import { pricingNote, brand } from "@/lib/data";

type Service = {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  order: number;
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="border-b border-line">
      <div className="mx-auto max-w-wrap px-6 py-24">
        <p className="eyebrow">Services & Pricing</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
          Straightforward pricing, built for a first project.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{pricingNote}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex flex-col justify-between rounded-2xl border border-line bg-surface/50 p-6 transition-colors hover:bg-surface2"
            >
              <div>
                <h3 className="font-display text-lg">{s.title}</h3>
                <p className="mt-1 font-mono text-sm text-accent">{s.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-2 text-xs text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-6 inline-block rounded-full border border-line px-4 py-2 text-center text-xs text-ink transition-colors hover:border-accent/50"
              >
                Get this quoted
              </a>
            </div>
          ))}
        </div>

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
