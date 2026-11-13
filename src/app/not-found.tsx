import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | WeMoove",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-24">
      <Image
        src="/assets/img/illustrations/404.png"
        alt=""
        width={800}
        height={316}
        sizes="(min-width: 768px) 560px, 90vw"
        className="mx-auto mb-10 h-auto w-full max-w-xl"
      />
      <h1 className="mb-3 text-3xl font-bold md:text-4xl">Page Not Found</h1>
      <p className="mb-8 text-lg text-muted">
        The page you are looking for is not available or has been moved. Try a different page or go to the homepage
        with the button below.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center rounded-full bg-brand px-6 font-semibold text-ink hover:bg-brand-strong"
      >
        Go to Homepage
      </Link>
    </section>
  );
}
