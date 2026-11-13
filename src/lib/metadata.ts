import type { Metadata } from "next";
import { site } from "@/content/site";

const SUFFIX = `${site.name} - ${site.tagline}`;

type PageMeta = {
  /** Page name, e.g. "About WeMoove". Omit for the home page. */
  title?: string;
  description: string;
  path: string;
};

/** Builds page metadata. Titles match the old Express site exactly to protect SEO. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${SUFFIX}` : SUFFIX;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_NG",
      title: fullTitle,
      description,
      url: path,
    },
  };
}
