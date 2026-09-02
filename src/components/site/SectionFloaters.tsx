import { motion } from "framer-motion";
import { useReducedMotion } from "./motion";

type Variant = "a" | "b" | "c" | "d";

type Node = { x: number; y: number };

/** Sparse blueprint schematics: thin connectors, small joint dots. No drifting. */
const diagrams: Record<Variant, { nodes: Node[]; edges: [number, number][] }> = {
  a: {
    nodes: [
      { x: 60, y: 120 },
      { x: 240, y: 60 },
      { x: 240, y: 190 },
      { x: 470, y: 110 },
      { x: 700, y: 55 },
      { x: 700, y: 175 },
      { x: 930, y: 120 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 6],
      [5, 6],
    ],
  },
  b: {
    nodes: [
      { x: 90, y: 70 },
      { x: 90, y: 200 },
      { x: 330, y: 135 },
      { x: 560, y: 70 },
      { x: 560, y: 200 },
      { x: 830, y: 135 },
      { x: 1020, y: 60 },
    ],
    edges: [
      [0, 2],
      [1, 2],
      [2, 3],
      [2, 4],
      [3, 5],
      [4, 5],
      [5, 6],
    ],
  },
  c: {
    nodes: [
      { x: 50, y: 190 },
      { x: 220, y: 190 },
      { x: 220, y: 80 },
      { x: 440, y: 80 },
      { x: 440, y: 200 },
      { x: 690, y: 200 },
      { x: 690, y: 90 },
      { x: 960, y: 90 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ],
  },
  d: {
    nodes: [
      { x: 80, y: 130 },
      { x: 300, y: 50 },
      { x: 300, y: 130 },
      { x: 300, y: 210 },
      { x: 540, y: 130 },
      { x: 780, y: 70 },
      { x: 780, y: 190 },
      { x: 1000, y: 130 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 5],
      [4, 6],
      [5, 7],
      [6, 7],
    ],
  },
};

/**
 * Low-opacity blueprint schematic pinned to the TOP band of a section, masked
 * out before it reaches body copy. Joints breathe gently in place; nothing moves.
 * Always z-0 — content must be z-10.
 */
export function SectionFloaters({ variant = "a" }: { variant?: Variant }) {
  const reduced = useReducedMotion();
  const { nodes, edges } = diagrams[variant];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[38%] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
      }}
    >
      <svg
        viewBox="0 0 1100 260"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-x-0 top-0 h-full w-full text-primary opacity-[0.09]"
      >
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="3"
            fill="currentColor"
            animate={reduced ? {} : { r: [2.4, 3.6, 2.4], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5 + (i % 4), delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
