import { motion } from "framer-motion";
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

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------- Card ------------------------------------ */

function PainCard({ pain, index }: { pain: (typeof pains)[number]; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.li
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: EASE }}
    >
      <div className="group h-full rounded-xl border border-border bg-card/60 px-6 py-7 transition-[border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_16px_40px_-26px_color-mix(in_oklab,var(--primary)_60%,transparent)] md:px-7 md:py-8">
        <span className="font-mono text-xs leading-none tracking-[0.16em] text-muted-foreground/60 transition-colors duration-300 ease-out group-hover:text-gold">
          {pain.n}
        </span>
        <h3 className="mt-5 text-[1.05rem] leading-[1.4] font-medium tracking-[-0.01em] text-foreground md:text-lg">
          {pain.title}
        </h3>
        <p className="mt-2.5 text-sm leading-[1.7] text-muted-foreground">{pain.body}</p>
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

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {pains.map((p, i) => (
            <PainCard key={p.n} pain={p} index={i} />
          ))}
        </ul>

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
