"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

const { form } = contact;
const field =
  "mt-1.5 block min-h-12 w-full rounded-xl border border-line bg-white px-3.5 font-medium text-ink placeholder:text-muted/70 focus-visible:border-ink";

/**
 * No backend: the form builds a mailto: link so the message is sent from the visitor's own email app.
 * Works on the static cPanel deploy and nothing is stored on the site.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState<string>(form.topics[0]);
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `${topic}${name ? ` – ${name}` : ""}`;
    const body = `${message}\n\n${name ? `— ${name}` : ""}`.trim();
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section aria-labelledby="form-title" className="bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.3fr] lg:px-8 lg:py-28">
        <div>
          <p data-reveal className="font-bold text-brand">{form.eyebrow}</p>
          <h2 id="form-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {form.title}
          </h2>
          <p data-reveal className="mt-4 text-lg text-white/80">{form.body}</p>

        </div>

        <form data-reveal="right" onSubmit={onSubmit} className="rounded-3xl bg-white p-6 text-ink shadow-2xl shadow-ink/40 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="text-sm font-semibold text-muted">
                {form.nameLabel}
              </label>
              <input id="contact-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
            </div>
            <div>
              <label htmlFor="contact-topic" className="text-sm font-semibold text-muted">
                {form.topicLabel}
              </label>
              <div className="relative mt-1.5">
                <select
                  id="contact-topic"
                  name="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={`${field} mt-0 cursor-pointer appearance-none pr-10`}
                >
                  {form.topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <Icon name="chevronDown" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="contact-message" className="text-sm font-semibold text-muted">
              {form.messageLabel}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={form.messagePlaceholder}
              className={`${field} resize-y py-3`}
            />
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 font-bold text-ink transition-[background-color,scale] hover:bg-brand-strong active:scale-[0.98]"
          >
            <Icon name="mail" />
            {form.submit}
          </button>
          <p className="mt-3 text-center text-sm text-muted">{form.note}</p>
        </form>
      </div>
    </section>
  );
}
