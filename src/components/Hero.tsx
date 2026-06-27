"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScroll } from "@/context/ScrollContext";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const { goToId } = useScroll();
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg"
      style={{ minHeight: "100vh" }}
    >
      {/* Three.js WebGL Scene — right half / full bg */}
      <div
        className="absolute inset-0"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.2s ease",
          transform: `translateY(${scrollY * 0.25}px)`,
        }}
      >
        <HeroScene />
      </div>

      {/* Gradient overlays so text is readable over the 3D */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent pointer-events-none" />
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-accent/8 blur-[120px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex items-center min-h-screen">
        <div className="max-w-2xl pt-28 pb-20">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 mb-8"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright animate-pulse" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent-bright">
              Rooted in strategy — built for growth
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-semibold text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-fg"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
            }}
          >
            We grow D2C brands
            <br />
            <span
              className="text-accent-bright"
              style={{ textShadow: "0 0 40px rgba(204,17,17,0.3), 0 0 80px rgba(204,17,17,0.1)" }}
            >
              from the roots up.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 text-base sm:text-lg text-fg-muted leading-relaxed max-w-xl"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
            }}
          >
            Monk Wise Media is a full-stack social media marketing agency —
            content, performance ads, brand strategy, and web development
            working as one connected system.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s",
            }}
          >
            <MagneticButton onClick={() => goToId("contact")} primary>
              Book a Strategy Call
            </MagneticButton>
            <MagneticButton onClick={() => goToId("work")}>
              See Our Work
            </MagneticButton>
          </div>

          {/* Stats row */}
          <div
            className="mt-16 flex flex-wrap gap-8"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease 1s",
            }}
          >
            {[
              { value: "3+", label: "Years of Experience" },
              { value: "50+", label: "Brands Grown" },
              { value: "10x", label: "Avg. ROAS Achieved" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="font-display font-semibold text-3xl text-accent-bright"
                  style={{ textShadow: "0 0 20px rgba(204,17,17,0.2)" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-fg-faint mt-1 uppercase tracking-[0.15em] font-mono">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platforms strip */}
      <div
        className="absolute bottom-0 left-0 right-0 border-t border-surface-border/50 bg-bg/60"
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-wrap items-center gap-x-10 gap-y-2">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fg-faint">
            Platforms we run on
          </p>
          {["Meta Ads", "Google Ads", "JioHotstar", "ChatGPT Ads", "Instagram", "YouTube"].map((p) => (
            <span key={p} className="text-xs text-fg-muted">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Magnetic button component
function MagneticButton({
  onClick,
  children,
  primary,
}: {
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium ${
        primary
          ? "bg-accent text-bg hover:bg-accent-bright"
          : "border border-surface-border text-fg hover:border-accent hover:text-accent-bright"
      }`}
      style={
        primary
          ? { boxShadow: "0 0 30px rgba(204,17,17,0.4), 0 0 60px rgba(204,17,17,0.15)", transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), background 0.2s" }
          : { backdropFilter: "blur(8px)", background: "rgba(240,240,240,0.3)", transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s, color 0.2s" }
      }
    >
      {children}
    </button>
  );
}
