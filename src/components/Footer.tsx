import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-surface-border py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-white.png"
            alt="Monk Wise Media"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-display font-medium text-sm text-fg">
            Monk Wise Media
          </span>
        </div>

        <p className="text-xs text-fg-faint">
          &copy; {new Date().getFullYear()} Monk Wise Media. All rights
          reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="#services"
            className="text-xs text-fg-muted hover:text-accent-bright transition-colors"
          >
            Services
          </a>
          <a
            href="#work"
            className="text-xs text-fg-muted hover:text-accent-bright transition-colors"
          >
            Work
          </a>
          <a
            href="#contact"
            className="text-xs text-fg-muted hover:text-accent-bright transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
