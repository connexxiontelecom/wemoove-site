import type { IconName } from "@/components/ui/Icon";

/**
 * Home page copy. Edit text here, not in the components.
 * Values in [SQUARE_BRACKETS] are PLACEHOLDERS.
 */

/** An app screen (375×812 from Figma). `cardFocus` picks the part shown in short mobile crops. */
export type Screenshot = { src: string; alt: string; cardFocus?: string };
export type HowStep = { icon: IconName; title: string; body: string };
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
  scene: "standard" | "executive" | "premium" | "bike" | "truck";
  /** Real photo path in /public. When set it replaces the illustration. */
  photo: string | null;
  /** Describes the photo for screen readers. */
  photoAlt?: string;
};
export type VersusRow = { id: string; label: string; solo: string; shared: string };
export type RideMoment = {
  id: string;
  icon: IconName;
  label: string;
  pick: "solo" | "shared";
  /** Rows of the Solo vs Tag along table that explain the pick (highlighted). */
  rows: string[];
  reason: string;
};
export type SafetyFeature = { title: string; body: string; icon: IconName };

export const home = {
  meta: {
    description:
      "Ride sharing in Abuja with WeMoove. Book a car to yourself, or tag along with riders going your way and pay less. Safe, convenient and affordable.",
  },

  hero: {
    eyebrow: "Live in Abuja · more cities soon",
    titleStart: "Ride solo, or Tag along and",
    titleEnd: "pay less.",
    subtitle:
      "Book a car to yourself, or share the trip with people heading your way. Same safe ride, smarter price.",
    driveLink: "Drive with WeMoove →",
    chooser: {
      title: "How do you want to ride?",
      options: {
        solo: { name: "Solo", short: "Just you", badge: "Whole car" },
        shared: { name: "Tag along", short: "With riders your way", badge: "Pay less" },
      },
      legend: { you: "You" },
      modes: {
        solo: {
          points: ["Straight to where you're going, no extra stops", "Your space and your privacy", "Best when you're in a hurry"],
        },
        shared: {
          points: ["Book a seat on a ride already heading your way", "Pay per seat, or offer your own price", "Rides leave at a set time, with stops on the way"],
        },
      },
      ctaSolo: "Get the app to ride Solo",
      ctaShared: "Get the app to Tag along",
      fareNote: "You always see your fare in the app before you confirm.",
      mapLabel: "Trips across Abuja",
    },
    /**
     * Tag along demo on two phones (desktop), following the app's Figma screens: the rider browses
     * available shared rides, opens one, books a seat; the driver gets the request and accepts; then
     * the car picks the rider up. Illustrative preview: prices from the app are left out on purpose.
     */
    demo: {
      start: "Maitama",
      pickup: "Wuse",
      destination: "Jabi",
      list: {
        title: "Available shared rides",
        search: "Search by name of area",
        takeoff: "Take-off",
        rides: [
          { from: "Maitama", to: "Jabi", time: "12:30 PM", stop: null, seats: "2 seats" },
          { from: "Maitama", to: "Jabi", time: "1:00 PM", stop: null, seats: "3 seats" },
          { from: "Maitama", to: "Life Camp", time: "1:15 PM", stop: "Jabi", seats: "2 seats" },
          { from: "Maitama", to: "Dakibiyu", time: "1:30 PM", stop: "Jabi", seats: "1 seat" },
          { from: "Maitama", to: "Airport", time: "2:00 PM", stop: "Jabi", seats: "3 seats" },
        ],
      },
      details: {
        title: "Available ride details",
        driver: "Bruce",
        rating: "5.00",
        plate: "ABC777DE",
        car: "Toyota Camry · Red",
        departure: "Departure: 12:30 PM",
        pickupLabel: "Pickup: Wuse",
        dropoffs: "Drop-off locations",
        stops: ["Wuse", "Utako", "Jabi"],
        seatsLabel: "Available seats: 2",
        book: "Book ride",
        offer: "Offer price",
        sent: "Waiting for driver…",
        accepted: "Driver accepted · seat booked",
      },
      driver: {
        title: "Rideshare requests",
        empty: "Waiting for seat requests on your 12:30 PM ride",
        incoming: "Incoming request",
        rider: "Aisha",
        rating: "5.00",
        seats: "1 seat",
        accept: "Accept request",
        counter: "Counter offer",
        accepted: "Request accepted",
      },
      trip: {
        riderOnWay: "Seat booked · driver on the way",
        riderAboard: "You're in · riding together",
        driverOnWay: "Picking up Aisha in Wuse",
        driverAboard: "Aisha aboard · next stop Jabi",
        you: "You",
        rider: "Aisha",
        start: "Start",
      },
      badge: {
        browse: "Browsing shared rides",
        pick: "Picking a seat",
        sent: "Request sent to driver",
        booked: "Seat booked",
        aboard: "Riding together · paying less",
      },
      labels: { rider: "Rider's app", driver: "Driver's app" },
      linkLabel: "Get the WeMoove app",
      preview:
        "App preview: a rider browses available shared rides, books a seat on a ride from Maitama to Jabi, the driver accepts, and the car picks the rider up in Wuse.",
    },
    /** Sample trips the map cycles through. Areas must exist in src/content/areas.ts. */
    showcaseRoutes: [
      ["Wuse", "Gwarinpa"],
      ["Maitama", "Jabi"],
      ["Garki", "Lugbe"],
      ["CBD", "Kubwa"],
      ["Asokoro", "Wuse"],
    ] as const,
    phone: {
      time: "9:41",
      rideName: "Standard",
      solo: "Solo",
      shared: "Shared",
      soloSeats: "Just you",
      soloPerks: ["No stops", "Your space", "Go now"],
      bookSolo: "Book Solo",
      pickupTag: "Pickup",
      dropoffTag: "Drop-off",
      soloBadge: "Whole car",
      sameArea: "Where to?",
    },
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "From tap to drop-off in four steps.",
    toggleLabel: "Show steps for",
    modes: {
      solo: {
        label: "Solo",
        summary: "The car to yourself, straight to where you're going.",
        steps: [
          { icon: "pin", title: "Set your trip", body: "Enter where you're going. Your pickup is set from your location, or pick another spot." },
          { icon: "car", title: "Choose Solo", body: "Pick Standard, then Solo. You see your fare before you confirm." },
          { icon: "user", title: "Meet your driver", body: "See their name, photo, rating, car and plate, and call or chat as they arrive." },
          { icon: "star", title: "Ride, pay and rate", body: "Straight to your stop. Pay by card or wallet, then rate your driver." },
        ],
      },
      shared: {
        label: "Tag along",
        summary: "Book a seat on a car already heading your way, and pay less.",
        steps: [
          { icon: "map", title: "Find a shared ride", body: "Browse shared rides heading your way, with their take-off time and stops." },
          { icon: "share", title: "Book or make an offer", body: "Book seats at the listed price, or send your own offer per seat." },
          { icon: "user", title: "Driver confirms", body: "The driver accepts your booking or offer, or sends back a counter offer." },
          { icon: "star", title: "Ride together, pay less", body: "Get picked up, ride to your stop, then rate your driver." },
        ],
      },
    } satisfies Record<"solo" | "shared", { label: string; summary: string; steps: HowStep[] }>,
  },

  rideModes: {
    eyebrow: "Choose your ride",
    title: "Solo or Tag along? Pick by the moment.",
    intro: "Both are Standard rides with verified drivers. Tap your kind of trip to see which one fits.",
    momentsLabel: "What's the trip?",
    bestPick: "Best pick",
    versusLabel: "Solo vs Tag along",
    cta: "Get the app",
    rows: [
      { id: "price", label: "Fare", solo: "Full fare, just for you", shared: "Per seat, or offer your own price" },
      { id: "pickup", label: "Timing", solo: "Whenever you book", shared: "Rides leave at set times" },
      { id: "space", label: "Space", solo: "The whole car", shared: "Your own seat" },
      { id: "route", label: "Route", solo: "Straight there", shared: "Set route, with stops on the way" },
    ] satisfies VersusRow[],
    moments: [
      { id: "late", icon: "car", label: "Running late", pick: "solo", rows: ["pickup", "route"], reason: "Book when you need it and go straight to your stop." },
      { id: "commute", icon: "map", label: "Daily commute", pick: "shared", rows: ["price"], reason: "Same trip every day? Paying per seat adds up fast." },
      { id: "call", icon: "phone", label: "Private call on the way", pick: "solo", rows: ["space"], reason: "The whole car to yourself, so you can talk freely." },
      { id: "relaxed", icon: "star", label: "Not in a rush", pick: "shared", rows: ["price", "route"], reason: "Got time to spare? Book a seat on a ride that's leaving and pay less." },
      { id: "airport", icon: "briefcase", label: "Airport run", pick: "solo", rows: ["space", "route"], reason: "Room for you and your bags, and no stops before your flight." },
      { id: "budget", icon: "wallet", label: "Saving this month", pick: "shared", rows: ["price"], reason: "Pay per seat, or offer a price that works for you." },
    ] satisfies RideMoment[],
  },

  moreWays: {
    eyebrow: "More ways to move",
    title: "One app for every trip, and every parcel.",
    body: "From everyday rides to a little extra comfort, WeMoove gets you there, and gets your things across Abuja too.",
    cta: "Get the app",
    comingNext: {
      label: "Coming next",
      title: "WeMoove Interstate",
      body: "Safe, regulated rides between cities in private vehicles.",
    },
    services: [
      {
        id: "standard",
        name: "Standard",
        kind: "Ride",
        icon: "car",
        short: "Everyday rides, Solo or Shared",
        tagline: "Your everyday ride, your way.",
        body: "Our everyday ride around Abuja. Have the car to yourself with Solo, or book a seat on a shared ride heading your way and pay less.",
        points: ["Ride Solo, or go Shared and pay less", "Verified drivers on every trip", "Fare shown before you book"],
        scene: "standard",
        photo: "/assets/img/services/standard.jpg",
        photoAlt: "A smiling driver with his arm on the open window of a silver Toyota Corolla on a tree-lined street in Abuja",
      },
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
        title: "Emergency SOS",
        body: "One tap calls 112 and alerts WeMoove with your live location.",
        icon: "sos",
      },
      {
        title: "Trusted contacts",
        body: "Pick the people who get notified when you use SOS.",
        icon: "user",
      },
    ] satisfies SafetyFeature[],
    /** [APP_SCREENSHOT] slots: set `src` to a real screenshot in /public to replace a placeholder. */
    screenshots: [
      {
        alt: "The WeMoove Safety screen: an Emergency (SOS) button that calls 112 and alerts WeMoove with your live location, plus Share my trip, Trusted contacts and Safety tips",
        src: "/assets/img/app/safety-sos.png",
      },
      {
        alt: "Driver found screen showing the driver's name, rating, car and plate number",
        src: "/assets/img/app/driver-found.jpg",
      },
    ] as { alt: string; src: string | null }[],
  },

  driveEarn: {
    eyebrow: "Drive & Earn",
    title: "Got a car? Put it to work.",
    body: "Turn the trips you already make into income. Go online when it suits you and get Solo and Tag along requests nearby.",
    points: [
      { icon: "map", title: "No shifts", body: "Go online when you're ready, offline when you're done." },
      { icon: "wallet", title: "Prices agreed in the app", body: "Riders book or send an offer, and you accept or counter." },
      { icon: "user", title: "Know your rider", body: "Everyone books through the app, so you see who you're picking up." },
    ] satisfies { icon: IconName; title: string; body: string }[],
    cta: "How to start driving",
    photo: {
      src: "/assets/img/services/standard.jpg",
      alt: "A smiling driver leaning out of the window of a silver Toyota Corolla on a tree-lined street in Abuja",
    },
    startTitle: "Start in 3 steps",
    startSteps: ["Switch to driver mode", "Add your car", "Get verified and go online"],
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
