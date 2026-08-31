import { motion } from "framer-motion";
import { useReducedMotion } from "./motion";

/**
 * Thin wavy lines + drifting particles. Sits behind copy at z-0 with very low
 * opacity so text stays perfectly readable.
 */
export function WaveBackdrop() {
  const reduced = useReducedMotion();

  const lines = [
    { d: "M0 60 C 180 20, 360 100, 540 60 S 900 20, 1200 70", color: "var(--primary)", o: 0.3 },
    { d: "M0 100 C 220 60, 380 140, 600 100 S 940 60, 1200 110", color: "var(--secondary)", o: 0.22 },
    { d: "M0 140 C 200 110, 420 180, 640 140 S 980 100, 1200 150", color: "var(--gold)", o: 0.18 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {lines.map((l, i) => (
          <motion.path
            key={i}
            d={l.d}
            fill="none"
            stroke={l.color}
            strokeWidth="1"
            opacity={l.o}
            animate={reduced ? {} : { x: [0, i % 2 === 0 ? 40 : -40, 0], y: [0, i * 4 - 4, 0] }}
            transition={{ duration: 18 + i * 5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {[
        { x: "12%", y: "26%", c: "var(--primary)", d: 12 },
        { x: "38%", y: "70%", c: "var(--gold)", d: 15 },
        { x: "66%", y: "22%", c: "var(--secondary)", d: 17 },
        { x: "86%", y: "62%", c: "var(--primary)", d: 13 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute size-1.5 rounded-full"
          style={{ left: p.x, top: p.y, backgroundColor: p.c, opacity: 0.25 }}
          animate={reduced ? {} : { y: [0, -22, 0], opacity: [0.12, 0.32, 0.12] }}
          transition={{ duration: p.d, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Slow glowing dots + soft breathing gradient — used behind the stats band. */
export function GlowDotsBackdrop() {
  const reduced = useReducedMotion();

  const dots = [
    { x: "8%", y: "20%", c: "var(--primary)", s: 180, d: 14 },
    { x: "42%", y: "72%", c: "var(--gold)", s: 150, d: 18 },
    { x: "72%", y: "18%", c: "var(--secondary)", s: 200, d: 16 },
    { x: "92%", y: "66%", c: "var(--primary)", s: 160, d: 20 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.x,
            top: d.y,
            width: d.s,
            height: d.s,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(closest-side, color-mix(in oklab, ${d.c} 22%, transparent), transparent 75%)`,
          }}
          animate={
            reduced ? {} : { opacity: [0.35, 0.75, 0.35], scale: [0.9, 1.12, 0.9], y: [0, -14, 0] }
          }
          transition={{ duration: d.d, delay: i * 0.9, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="motes absolute inset-0 opacity-[0.12]" />
    </div>
  );
}
