import { Icon } from "@/components/ui/Icon";
import { drive } from "@/content/drive";

const { benefits } = drive;

export function DriveBenefits() {
  return (
    <section aria-labelledby="benefits-title" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-bold text-muted">{benefits.eyebrow}</p>
          <h2 id="benefits-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {benefits.title}
          </h2>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((b, i) => (
            <li
              key={b.title}
              className={`rounded-3xl p-6 sm:p-7 ${i === 0 ? "bg-brand" : "border border-line bg-white"}`}
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "bg-ink text-brand" : "bg-brand/20 text-ink"}`}>
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{b.title}</h3>
              <p className={`mt-1.5 ${i === 0 ? "text-ink/85" : "text-muted"}`}>{b.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
