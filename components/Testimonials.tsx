
import ReviewForm from "@/components/ReviewForm";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating?: number;
  order: number;
};

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
};

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "star-filled" : "star-empty"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Generate a deterministic hue from the name
  const hue = name
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 360;

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-medium text-bg"
      style={{ background: `hsl(${hue}, 60%, 55%)` }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default function Testimonials({
  testimonials,
  reviews,
}: {
  testimonials: Testimonial[];
  reviews: Review[];
}) {
  // If there are no testimonials yet, show placeholder cards
  const items: Testimonial[] =
    testimonials.length > 0
      ? testimonials
      : [
          {
            id: "p1",
            name: "Rahul Sharma",
            role: "Founder",
            company: "PropStar India",
            quote:
              "Ritbha delivered our real estate platform ahead of schedule. Clean code, great communication throughout.",
            rating: 5,
            order: 1,
          },
          {
            id: "p2",
            name: "Priya Mehta",
            role: "Owner",
            company: "MM Beauty Parlour",
            quote:
              "Our booking enquiries tripled after the new website launched. The design is stunning and loads fast.",
            rating: 5,
            order: 2,
          },
          {
            id: "p3",
            name: "Arun Verma",
            role: "CEO",
            company: "The Jaipuri Kapda",
            quote:
              "The e-commerce store works flawlessly — payments, orders, inventory. Exactly what we needed.",
            rating: 5,
            order: 3,
          },
        ];

  const reviewItems: Testimonial[] = reviews.map((review) => ({
    id: review.id,
    name: review.name,
    role: "Verified reviewer",
    company: "Google account",
    quote: review.comment,
    rating: review.rating,
    order: 0,
  }));

  return (
    <section id="testimonials" className="border-b border-line">
      <div className="mx-auto max-w-wrap px-6 py-24">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow">What clients say</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
              Notes from people we&apos;ve built with.
            </h2>
          </div>
          {/* Overall rating badge */}
          <div className="hidden flex-col items-end gap-1 md:flex">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl text-ink">5.0</span>
              <svg className="h-5 w-5 star-filled" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-xs text-muted">Based on client reviews</p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[...reviewItems, ...items].map((t) => (
            <figure
              key={t.name}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-surface/50 p-7 transition-all duration-300 hover:border-accent/30 hover:bg-surface2 hover:shadow-[0_0_32px_rgba(129,140,248,0.07)]"
            >
              {/* Stars */}
              <Stars rating={t.rating ?? 5} />

              {/* Quote */}
              <blockquote className="mt-4 font-display text-lg leading-snug italic text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar name={t.name} />
                <div>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <ReviewForm />
      </div>
    </section>
  );
}
