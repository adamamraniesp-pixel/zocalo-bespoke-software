import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "./motion";
import { ZocaloMark } from "./ZocaloLogo";

type Shape = {
  cls: string;
  dur: number;
  delay: number;
  svg: React.ReactNode;
};

const shapes: Shape[] = [
  {
    cls: "left-[2%] top-[6%] h-16 w-16 text-primary md:h-20 md:w-20",
    dur: 9,
    delay: 0,
    svg: <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1.2" />,
  },
  {
    cls: "right-[6%] top-[2%] h-14 w-14 text-secondary md:h-20 md:w-20",
    dur: 12,
    delay: 0.6,
    svg: <path d="M50 12 88 84H12Z" fill="none" stroke="currentColor" strokeWidth="1.2" />,
  },
  {
    cls: "right-[0%] top-[46%] h-16 w-24 text-gold md:h-20 md:w-32",
    dur: 10,
    delay: 1.1,
    svg: (
      <>
        <path d="M6 70 94 24" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <circle cx="94" cy="24" r="4" fill="currentColor" />
      </>
    ),
  },
  {
    cls: "left-[6%] bottom-[8%] h-14 w-14 text-secondary md:h-20 md:w-20",
    dur: 13,
    delay: 0.3,
    svg: (
      <rect
        x="16"
        y="16"
        width="68"
        height="68"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    ),
  },
  {
    cls: "right-[18%] bottom-[2%] h-12 w-12 text-primary md:h-16 md:w-16",
    dur: 8,
    delay: 1.4,
    svg: (
      <path
        d="M50 10 86 32v36L50 90 14 68V32Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    ),
  },
  {
    cls: "left-[44%] top-[0%] h-10 w-10 text-gold md:h-14 md:w-14",
    dur: 11,
    delay: 0.9,
    svg: <path d="M12 50h76M50 12v76" stroke="currentColor" strokeWidth="1.2" fill="none" />,
  },
];

/**
 * Hero centrepiece: the Zocalo mark as transparent inline SVG geometry,
 * inside a 3D transform container. Slow idle Y-axis auto-rotation, cursor
 * parallax tilt (~18deg), and a gentle vertical float.
 */
export function HeroLogoStage({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  const tiltY = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const tiltX = useTransform(sy, [-0.5, 0.5], [15, -15]);

  const [spin, setSpin] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / Math.max(window.innerWidth / 2, 1);
      const ny = (e.clientY - cy) / Math.max(window.innerHeight / 2, 1);
      mx.set(Math.max(-0.5, Math.min(0.5, nx)));
      my.set(Math.max(-0.5, Math.min(0.5, ny)));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  return (
    <div ref={stageRef} className={`relative aspect-square w-full ${className ?? ""}`}>
      {/* soft halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[8%] z-0 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 18%, transparent), transparent 78%)",
        }}
      />

      {/* drifting geometry — firmly behind the logo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {shapes.map((s, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 100"
            className={`absolute opacity-[0.28] ${s.cls}`}
            animate={
              reduced
                ? {}
                : {
                    y: [0, i % 2 === 0 ? -18 : 16, 0],
                    x: [0, i % 3 === 0 ? 10 : -8, 0],
                    rotate: [0, i % 2 === 0 ? 12 : -14, 0],
                  }
            }
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {s.svg}
          </motion.svg>
        ))}
      </div>

      {/* the mark — transparent SVG inside a 3D stage */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ perspective: 1200 }}
        onMouseEnter={() => setSpin(false)}
        onMouseLeave={() => setSpin(true)}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, -18, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={reduced || !spin ? { rotateY: 0 } : { rotateY: [0, 360] }}
              transition={
                reduced || !spin
                  ? { duration: 0.8, ease: "easeOut" }
                  : { duration: 26, repeat: Infinity, ease: "linear" }
              }
              style={{ transformStyle: "preserve-3d" }}
            >
              <ZocaloMark
                size={500}
                title="Zocalo"
                className="h-auto w-[92vw] max-w-[500px] min-w-[300px] select-none"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
