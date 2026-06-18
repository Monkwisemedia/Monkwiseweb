"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-bg-elevated">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-4">
          Get in touch
        </p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
          Let&rsquo;s grow your brand.
        </h2>
        <p className="mt-5 text-fg-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Tell us about your brand and what you're trying to grow. We reply
          within one business day.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 card-glass rounded-2xl p-6 sm:p-9 text-left grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs text-fg-muted">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-accent transition-colors outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs text-fg-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@brand.com"
              className="bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-accent transition-colors outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-xs text-fg-muted">
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 00000 00000"
              className="bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-accent transition-colors outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="text-xs text-fg-muted">
              Brand / company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Your brand name"
              className="bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-accent transition-colors outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="message" className="text-xs text-fg-muted">
              What do you need help with?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell us about your brand and goals..."
              className="bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-accent transition-colors outline-none resize-none"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-bg hover:bg-accent-bright transition-all duration-200 shadow-[0_0_30px_rgba(59,165,92,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="flex items-center justify-center gap-2 text-sm text-accent-bright">
                <CheckCircle2 size={16} />
                Message sent. We&rsquo;ll be in touch within one business
                day.
              </p>
            )}

            {status === "error" && (
              <p className="flex items-center justify-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} />
                {errorMsg}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
