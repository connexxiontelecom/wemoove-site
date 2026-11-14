import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

const { office, channels } = contact;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.address.replace(/\.$/, "") + ", Nigeria")}`;

/** Office address with a stylised map (no third-party embed) and a link out to Google Maps. */
export function ContactOffice() {
  return (
    <section id="office" aria-labelledby="office-title" className="scroll-mt-24 bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p data-reveal className="font-bold text-muted">{office.eyebrow}</p>
          <h2 id="office-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {office.title}
          </h2>
          <address data-reveal className="mt-6 not-italic">
            <span className="block text-sm font-bold text-muted">{office.company}</span>
            <span className="mt-1 block text-2xl font-bold">{site.contact.address}</span>
            <span className="mt-1 block text-muted">{channels.visit.note}</span>
          </address>
          <a
            data-reveal
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-[background-color,scale] hover:bg-night active:scale-[0.97]"
          >
            <Icon name="map" />
            {office.mapLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <a
          data-reveal="zoom"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${office.mapLabel}: ${site.contact.address} (opens in a new tab)`}
          className="group relative block aspect-[4/3] overflow-hidden rounded-[32px] bg-map shadow-xl shadow-ink/10 ring-1 ring-line"
        >
          <svg viewBox="0 0 400 300" className="h-full w-full transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
            <defs>
              <pattern id="office-grid" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
                <path d="M0 0H14M0 0V14" className="stroke-road-edge" strokeWidth={0.8} fill="none" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#office-grid)" />
            <path d="M-20 70 C120 60 240 110 420 80" className="stroke-white" strokeWidth={16} fill="none" />
            <path d="M120 -20 C140 100 150 200 130 320" className="stroke-white" strokeWidth={12} fill="none" />
            <path d="M-20 220 C100 200 300 240 420 210" className="stroke-white" strokeWidth={10} fill="none" />
            <path d="M290 -20 C270 120 300 200 280 320" className="stroke-white" strokeWidth={9} fill="none" />
            <ellipse cx="330" cy="150" rx="46" ry="30" className="fill-park" />
            <ellipse cx="60" cy="140" rx="34" ry="22" className="fill-park" />
            <text x="66" y="56" className="fill-map-label text-[11px] font-bold uppercase tracking-[0.2em]">Maitama</text>
          </svg>
          {/* Pin */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <span className="absolute left-1/2 top-full h-3 w-10 -translate-x-1/2 rounded-full bg-ink/20 blur-sm" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full rounded-br-none bg-brand text-ink shadow-xl ring-4 ring-white [transform:rotate(45deg)]">
              <span className="[transform:rotate(-45deg)]">
                <Icon name="pin" className="h-6 w-6" />
              </span>
            </span>
          </span>
          <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/95 px-4 py-3 text-sm font-bold shadow-lg">
            {site.contact.address}
            <Icon name="arrowRight" className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
          </span>
        </a>
      </div>
    </section>
  );
}
