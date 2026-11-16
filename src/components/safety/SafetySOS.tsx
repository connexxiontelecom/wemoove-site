import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { safety } from "@/content/safety";

const { sos } = safety;

/** Emergency SOS: what one tap does, next to the app's Safety screen. */
export function SafetySOS() {
  return (
    <section id="sos" aria-labelledby="sos-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1fr_auto] lg:gap-20 lg:px-8 lg:py-28">
        <div>
          <p data-reveal className="inline-flex items-center gap-2 font-bold text-pin">
            <Icon name="sos" className="h-5 w-5" />
            {sos.eyebrow}
          </p>
          <h2 id="sos-title" data-reveal className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight md:text-5xl">
            {sos.title}
          </h2>
          <p data-reveal className="mt-4 max-w-xl text-lg text-muted">{sos.body}</p>

          <ol data-reveal-stagger className="mt-10 space-y-3">
            {sos.steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4 rounded-2xl border border-line p-5">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${i === 0 ? "bg-pin text-white" : "bg-paper text-ink"}`}
                >
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold">{step.title}</span>
                  <span className="mt-0.5 block text-muted">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <p data-reveal className="mt-6 text-muted">{sos.also}</p>
        </div>

        <div data-reveal="zoom" className="flex justify-center">
          <PhoneFrame size="md">
            <Image src={sos.screenshot.src} alt={sos.screenshot.alt} fill sizes="262px" className="object-cover object-top" />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
