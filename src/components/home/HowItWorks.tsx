"use client";

import { AnimatePresence, m } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { useCallback, useState } from "react";
import { HowItWorksStep } from "@/components/home/HowItWorksStep";
import { StepVisual } from "@/components/home/StepVisual";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { home } from "@/content/home";

const { howItWorks } = home;

export function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const onActive = useCallback((i: number) => setActive(i), []);

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <p data-reveal className="font-bold text-muted">{howItWorks.eyebrow}</p>
        <h2 id="how-title" data-reveal className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">
          {howItWorks.title}
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Desktop: sticky phone whose screen follows the step in view */}
          <div className="hidden md:block">
            <div className="sticky top-28 flex justify-center">
              <PhoneFrame size="md">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={active}
                    className="relative h-full"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                  >
                    <StepVisual step={howItWorks.steps[active]} index={active} variant="phone" />
                  </m.div>
                </AnimatePresence>
              </PhoneFrame>
            </div>
          </div>

          <ol className="space-y-12 md:space-y-0">
            {howItWorks.steps.map((step, i) => (
              <HowItWorksStep key={step.title} step={step} index={i} active={i === active} onActive={onActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
