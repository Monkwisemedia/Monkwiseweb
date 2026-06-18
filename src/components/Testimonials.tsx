const TESTIMONIALS = [
  {
    quote:
      "Its Been 1 Years working with Monk Wise Media their craetive strategy is top knotch, Highly Recommended.",
    name: "Japneet Taneja",
    role: "Founder, Taneja Furniture",
  },
  {
    quote:
      "With Monk Wise Media, we've seen incredible growth in our online presence and MP Tourism Official Instagram posted our content.",
    name: "Manav",
    role: "Founder, Prakrat Fashion",
  },
  {
    quote:
      "First time into running this brand i was in profit only because of Monk Wise Media, RTO Decreased Profits Increased.",
    name: "Vanshdeep",
    role: "Founder, Legacy Originals",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-4">
            What clients say
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
            Trusted by founders
            <br />
            who measure everything.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="card-glass rounded-2xl p-7 flex flex-col justify-between"
            >
              <blockquote className="text-fg text-base leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-surface-border">
                <p className="font-display text-sm text-fg">{t.name}</p>
                <p className="text-xs text-fg-faint mt-0.5">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
