import { useEffect, useState } from "react";
import { useReducedMotion } from "./motion";

/**
 * Slow-drifting dot grid + soft mesh behind hero copy.
 * Reacts to cursor with a few pixels of parallax. Disabled under reduced motion.
 */
export function HeroBackdrop() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        setPos({ x: nx, y: ny });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -inset-24 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(45% 45% at 20% 8%, color-mix(in oklab, var(--secondary) 60%, transparent) 0%, transparent 70%), radial-gradient(38% 40% at 82% 30%, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 72%)",
          transform: `translate3d(${pos.x * -14}px, ${pos.y * -10}px, 0)`,
          transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="dot-drift absolute -inset-32 opacity-[0.35]"
        style={{
          transform: `translate3d(${pos.x * 8}px, ${pos.y * 6}px, 0)`,
          transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />
    </div>
  );
}
