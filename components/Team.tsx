import { team } from "@/lib/data";

export default function Team() {
  return (
    <section id="team" className="border-b border-line">
      <div className="mx-auto max-w-wrap px-6 py-24">
        <p className="eyebrow">Team</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
          The person behind the build.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-line bg-surface/50 p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 font-display text-lg text-accent">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="mt-4 font-display text-lg">{member.name}</h3>
              <p className="text-sm text-accent">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
