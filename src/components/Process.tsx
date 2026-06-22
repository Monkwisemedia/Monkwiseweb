"use client";

import { useRef, useEffect, useState } from "react";

const STAGES = [
  {
    stage: "01",
    label: "Root",
    title: "Strategy & Audit",
    desc:
      "We start underground: auditing your current presence, your numbers, and your customer before touching a single ad account.",
    delay: 0,
  },
  {
    stage: "02",
    label: "Trunk",
    title: "Creative & Setup",
    desc:
      "Content systems, ad accounts, tracking, and your website foundation get built to carry weight, not just look nice.",
    delay: 100,
  },
  {
    stage: "03",
    label: "Branch",
    title: "Launch & Scale",
    desc:
      "Campaigns go live across Meta, Google, JioHotstar, and ChatGPT Ads, branching budget toward what's actually converting.",
    delay: 200,
  },
  {
    stage: "04",
    label: "Canopy",
    title: "Compound Growth",
    desc:
      "Monthly reporting and iteration so results compound instead of resetting — this is the visible part everyone sees.",
    delay: 300,
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Process() {
  const { ref: sectionRef, visible } = useInView(0.1);

  return (
    <section id="process" ref={sectionRef} className="relative bg-bg-elevated overflow-hidden flex flex-col justify-center" style={{ height: "100vh" }}>
      {/* 3D perspective grid floor effect */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(var(--accent-bright) 1px, transparent 1px), linear-gradient(90deg, var(--accent-bright) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: "perspective(400px) rotateX(60deg)",
          transformOrigin: "bottom center",
        }}
      />

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-accent/30" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-4">
            How we work
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
            Growth has an order.
            <br />
            We follow it.
          </h2>
        </div>

        {/* Desktop: horizontal 3D timeline */}
        <div className="hidden lg:block" style={{ perspective: "1200px" }}>
          {/* Connector line */}
          <div className="relative mb-8 flex items-center justify-between px-8">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            {STAGES.map((s, i) => (
              <div
                key={s.stage}
                className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border text-accent-bright font-mono text-xs font-medium"
                style={{
                  background: "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(13,38,38,0.8))",
                  borderColor: "rgba(45,212,191,0.35)",
                  boxShadow: "0 0 20px rgba(20,184,166,0.2)",
                  transform: visible
                    ? `translateZ(0px) scale(1)`
                    : `translateZ(-40px) scale(0.8)`,
                  opacity: visible ? 1 : 0,
                  transition: `transform 0.6s ease ${s.delay + 100}ms, opacity 0.6s ease ${s.delay + 100}ms`,
                }}
              >
                {s.stage}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-5">
            {STAGES.map((s) => (
              <div
                key={s.stage}
                className="card-glass rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                style={{
                  transform: visible
                    ? `perspective(600px) rotateX(0deg) translateZ(0px)`
                    : `perspective(600px) rotateX(15deg) translateZ(-30px)`,
                  opacity: visible ? 1 : 0,
                  transition: `transform 0.7s ease ${s.delay}ms, opacity 0.7s ease ${s.delay}ms`,
                  boxShadow: "0 4px 30px rgba(20,184,166,0.05)",
                }}
              >
                <div className="pointer-events-none absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent-bright mb-1">{s.label}</p>
                <h3 className="font-display font-medium text-lg text-fg mb-3">{s.title}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="lg:hidden flex flex-col gap-4">
          {STAGES.map((s, i) => (
            <div key={s.stage} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full text-accent-bright font-mono text-xs flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(13,38,38,0.8))",
                    border: "1px solid rgba(45,212,191,0.3)",
                  }}
                >
                  {s.stage}
                </div>
                {i < STAGES.length - 1 && (
                  <div className="w-px flex-1 mt-2 bg-gradient-to-b from-accent/30 to-transparent" />
                )}
              </div>
              <div className="card-glass rounded-2xl p-6 flex-1 mb-2">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent-bright mb-1">{s.label}</p>
                <h3 className="font-display font-medium text-lg text-fg mb-2">{s.title}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
