import type { IconName } from "@/components/ui/Icon";

/**
 * Careers page copy.
 * To post a job, add it to `roles.items`. While the list is empty the page shows an
 * "open application" message instead, so never add placeholder roles here.
 */

export type Role = {
  title: string;
  team: string;
  /** e.g. "Full-time", "Contract" */
  type: string;
  /** e.g. "Maitama, Abuja (on-site)" */
  location: string;
  summary: string;
};

type Card = { icon: IconName; title: string; body: string };

export const careers = {
  pageName: "Careers",
  meta: {
    description:
      "Work at WeMoove and help Abuja move better. Learn what it's like to build safe, convenient ride sharing, see open roles, and send us your CV.",
  },

  hero: {
    eyebrow: "Careers at WeMoove",
    title: "Help Abuja move better.",
    body: "We're building a safer, simpler way for people to get around and earn, starting in Abuja. If that sounds like work you'd care about, we'd love to hear from you.",
    primary: { label: "See open roles", href: "#roles" },
    secondary: "Send us your CV",
  },

  why: {
    eyebrow: "Why WeMoove",
    title: "Work that shows up on the street every day.",
    items: [
      {
        icon: "car",
        title: "Build something people use daily",
        body: "Riders, drivers and senders rely on WeMoove to get where they're going. What you ship, they feel.",
      },
      {
        icon: "pin",
        title: "Built here, for here",
        body: "We're based in Maitama, in the heart of Abuja, solving a problem our own team lived with at bus stops.",
      },
      {
        icon: "shieldCheck",
        title: "Safety at the core",
        body: "WeMoove started from stories of unsafe journeys. Making every trip safer is part of everyone's job.",
      },
    ] satisfies Card[],
  },

  teams: {
    eyebrow: "Where you could fit",
    title: "The work behind every ride.",
    items: [
      {
        icon: "map",
        title: "Engineering & product",
        body: "Build and improve the WeMoove app: booking, Shared ride seats and offers, maps, payments and safety tools.",
      },
      {
        icon: "shieldCheck",
        title: "Operations",
        body: "Onboard drivers and check every driver and vehicle before their first trip, keeping the service running smoothly.",
      },
      {
        icon: "chat",
        title: "Rider & driver support",
        body: "Be the round-the-clock help riders and drivers count on, from lost items to safety concerns.",
      },
      {
        icon: "briefcase",
        title: "Growth & partnerships",
        body: "Bring WeMoove to more people and businesses across Abuja, and build the partnerships that help us grow.",
      },
    ] satisfies Card[],
  },

  values: {
    eyebrow: "How we work",
    items: ["Driven", "Innovative", "Result-oriented", "Safety first"],
    body: "We're a team of driven, innovative and result-oriented specialists, and we hire people who want to own their work and see it make a difference.",
  },

  roles: {
    eyebrow: "Open roles",
    title: "Join the team.",
    applyLabel: "Apply",
    items: [] as Role[],
    empty: {
      title: "No open roles right now",
      body: "We're not hiring for a specific role at the moment, but we're always happy to meet great people. Send us your CV and tell us where you'd fit.",
      cta: "Send an open application",
    },
  },

  apply: {
    eyebrow: "How to apply",
    title: "Three simple steps.",
    steps: [
      { title: "Email us", body: "Send your CV to our team, with the role (or the area you're interested in) in the subject line." },
      { title: "Tell us about you", body: "Add a short note on what you'd like to work on and why WeMoove." },
      { title: "We'll be in touch", body: "If there's a fit, we'll reach out to arrange a conversation." },
    ],
    subject: "Careers at WeMoove",
  },
} as const;
