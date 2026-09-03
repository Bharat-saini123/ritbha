import { brand, stats } from "@/lib/data";

// Tech stack badge items shown in the hero
const techStack = [
  "Next.js", "React", "Node.js", "TypeScript",
  "PostgreSQL", "Prisma", "Tailwind CSS", "Docker",
  "REST APIs", "MongoDB", "Redis", "AWS",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line min-h-[92vh] flex flex-col"
    >
      {/* ── Background video ─────────────────────────────────────────────── */}
      {/*
        Using a free Pexels embed (dark tech/code atmosphere).
        Replace the src with your own .mp4 in /public if you have one.
        e.g. src="/hero-bg.mp4"
      */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
      >
        <source
          src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Gradient overlay on top of video ─────────────────────────────── */}
      <div className="hero-video-overlay" />

      {/* ── Ambient colour blobs ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute left-[5%] top-[10%] h-[420px] w-[420px] rounded-full opacity-[0.07] blur-[100px] z-[2]"
        style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute right-[10%] top-[20%] h-[280px] w-[280px] rounded-full opacity-[0.05] blur-[80px] z-[2]"
        style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-[3] mx-auto grid max-w-wrap gap-16 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:pt-24 flex-1">
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

        {/* 3D ring cluster — right column */}
        <div className="relative flex items-center justify-center [perspective:1200px]">
          <div className="relative aspect-square w-full max-w-sm [transform-style:preserve-3d]">
            <div
              className="ring-field"
              style={{ inset: "0%", transform: "rotateX(58deg) rotateZ(6deg)" }}
            />
            <div
              className="ring-field"
              style={{ inset: "10%", transform: "rotateX(58deg) rotateZ(6deg)" }}
            />
            <div
              className="ring-field"
              style={{ inset: "20%", transform: "rotateX(58deg) rotateZ(6deg)" }}
            />
            <div
              className="ring-field"
              style={{ inset: "30%", transform: "rotateX(58deg) rotateZ(6deg)" }}
            />
            <div
              className="absolute inset-[40%] rounded-full bg-accent/90 blur-[1px]"
              style={{
                transform: "translateZ(60px)",
                boxShadow: "0 0 60px 10px rgba(129,140,248,0.35)",
              }}
            />

            {/* Terminal card */}
            <div className="absolute -bottom-8 left-1/2 w-[86%] -translate-x-1/2 rounded-2xl border border-line bg-surface/90 p-5 font-mono text-[12.5px] leading-relaxed text-muted shadow-2xl backdrop-blur">
              <p className="text-accent">$ studio.stack</p>
              <p>= [&quot;Next.js&quot;, &quot;Node.js&quot;, &quot;PostgreSQL&quot;]</p>
              <p className="text-accent">$ studio.status</p>
              <p>= &quot;accepting new projects&quot;</p>
              <p className="mt-2 flex items-center gap-2 text-[11px] text-muted/80">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> booking Q4 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tech stack badge strip ────────────────────────────────────────── */}
      <div className="relative z-[3] border-t border-line/50 bg-bg/40 px-6 py-4 backdrop-blur">
        <div className="mx-auto max-w-wrap">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-3 font-mono text-[0.6rem] tracking-widest text-muted/50 uppercase">
              Tech Stack
            </span>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-surface/40 px-3 py-1 font-mono text-[0.65rem] text-muted/80 transition-colors hover:border-accent/40 hover:text-accent"
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
