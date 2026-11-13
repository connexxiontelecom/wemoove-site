/**
 * Privacy Policy copy, ported from the Express site.
 * A list item can have a bold `lead` ("Account details:") followed by `text`.
 */
export type PolicyItem = string | { lead: string; text: string };
export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: PolicyItem[] };
export type PolicySection = { title: string; blocks: PolicyBlock[] };

export const privacyPolicy = {
  pageName: "Privacy Policy",
  meta: {
    description:
      "How WeMoove collects, uses, shares and protects your personal data, and the rights you have under the Nigeria Data Protection Act 2023.",
  },
  lastUpdated: "11 November 2026",
  intro:
    'WeMoove ("WeMoove", "we", "us" or "our") is a ride sharing platform operated by Connexxion Telecom, No. 2A Iller Crescent, Maitama, Abuja, Nigeria. This Privacy Policy explains what personal data we collect when you use the WeMoove website, mobile applications and related services (together, the "Services"), how we use and share it, and the choices and rights you have. We process personal data in line with the Nigeria Data Protection Act 2023 and other applicable laws.',
  sections: [
    {
      title: "1. Information We Collect",
      blocks: [
        { type: "subheading", text: "Information you give us" },
        {
          type: "list",
          items: [
            {
              lead: "Account details:",
              text: "name, phone number, email address, password, profile photo and preferred language.",
            },
            {
              lead: "Driver details:",
              text: "if you sign up to drive, your driver's licence, vehicle details (make, model, plate number, registration and insurance), proof of identity, bank account details for payouts, and the results of background and safety checks where permitted by law.",
            },
            {
              lead: "Payment information:",
              text: "card or wallet details. Card details are processed by our payment partners; we do not store full card numbers.",
            },
            {
              lead: "Communications:",
              text: "messages, ratings, feedback, support requests and anything else you send us or other users through the Services.",
            },
          ],
        },
        { type: "subheading", text: "Information collected when you use the Services" },
        {
          type: "list",
          items: [
            {
              lead: "Location data:",
              text: "precise or approximate location from your device when the app is open and, for drivers, while online or on a trip, so we can match riders with drivers, show routes and support safety features.",
            },
            {
              lead: "Trip information:",
              text: "pickup and drop-off locations, routes, times, distance, fares and ride history.",
            },
            {
              lead: "Device and usage data:",
              text: "device model, operating system, app version, IP address, browser type, crash logs and how you interact with the Services.",
            },
            { lead: "Cookies and similar technologies:", text: "see section 8 below." },
          ],
        },
        { type: "subheading", text: "Information from others" },
        {
          type: "list",
          items: [
            "Other users, for example when a rider rates a driver or shares a trip with you.",
            "Payment processors, identity verification and background check providers.",
            "Business partners, if you sign up through a WeMoove Business or corporate account.",
          ],
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      blocks: [
        {
          type: "list",
          items: [
            "To create and manage your account and verify your identity.",
            "To provide rides, deliveries and interstate trips, including matching riders and drivers, calculating fares and processing payments and payouts.",
            "To keep users safe, including driver screening, trip sharing, emergency support, and detecting and preventing fraud or misuse.",
            "To provide customer support and resolve disputes.",
            "To improve and develop our Services, including research and analytics.",
            "To send you service updates, receipts and, with your consent where required, marketing messages. You can opt out of marketing at any time.",
            "To meet our legal and regulatory obligations and respond to lawful requests.",
          ],
        },
      ],
    },
    {
      title: "3. Legal Basis for Processing",
      blocks: [
        { type: "p", text: "We process personal data on one or more of the following bases:" },
        {
          type: "list",
          items: [
            { lead: "Contract:", text: "to provide the Services you request." },
            {
              lead: "Consent:",
              text: "for example, for location access and marketing. You may withdraw consent at any time.",
            },
            {
              lead: "Legitimate interests:",
              text: "such as keeping the platform safe, preventing fraud and improving our Services.",
            },
            { lead: "Legal obligation:", text: "where the law requires us to process or retain data." },
            { lead: "Vital interests:", text: "to protect someone's life or safety in an emergency." },
          ],
        },
      ],
    },
    {
      title: "4. How We Share Your Information",
      blocks: [
        { type: "p", text: "We do not sell your personal data. We share it only as follows:" },
        {
          type: "list",
          items: [
            {
              lead: "Between riders and drivers:",
              text: "riders see the driver's first name, photo, vehicle details, rating and location; drivers see the rider's first name, rating and pickup and drop-off locations.",
            },
            {
              lead: "Service providers:",
              text: "companies that help us run the Services, such as payment processors, cloud hosting, mapping, SMS and email providers, identity verification and customer support tools. They may only use your data to provide services to us.",
            },
            { lead: "Trusted contacts:", text: "people you choose to share a trip or safety alert with." },
            {
              lead: "Business accounts:",
              text: "if you ride on a corporate account, your employer may see trip details for those rides.",
            },
            {
              lead: "Legal and safety:",
              text: "law enforcement, regulators or others where required by law, or where needed to protect the safety, rights or property of WeMoove, our users or the public.",
            },
            {
              lead: "Business transfers:",
              text: "in connection with a merger, acquisition or sale of assets, subject to this Policy.",
            },
          ],
        },
      ],
    },
    {
      title: "5. International Transfers",
      blocks: [
        {
          type: "p",
          text: "Some of our service providers may store or process data outside Nigeria. Where this happens, we take steps required by the Nigeria Data Protection Act 2023 to make sure your data receives an adequate level of protection.",
        },
      ],
    },
    {
      title: "6. Data Retention",
      blocks: [
        {
          type: "p",
          text: "We keep personal data only for as long as needed for the purposes in this Policy, including to provide the Services, resolve disputes, meet legal, tax and regulatory requirements and enforce our agreements. When you delete your account, we delete or anonymise your data unless we must keep some of it for these reasons.",
        },
      ],
    },
    {
      title: "7. Data Security",
      blocks: [
        {
          type: "p",
          text: "We use technical and organisational measures to protect your data, including encryption in transit, access controls and regular security reviews. No system is completely secure, so please keep your password safe and tell us straight away if you think your account has been compromised.",
        },
      ],
    },
    {
      title: "8. Cookies",
      blocks: [
        {
          type: "p",
          text: "Our website uses cookies and similar technologies to keep it working, remember your preferences and understand how it is used. You can control cookies through your browser settings. Blocking some cookies may affect how the website works.",
        },
      ],
    },
    {
      title: "9. Your Rights",
      blocks: [
        { type: "p", text: "Subject to applicable law, you have the right to:" },
        {
          type: "list",
          items: [
            "access the personal data we hold about you;",
            "correct inaccurate or incomplete data;",
            "request deletion of your data;",
            "object to or restrict certain processing;",
            "receive your data in a portable format;",
            "withdraw consent at any time, without affecting earlier processing; and",
            "lodge a complaint with the Nigeria Data Protection Commission.",
          ],
        },
        {
          type: "p",
          text: "You can update most account information in the app. To exercise any other right, contact us using the details below. We may need to verify your identity before acting on your request.",
        },
      ],
    },
    {
      title: "10. Location Permissions",
      blocks: [
        {
          type: "p",
          text: "You can turn off location access in your device settings at any time. Without location access, some features, such as requesting a ride from your current position or accepting trips as a driver, will not work.",
        },
      ],
    },
    {
      title: "11. Children",
      blocks: [
        {
          type: "p",
          text: "The Services are not intended for anyone under 18, and we do not knowingly collect personal data from children. If you believe a child has given us personal data, please contact us and we will delete it.",
        },
      ],
    },
    {
      title: "12. Changes to This Policy",
      blocks: [
        {
          type: "p",
          text: 'We may update this Privacy Policy from time to time. We will post the updated version on this page with a new "Last updated" date and, where the changes are significant, notify you through the app or by email.',
        },
      ],
    },
  ] satisfies PolicySection[],
  contactTitle: "13. Contact Us",
  contactIntro: "If you have any questions about this Privacy Policy or how we handle your data, contact us:",
} as const;
