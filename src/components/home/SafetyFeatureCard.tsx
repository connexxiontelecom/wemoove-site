"use client";

import { m } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import type { SafetyFeature } from "@/content/home";

export function SafetyFeatureCard({ feature, index }: { feature: SafetyFeature; index: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <m.span
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-ink"
        initial={reduceMotion ? false : { scale: 0.6, rotate: -12, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 16, delay: index * 0.08 }}
      >
        <Icon name={feature.icon} className="h-6 w-6" />
      </m.span>
      <h3 className="mt-4 text-xl font-bold text-white">{feature.title}</h3>
      <p className="mt-2 text-white/80">{feature.body}</p>
    </li>
  );
}
