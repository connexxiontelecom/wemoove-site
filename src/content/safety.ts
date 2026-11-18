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
      "How WeMoove keeps you safe on every ride: verified drivers, driver and car details before pickup, live trip sharing, a panic button, in-app reporting and round-the-clock support.",
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
      { label: "Panic button", href: "#sos" },
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
        body: "Every driver and vehicle is checked before their first trip. Once your ride is booked, you see who is picking you up.",
        points: [
          { icon: "user", title: "Driver details upfront", body: "Name, photo, rating, car and plate number, before the car arrives." },
          { icon: "phone", title: "Call or chat in the app", body: "Reach your driver from the trip screen to confirm your pickup spot." },
          { icon: "wallet", title: "Price agreed before you ride", body: "Book at the listed price or agree an offer in the app, never at the roadside." },
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
          { icon: "sos", title: "Panic button", body: "Hold SOS to alert our safety team, who can follow your trip live." },
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
    eyebrow: "Panic button",
    title: "If something feels wrong, hold SOS.",
    body: "Every trip has a panic button. Open the section for you to see what happens when it's used.",
    groups: [
      {
        id: "passengers",
        label: "For passengers",
        summary: "Hold the SOS button on your trip screen to alert our safety team.",
        steps: [
          { icon: "sos", title: "Hold SOS", body: "The red SOS button sits on your trip screen. Hold it for a moment, so it can't go off by accident." },
          { icon: "shieldCheck", title: "Panic mode turns on", body: "Our safety team is alerted straight away." },
          { icon: "map", title: "We follow your trip live", body: "The team can see your trip live and hear what's happening through your phone. Stay online." },
        ],
        screens: [
          { src: "/assets/img/app/panic/passenger-idle.jpg", label: "Hold in an emergency", alt: "Passenger trip screen with a red SOS button and the hint: Hold in an emergency" },
          { src: "/assets/img/app/panic/passenger-holding.jpg", label: "Keep holding", alt: "The SOS button filling up while held, with the message: Keep holding, 1 second" },
          { src: "/assets/img/app/panic/passenger-activated.jpg", label: "Panic mode on", alt: "Panic mode activated: our safety team has been alerted, can see your trip live and hear what's happening through your phone" },
        ],
      },
      {
        id: "drivers",
        label: "For drivers",
        summary: "When panic mode is on, the trip is locked until the destination.",
        steps: [
          { icon: "flag", title: "Ending the trip is paused", body: "While panic mode is on, the driver can't end the trip or go offline." },
          { icon: "map", title: "Continue to the destination", body: "The app keeps the driver on the route to the passenger's drop-off." },
          { icon: "phone", title: "Support steps in", body: "WeMoove support contacts the driver if needed." },
        ],
        screens: [
          { src: "/assets/img/app/panic/driver-locked.jpg", label: "End trip locked", alt: "Driver trip screen with the end trip slider locked: Ending trip is unavailable" },
          { src: "/assets/img/app/panic/driver-locked-sheet.jpg", label: "Why it's locked", alt: "You can't end this trip right now: ending the trip and going offline are paused for this ride. Continue to the destination. WeMoove support will contact you if needed." },
        ],
      },
    ] as {
      id: string;
      label: string;
      summary: string;
      steps: { icon: IconName; title: string; body: string }[];
      screens: { src: string; label: string; alt: string }[];
    }[],
  },

  shared: {
    eyebrow: "Tagging along?",
    title: "Shared rides get the same protection.",
    body: "On a Shared ride, you book a seat on a ride heading your way. Every rider books through the app, so your driver and WeMoove know who is in the car at every stop.",
    points: ["Same verified driver checks", "Share your trip, use the panic button and report a ride, just like Solo", "Ratings for every rider after the trip"],
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
          "Know where the SOS button is on your trip screen before you need it.",
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
  },

  cta: {
    title: "Ride with peace of mind.",
    body: "Download WeMoove and ride Solo or Shared across Abuja.",
  },
} as const;
