import type { IconName } from "@/components/ui/Icon";

/** Safety page copy. Only describe features that exist in the app today. */

export type SafetyStage = {
  id: string;
  step: string;
  title: string;
  body: string;
  points: { icon: IconName; title: string; body: string }[];
  screenshot: { src: string; alt: string };
};

export type SafetyTipGroup = { title: string; icon: IconName; tips: string[] };

export const safety = {
  pageName: "Safety",
  meta: {
    description:
      "How WeMoove keeps you safe on every ride: verified drivers, driver and car details before pickup, live trip sharing, emergency SOS, trusted contacts, in-app reporting and round-the-clock support.",
  },

  hero: {
    eyebrow: "Safety at WeMoove",
    title: "Safe on every ride, Solo or Shared.",
    body: "From the moment you book to the moment you arrive, you, your driver and WeMoove always know who is in the car.",
    jumpLabel: "Jump to",
    jumps: [
      { label: "Before you ride", href: "#before" },
      { label: "On the way", href: "#during" },
      { label: "After you arrive", href: "#after" },
      { label: "Emergency SOS", href: "#sos" },
      { label: "Safety tips", href: "#tips" },
      { label: "Get help", href: "#help" },
    ],
    screenshot: {
      src: "/assets/img/app/driving.jpg",
      alt: "The WeMoove trip screen: the route on the map, the driver's details, and buttons to share ride details or report the ride",
    },
    badges: [
      { icon: "shieldCheck" as IconName, label: "Driver verified" },
      { icon: "share" as IconName, label: "Trip shared live" },
    ],
  },

  journey: {
    eyebrow: "Every step of the trip",
    title: "Protection that starts before pickup.",
    stages: [
      {
        id: "before",
        step: "Before you ride",
        title: "Know exactly who is coming.",
        body: "Every driver and vehicle is checked before their first trip. When you are matched, you see who is picking you up.",
        points: [
          { icon: "user", title: "Driver details upfront", body: "Name, photo, rating, car and plate number, before the car arrives." },
          { icon: "phone", title: "Call or chat in the app", body: "Reach your driver from the trip screen to confirm your pickup spot." },
          { icon: "wallet", title: "Fare fixed before you book", body: "No haggling at the roadside. You pay the price you saw." },
        ],
        screenshot: {
          src: "/assets/img/app/driver-found.jpg",
          alt: "Driver found: the driver's name, rating, car and plate number, with call and chat buttons",
        },
      },
      {
        id: "during",
        step: "On the way",
        title: "Never ride alone, even when you do.",
        body: "Follow your trip on the map and let the people you trust follow along with you.",
        points: [
          { icon: "share", title: "Share your ride details", body: "Send your live trip to family or friends so they can follow you to your destination." },
          { icon: "sos", title: "Emergency SOS", body: "One tap calls 112 and alerts WeMoove with your live location." },
          { icon: "flag", title: "Report the ride", body: "If anything feels wrong, report it from the trip screen and our team will step in." },
        ],
        screenshot: {
          src: "/assets/img/app/driving.jpg",
          alt: "Driving to destination screen with the route, driver details, and options to share ride details or report the ride",
        },
      },
      {
        id: "after",
        step: "After you arrive",
        title: "Every trip keeps the community accountable.",
        body: "Riders and drivers rate each other after every trip, so good behaviour is noticed and problems are flagged.",
        points: [
          { icon: "star", title: "Two-way ratings", body: "Rate your driver, and drivers rate riders too." },
          { icon: "chat", title: "Say what happened", body: "Add a comment with your rating, good or bad." },
        ],
        screenshot: {
          src: "/assets/img/app/ride-review.png",
          alt: "Ride review screen with a star rating, a comment and tip options",
        },
      },
    ] satisfies SafetyStage[],
  },

  sos: {
    eyebrow: "Emergency SOS",
    title: "If something goes wrong, one tap gets help.",
    body: "SOS sits at the top of the Safety screen in the app, on every trip.",
    steps: [
      { icon: "phone", title: "Calls 112", body: "Nigeria's free emergency line for police, fire and ambulance." },
      { icon: "pin", title: "Alerts WeMoove", body: "Our team gets your live location so we can step in." },
      { icon: "user", title: "Tells your trusted contacts", body: "The people you've chosen are notified when you use SOS." },
    ] as { icon: IconName; title: string; body: string }[],
    also: "On the same screen: share your live trip, manage trusted contacts and read safety tips.",
    screenshot: {
      src: "/assets/img/app/safety-sos.png",
      alt: "The WeMoove Safety screen: an Emergency (SOS) button that calls 112 and alerts WeMoove with your live location, plus Share my trip, Trusted contacts and Safety tips",
    },
  },

  shared: {
    eyebrow: "Tagging along?",
    title: "Shared rides get the same protection.",
    body: "On a Shared ride, WeMoove matches you with riders heading your way. Every rider books through the app, so your driver and WeMoove know who is in the car at every stop.",
    points: ["Same verified driver checks", "Share your trip, use SOS and report a ride, just like Solo", "Ratings for every rider after the trip"],
  },

  tips: {
    eyebrow: "Ride smart",
    title: "Simple habits that keep every trip safe.",
    groups: [
      {
        title: "For riders",
        icon: "user",
        tips: [
          "Match the plate number and car to the app before you get in.",
          "Ask the driver who they are picking up, instead of saying your name first.",
          "Wear your seat belt, even on short trips.",
          "Share your trip with someone you trust.",
          "Add trusted contacts so they're alerted if you ever use SOS.",
          "If something feels off, don't get in. Report it in the app.",
        ],
      },
      {
        title: "For drivers",
        icon: "car",
        tips: [
          "Confirm the rider's name before you start the trip.",
          "Keep to the speed limit and follow road safety rules.",
          "Keep every trip and payment inside the app.",
          "Make sure every passenger wears a seat belt.",
          "Report any rider who makes you feel unsafe.",
        ],
      },
    ] satisfies SafetyTipGroup[],
  },

  help: {
    eyebrow: "Help is a tap away",
    title: "Round-the-clock support, whenever you need it.",
    body: "Questions or safety concerns, during or after a trip: our support team is here to help.",
    callLabel: "Call support",
    emailLabel: "Email us",
    emergency: {
      title: "In an emergency, use SOS or call 112.",
      body: "On a trip, tap SOS in the app: it calls 112 and alerts WeMoove with your live location. You can also dial 112 directly, Nigeria's free emergency number.",
      cta: "Call 112",
      href: "tel:112",
    },
  },

  cta: {
    title: "Ride with peace of mind.",
    body: "Download WeMoove and ride Solo or Shared across Abuja.",
  },
} as const;
