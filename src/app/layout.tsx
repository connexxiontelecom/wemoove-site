import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { site } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} - ${site.tagline}`,
  description: site.description,
  keywords: [
    "Ride Sharing",
    "Ride Share",
    "Car Pool",
    "Car Pooling",
    "Ride Finding",
    "Find Ride",
    "Transport Company",
    "Abuja",
  ],
  authors: [{ name: site.company }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" data-scroll-behavior="smooth" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <MotionProvider>
          <Navbar />
          <main id="main" className="flex-1 overflow-x-clip">
            {/* Route changes cross-fade and lift (see "Page transitions" in globals.css). */}
            <ViewTransition default="page">{children}</ViewTransition>
          </main>
          <Footer />
          <RevealObserver />
        </MotionProvider>
      </body>
    </html>
  );
}
