"use client";

import { useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Its Been 1 Year working with Monk Wise Media — their creative strategy is top notch. Highly Recommended.",
    name: "Japneet Taneja",
    role: "Founder, Taneja Furniture",
    initials: "JT",
  },
  {
    quote:
      "With Monk Wise Media, we've seen incredible growth in our online presence and MP Tourism Official Instagram posted our content.",
    name: "Manav",
    role: "Founder, Prakrat Fashion",
    initials: "M",
  },
  {
    quote:
      "First time into running this brand I was in profit only because of Monk Wise Media. RTO Decreased, Profits Increased.",
    name: "Vanshdeep",
    role: "Founder, Legacy Originals",
    initials: "V",
  },
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltTransform, setTiltTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = -((y - rect.height / 2) / rect.height) * 8;
    const rotY = ((x - rect.width / 2) / rect.width) * 8;
    setTiltTransform(`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`);
  };

  const handleMouseLeave = () =>
    setTiltTransform("perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)");

  return (
    <figure
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden cursor-default"
      style={{
        background: "#ffffff",
        border: "1px solid #e5e5e5",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        transform: tiltTransform,
        transition: "transform 0.12s ease-out, box-shadow 0.3s ease",
      }}
    >
      <div className="pointer-events-none absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      {/* Quote mark */}
      <div className="text-4xl font-display text-accent/20 leading-none mb-3 select-none">&ldquo;</div>

      <blockquote className="text-fg text-base leading-relaxed flex-1">
        {t.quote}
      </blockquote>

      <figcaption className="mt-6 pt-5 border-t border-surface-border flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-accent-bright flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(204,17,17,0.15), rgba(255,240,240,0.8))",
            border: "1px solid rgba(204,17,17,0.25)",
          }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-display text-sm text-fg">{t.name}</p>
          <p className="text-xs text-fg-faint mt-0.5">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-bg flex flex-col justify-center overflow-hidden" style={{ height: "100vh" }}>
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-4">
            What clients say
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
            Trusted by founders
            <br />
            who measure everything.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ perspective: "1000px" }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
