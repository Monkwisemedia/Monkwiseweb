"use client";

// Signature element: a thin branching line-art motif (echoing the tree/roots
// in the Monk Wise Media logo) that draws itself in on scroll. Used sparingly
// as a connective thread between sections rather than as decoration everywhere.
export default function RootLines({
  className = "",
  variant = "down",
}: {
  className?: string;
  variant?: "down" | "up";
}) {
  const path =
    variant === "down"
      ? "M100 0 V40 M100 40 C100 60 80 65 70 80 M100 40 C100 60 120 65 130 80 M70 80 C65 95 50 95 45 110 M70 80 C75 95 85 95 90 112 M130 80 C135 95 150 95 155 110 M130 80 C125 95 115 95 112 112"
      : "M100 160 V120 M100 120 C100 100 80 95 70 80 M100 120 C100 100 120 95 130 80 M70 80 C65 65 50 65 45 50 M70 80 C75 65 85 65 90 48 M130 80 C135 65 150 65 155 50 M130 80 C125 65 115 65 112 48";

  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d={path}
        stroke="var(--accent)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: "draw-root 2.4s ease-out forwards",
        }}
      />
      <style>{`
        @keyframes draw-root {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
