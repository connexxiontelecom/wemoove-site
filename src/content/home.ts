import type { IconName } from "@/components/ui/Icon";

/**
 * Home page copy. Edit text here, not in the components.
 * Values in [SQUARE_BRACKETS] are PLACEHOLDERS.
 */

/** An app screen (375×812 from Figma). `cardFocus` picks the part shown in short mobile crops. */
export type Screenshot = { src: string; alt: string; cardFocus?: string };
export type HowStep = { title: string; body: string; screenshot?: Screenshot };
export type MoreWayService = {
  id: string;
  name: string;
  kind: "Ride" | "Delivery";
  icon: IconName;
  /** One-liner shown in the selector. */
  short: string;
  tagline: string;
  body: string;
  points: string[];
  scene: "executive" | "premium" | "bike" | "truck";
  /** Real photo path in /public. When set it replaces the illustration. */
  photo: string | null;
  /** Describes the photo for screen readers. */
  photoAlt?: string;
};
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
      title: "Estimate a Standard ride",
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
      time: "9:41",
      rideName: "Standard",
      solo: "Solo",
      shared: "Shared",
      soloSeats: "1 seat",
      sharedSeats: "3 riders",
      select: "Select ride",
      pickupTag: "Pickup",
      dropoffTag: "Drop-off",
      minutes: "min",
    },
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "From tap to drop-off in four steps.",
    steps: [
      {
        title: "Book",
        body: "Set your pickup and destination, then choose your ride. On Standard, ride Solo or Shared. You see your fare before you confirm.",
        screenshot: {
          src: "/assets/img/app/choose-ride.jpg",
          alt: "Choosing a ride in the WeMoove app: Executive, Premium, Standard, Bike Delivery and Truck Delivery",
          cardFocus: "center 62%",
        },
      },
      {
        title: "Get matched",
        body: "We match you with a nearby verified driver. On Shared, we also match riders heading your way.",
        screenshot: {
          src: "/assets/img/app/driver-found.jpg",
          alt: "Driver found: the driver's name, rating, car and plate number, with call and chat buttons",
          cardFocus: "center 88%",
        },
      },
      {
        title: "Ride",
        body: "Follow your trip on the map, share your ride details with someone you trust, or report the ride if anything feels wrong.",
        screenshot: {
          src: "/assets/img/app/driving.jpg",
          alt: "Driving to destination screen with the route, driver details, and options to share ride details or report the ride",
          cardFocus: "center 92%",
        },
      },
      {
        title: "Pay",
        body: "Pay the fare you saw when you booked, by card or from your WeMoove wallet. No haggling, no surprises. Then rate your driver and add a tip if you like.",
        screenshot: {
          src: "/assets/img/app/ride-review.png",
          alt: "Ride review screen with a star rating, a comment and tip options",
          cardFocus: "center 42%",
        },
      },
    ] satisfies HowStep[],
  },

  rideModes: {
    eyebrow: "Choose your ride",
    title: "Your trip, your choice.",
    intro: "On a Standard ride, choose Solo or Shared.",
    modeLabel: "Standard ride",
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

  moreWays: {
    eyebrow: "More ways to move",
    title: "One app for every trip, and every parcel.",
    body: "Beyond Standard, WeMoove gets you there in more comfort, and gets your things across Abuja too.",
    cta: "Get the app",
    comingNext: {
      label: "Coming next",
      title: "WeMoove Interstate",
      body: "Safe, regulated rides between cities in private vehicles.",
    },
    services: [
      {
        id: "executive",
        name: "Executive",
        kind: "Ride",
        icon: "car",
        short: "Our top tier",
        tagline: "Arrive like you mean it.",
        body: "Our top tier for the trips that matter: client meetings, events, and when you simply want to arrive in style.",
        points: ["Our most premium cars", "Great for meetings, events and airport trips", "Booked in the same app, fare shown upfront"],
        scene: "executive",
        photo: "/assets/img/services/executive.jpg",
        photoAlt: "A smiling man in a suit driving a large black luxury sedan along a palm-lined avenue in Abuja at golden hour",
      },
      {
        id: "premium",
        name: "Premium",
        kind: "Ride",
        icon: "car",
        short: "A step up from Standard",
        tagline: "A step up, without the splurge.",
        body: "More comfort than Standard for everyday trips, when a little extra space and a nicer car make the difference.",
        points: ["More comfortable cars", "Ideal for everyday trips that matter", "Fare shown before you book"],
        scene: "premium",
        photo: "/assets/img/services/premium.jpg",
        photoAlt: "A smiling man in a suit at the wheel of a clean black sedan on a palm-lined street in Abuja",
      },
      {
        id: "bike",
        name: "Bike Delivery",
        kind: "Delivery",
        icon: "bike",
        short: "Small parcels, fast",
        tagline: "Small parcels, moving fast across Abuja.",
        body: "Documents, food and small packages, picked up by a WeMoove rider and taken straight to the door.",
        points: ["For documents, food and small packages", "Picked up by a WeMoove rider", "Follow your delivery in the app"],
        scene: "bike",
        photo: "/assets/img/services/bike-delivery-v2.jpg",
        photoAlt: "A smiling WeMoove rider in an amber WeMoove vest and helmet on a motorbike with a WeMoove delivery box, on a street in Abuja",
      },
      {
        id: "truck",
        name: "Truck Delivery",
        kind: "Delivery",
        icon: "truck",
        short: "Big loads, handled",
        tagline: "Big loads, handled.",
        body: "Furniture, stock and bulky items moved by truck, booked from the same app you ride with.",
        points: ["For furniture, stock and bulky items", "Booked in the same app as your rides", "Fare shown upfront"],
        scene: "truck",
        photo: "/assets/img/services/truck-delivery-v2.jpg",
        photoAlt: "A WeMoove truck parked outside a building while a worker in a WeMoove vest carries a parcel to the door",
      },
    ] satisfies MoreWayService[],
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
      {
        alt: "Driver found screen showing the driver's name, rating, car and plate number",
        src: "/assets/img/app/driver-found.jpg",
      },
      { alt: "An in-app call from your driver", src: "/assets/img/app/incoming-call.png" },
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
    screenshot: {
      src: "/assets/img/app/pick-route.png",
      alt: "Picking a pickup and drop-off location in the WeMoove app",
    } satisfies Screenshot,
    stickyCta: "Get the app",
  },
} as const;
