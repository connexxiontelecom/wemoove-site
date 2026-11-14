import { Icon } from "@/components/ui/Icon";
import { careers } from "@/content/careers";
import { site } from "@/content/site";
import { careersMailto } from "@/lib/careers";

const { roles, apply } = careers;

/** Open roles from content (or an open-application card when there are none), then how to apply. */
export function CareersRoles() {
  return (
    <section id="roles" aria-labelledby="roles-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <p className="font-bold text-muted">{roles.eyebrow}</p>
        <h2 id="roles-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          {roles.title}
        </h2>

        {roles.items.length > 0 ? (
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {roles.items.map((role) => (
              <li key={role.title} className="flex flex-wrap items-center gap-4 py-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">{role.title}</h3>
                  <p className="mt-1 text-muted">{role.summary}</p>
                  <p className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
                    {[role.team, role.type, role.location].map((tag) => (
                      <span key={tag} className="rounded-full bg-paper px-3 py-1 ring-1 ring-line">
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>
                <a
                  href={careersMailto(role.title)}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-colors hover:bg-night"
                >
                  {roles.applyLabel}
                  <span className="sr-only"> for {role.title}</span>
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-6 rounded-3xl border-2 border-dashed border-line bg-paper p-8 sm:flex-row sm:items-center sm:p-10">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-ink">
              <Icon name="mail" className="h-7 w-7" />
            </span>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{roles.empty.title}</h3>
              <p className="mt-1 max-w-xl text-muted">{roles.empty.body}</p>
            </div>
            <a
              href={careersMailto()}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-colors hover:bg-night"
            >
              {roles.empty.cta}
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </div>
        )}

        <div className="mt-20">
          <p className="font-bold text-muted">{apply.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">{apply.title}</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {apply.steps.map((step, i) => (
              <li key={step.title} className="rounded-3xl bg-paper p-6 ring-1 ring-line">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-extrabold">{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            <a href={careersMailto()} className="font-semibold text-ink underline underline-offset-4">
              {site.contact.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
