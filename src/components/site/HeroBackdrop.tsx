import { motion } from "framer-motion";
import { useReducedMotion } from "./motion";

const nodes = [
  { x: 90, y: 150 },
  { x: 250, y: 70 },
  { x: 250, y: 240 },
  { x: 470, y: 155 },
  { x: 700, y: 80 },
  { x: 700, y: 250 },
  { x: 900, y: 165 },
  { x: 1090, y: 90 },
  { x: 1090, y: 250 },
];

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [6, 7],
  [6, 8],
];

/**
 * Hero backdrop: soft light wash + a sparse blueprint schematic. Joints breathe
 * in place; nothing drifts, floats, or rotates.
 */
export function HeroBackdrop() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute -inset-24 opacity-[0.65]"
        style={{
          background:
            "radial-gradient(45% 45% at 20% 8%, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 70%), radial-gradient(38% 40% at 82% 26%, color-mix(in oklab, var(--gold) 6%, transparent) 0%, transparent 72%)",
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-[62%]"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
        }}
      >
        <svg
          viewBox="0 0 1200 330"
          preserveAspectRatio="xMidYMin slice"
          className="absolute inset-0 h-full w-full text-primary opacity-[0.1]"
        >
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a]!.x}
              y1={nodes[a]!.y}
              x2={nodes[b]!.x}
              y2={nodes[b]!.y}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r="3.2"
              fill="currentColor"
              animate={reduced ? {} : { r: [2.6, 4, 2.6], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 5.5 + (i % 5),
                delay: i * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />
    </div>
  );
}
