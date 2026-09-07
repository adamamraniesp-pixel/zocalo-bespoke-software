import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useElementProgress, useReducedMotion } from "./motion";

const pains = [
  { title: "One decline feels like the end", body: "A no from one lender should mean the next qualified option—not another application from scratch." },
  { title: "Rates and terms buried in fine print", body: "Factor rates, APR, holdbacks, and total payback should be explained with clear math before you sign." },
  { title: "The SBA timeline does not fit every need", body: "SBA loans can offer strong rates, but a 60–90 day process is the wrong answer when capital is urgent." },
  { title: "Every lender wants different paperwork", body: "Repeated applications waste time and make it harder to compare real offers on equal terms." },
  { title: "Stacked debt hides the full picture", body: "Multiple advances can compound quickly without a clear view of cash flow, payoff, and consolidation options." },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Problem() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { ref, progress } = useElementProgress<HTMLDivElement>();

  return (
    <section className="section border-t border-border">
      <div className="container-x grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
        <div className="self-start lg:sticky lg:top-32">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>The Problem</motion.p>
          <motion.h2 className="mt-6 max-w-xl text-3xl leading-[1.12] font-medium tracking-display md:text-[2.75rem]" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08, ease: EASE }}>
            Good businesses are often matched to the wrong capital
          </motion.h2>
          <motion.p className="mt-7 max-w-md text-base leading-[1.8] text-muted-foreground" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.14, ease: EASE }}>
            Approval depends on far more than a credit score. Revenue, time in business, industry, use of funds, and urgency all change which lender is the right fit.
          </motion.p>
          <p className="mt-10 max-w-sm border-l border-primary pl-5 text-sm leading-[1.7] text-foreground/80">We make the lender market easier to navigate—and keep qualified applications moving.</p>
        </div>

        <div ref={ref} className="relative pl-5 sm:pl-9">
          <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-border">
            <motion.span className="block h-full origin-top bg-primary" style={{ scaleY: reduced ? 1 : progress }} />
          </div>
          <ol className="border-t border-border">
            {pains.map((pain, index) => {
              const open = active === index;
              const panelId = `pain-panel-${index}`;
              return (
                <motion.li key={pain.title} initial={{ opacity: 0, y: reduced ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }} className="border-b border-border">
                  <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setActive(open ? -1 : index)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} className="group grid w-full grid-cols-[4.5rem_1fr_auto] items-start gap-4 py-7 text-left sm:grid-cols-[6.5rem_1fr_auto] sm:py-9">
                    <span className="font-mono text-[2rem] leading-none font-semibold text-transparent transition-colors duration-300 [font-variant-numeric:tabular-nums] [-webkit-text-stroke:1px_color-mix(in_oklab,var(--primary)_35%,transparent)] group-hover:[-webkit-text-stroke-color:var(--primary)] sm:text-[2.6rem]">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-lg leading-[1.3] font-medium text-foreground sm:text-xl">{pain.title}</span>
                      <span id={panelId} className="grid transition-[grid-template-rows,opacity] duration-500 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
                        <span className="overflow-hidden"><span className="block max-w-md pt-3 text-sm leading-[1.75] text-muted-foreground">{pain.body}</span></span>
                      </span>
                    </span>
                    <Plus className={`mt-1 size-4 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}