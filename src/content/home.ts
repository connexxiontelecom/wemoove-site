import type { IconName } from "@/components/ui/Icon";

/**
 * Home page copy. Edit text here, not in the components.
 * Values in [SQUARE_BRACKETS] are PLACEHOLDERS.
 */

export type HowStep = { title: string; body: string };
export type ModeRow = { label: string; value: string };
export type RideModeCard = {
  id: "solo" | "shared";
  name: string;
  tagline: string;
  rows: ModeRow[];
};
export type SafetyFeature = { title: string; body: string; icon: IconName };

export const home = {
  meta: {
    description:
      "Ride sharing in Abuja with WeMoove. Book a car to yourself, or tag along with riders going your way and pay less. Safe, convenient and affordable.",
  },

  hero: {
    eyebrow: "Now launching in Abuja",
    titleStart: "Ride solo.",
    titleEnd: "Or tag along and pay less.",
    subtitle:
      "Book a car to yourself, or share the trip with people heading your way. Same safe ride, smarter price.",
    driveLink: "Drive with WeMoove →",
    estimator: {
      title: "Estimate your fare",
      pickupLabel: "Pickup",
      destinationLabel: "Destination",
      solo: "Solo",
      shared: "Shared",
      sameArea: "Pick a different destination",
      savingsPrefix: "You save",
      savingsSuffix: "by tagging along",
      cta: "Get the app to book",
      defaultPickup: "Wuse",
      defaultDestination: "Gwarinpa",
    },
    phone: {
      solo: "Solo · 1 seat",
      shared: "Shared · 3 riders",
    },
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "From tap to drop-off in four steps.",
    steps: [
      {
        title: "Book",
        body: "Set your pickup and destination, then choose Solo or Shared. You see your fare before you confirm.",
      },
      {
        title: "Get matched",
        body: "We match you with a nearby verified driver. On Shared, we also match riders heading your way.",
      },
      {
        title: "Ride",
        body: "Follow your trip on the map and share it live with someone you trust.",
      },
      {
        title: "Pay",
        body: "Pay the fare you saw when you booked. No haggling, no surprises. Then rate your ride.",
      },
    ] satisfies HowStep[],
  },

  rideModes: {
    eyebrow: "Solo or Shared",
    title: "Your trip, your choice.",
    cta: "Get the app",
    modes: [
      {
        id: "solo",
        name: "Solo",
        tagline: "Your car, your route. Best when you're in a hurry or need privacy.",
        rows: [
          { label: "Price", value: "Full fare, just for you" },
          { label: "Seats", value: "The whole car" },
          { label: "Best for", value: "Urgent trips and privacy" },
          { label: "Wait time", value: "Usually the quickest pickup" },
        ],
      },
      {
        id: "shared",
        name: "Shared",
        tagline: "Split the fare with riders going your way. Best for daily commutes.",
        rows: [
          { label: "Price", value: "Lower fare, split with co-riders" },
          { label: "Seats", value: "Your own seat in a shared car" },
          { label: "Best for", value: "Daily commutes" },
          { label: "Wait time", value: "A little longer while we match riders" },
        ],
      },
    ] satisfies RideModeCard[],
  },

  safety: {
    eyebrow: "Safety",
    title: "Safe on every ride, Solo or Shared.",
    body: "On WeMoove, you, your driver and WeMoove always know who is in the car.",
    link: "More about safety",
    features: [
      {
        title: "Verified drivers",
        body: "Every driver and vehicle is checked before their first trip.",
        icon: "shieldCheck",
      },
      {
        title: "Share your trip live",
        body: "Send your live trip to family or friends so they can follow you to your destination.",
        icon: "share",
      },
      {
        title: "In-app SOS",
        body: "Get help quickly from inside the app if something feels wrong.",
        icon: "sos",
      },
      {
        title: "Rated rides",
        body: "Riders and drivers rate each other after every trip, keeping the community accountable.",
        icon: "star",
      },
    ] satisfies SafetyFeature[],
    /** [APP_SCREENSHOT] slots: set `src` to a real screenshot in /public to replace a placeholder. */
    screenshots: [
      { alt: "Sharing a live trip in the WeMoove app", src: null },
      { alt: "The in-app SOS screen", src: null },
    ] as { alt: string; src: string | null }[],
  },

  driveEarn: {
    eyebrow: "Drive & Earn",
    title: "Drive on your schedule. Earn on your terms.",
    body: "Turn the trips you already make into income. Go online when it suits you and get Solo and Shared requests nearby.",
    hoursLabel: "Hours per day",
    daysLabel: "Days per week",
    resultLabel: "Estimated weekly earnings",
    resultSuffix: "/week",
    disclaimer: "Estimate only. Actual earnings vary.",
    cta: "Sign up to drive",
    defaultHours: 6,
    defaultDays: 5,
  },

  download: {
    title: "Your next ride is one tap away.",
    body: "Download WeMoove and ride Solo or Shared across Abuja.",
    stickyCta: "Get the app",
  },
} as const;
