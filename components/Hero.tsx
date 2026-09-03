import { brand, stats } from "@/lib/data";

// Tech stack badge items shown in the hero
const techStack = [
  "Next.js", "React", "Node.js", "TypeScript",
  "PostgreSQL", "Prisma", "Tailwind CSS", "Docker",
  "REST APIs", "MongoDB", "Redis", "AWS",
];

// WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = "917300165821";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line min-h-[92vh] flex flex-col"
    >
      {/* ── Ambient colour blobs (sit on top of the global video) ────────── */}
      <div
        className="pointer-events-none absolute left-[5%] top-[10%] h-[420px] w-[420px] rounded-full opacity-[0.10] blur-[100px] z-[1]"
        style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[10%] top-[20%] h-[280px] w-[280px] rounded-full opacity-[0.07] blur-[80px] z-[1]"
        style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-[2] mx-auto grid max-w-wrap gap-16 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:pt-24 flex-1">
        <div>
          <p className="eyebrow mb-6">{brand.founder} · Full-Stack Web Studio</p>
          <h1 className="font-display text-[2.6rem] leading-[1.05] tracking-tight md:text-[3.6rem]">
            We grow digital
            <br />
            products from{" "}
            <span className="italic text-accent">seed</span> to{" "}
            <span className="italic text-accent">scale</span>.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            {brand.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#portfolio"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(129,140,248,0.35)]"
            >
              See the work
            </a>
            <a
              href="#services"
              className="rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-accent/50"
            >
              See pricing
            </a>
            {/* WhatsApp CTA button */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="group inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-3 text-sm text-[#25D366] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#25D366]/70 hover:bg-[#25D366]/20 hover:shadow-[0_0_18px_rgba(37,211,102,0.25)]"
            >
              {/* WhatsApp SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Stats strip */}
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl text-accent">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right column — premium floating card */}
        <div className="relative flex flex-col items-center justify-center gap-4">

          {/* Glow blobs behind the card */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[80px]"
            style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }}
            aria-hidden="true"
          />

          {/* Main glass card */}
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface/60 shadow-2xl backdrop-blur-xl"
            style={{ boxShadow: "0 0 40px rgba(129,140,248,0.12), 0 20px 60px rgba(0,0,0,0.4)" }}
          >
            {/* Card top bar */}
            <div className="flex items-center gap-1.5 border-b border-line/60 bg-surface/40 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-[10px] text-muted/50">studio.config.ts</span>
            </div>

            {/* Code lines */}
            <div className="px-5 py-5 font-mono text-[12px] leading-7 text-muted">
              <p><span className="text-purple-400">const</span> <span className="text-sky-300">studio</span> <span className="text-muted/60">=</span> {"{"}</p>
              <p className="pl-4"><span className="text-accent">stack</span><span className="text-muted/60">:</span> [</p>
              <p className="pl-8 text-emerald-400">&quot;Next.js&quot;<span className="text-muted/60">,</span></p>
              <p className="pl-8 text-emerald-400">&quot;Node.js&quot;<span className="text-muted/60">,</span></p>
              <p className="pl-8 text-emerald-400">&quot;PostgreSQL&quot;</p>
              <p className="pl-4 text-muted/60">],</p>
              <p className="pl-4"><span className="text-accent">status</span><span className="text-muted/60">:</span> <span className="text-orange-300">&quot;accepting new projects&quot;</span><span className="text-muted/60">,</span></p>
              <p className="pl-4"><span className="text-accent">founded</span><span className="text-muted/60">:</span> <span className="text-sky-300">2021</span><span className="text-muted/60">,</span></p>
              <p>{"}"}</p>
            </div>

            {/* Glowing divider */}
            <div className="mx-5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            {/* Terminal output */}
            <div className="px-5 py-4 font-mono text-[11.5px] leading-relaxed text-muted/70">
              <p className="text-accent/80">▸ studio.status</p>
              <p className="text-emerald-400/90">✓ &quot;accepting new projects&quot;</p>

              {/* Booking badge */}
              <div className="mt-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold tracking-widest text-accent uppercase"
                  style={{ boxShadow: "0 0 12px rgba(129,140,248,0.25)" }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Booking Q4 2026
                </span>
              </div>
            </div>
          </div>

          {/* Floating skill pills */}
          <div className="flex flex-wrap justify-center gap-2 px-4">
            {["TypeScript", "REST APIs", "Prisma", "Docker"].map((s) => (
              <span
                key={s}
                className="rounded-full border border-line/60 bg-surface/40 px-3 py-1 font-mono text-[0.6rem] text-muted/60 backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tech stack badge strip ────────────────────────────────────────── */}
      <div className="relative z-[2] border-t border-line/50 bg-bg/30 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-wrap">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-3 font-mono text-[0.6rem] tracking-widest text-muted/50 uppercase">
              Tech Stack
            </span>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-surface/30 px-3 py-1 font-mono text-[0.65rem] text-muted/80 transition-colors hover:border-accent/40 hover:text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
