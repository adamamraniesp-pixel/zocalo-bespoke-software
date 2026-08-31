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
        className="absolute -inset-24 opacity-[0.7]"
        style={{
          background:
            "radial-gradient(45% 45% at 20% 8%, color-mix(in oklab, var(--primary) 20%, transparent) 0%, transparent 70%), radial-gradient(38% 40% at 82% 30%, color-mix(in oklab, var(--gold) 8%, transparent) 0%, transparent 72%)",
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

      {/* Continuously drifting geometry — always moving, cursor-independent */}
      <div className="absolute inset-0">
        <svg
          className="absolute top-[12%] right-[6%] h-40 w-40 text-primary opacity-[0.22] float-slow md:h-56 md:w-56"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.7" />
        </svg>
        <svg
          className="spin-slow absolute bottom-[16%] right-[22%] h-24 w-24 text-gold opacity-[0.2] md:h-32 md:w-32"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <rect x="14" y="14" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        <svg
          className="float-slower absolute top-[52%] left-[4%] h-20 w-20 text-secondary opacity-[0.18] md:h-28 md:w-28"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <path d="M50 8 92 82H8Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />

    </div>
  );
}
