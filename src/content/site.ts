import type { IconName } from "@/components/ui/Icon";

/**
 * Site-wide content: brand, contact details, links, navigation.
 * Values in [SQUARE_BRACKETS] are PLACEHOLDERS that must be replaced before launch.
 */

/** `children` turns the item into a dropdown; `href` is then the section it belongs to. */
export type NavLink = { label: string; href: string; children?: { label: string; href: string; description?: string }[] };
export type FooterItem = { label: string; href?: string; comingSoon?: boolean };
/** `href: null` hides the icon until the account exists. */
export type SocialLink = { label: string; href: string | null; icon: IconName };

const EMAIL = "info@connexxiontelecom.com";

export const site = {
  name: "WeMoove",
  tagline: "Convenient & Safe Ride Sharing",
  description:
    "WeMoove is a safe, convenient ride sharing app in Abuja. Book a car to yourself, or tag along with riders going your way and pay less.",
  // NEXT_PUBLIC_SITE_URL wins (set it on cPanel). On Vercel previews, fall back to the deployment's own URL.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : "http://localhost:3000"),
  company: "Connexxion Telecom",

  contact: {
    address: "No. 2A Iller Crescent, Maitama, Abuja.",
    email: EMAIL,
    phone: "+234 (0) 916 159 0000",
    phoneHref: "tel:+2349161590000",
  },

  stores: {
    /** App Store listing. Set to null to show a "Coming soon" badge instead. */
    appStore: "https://apps.apple.com/us/app/wemoove-v2/id6816731658" as string | null,
    playStore: "https://play.google.com/store/apps/details?id=com.connexxion.weemove.wemoove_v2",
  },

  social: [
    { label: "WeMoove on X", href: null, icon: "x" }, // Add the X profile URL when available
    { label: "WeMoove on Facebook", href: null, icon: "facebook" }, // Add the Facebook page URL when available
    { label: "WeMoove on Instagram", href: "https://www.instagram.com/wemoove_cnx/", icon: "instagram" },
  ] satisfies SocialLink[],

  nav: [
    { label: "Ride", href: "/ride" },
    { label: "Drive & Earn", href: "/drive" },
    {
      label: "Safety",
      href: "/safety",
      children: [
        { label: "For passengers", href: "/safety/passengers", description: "Panic button, trip sharing and tips" },
        { label: "For drivers", href: "/safety/drivers", description: "Know who you pick up, panic mode, tips" },
      ],
    },
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
          { label: "Careers", href: "/careers" },
          { label: "Blog", comingSoon: true },
        ],
      },
      {
        title: "Services",
        items: [
          { label: "Ride", href: "/ride" },
          { label: "Drive & Earn", href: "/drive" },
          { label: "Deliveries", href: "/#more-rides" },
          { label: "Interstate", comingSoon: true },
        ],
      },
      {
        title: "Support",
        items: [
          { label: "Passenger safety", href: "/safety/passengers" },
          { label: "Driver safety", href: "/safety/drivers" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ] satisfies { title: string; items: FooterItem[] }[],
  },

  /** Every public page, used for sitemap.xml. */
  routes: ["/", "/ride", "/drive", "/about", "/how-it-works", "/our-offerings", "/careers", "/contact", "/safety/passengers", "/safety/drivers", "/privacy-policy"],
} as const;
