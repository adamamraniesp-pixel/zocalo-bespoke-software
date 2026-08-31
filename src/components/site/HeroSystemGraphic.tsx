import type { CSSProperties } from "react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const d = (ms: number) => ({ ["--hero-draw-delay" as never]: `${ms}ms` }) as CSSProperties;

/**
 * Abstract "system" schematic that draws itself in on load via stroke-dashoffset,
 * with nodes popping in behind the strokes. Purely decorative.
 */
export function HeroSystemGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      className={`hero-draw text-primary ${className ?? ""}`}
      aria-hidden
      role="presentation"
    >
      {/* outer frame */}
      <rect x="10" y="14" width="300" height="192" rx="6" {...stroke} opacity="0.16" style={d(80)} />

      {/* spine */}
      <path d="M40 110h64" {...stroke} opacity="0.5" style={d(240)} />
      <path d="M104 110c22 0 18-52 40-52h44" {...stroke} opacity="0.55" style={d(380)} />
      <path d="M104 110c22 0 18 52 40 52h44" {...stroke} opacity="0.4" style={d(520)} />
      <path d="M188 58h46c14 0 14 52 28 52" {...stroke} opacity="0.45" style={d(660)} />
      <path d="M188 162h46c14 0 14-52 28-52" {...stroke} opacity="0.3" style={d(800)} />

      {/* core module */}
      <rect x="118" y="92" width="52" height="36" rx="4" {...stroke} opacity="0.6" style={d(940)} />
      <path d="M128 104h32M128 116h20" {...stroke} opacity="0.4" style={d(1080)} />

      {/* satellites */}
      <circle cx="40" cy="110" r="9" {...stroke} opacity="0.6" style={d(1160)} />
      <circle cx="262" cy="110" r="13" {...stroke} opacity="0.55" style={d(1240)} />
      <path d="M282 110h26" {...stroke} opacity="0.25" style={d(1320)} />

      {/* ticks */}
      <path d="M30 190h40M84 190h26M126 190h58" {...stroke} opacity="0.18" style={d(1400)} />

      {/* nodes */}
      <g className="text-gold">
        <circle cx="188" cy="58" r="3.4" fill="currentColor" className="hero-node" style={d(1180)} />
      </g>
      <circle cx="188" cy="162" r="3" fill="currentColor" opacity="0.65" className="hero-node" style={d(1280)} />
      <circle cx="262" cy="110" r="3.4" fill="currentColor" className="hero-node idle-breathe" style={d(1380)} />
      <circle cx="144" cy="110" r="2.6" fill="currentColor" opacity="0.8" className="hero-node" style={d(1460)} />
    </svg>
  );
}
