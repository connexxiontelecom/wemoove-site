"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { safety } from "@/content/safety";
import { useReducedMotion } from "@/lib/motion";

const { sos } = safety;

/** Panic button: one dropdown for passengers and one for drivers, each with the app's own screens. */
export function SafetySOS() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<string | null>(sos.groups[0].id);

  return (
    <section id="sos" aria-labelledby="sos-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p data-reveal className="inline-flex items-center gap-2 font-bold text-pin">
            <Icon name="sos" className="h-5 w-5" />
            {sos.eyebrow}
          </p>
          <h2 id="sos-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {sos.title}
          </h2>
          <p data-reveal className="mt-4 text-lg text-muted">{sos.body}</p>
        </div>

        <div data-reveal className="mt-10 space-y-4">
          {sos.groups.map((group) => {
            const expanded = open === group.id;
            const panelId = `sos-panel-${group.id}`;
            return (
              <div
                key={group.id}
                className={`overflow-hidden rounded-3xl border transition-colors ${expanded ? "border-ink/20 bg-paper" : "border-line bg-white"}`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : group.id)}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                        expanded ? "bg-pin text-white" : "bg-paper text-ink"
                      }`}
                    >
                      <Icon name={group.id === "drivers" ? "car" : "user"} className="h-6 w-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xl font-extrabold">{group.label}</span>
                      <span className="mt-0.5 block text-muted">{group.summary}</span>
                    </span>
                    <Icon
                      name="chevronDown"
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <m.div
                      id={panelId}
                      key="panel"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 px-5 pb-6 sm:px-6 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12">
                        <ol className="space-y-3">
                          {group.steps.map((step, i) => (
                            <li key={step.title} className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 sm:p-5">
                              <span
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${i === 0 ? "bg-pin text-white" : "bg-paper text-ink"}`}
                              >
                                <Icon name={step.icon} className="h-5 w-5" />
                              </span>
                              <span>
                                <span className="block font-bold">
                                  <span className="sr-only">Step {i + 1}: </span>
                                  {step.title}
                                </span>
                                <span className="mt-0.5 block text-muted">{step.body}</span>
                              </span>
                            </li>
                          ))}
                        </ol>

                        {/* The app's own screens; scrolls sideways on phones */}
                        <ul className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:pb-0">
                          {group.screens.map((screen) => (
                            <li key={screen.src} className="w-[168px] shrink-0 snap-start sm:w-[188px]">
                              <div className="rounded-[26px] bg-night p-1.5 shadow-xl shadow-ink/15">
                                <div className="relative aspect-[375/812] overflow-hidden rounded-[21px] bg-map">
                                  <Image src={screen.src} alt={screen.alt} fill sizes="188px" className="object-cover" />
                                </div>
                              </div>
                              <p className="mt-2.5 text-center text-sm font-semibold text-muted">{screen.label}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
