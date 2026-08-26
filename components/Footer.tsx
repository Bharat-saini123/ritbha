import { brand } from "@/lib/data";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-wrap flex-col items-center justify-between gap-4 px-6 py-10 text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {brand.name}. Built by {brand.founder}.
        </p>
        <div className="flex gap-6">
          <a href={brand.github} target="_blank" rel="noreferrer" className="hover:text-ink">
            GitHub
          </a>
          <a href={brand.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
