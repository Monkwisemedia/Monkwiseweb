"use client";

import { createContext, useContext, useRef, useState, useCallback } from "react";

type ScrollCtx = {
  current: number;
  go: (index: number) => void;
  goToId: (id: string) => void;
};

const ScrollContext = createContext<ScrollCtx>({
  current: 0,
  go: () => {},
  goToId: () => {},
});

// Map of section id → section index
export const SECTION_IDS: Record<string, number> = {
  top:          0,
  brands:       1,
  services:     2,
  work:         3,
  process:      4,
  testimonials: 5,
  contact:      6,
};

export const SECTION_NAMES = [
  "Home", "Brands", "Services", "Portfolio",
  "Process", "Results", "Contact",
];

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const locked = useRef(false);

  const go = useCallback((next: number) => {
    if (locked.current || next < 0 || next >= SECTION_NAMES.length) return;
    setCurrent(next);
    locked.current = true;
    setTimeout(() => { locked.current = false; }, 900);
  }, []);

  const goToId = useCallback((id: string) => {
    // Strip leading #
    const key = id.replace(/^#/, "");
    const index = SECTION_IDS[key];
    if (index !== undefined) go(index);
  }, [go]);

  return (
    <ScrollContext.Provider value={{ current, go, goToId }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}
