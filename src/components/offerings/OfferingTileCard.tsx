import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { SectionLink } from "@/components/ui/SectionLink";
import type { OfferingTile } from "@/content/offerings";

type OfferingTileCardProps = { tile: OfferingTile; large?: boolean; className?: string };

/** A full-bleed photo tile; the whole card links to where you can learn more. */
export function OfferingTileCard({ tile, large = false, className = "" }: OfferingTileCardProps) {
  return (
    <li className={`group relative isolate flex min-h-[340px] flex-col lg:min-h-0 overflow-hidden rounded-[28px] bg-night ${className}`}>
      <Image
        src={tile.photo}
        alt={tile.photoAlt}
        fill
        sizes={large ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, 100vw"}
        className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-30% via-ink/80 to-ink/10" aria-hidden="true" />

      <div className="flex flex-1 flex-col justify-end p-6 text-white sm:p-7">
        <p className={`text-sm font-bold text-brand ${large ? "" : "lg:hidden"}`}>{tile.kicker}</p>
        <h2 className={`mt-1 font-extrabold tracking-tight ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          <SectionLink href={tile.href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {tile.name}
          </SectionLink>
        </h2>
        <p className={`mt-2 text-white/85 ${large ? "max-w-md text-lg" : ""}`}>{tile.body}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="flex flex-wrap gap-1.5">
            {tile.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold" aria-hidden="true">
            {tile.linkLabel}
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
      {/* Focus ring for the stretched link */}
      <span className="pointer-events-none absolute inset-0 rounded-[28px] ring-brand ring-offset-2 group-has-[:focus-visible]:ring-4" aria-hidden="true" />
    </li>
  );
}
