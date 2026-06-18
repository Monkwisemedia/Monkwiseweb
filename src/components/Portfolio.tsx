"use client";

import { ArrowUpRight } from "lucide-react";

// TEMPLATE DATA — replace each entry with a real client case study.
// "metric" should be the single most impressive number from that campaign.
const CASE_STUDIES = [
  {
    brand: "Legacy Originals",
    category: "D2C · Clothing",
    metric: "6.2x",
    metricLabel: "ROAS in 40 days",
    summary:
      "Fixed Strategy, Website Redesign & Paid Ads to achieve 6.2x ROAS in 40 days for this D2C clothing brand.",
  },
  {
    brand: "Prakrat Fashion",
    category: "D2C · Fashion",
    metric: "+180%",
    metricLabel: "Instagram engagement",
    summary:
      "Strategise Customer Experience & Buying Patterns to increase Instagram engagement by 180%.",
  },
  {
    brand: "Taneja Furniture",
    category: "Local · Furniture",
    metric: "2M",
    metricLabel: "Social Media Reach",
    summary:
      "Created FOMO & Customer Centric Content to drive social media engagement & Walk-in Traffic.",
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="relative py-24 lg:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-4">
              Selected work
            </p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
              Results, not just reach.
            </h2>
          </div>
          <p className="text-sm text-fg-faint max-w-xs">
            This section is a template &mdash; swap in your real client names,
            numbers, and creative once you have 2&ndash;3 case studies ready.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((c) => (
            <div
              key={c.brand}
              className="group relative card-glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/40"
            >
              <div className="relative h-44 bg-gradient-to-br from-accent-dim/30 via-surface to-bg-elevated flex items-center justify-center border-b border-surface-border">
                <span className="font-display text-2xl text-fg-faint">
                  {c.brand}
                </span>
                <ArrowUpRight
                  size={18}
                  className="absolute top-4 right-4 text-fg-faint transition-colors duration-300 group-hover:text-accent-bright"
                />
              </div>
              <div className="p-7">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-fg-faint mb-3">
                  {c.category}
                </p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display font-semibold text-3xl text-accent-bright">
                    {c.metric}
                  </span>
                  <span className="text-sm text-fg-muted">
                    {c.metricLabel}
                  </span>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {c.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
