import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "./motion";
import markAsset from "@/assets/zocalo-mark.png.asset.json";

/**
 * Hero centrepiece: the official transparent Zocalo mark as a flat <img>,
 * inside a 3D stage — slow Y-axis auto-rotation, gentle float, and a
 * 15deg cursor-tracking tilt.
 */
export function HeroLogoStage({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  const tiltY = useTransform(sx, [-0.5, 0.5], [-15, 15]);
  const tiltX = useTransform(sy, [-0.5, 0.5], [12, -12]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / Math.max(window.innerWidth / 2, 1);
      const ny = (e.clientY - (r.top + r.height / 2)) / Math.max(window.innerHeight / 2, 1);
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
        className="pointer-events-none absolute inset-[14%] z-0 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 14%, transparent), transparent 78%)",
        }}
      />

      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, -16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}>
            <motion.div
              animate={reduced ? {} : { rotateY: [0, 360] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={markAsset.url}
                alt="Zocalo"
                draggable={false}
                className="h-auto w-[78vw] max-w-[380px] min-w-[240px] select-none"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
