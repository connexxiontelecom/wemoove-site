import { OfferingTileCard } from "@/components/offerings/OfferingTileCard";
import { offerings } from "@/content/offerings";

const { hero, tiles } = offerings;
// Ride is the big tile; Drive spans the top right; the two deliveries share the bottom right.
const layout = ["lg:col-span-2 lg:row-span-2", "lg:col-span-2", "", ""];

export function OfferingsHero() {
  return (
    <section aria-labelledby="offerings-title" className="bg-dot-grid bg-paper">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid animate-rise items-end gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-bold">
              <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 id="offerings-title" className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              {hero.title}
            </h1>
          </div>
          <p className="text-lg text-muted">{hero.body}</p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:auto-rows-[290px] lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <OfferingTileCard key={tile.id} tile={tile} large={i === 0} className={`${layout[i]} ${i === 0 ? "md:col-span-2" : ""}`} />
          ))}
        </ul>
      </div>
    </section>
  );
}
