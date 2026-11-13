"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { home } from "@/content/home";

/** Mobile only: a "Get the app" bar that appears after the hero and hides once the download section is reached. */
export function MobileGetAppBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const download = document.getElementById("download");
    if (!hero || !download) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const beforeDownload = download.getBoundingClientRect().top > window.innerHeight;
      setShow(pastHero && beforeDownload);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
        >
          <a
            href="#download"
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-brand font-bold text-ink"
          >
            {home.download.stickyCta}
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
