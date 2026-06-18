import RootLines from "./RootLines";

const STAGES = [
  {
    stage: "Root",
    title: "Strategy & Audit",
    desc:
      "We start underground: auditing your current presence, your numbers, and your customer before touching a single ad account.",
  },
  {
    stage: "Trunk",
    title: "Creative & Setup",
    desc:
      "Content systems, ad accounts, tracking, and your website foundation get built to carry weight, not just look nice.",
  },
  {
    stage: "Branch",
    title: "Launch & Scale",
    desc:
      "Campaigns go live across Meta, Google, JioHotstar, and ChatGPT Ads, branching budget toward what's actually converting.",
  },
  {
    stage: "Canopy",
    title: "Compound Growth",
    desc:
      "Monthly reporting and iteration so results compound instead of resetting — this is the visible part everyone sees.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-32 bg-bg-elevated overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2">
        <RootLines variant="down" className="w-40 opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-4">
            How we work
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
            Growth has an order.
            <br />
            We follow it.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-surface-border rounded-2xl overflow-hidden">
          {STAGES.map((s) => (
            <div
              key={s.stage}
              className="bg-bg-elevated p-8 flex flex-col gap-4 hover:bg-surface transition-colors duration-300"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-bright">
                {s.stage}
              </span>
              <h3 className="font-display font-medium text-xl text-fg">
                {s.title}
              </h3>
              <p className="text-sm text-fg-muted leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
