"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BikeDeliveryScene } from "@/components/illustrations/BikeDeliveryScene";
import { CarScene } from "@/components/illustrations/CarScene";
import { SceneBackdrop } from "@/components/illustrations/SceneBackdrop";
import { TruckDeliveryScene } from "@/components/illustrations/TruckDeliveryScene";
import type { MoreWayService } from "@/content/home";

/** A real photo when one is set in content, otherwise the illustrated scene with the vehicle driving in. */
export function ServiceVisual({ service }: { service: MoreWayService }) {
  const reduceMotion = useReducedMotion();

  if (service.photo) {
    return (
      <Image
        src={service.photo}
        alt={`${service.name}: ${service.tagline}`}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />
    );
  }

  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" role="img" aria-label={`Illustration: ${service.name}`}>
      <SceneBackdrop />
      <m.g
        key={service.id}
        initial={reduceMotion ? false : { x: -90, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        {service.scene === "bike" && <BikeDeliveryScene />}
        {service.scene === "truck" && <TruckDeliveryScene />}
        {(service.scene === "executive" || service.scene === "premium") && <CarScene variant={service.scene} />}
      </m.g>
    </svg>
  );
}
