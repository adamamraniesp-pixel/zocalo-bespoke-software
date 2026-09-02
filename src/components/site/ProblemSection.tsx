import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "./motion";

/* ------------------------------- Glyphs ----------------------------------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Missed calls — handset with a severed signal arc. */
const GlyphCalls = (
  <>
    <path d="M14 30h10l4 8-5 4a16 16 0 0 0 9 9l4-5 8 4v10c0 2-2 4-4 4A30 30 0 0 1 10 34c0-2 2-4 4-4Z" {...stroke} />
    <path d="M42 12a14 14 0 0 1 8 8" {...stroke} />
    <path d="M50 26 58 34M58 26l-8 8" {...stroke} />
  </>
);

/** Manual re-entry — same row copied into stacked sheets. */
const GlyphReentry = (
  <>
    <rect x="8" y="14" width="28" height="34" rx="2" {...stroke} />
    <rect x="20" y="22" width="28" height="34" rx="2" {...stroke} />
    <path d="M26 34h16M26 42h11" {...stroke} />
  </>
);

/** Disconnected tools — two nodes, broken link. */
const GlyphDisconnected = (
  <>
    <circle cx="16" cy="34" r="8" {...stroke} />
    <circle cx="52" cy="34" r="8" {...stroke} />
    <path d="M26 34h5M37 34h5" {...stroke} />
  </>
);

/** Repetitive work — loop arrow. */
const GlyphLoop = (
  <>
    <path d="M14 34a20 20 0 0 1 34-14" {...stroke} />
    <path d="M48 12v10h-10" {...stroke} />
    <path d="M54 34a20 20 0 0 1-34 14" {...stroke} />
    <path d="M20 58V48h10" {...stroke} />
  </>
);

/** Lost opportunities — declining trace with a dropped point. */
const GlyphLost = (
  <>
    <path d="M10 16v40h44" {...stroke} />
    <path d="M16 26l10 10 8-6 10 12" {...stroke} />
    <circle cx="50" cy="46" r="2.4" fill="currentColor" />
  </>
);

/* ------------------------------- Content ---------------------------------- */

const pains: { title: string; body: string; glyph: ReactNode }[] = [
  {
    title: "Missed calls after hours",
    body: "Demand arrives when nobody is at the desk, and the enquiry goes to whoever answers first.",
    glyph: GlyphCalls,
  },
  {
    title: "Manual admin and re-entry",
    body: "The same record typed into three different tools.",
    glyph: GlyphReentry,
  },
  {
    title: "Disconnected tools",
    body: "Subscriptions that never learned to talk to each other.",
    glyph: GlyphDisconnected,
  },
  {
    title: "Repetitive work",
    body: "Skilled people spending their day on mechanical steps.",
    glyph: GlyphLoop,
  },
  {
    title: "Lost opportunities",
    body: "Follow-up that depends on someone remembering.",
    glyph: GlyphLost,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------- Card ------------------------------------ */

function PainCard({
  pain,
  index,
  featured,
}: {
  pain: (typeof pains)[number];
  index: number;
  featured?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.li
      className={featured ? "sm:col-span-2 lg:row-span-2" : ""}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
    >
      <div
        className={`group relative flex h-full flex-col justify-between border border-border bg-card/60 transition-[border-color,box-shadow] duration-500 ease-out hover:border-primary/40 ${
          featured ? "rounded-lg px-8 py-9 md:px-10 md:py-11" : "rounded-md px-6 py-7 md:px-7 md:py-8"
        }`}
      >
        <div>
          <span
            aria-hidden
            className="inline-flex text-primary/70 transition-colors duration-500 group-hover:text-primary"
          >
            <svg
              viewBox="0 0 64 64"
              className={featured ? "size-11" : "size-8"}
              aria-hidden
            >
              {pain.glyph}
            </svg>
          </span>
          <h3
            className={`mt-6 font-medium tracking-[-0.01em] text-foreground ${
              featured
                ? "max-w-[20rem] text-xl leading-[1.3] md:text-2xl"
                : "max-w-[16rem] text-[1.05rem] leading-[1.4] md:text-lg"
            }`}
          >
            {pain.title}
          </h3>
          <p
            className={`mt-3.5 leading-[1.75] text-muted-foreground ${
              featured ? "max-w-sm text-[0.95rem]" : "text-sm"
            }`}
          >
            {pain.body}
          </p>
        </div>
        <span
          aria-hidden
          className="mt-8 h-px w-10 origin-left bg-primary/30 transition-transform duration-500 ease-out group-hover:scale-x-[2.2]"
        />
      </div>
    </motion.li>
  );
}

/* -------------------------------- Section --------------------------------- */

export function Problem() {
  const fade = { duration: 0.65, ease: EASE };

  return (
    <section className="section relative overflow-hidden border-t border-border">
      <div className="container-x">
        <div className="max-w-2xl">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={fade}
          >
            The Problem
          </motion.p>
          <motion.h2
            className="mt-6 text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...fade, delay: 0.08 }}
          >
            Growth stalls in the gaps between your tools
          </motion.h2>
          <motion.p
            className="mt-7 text-base leading-[1.75] text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...fade, delay: 0.16 }}
          >
            Most businesses don't lose margin to strategy—they lose it to friction. Work handed
            between inboxes, spreadsheets, and subscriptions no one owns.
          </motion.p>
        </div>

        <div className="relative mt-14">
          {/* dashed connector reinforcing "disconnected" */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden border-t border-dashed border-border lg:block"
          />
          <ul className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {pains.map((p, i) => (
              <PainCard key={p.title} pain={p} index={i} featured={i === 0} />
            ))}
          </ul>
        </div>

        <motion.p
          className="mt-14 text-xl leading-[1.4] font-medium tracking-[-0.02em] text-balance md:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ ...fade, delay: 0.1 }}
        >
          We build software that eliminates those bottlenecks
        </motion.p>
      </div>
    </section>
  );
}
