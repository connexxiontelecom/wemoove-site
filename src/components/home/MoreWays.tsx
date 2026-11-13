"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { ServiceVisual } from "@/components/home/ServiceVisual";
import { Icon } from "@/components/ui/Icon";
import { home } from "@/content/home";

const { moreWays } = home;

export function MoreWays() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabList = useRef<HTMLDivElement>(null);
  const service = moreWays.services[active];

  // Select a service and, on mobile, scroll the tab row so it is visible (never scrolls the page).
  const select = (i: number) => {
    setActive(i);
    const list = tabList.current;
    const tab = tabs.current[i];
    if (list && tab && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - 24, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = moreWays.services.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? active === last ? 0 : active + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? active === 0 ? last : active - 1
          : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section id="more-rides" aria-labelledby="more-title" className="bg-brand/15">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="font-bold text-muted">{moreWays.eyebrow}</p>
          <h2 id="more-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {moreWays.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{moreWays.body}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
          <div className="flex flex-col gap-6">
          {/* Selector: a scrolling row on mobile, a vertical list on desktop */}
          <div
            ref={tabList}
            role="tablist"
            aria-label="WeMoove services"
            className="-mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {moreWays.services.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`service-tab-${s.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="service-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={onKeyDown}
                  className={`flex min-h-16 shrink-0 snap-start items-center gap-4 rounded-2xl border p-4 text-left transition-colors lg:w-full ${
                    selected ? "border-ink bg-ink text-white shadow-xl shadow-ink/20" : "border-line bg-white text-ink hover:border-ink/30"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${selected ? "bg-brand text-ink" : "bg-brand/25 text-ink"}`}
                  >
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="pr-2">
                    <span className="block whitespace-nowrap text-lg font-bold">{s.name}</span>
                    <span className={`block whitespace-nowrap text-sm ${selected ? "text-white/75" : "text-muted"}`}>{s.short}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop: what's coming next, under the selector */}
          <div className="mt-auto hidden rounded-2xl border border-dashed border-ink/25 p-5 lg:block">
            <p className="flex items-center gap-2 text-sm font-bold text-muted">
              <Icon name="map" className="h-4 w-4" />
              {moreWays.comingNext.label}
            </p>
            <p className="mt-2 text-lg font-bold">{moreWays.comingNext.title}</p>
            <p className="mt-1 text-muted">{moreWays.comingNext.body}</p>
          </div>
          </div>

          {/* Display panel */}
          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${service.id}`}
            className="overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-ink/10"
          >
            <div className="relative aspect-[16/10] bg-map">
              <ServiceVisual service={service} />
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-bold text-ink shadow-sm">
                {service.kind}
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={service.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: reduceMotion ? 0 : 0.12 } }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="grid gap-6 p-6 md:grid-cols-[1.2fr_1fr] md:p-8"
              >
                <div>
                  <h3 className="text-2xl font-extrabold md:text-3xl">{service.tagline}</h3>
                  <p className="mt-3 text-lg text-muted">{service.body}</p>
                  <a
                    href="#download"
                    className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brand px-6 font-semibold text-ink transition-colors hover:bg-brand-strong"
                  >
                    {moreWays.cta}
                    <span className="sr-only"> to book {service.name}</span>
                  </a>
                </div>
                <ul className="space-y-3 self-center">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      <span className="font-semibold">{point}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
