// Infinite-scroll marquee ticker — sits below the Navbar.
// Duplicates the items array to create a seamless loop.
const items = [
  "FULL STACK DEVELOPMENT",
  "NEXT.JS",
  "NODE.JS",
  "POSTGRESQL",
  "REACT",
  "TYPESCRIPT",
  "WEB APPS",
  "E-COMMERCE",
  "CUSTOM CRM",
  "ROOT · BUILD · GROW",
  "TAILWIND CSS",
  "PRISMA ORM",
  "REST APIs",
  "DOCKER",
  "NARNAUL, HARYANA",
];

export default function Marquee() {
  // Duplicate so the CSS loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-b border-line bg-bg/60 py-2.5 backdrop-blur"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {doubled.map((text, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 px-6 font-mono text-[0.6rem] tracking-widest text-muted/70 uppercase"
          >
            <span className="h-1 w-1 rounded-full bg-accent/70 shrink-0" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
