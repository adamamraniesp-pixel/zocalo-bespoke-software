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
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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
       <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 200 L150 100 L250 200 L150 300 Z" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4"/>
  <path d="M150 100 L350 80 L250 200" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
  <circle cx="50" cy="200" r="4" fill="#3b82f6" className="animate-pulse"/>
  <circle cx="150" cy="100" r="4" fill="#3b82f6" className="animate-pulse" style={{ animationDelay: '0.5s' }}/>
  <circle cx="250" cy="200" r="4" fill="#3b82f6" className="animate-pulse" style={{ animationDelay: '1s' }}/>
  <circle cx="150" cy="300" r="4" fill="#3b82f6" className="animate-pulse" style={{ animationDelay: '1.5s' }}/>
</svg>
  );
}
