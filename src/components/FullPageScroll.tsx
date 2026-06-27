"use client";

import { useEffect, useRef, Children } from "react";
import { useScroll, SECTION_NAMES } from "@/context/ScrollContext";

export default function FullPageScroll({ children }: { children: React.ReactNode }) {
  const { current, go } = useScroll();
  const total = SECTION_NAMES.length;
  const prevRef = useRef(current);
  const dirRef = useRef<1 | -1>(1);
  const prevSectionRef = useRef(current);
  const touchStart = useRef(0);

  // Track prev + direction for animation
  const prevCurrent = prevRef.current;
  if (prevRef.current !== current) {
    dirRef.current = current > prevRef.current ? 1 : -1;
    prevRef.current = current;
  }

  const navigate = (d: 1 | -1) => go(current + d);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 5) return;
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown","PageDown"].includes(e.key)) { e.preventDefault(); navigate(1); }
      if (["ArrowUp","PageUp"].includes(e.key))   { e.preventDefault(); navigate(-1); }
    };
    const onTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [current]);

  const sections = Children.toArray(children);
  const dir = dirRef.current;

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative", background: "var(--bg)" }}>

      {sections.map((child, i) => {
        const isActive  = i === current;
        const isLeaving = i === prevCurrent && prevCurrent !== current;
        if (!isActive && !isLeaving) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              height: "100vh",
              overflow: "hidden",
              willChange: "transform, opacity",
              zIndex: isActive ? 2 : 1,
              animation: isActive
                ? `section-enter-${dir > 0 ? "down" : "up"} 0.85s cubic-bezier(0.77,0,0.175,1) forwards`
                : `section-leave-${dir > 0 ? "down" : "up"} 0.85s cubic-bezier(0.77,0,0.175,1) forwards`,
            }}
          >
            {child}
          </div>
        );
      })}

      {/* Side nav dots */}
      <nav className="fixed right-6 lg:right-8 top-1/2 z-[200] -translate-y-1/2 flex flex-col gap-3 items-end">
        {SECTION_NAMES.map((name, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            title={name}
            className="group flex items-center gap-2 p-1"
          >
            <span
              className="opacity-0 group-hover:opacity-100 text-[0.65rem] text-fg-muted whitespace-nowrap transition-all duration-200 rounded px-2 py-0.5 pointer-events-none"
              style={{ background: "rgba(247,247,247,0.85)", backdropFilter: "blur(8px)", border: "1px solid rgba(220,220,220,0.8)" }}
            >
              {name}
            </span>
            <div
              style={{
                width:  i === current ? 10 : 6,
                height: i === current ? 10 : 6,
                borderRadius: i === current ? 4 : "50%",
                background: i === current ? "var(--accent-bright)" : "var(--fg-faint)",
                boxShadow: i === current ? "0 0 12px rgba(255,51,51,0.7)" : "none",
                transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
              }}
            />
          </button>
        ))}
      </nav>

      {/* Bottom-left counter */}
      <div className="fixed bottom-8 left-8 z-[200] hidden lg:flex items-center gap-4">
        <span className="font-mono text-xs text-accent-bright tabular-nums">
          {String(current + 1).padStart(2, "0")}
        </span>
        <div className="w-20 h-px bg-surface-border relative overflow-hidden">
          <div
            style={{
              position: "absolute", inset: 0,
              background: "var(--accent-bright)",
              boxShadow: "0 0 6px rgba(255,51,51,0.8)",
              transformOrigin: "left",
              transform: `scaleX(${(current + 1) / total})`,
              transition: "transform 0.85s cubic-bezier(0.77,0,0.175,1)",
            }}
          />
        </div>
        <span className="font-mono text-xs text-fg-faint tabular-nums">
          {String(total).padStart(2, "0")}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-fg-faint ml-2">
          {SECTION_NAMES[current]}
        </span>
      </div>

      {/* Scroll hint */}
      {current === 0 && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none"
          style={{ animation: "bounce-hint 2s ease-in-out infinite" }}
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-faint">Scroll</span>
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className="text-fg-faint">
            <rect x="1" y="1" width="12" height="16" rx="6" stroke="currentColor" strokeWidth="1"/>
            <rect x="6" y="4" width="2" height="4" rx="1" fill="currentColor"/>
          </svg>
        </div>
      )}

      <style>{`
        @keyframes section-enter-down {
          from { transform: translateY(100%); opacity: 0.7; }
          to   { transform: translateY(0);    opacity: 1;   }
        }
        @keyframes section-leave-down {
          from { transform: translateY(0);    opacity: 1;   }
          to   { transform: translateY(-25%); opacity: 0;   }
        }
        @keyframes section-enter-up {
          from { transform: translateY(-100%); opacity: 0.7; }
          to   { transform: translateY(0);     opacity: 1;   }
        }
        @keyframes section-leave-up {
          from { transform: translateY(0);   opacity: 1; }
          to   { transform: translateY(25%); opacity: 0; }
        }
        @keyframes bounce-hint {
          0%,100% { transform: translateX(-50%) translateY(0);  opacity:0.5; }
          50%      { transform: translateX(-50%) translateY(6px); opacity:1;   }
        }
      `}</style>
    </div>
  );
}
