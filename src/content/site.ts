import type { IconName } from "@/components/ui/Icon";

/**
 * Site-wide content: brand, contact details, links, navigation.
 * Values in [SQUARE_BRACKETS] are PLACEHOLDERS that must be replaced before launch.
 */

export type NavLink = { label: string; href: string };
export type FooterItem = { label: string; href?: string; comingSoon?: boolean };
export type SocialLink = { label: string; href: string; icon: IconName };

const EMAIL = "info@connexxiontelecom.com";

export const site = {
  name: "WeMoove",
  tagline: "Convenient & Safe Ride Sharing",
  description:
    "WeMoove is a safe, convenient ride sharing app in Abuja. Book a car to yourself, or tag along with riders going your way and pay less.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  company: "Connexxion Telecom",

  contact: {
    address: "No. 2A Iller Crescent, Maitama, Abuja.",
    email: EMAIL,
    phone: "+234 (0) 916 159 0000",
    phoneHref: "tel:+2349161590000",
  },

  stores: {
    /** Set to the App Store URL once the listing is approved. While null, the badge shows "Coming soon". */
    appStore: null as string | null,
    playStore: "https://play.google.com/store/apps/details?id=com.connexxion.weemove.wemoove_v2",
  },

  driverSignupUrl: "[DRIVER_SIGNUP_URL]", // PLACEHOLDER

  social: [
    { label: "WeMoove on X", href: "[X_URL]", icon: "x" }, // PLACEHOLDER
    { label: "WeMoove on Facebook", href: "[FACEBOOK_URL]", icon: "facebook" }, // PLACEHOLDER
    { label: "WeMoove on Instagram", href: "[INSTAGRAM_URL]", icon: "instagram" }, // PLACEHOLDER
  ] satisfies SocialLink[],

  nav: [
    { label: "Ride", href: "/#ride-modes" },
    { label: "Drive & Earn", href: "/#drive" },
    { label: "Safety", href: "/safety" },
    { label: "About", href: "/about" },
  ] satisfies NavLink[],

  getApp: { label: "Get the app", href: "/#download" },

  footer: {
    blurb: "Ride solo, or tag along and pay less. Safe, convenient ride sharing across Abuja.",
    columns: [
      {
        title: "Company",
        items: [
          { label: "About", href: "/about" },
          { label: "How it works", href: "/how-it-works" },
          { label: "Our offerings", href: "/our-offerings" },
          { label: "Career", comingSoon: true },
          { label: "Blog", comingSoon: true },
        ],
      },
      {
        title: "Services",
        items: [
          { label: "Ride", href: "/#ride-modes" },
          { label: "Drive & Earn", href: "/#drive" },
          { label: "Deliveries", href: "/#more-rides" },
          { label: "Interstate", comingSoon: true },
        ],
      },
      {
        title: "Support",
        items: [
          { label: "Safety", href: "/safety" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Contact", href: `mailto:${EMAIL}` },
        ],
      },
    ] satisfies { title: string; items: FooterItem[] }[],
  },

  /** Every public page, used for sitemap.xml. */
  routes: ["/", "/about", "/how-it-works", "/our-offerings", "/safety", "/privacy-policy"],
} as const;
