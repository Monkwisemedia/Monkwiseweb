"use client";

// ── ADD YOUR CLIENT BRANDS HERE ────────────────────────────────────────────────
// logo: path to image in /public/images/ — leave null to show initials only
const BRANDS: { name: string; logo: string | null }[] = [
  { name: "Taneja Furniture", logo: null },
  { name: "Doly Poly by Yonex Wears", logo: null },
  { name: "Ozmo Gyms", logo: null },
  { name: "Hiyaav Academy", logo: null },
  { name: "Sakash", logo: null },
  { name: "Balaji", logo: null },
  { name: "Meridian Consultancy", logo: null },
  { name: "Sant Motors", logo: null },
  { name: "The Hangout", logo: null },
  { name: "Harman Arora", logo: null },
  { name: "Wraply", logo: null },
  { name: "Creative Caters", logo: null },
  { name: "Magnetic Yaadein", logo: null },
  { name: "Dacus EV", logo: null },
  { name: "Krishna Honda", logo: null },
  { name: "Aamchoori", logo: null },
  { name: "Legacy Originals", logo: null },
  { name: "Prakrat", logo: null },
  { name: "Indore Clothing Company", logo: null },
  { name: "Blunt Studios", logo: null },
  { name: "Seasmoke", logo: null },
  { name: "Tango Production", logo: null },
  { name: "Bombay Fusion Salon", logo: null },
  { name: "House of Dray", logo: null },
  { name: "Hands of God Originals", logo: null },
  { name: "The Wellness Box", logo: null },
  { name: "Bharat Innovations", logo: null },
  { name: "Funpro", logo: null },
  { name: "Femea Clothing", logo: null },
  { name: "Wicked Chkn", logo: null },
  { name: "Generic Drip", logo: null },
  { name: "Wovenize", logo: null },
  { name: "Ria Jain Makeup", logo: null },
];
// ─────────────────────────────────────────────────────────────────────────────

function BrandPill({ brand }: { brand: typeof BRANDS[0] }) {
  const initials = brand.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className="flex items-center gap-3 rounded-full px-5 py-3 flex-shrink-0 group transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, rgba(240,240,240,0.8), rgba(247,247,247,0.6))",
        border: "1px solid rgba(220,220,220,0.8)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,51,51,0.3)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(204,17,17,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(220,220,220,0.8)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {brand.logo ? (
        <img src={brand.logo} alt={brand.name} className="h-7 w-7 object-contain rounded-full" />
      ) : (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-accent-bright font-mono text-[0.6rem] font-medium flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(204,17,17,0.2), rgba(247,247,247,0.8))",
            border: "1px solid rgba(255,51,51,0.2)",
          }}
        >
          {initials}
        </div>
      )}
      <span className="text-sm text-fg-muted whitespace-nowrap font-medium">{brand.name}</span>
    </div>
  );
}

export default function Brands() {
  // Duplicate for seamless loop
  const row1 = [...BRANDS, ...BRANDS];
  const row2 = [...BRANDS.slice().reverse(), ...BRANDS.slice().reverse()];

  return (
    <section className="relative bg-bg-elevated overflow-hidden flex flex-col justify-center" style={{ height: "100vh" }}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-elevated via-transparent to-bg-elevated z-10" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-4">
          Brands we work with
        </p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
          Growing with the best
          <span className="text-accent-bright"> D2C brands.</span>
        </h2>
        <p className="mt-4 text-fg-muted text-base max-w-lg mx-auto">
          From day-one startups to scaling D2C brands — we partner with founders who are serious about growth.
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative z-0 mb-4 overflow-hidden">
        <div
          className="flex gap-3 w-max"
          style={{ animation: "marquee-left 60s linear infinite" }}
        >
          {row1.map((b, i) => <BrandPill key={i} brand={b} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative z-0 overflow-hidden">
        <div
          className="flex gap-3 w-max"
          style={{ animation: "marquee-right 70s linear infinite" }}
        >
          {row2.map((b, i) => <BrandPill key={i} brand={b} />)}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
