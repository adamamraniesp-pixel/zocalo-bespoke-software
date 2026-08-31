import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useReducedMotion } from "./motion";

/* ------------------------------- Content ---------------------------------- */

const pains = [
  {
    n: "01",
    title: "Missed calls after hours",
    body: "Demand arrives when nobody is at the desk.",
  },
  {
    n: "02",
    title: "Manual admin and re-entry",
    body: "The same record typed into three different tools.",
  },
  {
    n: "03",
    title: "Disconnected tools",
    body: "Subscriptions that never learned to talk to each other.",
  },
  {
    n: "04",
    title: "Repetitive work",
    body: "Skilled people spending their day on mechanical steps.",
  },
  {
    n: "05",
    title: "Lost opportunities",
    body: "Follow-up that depends on someone remembering.",
  },
];

/* ------------------------------- Tilt card -------------------------------- */

function PainCard({ pain, index }: { pain: (typeof pains)[number]; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.4 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 9);
    rx.set(py * -7);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const offset = index % 2 === 1 ? "md:ml-16 lg:ml-24" : "md:mr-16 lg:mr-24";

  return (
    <motion.li
      className={`relative ${offset}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={
          {
            rotateX: rx,
            rotateY: ry,
            transformStyle: "preserve-3d",
          } as MotionStyle
        }
        whileHover={reduced ? {} : { y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="group relative flex items-start gap-6 rounded-lg border border-border bg-card px-6 py-7 backdrop-blur-[2px] transition-[border-color,box-shadow] duration-300 ease-out hover:border-primary hover:shadow-[0_18px_50px_-22px_color-mix(in_oklab,var(--primary)_65%,transparent)] md:px-8 md:py-8"
      >
        <span className="font-mono text-sm leading-none tracking-[0.14em] text-muted-foreground/60 transition-colors duration-300 ease-out group-hover:text-gold">
          {pain.n}
        </span>
        <div>
          <h3 className="text-[1.05rem] leading-[1.4] font-medium tracking-[-0.01em] text-foreground md:text-lg">
            {pain.title}
          </h3>
          <p className="mt-2 text-sm leading-[1.7] text-muted-foreground">{pain.body}</p>
        </div>
      </motion.div>
    </motion.li>
  );
}

/* ------------------------------ Z connector ------------------------------- */

/**
 * Scroll-drawn "Z" spine sitting behind the cards. The zigzag mirrors the
 * Zocalo mark and terminates in a glowing gold node directly above the
 * solution line, connecting problem to answer.
 */
function ZSpine({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const pathLength = useTransform(progress, [0.05, 0.78], [0, 1]);
  const dotOpacity = useTransform(progress, [0.72, 0.86], [0, 1]);
  const dotScale = useTransform(progress, [0.72, 0.9], [0.4, 1]);

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 620"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <motion.path
        d="M12 24 H88 L14 150 H86 L16 276 H84 L18 402 H82 L20 528 H50 V596"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
        style={{ pathLength }}
      />
      <motion.g style={{ opacity: dotOpacity, scale: dotScale, originX: "50px", originY: "596px" }}>
        <circle cx="50" cy="596" r="9" fill="var(--gold)" opacity="0.18" />
        <circle cx="50" cy="596" r="4.5" fill="var(--gold)" />
      </motion.g>
    </svg>
  );
}

/* -------------------------------- Section --------------------------------- */

export function Problem() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });

  const fade = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="section relative overflow-hidden border-t border-border">
      <div ref={ref} className="container-x grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        {/* Left — heading column */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={fade}
          >
            The Problem
          </motion.p>
          <motion.h2
            className="mt-6 text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]"
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...fade, delay: 0.1 }}
          >
            Growth stalls in the gaps between your tools
          </motion.h2>
          <motion.p
            className="mt-8 max-w-md text-base leading-[1.75] text-muted-foreground"
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...fade, delay: 0.2 }}
          >
            Most businesses don't lose margin to strategy—they lose it to friction. Work handed
            between inboxes, spreadsheets, and subscriptions no one owns.
          </motion.p>
        </div>

        {/* Right — Z spine + tilt cards */}
        <div className="relative">
          <div className="absolute inset-x-0 -top-4 bottom-16 hidden md:block">
            <ZSpine progress={scrollYProgress} />
          </div>

          <ul className="relative flex flex-col gap-5 md:gap-7">
            {pains.map((p, i) => (
              <PainCard key={p.n} pain={p} index={i} />
            ))}
          </ul>

          <motion.p
            className="relative mt-14 text-xl leading-[1.4] font-medium tracking-[-0.02em] text-balance md:text-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ ...fade, delay: 0.1 }}
          >
            We build software that eliminates those bottlenecks
          </motion.p>
        </div>
      </div>
    </section>
  );
}
