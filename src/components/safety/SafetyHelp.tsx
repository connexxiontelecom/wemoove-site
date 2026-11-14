import { Icon } from "@/components/ui/Icon";
import { safety } from "@/content/safety";
import { site } from "@/content/site";

const { help } = safety;
const action = "inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold transition-colors";

export function SafetyHelp() {
  return (
    <section id="help" aria-labelledby="help-title" className="scroll-mt-24 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 lg:grid-cols-[1.3fr_1fr] lg:px-8 lg:py-24">
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-10">
          <p className="font-bold text-muted">{help.eyebrow}</p>
          <h2 id="help-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            {help.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{help.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.contact.phoneHref} className={`${action} bg-ink text-white hover:bg-night`}>
              <Icon name="phone" />
              {help.callLabel}
              <span className="sr-only">: {site.contact.phone}</span>
            </a>
            <a href={`mailto:${site.contact.email}`} className={`${action} border border-ink/20 text-ink hover:bg-ink/5`}>
              <Icon name="mail" />
              {help.emailLabel}
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            {site.contact.phone} · {site.contact.email}
          </p>
        </div>

        <div className="flex flex-col rounded-3xl bg-pin p-6 text-white sm:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-pin">
            <Icon name="sos" className="h-6 w-6" />
          </span>
          <h3 className="mt-6 text-2xl font-extrabold">{help.emergency.title}</h3>
          <p className="mt-3 text-white">{help.emergency.body}</p>
          <a href={help.emergency.href} className={`${action} mt-8 self-start bg-white text-ink hover:bg-paper`}>
            <Icon name="phone" />
            {help.emergency.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
