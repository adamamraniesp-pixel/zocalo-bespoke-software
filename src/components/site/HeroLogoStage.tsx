import { motion } from "framer-motion";
import { useReducedMotion } from "./motion";
import logoAsset from "@/assets/zocalo-logo-hero.png.asset.json";

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
 * Hero centrepiece: the uploaded Zocalo mark rendered crisply as a flat
 * <img>, floating gently with Framer Motion. Small geometric shapes drift
 * behind it at z-0.
 */
export function HeroLogoStage({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={`relative aspect-square w-full ${className ?? ""}`}>
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

      {/* the uploaded mark — crisp, flat, animated */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          animate={
            reduced
              ? {}
              : { y: [0, -18, 0], rotateY: [-9, 9, -9] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
          <img
            src={logoAsset.url}
            alt="Zocalo"
            className="h-auto w-[62%] max-w-[340px] min-w-[200px] select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
}
