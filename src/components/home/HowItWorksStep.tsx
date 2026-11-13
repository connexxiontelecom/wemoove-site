"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { StepVisual } from "@/components/home/StepVisual";
import type { HowStep } from "@/content/home";

type HowItWorksStepProps = {
  step: HowStep;
  index: number;
  active: boolean;
  onActive: (index: number) => void;
};

export function HowItWorksStep({ step, index, active, onActive }: HowItWorksStepProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.6 });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="md:flex md:min-h-[60vh] md:items-center">
      <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-4">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold transition-colors ${
            active ? "bg-brand text-ink" : "bg-white text-ink ring-1 ring-line"
          }`}
          aria-hidden="true"
        >
          {index + 1}
        </span>
        <div>
          <h3 className="text-2xl font-bold md:text-3xl">{step.title}</h3>
          <p className="mt-2 max-w-md text-lg text-muted">{step.body}</p>
        </div>
        {/* Mobile: small illustration under each step */}
        <div className="relative col-start-2 h-56 max-w-xs overflow-hidden rounded-2xl bg-map ring-1 ring-line md:hidden">
          <StepVisual step={step} index={index} variant="card" />
        </div>
      </div>
    </li>
  );
}
