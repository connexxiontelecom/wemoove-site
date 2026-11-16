import type { Faq } from "@/components/ui/FaqSection";
import type { IconName } from "@/components/ui/Icon";

/**
 * Drive with WeMoove page copy.
 * Sign-up steps come from the app's real flow (driver mode → My Cars → Add New Car).
 * Items marked PLACEHOLDER need confirming by the WeMoove team before launch.
 */

type Benefit = { icon: IconName; title: string; body: string };
type Requirement = { title: string; body: string };

export const drive = {
  pageName: "Drive with WeMoove",
  meta: {
    description:
      "Drive with WeMoove in Abuja. Go online when it suits you, get Solo and Shared trip requests nearby, and earn with fixed, upfront fares. Sign up in the app.",
  },

  hero: {
    eyebrow: "Drive & Earn",
    title: "Your car. Your hours. Your income.",
    body: "Turn the trips you already make into income. Go online when it suits you and get Solo and Shared requests across Abuja.",
    secondary: { label: "Estimate your earnings", href: "#earnings" },
    photo: {
      src: "/assets/img/photos/bg-1.jpg",
      alt: "A smiling driver checking the WeMoove app on his phone from the driver's seat",
    },
    request: {
      label: "New trip request",
      mode: "Shared",
      route: "Wuse → CBD",
      riders: "2 riders · fare shown upfront",
    },
  },

  benefits: {
    eyebrow: "Why drive with WeMoove",
    title: "Built to make driving simpler and safer.",
    items: [
      { icon: "map", title: "Drive when it suits you", body: "No shifts. Go online when you're ready and offline when you're done." },
      { icon: "share", title: "Solo and Shared trips", body: "Get requests for riders who want the car to themselves, and for riders heading the same way." },
      { icon: "wallet", title: "Fixed, upfront fares", body: "The app sets the fare before the trip. No haggling with riders at the roadside." },
      { icon: "user", title: "Know who you're picking up", body: "Every rider books through the app, so you see who you're picking up and where they're going." },
      { icon: "shieldCheck", title: "Safety tools for drivers too", body: "Share your trip details and report a rider from inside the app if anything feels wrong." },
      { icon: "star", title: "Two-way ratings", body: "You rate your riders after every trip, keeping the community accountable on both sides." },
    ] satisfies Benefit[],
  },

  earnings: {
    eyebrow: "Earnings",
    title: "See what your week could look like.",
    body: "Move the sliders to match the hours you'd like to drive. Your real earnings depend on when and where you drive, and how many trips you take.",
    calculator: {
      hoursLabel: "Hours per day",
      daysLabel: "Days per week",
      resultLabel: "Estimated weekly earnings",
      resultSuffix: "/week",
      disclaimer: "Estimate only. Actual earnings vary.",
      defaultHours: 6,
      defaultDays: 5,
    },
  },

  steps: {
    eyebrow: "Getting started",
    title: "Start driving in four steps.",
    items: [
      { title: "Download the app", body: "Get WeMoove from Google Play or the App Store, then sign up or sign in." },
      { title: "Switch to driver mode", body: "In the app, switch from passenger mode to driver mode." },
      { title: "Add your car", body: "Tap My Cars, then Add New Car. Fill in your vehicle details and upload a photo of your car's front view." },
      { title: "Get verified and go online", body: "We check your details and your vehicle before your first trip. Once approved, go online to start receiving requests." },
    ],
  },

  requirements: {
    eyebrow: "What you'll need",
    title: "Have these ready before you sign up.",
    note: "Not sure about something on this list? Email our team before you sign up.",
    items: [
      { title: "A smartphone", body: "Android or iPhone, with the WeMoove app installed." },
      { title: "Your own car", body: "Registered in the app with its details and a clear front-view photo." },
      // PLACEHOLDER: confirm the exact licence requirement with the WeMoove team.
      { title: "A valid driver's licence", body: "Your licence details are checked as part of verification." },
      // PLACEHOLDER: confirm which vehicle documents are required.
      { title: "Vehicle papers", body: "Proof of ownership and roadworthiness for the car you add." },
    ] satisfies Requirement[],
  },

  safety: {
    title: "Safety works both ways.",
    body: "Riders book through the app, trips are tracked from pickup to drop-off, and you can report any rider who makes you feel unsafe.",
    link: "How we keep everyone safe",
    href: "/safety",
  },

  faq: {
    eyebrow: "Questions",
    title: "Driver FAQs",
    items: [
      {
        q: "How do I sign up to drive?",
        a: "Download the WeMoove app, sign in, and switch from passenger mode to driver mode. Then tap My Cars, then Add New Car, and fill in your vehicle details with a photo of your car's front view.",
      },
      {
        q: "Do I need my own car?",
        a: "Yes. You register your own car in the app, and we check your details and vehicle before your first trip.",
      },
      {
        q: "Can I choose when I drive?",
        a: "Yes. There are no shifts. Go online whenever you want to receive trip requests, and go offline when you're done.",
      },
      {
        q: "What is a Shared trip?",
        a: "On a Shared trip you pick up riders who are heading the same way, along one route. Each rider books through the app and sees their fare before they book.",
      },
      {
        q: "Who sets the fare?",
        a: "The app sets every fare upfront, before the rider books. There's no negotiating with riders.",
      },
      {
        q: "How much can I earn?",
        a: "It depends on how many hours you drive, when and where you drive, and how many trips you take. Use the earnings estimate above to get an idea. Actual earnings vary.",
      },
    ] satisfies Faq[],
  },

  cta: {
    title: "Ready to hit the road?",
    body: "Download WeMoove, switch to driver mode and add your car to get started.",
  },
} as const;
