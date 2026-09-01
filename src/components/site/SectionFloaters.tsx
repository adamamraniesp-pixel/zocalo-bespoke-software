import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "./motion";

type Variant = "a" | "b" | "c" | "d";

const shapes: Record<Variant, { cls: string; svg: ReactNode }[]> = {
  a: [
    {
      cls: "right-[5%] top-6 h-32 w-32 text-primary md:h-48 md:w-48",
      svg: (
        <>
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.7" />
        </>
      ),
    },
    {
      cls: "left-[3%] top-16 h-20 w-20 text-secondary md:h-28 md:w-28",
      svg: <path d="M50 8 92 82H8Z" fill="none" stroke="currentColor" strokeWidth="0.8" />,
    },
    {
      cls: "left-[42%] top-2 h-16 w-16 text-gold md:h-24 md:w-24",
      svg: <path d="M12 50h76M50 12v76" stroke="currentColor" strokeWidth="0.7" fill="none" />,
    },
  ],
  b: [
    {
      cls: "right-[16%] top-10 h-24 w-24 text-gold md:h-32 md:w-32",
      svg: (
        <rect
          x="14"
          y="14"
          width="72"
          height="72"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      ),
    },
    {
      cls: "left-[8%] top-4 h-28 w-28 text-primary md:h-40 md:w-40",
      svg: (
        <>
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <path d="M6 50h88M50 6v88" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </>
      ),
    },
    {
      cls: "left-[46%] top-14 h-14 w-14 text-secondary md:h-20 md:w-20",
      svg: (
        <path
          d="M50 10 86 32v36L50 90 14 68V32Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      ),
    },
  ],
  c: [
    {
      cls: "right-[8%] top-8 h-28 w-28 text-secondary md:h-40 md:w-40",
      svg: (
        <>
          <circle cx="38" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="62" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.7" />
        </>
      ),
    },
    {
      cls: "left-[12%] top-20 h-16 w-16 text-gold md:h-24 md:w-24",
      svg: (
        <rect
          x="20"
          y="20"
          width="60"
          height="60"
          rx="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        />
      ),
    },
    {
      cls: "left-[52%] top-4 h-20 w-20 text-primary md:h-28 md:w-28",
      svg: <path d="M50 92 8 18h84Z" fill="none" stroke="currentColor" strokeWidth="0.8" />,
    },
  ],
  d: [
    {
      cls: "left-[6%] top-10 h-24 w-24 text-primary md:h-32 md:w-32",
      svg: <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.8" />,
    },
    {
      cls: "right-[10%] top-4 h-20 w-20 text-gold md:h-28 md:w-28",
      svg: (
        <rect
          x="18"
          y="18"
          width="64"
          height="64"
          rx="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        />
      ),
    },
    {
      cls: "left-[44%] top-16 h-16 w-16 text-secondary md:h-24 md:w-24",
      svg: <path d="M50 12 88 84H12Z" fill="none" stroke="currentColor" strokeWidth="0.8" />,
    },
  ],
};

/**
 * Subtle floating geometry pinned to the TOP band of a section only. The band
 * is masked so the shapes fade out well before the section's content, keeping
 * copy areas clean. Always sits at z-0 — content must be z-10.
 */
export function SectionFloaters({ variant = "a" }: { variant?: Variant }) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[42%] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
      }}
    >
      {shapes[variant].map((s, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 100 100"
          className={`absolute opacity-[0.14] ${s.cls}`}
          animate={
            reduced
              ? {}
              : { y: [0, i % 2 === 0 ? -14 : 12, 0], rotate: [0, i % 2 === 0 ? 6 : -8, 0] }
          }
          transition={{ duration: 16 + i * 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {s.svg}
        </motion.svg>
      ))}
    </div>
  );
}
