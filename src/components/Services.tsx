"use client";

import { Megaphone, Target, Layers, ShoppingBag, Code2, PenTool } from "lucide-react";
import { useRef, useState } from "react";

const SERVICES = [
  {
    icon: PenTool,
    title: "Content Creation",
    back: "Scroll-stopping reels, static creatives, and brand films shot and edited to perform, not just look good.",
    stat: "200+", statLabel: "Pieces/month",
    color: "#14b8a6",
  },
  {
    icon: Target,
    title: "Paid Advertising",
    back: "Performance campaigns across Meta, Google, JioHotstar, and ChatGPT Ads built around your actual unit economics.",
    stat: "10x", statLabel: "Avg. ROAS",
    color: "#2dd4bf",
  },
  {
    icon: Megaphone,
    title: "Social Media Mgmt",
    back: "Calendars, community replies, and a posting rhythm that compounds instead of resetting every month.",
    stat: "50K+", statLabel: "Followers grown",
    color: "#14b8a6",
  },
  {
    icon: ShoppingBag,
    title: "D2C Brand Mgmt",
    back: "End-to-end ownership of how your brand shows up online, from positioning to the campaigns that carry it.",
    stat: "50+", statLabel: "Brands managed",
    color: "#2dd4bf",
  },
  {
    icon: Code2,
    title: "Website Dev",
    back: "Fast, conversion-ready websites and landing pages built to turn ad traffic into customers, not just visitors.",
    stat: "<2s", statLabel: "Avg. load time",
    color: "#14b8a6",
  },
  {
    icon: Layers,
    title: "Full Growth Systems",
    back: "Strategy, creative, media buying, and the site they all point to, run as one connected system.",
    stat: "3x", statLabel: "Revenue growth",
    color: "#2dd4bf",
  },
];

function ServiceCard({ s }: { s: typeof SERVICES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const Icon = s.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={() => setFlipped((f) => !f)}
      className="cursor-pointer"
      style={{ perspective: "900px", height: "220px" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: flipped
            ? "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
            : `transform 0.12s ease-out`,
          transform: flipped
            ? "rotateY(180deg)"
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(160deg, rgba(13,38,38,0.9), rgba(7,26,26,0.7))",
            border: "1px solid rgba(20,61,61,0.9)",
            boxShadow: "inset 0 1px 0 rgba(45,212,191,0.08)",
          }}
        >
          <div className="pointer-events-none absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          <div
            className="inline-flex items-center justify-center h-11 w-11 rounded-xl mb-5"
            style={{
              background: `linear-gradient(135deg, ${s.color}22, ${s.color}08)`,
              border: `1px solid ${s.color}30`,
              color: s.color,
            }}
          >
            <Icon size={20} strokeWidth={1.75} />
          </div>
          <h3 className="font-display font-medium text-lg text-fg mb-auto">{s.title}</h3>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="font-display font-semibold text-2xl" style={{ color: s.color }}>{s.stat}</p>
              <p className="text-xs text-fg-faint">{s.statLabel}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-fg-faint">
              <span>Tap to flip</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M15 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(160deg, ${s.color}18, ${s.color}06)`,
            border: `1px solid ${s.color}35`,
            boxShadow: `0 0 40px ${s.color}18`,
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
            style={{ background: `${s.color}20`, color: s.color }}
          >
            <Icon size={16} strokeWidth={1.75} />
          </div>
          <h3 className="font-display font-medium text-base text-fg mb-3">{s.title}</h3>
          <p className="text-sm text-fg-muted leading-relaxed">{s.back}</p>
          <p className="mt-4 text-xs text-fg-faint">Tap to flip back</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-bg-elevated flex flex-col justify-center overflow-hidden" style={{ height: "100vh" }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-4">
            What we do
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
            Every branch, grown from
            <span className="text-accent-bright"> one root system.</span>
          </h2>
          <p className="mt-5 text-fg-muted text-base sm:text-lg leading-relaxed">
            Most agencies hand you off between departments. We run content,
            ads, and your website as a single connected system.{" "}
            <span className="text-fg-faint text-sm">Tap cards to explore each service.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => <ServiceCard key={s.title} s={s} />)}
        </div>
      </div>
    </section>
  );
}
