import { motion } from "framer-motion";
import { useReducedMotion } from "./motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const problemItems = [
  {
    id: "01",
    title: "Disconnected Systems",
    description: "CRMs, calendars, and email don't talk to each other.",
    icon: (
      <svg className="w-8 h-8 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    large: true,
  },
  {
    id: "02",
    title: "Manual Entry",
    description: "Copy‑paste errors waste hours.",
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    large: false,
  },
  {
    id: "03",
    title: "Data Silos",
    description: "Information trapped in separate tools.",
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    large: false,
  },
  {
    id: "04",
    title: "Delayed Responses",
    description: "Leads wait hours for follow‑up.",
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    large: false,
  },
  {
    id: "05",
    title: "Missed Opportunities",
    description: "No system to track intent signals.",
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    large: false,
  },
];

function ProblemCard({ item, index }: { item: (typeof problemItems)[0]; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
      className={`bg-white/5 rounded-2xl border border-white/10 flex flex-col ${
        item.large ? "md:col-span-2 p-6" : "p-4"
      }`}
    >
      <div className={item.large ? "flex items-start gap-4" : "flex flex-col items-start gap-2"}>
        {item.icon}
        <div>
          <h4 className={`font-bold text-white ${item.large ? "text-lg" : "text-sm"}`}>{item.title}</h4>
          <p className={`text-white/60 ${item.large ? "text-sm" : "text-xs"}`}>{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

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
            Your tools are disconnected
          </motion.h2>
          <motion.p
            className="mt-7 text-base leading-[1.75] text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...fade, delay: 0.16 }}
          >
            Most agencies run on a patchwork of CRMs, calendars, and spreadsheets. Nothing talks to each other — so
            leads slip through the cracks.
          </motion.p>
        </div>

        {/* Dashed connector line */}
        <div className="relative h-0.5 w-full max-w-3xl mx-auto mt-12 mb-8">
          <hr className="border-t border-dashed border-white/20" />
        </div>

        {/* Card grid – 5 columns with first item spanning 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-stretch mt-6">
          {problemItems.map((item, index) => (
            <ProblemCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
