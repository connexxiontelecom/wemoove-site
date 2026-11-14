import { Icon } from "@/components/ui/Icon";
import { careers } from "@/content/careers";

const { teams } = careers;

export function CareersTeams() {
  return (
    <section aria-labelledby="teams-title" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-bold text-muted">{teams.eyebrow}</p>
          <h2 id="teams-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {teams.title}
          </h2>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {teams.items.map((team, i) => (
            <li key={team.title} className="flex gap-5 rounded-3xl border border-line bg-white p-6 sm:p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                <Icon name={team.icon} className="h-6 w-6" />
              </span>
              <span>
                <span className="text-sm font-bold text-muted">0{i + 1}</span>
                <h3 className="text-xl font-bold">{team.title}</h3>
                <p className="mt-1.5 text-muted">{team.body}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
