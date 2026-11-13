import Image from "next/image";

type PageBannerProps = {
  title: string;
};

/** Photo banner at the top of inner pages (was the `pageBanner` partial). */
export function PageBanner({ title }: PageBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-night">
      <Image
        src="/assets/img/photos/bg-inner.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-ink/65" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 py-24 text-center md:py-32 lg:px-8">
        <h1 className="text-4xl font-bold text-white md:text-6xl">{title}.</h1>
      </div>
    </section>
  );
}
