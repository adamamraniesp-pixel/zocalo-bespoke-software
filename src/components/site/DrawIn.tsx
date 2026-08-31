import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps an inline SVG glyph and plays a stroke draw-in reveal when it
 * scrolls into view. Respects prefers-reduced-motion.
 */
export function DrawIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`glyph-draw ${drawn ? "is-drawn" : ""} ${className ?? ""}`}>
      {children}
    </div>
  );
}
