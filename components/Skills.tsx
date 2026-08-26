type SkillCategory = {
  id: string;
  label: string;
  icon: string;
  order: number;
  skills: { id: string; name: string }[];
};

export default function Skills({ categories }: { categories: SkillCategory[] }) {
  return (
    <section id="skills" className="border-b border-line">
      <div className="mx-auto max-w-wrap px-6 py-24">
        <p className="eyebrow">Skills</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
          Four rings, one trunk — the stack we build with.
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="group relative rounded-2xl border border-line bg-surface/50 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <h3 className="font-display text-lg">{cat.label}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors group-hover:text-ink"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
