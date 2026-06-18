"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-40 pb-28 lg:pt-48 lg:pb-36 bg-grain"
    >
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[560px] w-[760px] rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 right-[8%] h-64 w-64 rounded-full bg-accent-bright/10 blur-[90px]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-accent/30 blur-2xl animate-pulse" />
            <Image
              src="/images/logo.png"
              alt="Monk Wise Media logo"
              width={88}
              height={88}
              className="relative h-20 w-20 object-contain"
              priority
            />
          </div>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-6">
          Rooted in strategy &mdash; built for growth
        </p>

        <h1 className="font-display font-semibold text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-7xl tracking-tight text-fg glow-text">
          We grow D2C brands
          <br />
          <span className="text-accent-bright">from the roots up.</span>
        </h1>

        <p className="mt-7 max-w-2xl mx-auto text-base sm:text-lg text-fg-muted leading-relaxed">
          Monk Wise Media is a full-stack social media marketing agency &mdash;
          content, performance ads, brand strategy, and web development,
          working together as one connected system instead of disconnected
          vendors.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-bg hover:bg-accent-bright transition-all duration-200 shadow-[0_0_30px_rgba(59,165,92,0.4)] hover:shadow-[0_0_40px_rgba(127,224,160,0.5)] w-full sm:w-auto"
          >
            Book a Strategy Call
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-full border border-surface-border px-7 py-3.5 text-sm font-medium text-fg hover:border-accent hover:text-accent-bright transition-all duration-200 w-full sm:w-auto"
          >
            See Our Work
          </a>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-fg-faint">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] w-full sm:w-auto">
            Platforms we run on
          </p>
          {["Meta Ads", "Google Ads", "JioHotstar", "ChatGPT Ads", "Instagram", "YouTube"].map(
            (p) => (
              <span key={p} className="text-sm text-fg-muted">
                {p}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
