"use client";

import { useRef, useState, useEffect } from "react";

const REELS = [
  {
    file: "Seasmoke 3_1.mp4",
    client: "Seasmoke",
    desc: "Brand reel",
    tag: "Brand Film",
  },
  {
    file: "Bharat Innovation.mp4",
    client: "Bharat Innovation",
    desc: "Campaign video",
    tag: "Campaign",
  },
  {
    file: "Rimple Pahwa Cotoure Intro.mp4",
    client: "Rimple Pahwa Couture",
    desc: "Brand intro",
    tag: "Brand Film",
  },
  {
    file: "Blunt Studios Chai Tapri.mp4",
    client: "Blunt Studios",
    desc: "Chai Tapri reel",
    tag: "Social Reel",
  },
  {
    file: "MMF Environment Final.mp4",
    client: "MMF Environment",
    desc: "Brand video",
    tag: "Brand Film",
  },
  {
    file: "Plantation Video.mp4",
    client: "Plantation",
    desc: "Campaign reel",
    tag: "Campaign",
  },
];

function ReelCard({ reel, index }: { reel: typeof REELS[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) *  12;
    setTilt({ x, y });
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col group"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 10 : 0}px)`,
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Video frame — 9:16 */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          aspectRatio: "9/16",
          background: "#071a1a",
          border: `1px solid ${hovered ? "rgba(45,212,191,0.4)" : "rgba(20,55,55,0.7)"}`,
          boxShadow: hovered
            ? "0 24px 60px rgba(20,184,166,0.2), 0 0 0 1px rgba(45,212,191,0.15)"
            : "0 4px 20px rgba(0,0,0,0.4)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Thumbnail shimmer while loading */}
        {!loaded && (
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(135deg, #071a1a, #0d2626, #071a1a)",
              backgroundSize: "200% 200%",
              animation: "shimmer 2s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(20,184,166,0.15)", border: "1px solid rgba(45,212,191,0.2)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="1.5">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-fg-faint">Loading</span>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          src={`/videos/${encodeURIComponent(reel.file)}`}
          muted
          playsInline
          loop
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          className="w-full h-full object-cover"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(2,15,15,0.85) 0%, transparent 40%)",
          }}
        />

        {/* Top edge shimmer */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none" />

        {/* Tag badge */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full font-mono text-[0.6rem] uppercase tracking-widest"
          style={{
            background: "rgba(7,26,26,0.85)",
            border: "1px solid rgba(45,212,191,0.2)",
            color: "var(--accent-bright)",
            backdropFilter: "blur(8px)",
          }}
        >
          {reel.tag}
        </div>

        {/* Mute toggle — shows on hover */}
        {hovered && playing && (
          <button
            onClick={toggleMute}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(7,26,26,0.85)",
              border: "1px solid rgba(45,212,191,0.25)",
              backdropFilter: "blur(8px)",
              color: "var(--accent-bright)",
            }}
          >
            {muted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <path d="M19.07,4.93a10,10,0,0,1,0,14.14M15.54,8.46a5,5,0,0,1,0,7.07" />
              </svg>
            )}
          </button>
        )}

        {/* Play indicator — center, shows when not playing */}
        {!playing && loaded && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: hovered ? 0 : 0.5, transition: "opacity 0.3s" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(20,184,166,0.2)", border: "1px solid rgba(45,212,191,0.3)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#2dd4bf">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Card label */}
      <div className="mt-2.5 px-1">
        <p className="font-display text-sm font-medium text-fg leading-tight">{reel.client}</p>
        <p className="text-xs text-fg-faint mt-0.5">{reel.desc}</p>
      </div>

      <style>{`
        @keyframes shimmer {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section
      id="work"
      className="relative bg-bg overflow-hidden flex flex-col justify-center"
      style={{ height: "100vh" }}
    >
      <div className="pointer-events-none absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/4 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/3 blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-3">
              Our portfolio
            </p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-fg">
              Content that converts,
              <span className="text-accent-bright"> not just impresses.</span>
            </h2>
          </div>
          <p className="text-xs text-fg-faint font-mono hidden lg:block">
            Hover to preview · Click speaker to unmute
          </p>
        </div>

        <div
          className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4"
          style={{ perspective: "1200px" }}
        >
          {REELS.map((reel, i) => (
            <ReelCard key={i} reel={reel} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
