import {
  Megaphone,
  Target,
  Layers,
  ShoppingBag,
  Code2,
  PenTool,
} from "lucide-react";

const SERVICES = [
  {
    icon: PenTool,
    title: "Content Creation",
    desc:
      "Scroll-stopping reels, static creatives, and brand films shot and edited to perform, not just look good.",
  },
  {
    icon: Target,
    title: "Paid Advertising",
    desc:
      "Performance campaigns across Meta, Google, JioHotstar, and ChatGPT Ads, built around your actual unit economics.",
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    desc:
      "Calendars, community replies, and a posting rhythm that compounds instead of resetting every month.",
  },
  {
    icon: ShoppingBag,
    title: "D2C Brand Management",
    desc:
      "End-to-end ownership of how your brand shows up online, from positioning to the campaigns that carry it.",
  },
  {
    icon: Code2,
    title: "Website Development",
    desc:
      "Fast, conversion-ready websites and landing pages built to turn ad traffic into customers, not just visitors.",
  },
  {
    icon: Layers,
    title: "Full Growth Systems",
    desc:
      "Strategy, creative, media buying, and the site they all point to, run as one connected system.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-bg-elevated">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-4">
            What we do
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
            Every branch, grown from
            <span className="text-accent-bright"> one root system.</span>
          </h2>
          <p className="mt-5 text-fg-muted text-base sm:text-lg leading-relaxed">
            Most agencies hand you off between departments. We run content,
            ads, and your website as a single connected system &mdash; because
            that&rsquo;s how growth actually compounds.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group card-glass rounded-2xl p-7 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-accent-dim/40 text-accent-bright mb-5 transition-colors duration-300 group-hover:bg-accent/20">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="font-display font-medium text-lg text-fg mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
