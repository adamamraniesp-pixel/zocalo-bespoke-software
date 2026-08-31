import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { useReducedMotion } from "./motion";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type LineProps = {
  d?: string;
  delay: number;
  opacity: number;
  as?: "path" | "rect" | "circle";
  attrs?: Record<string, string | number>;
};

function drawTransition(delay: number) {
  return {
    pathLength: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
    opacity: { duration: 0.35, delay },
  };
}

/**
 * Abstract engineering schematic: outer frame, central module, spine routing,
 * and satellite nodes. Lines draw themselves when scrolled into view, and the
 * whole group tilts subtly toward the cursor with a gentle idle float.
 */
export function HeroSystemGraphic({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width / 2)) / (r.width || 1);
        const ny = (e.clientY - (r.top + r.height / 2)) / (r.height || 1);
        setTilt({
          x: Math.max(-1, Math.min(1, ny)) * -10,
          y: Math.max(-1, Math.min(1, nx)) * 14,
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const draw = (delay: number, opacity: number) =>
    reduced
      ? { initial: { opacity }, animate: { opacity } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: inView ? { pathLength: 1, opacity } : { pathLength: 0, opacity: 0 },
          transition: drawTransition(delay),
        };

  const pop = (delay: number, opacity = 1) =>
    reduced
      ? { initial: { opacity }, animate: { opacity } }
      : {
          initial: { scale: 0, opacity: 0 },
          animate: inView ? { scale: 1, opacity } : { scale: 0, opacity: 0 },
          transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        animate={
          reduced
            ? undefined
            : {
                rotateX: tilt.x,
                rotateY: tilt.y,
                y: [0, -10, 0],
              }
        }
        transition={{
          rotateX: { type: "spring", stiffness: 60, damping: 18 },
          rotateY: { type: "spring", stiffness: 60, damping: 18 },
          y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 320 220" className="w-full text-primary" aria-hidden role="presentation">
          {/* outer frame */}
          <motion.rect x="10" y="14" width="300" height="192" rx="6" {...stroke} {...draw(0.05, 0.28)} />

          {/* spine routing */}
          <motion.path d="M40 110h64" {...stroke} {...draw(0.25, 0.5)} />
          <motion.path d="M104 110c22 0 18-52 40-52h44" {...stroke} {...draw(0.38, 0.55)} />
          <motion.path d="M104 110c22 0 18 52 40 52h44" {...stroke} {...draw(0.5, 0.4)} />
          <motion.path d="M188 58h46c14 0 14 52 28 52" {...stroke} {...draw(0.62, 0.45)} />
          <motion.path d="M188 162h46c14 0 14-52 28-52" {...stroke} {...draw(0.74, 0.3)} />

          {/* core module card */}
          <motion.rect x="118" y="92" width="52" height="36" rx="4" {...stroke} {...draw(0.88, 0.65)} />
          <motion.path d="M128 104h32" {...stroke} {...draw(1, 0.4)} />
          <motion.path d="M128 116h20" {...stroke} {...draw(1.08, 0.4)} />

          {/* satellites */}
          <motion.circle cx="40" cy="110" r="9" {...stroke} {...draw(1.12, 0.6)} />
          <motion.circle cx="262" cy="110" r="13" {...stroke} {...draw(1.2, 0.55)} />
          <motion.path d="M282 110h26" {...stroke} {...draw(1.3, 0.25)} />

          {/* baseline ticks */}
          <motion.path d="M30 190h40" {...stroke} {...draw(1.36, 0.18)} />
          <motion.path d="M84 190h26" {...stroke} {...draw(1.42, 0.18)} />
          <motion.path d="M126 190h58" {...stroke} {...draw(1.48, 0.18)} />

          {/* nodes */}
          <motion.circle cx="188" cy="58" r="3.6" className="text-gold" fill="currentColor" {...pop(1.2)} />
          <motion.circle cx="188" cy="162" r="3" fill="currentColor" {...pop(1.3, 0.65)} />
          <motion.circle cx="262" cy="110" r="3.6" fill="currentColor" {...pop(1.4)} />
          <motion.circle cx="144" cy="110" r="2.8" fill="currentColor" {...pop(1.5, 0.8)} />
        </svg>
      </motion.div>
    </div>
  );
}
