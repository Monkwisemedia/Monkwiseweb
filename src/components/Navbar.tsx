"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Results" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-surface-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.png"
            alt="Monk Wise Media"
            width={40}
            height={40}
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display font-semibold text-lg tracking-tight text-fg">
            Monk Wise Media
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted hover:text-accent-bright transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent-bright transition-colors duration-200 shadow-[0_0_24px_rgba(59,165,92,0.35)]"
        >
          Start a Project
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="lg:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block h-[1.5px] w-6 bg-fg transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-fg transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-bg/95 backdrop-blur-md border-b border-surface-border px-6 py-6 flex flex-col gap-5">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-fg-muted hover:text-accent-bright transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-bg"
          >
            Start a Project
          </a>
        </div>
      )}
    </header>
  );
}
