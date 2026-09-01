import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";

import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { DrawIn, Reveal, StaggerWords, useElementProgress, useReducedMotion } from "./motion";
import { useHeaderTheme } from "./HeaderTheme";
import { MagneticCta } from "./MagneticCta";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroSystemGraphic } from "./HeroSystemGraphic";
import { SectionFloaters } from "./SectionFloaters";

import { GlowDotsBackdrop, WaveBackdrop } from "./AmbientBackdrops";
import { CountUp } from "./CountUp";

import navMark from "@/assets/zocalo-mark.png.asset.json";
import {
  GlyphAi,
  GlyphAnswering,
  GlyphBuild,
  GlyphDesign,
  GlyphDiscover,
  GlyphScale,
  GlyphBespoke,
  GlyphCrm,
  GlyphIntegration,
  GlyphOnboarding,
  GlyphPipeline,
  GlyphPlatform,
  GlyphWebsite,
  GlyphWorkflow,
} from "./Glyphs";

/* --------------------------------- SHARED --------------------------------- */

type Path = "/" | "/services" | "/what-we-build" | "/process" | "/why-zocalo" | "/contact";

export function LearnMore({ to, label = "Learn more" }: { to: Path; label?: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-sm text-primary transition-colors duration-200 ease-out hover:text-foreground"
    >
      {label}
      <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
    </Link>
  );
}

export function PageHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="px-6 pt-32 pb-16 md:px-10 md:pt-44 md:pb-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-6 max-w-3xl text-[2.25rem] leading-[1.08] font-medium tracking-display text-balance md:text-[3.5rem]">
            {title}
          </h1>
        </Reveal>
        {body ? (
          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              {body}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ---------------------------------- HERO ---------------------------------- */

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden px-6 pt-32 pb-24 md:px-10 md:pt-40"
    >
      <HeroBackdrop />
      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-[55%_45%]">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">Bespoke Software Engineering</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-7 max-w-3xl text-[2.75rem] leading-[1.06] font-medium tracking-display text-balance md:text-[4.25rem]">
              Software Built Around Your Business
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              We design and build bespoke software—from CRMs and AI systems to internal platforms,
              automation, and high-performance websites—built around the way your business actually
              works.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
              <MagneticCta to="/contact" variant="gold">
                Book a Consultation
              </MagneticCta>
              <MagneticCta to="/what-we-build" variant="primary">
                View Our Work
              </MagneticCta>
            </div>
          </Reveal>
        </div>

        <HeroSystemGraphic className="w-full max-w-[560px] justify-self-center lg:justify-self-end" />
      </div>
    </section>
  );
}

/* ------------------------------ TRUST STATEMENT --------------------------- */

export function TrustStatement() {
  return (
    <section className="section relative overflow-hidden border-y border-border">
      <WaveBackdrop />
      <div className="container-x relative z-10">
        <Reveal>
          <p className="max-w-4xl text-2xl leading-[1.45] font-light tracking-[-0.02em] text-balance md:text-[2.1rem]">
            No templates. No unnecessary subscriptions.{" "}
            <span className="text-muted-foreground">
              Every system is engineered around your business.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- SERVICES -------------------------------- */

type Service = {
  n: string;
  title: string;
  body: string;
  accent: string;
  duration: string;
  included: string[];
  Glyph: (props: { className?: string; style?: CSSProperties }) => ReactElement;
};

const services: Service[] = [
  {
    n: "01",
    title: "Bespoke Software Development",
    body: "Systems engineered from first principles for your operation. No templates, no forced workflows.",
    accent: "var(--primary)",
    duration: "8-16 weeks",
    included: [
      "Operational discovery and process mapping",
      "Architecture and data model design",
      "Staged delivery with fortnightly demos",
      "Documentation and handover",
    ],
    Glyph: GlyphBespoke,
  },
  {
    n: "02",
    title: "CRM Systems",
    body: "Pipelines, data models, and automations that mirror how your team actually sells and serves.",
    accent: "var(--secondary)",
    duration: "4-8 weeks",
    included: [
      "Custom pipeline design",
      "Data migration from existing tools",
      "Team training",
      "30-day post-launch support",
    ],
    Glyph: GlyphCrm,
  },
  {
    n: "03",
    title: "AI Automation",
    body: "Answering, triage, summarisation, and decision support wired directly into your operations.",
    accent: "var(--amber)",
    duration: "3-6 weeks",
    included: [
      "Call and message capture with transcription",
      "Qualification and routing rules",
      "Escalation paths to a human",
      "Accuracy review in the first 30 days",
    ],
    Glyph: GlyphAi,
  },
  {
    n: "04",
    title: "Internal Platforms",
    body: "One operating system for scheduling, reporting, and approvals—replacing spreadsheets and silos.",
    accent: "var(--teal)",
    duration: "6-12 weeks",
    included: [
      "Role-based access and approvals",
      "Scheduling and workload views",
      "Reporting dashboards",
      "Spreadsheet consolidation",
    ],
    Glyph: GlyphPlatform,
  },
  {
    n: "05",
    title: "Websites",
    body: "High-performance, conversion-focused front ends engineered for speed and search visibility.",
    accent: "var(--gold)",
    duration: "3-5 weeks",
    included: [
      "Design system and copy structure",
      "Core Web Vitals performance budget",
      "Technical SEO and analytics",
      "CMS or direct-edit handover",
    ],
    Glyph: GlyphWebsite,
  },
  {
    n: "06",
    title: "Integrations",
    body: "APIs and data pipelines that connect the tools you keep and retire the ones you don't.",
    accent: "var(--primary)",
    duration: "2-6 weeks",
    included: [
      "System and API audit",
      "Sync and reconciliation logic",
      "Failure alerting and retries",
      "Runbook for your team",
    ],
    Glyph: GlyphIntegration,
  },
];

export const serviceNames = services.map((s) => s.title);

/**
 * Services identity: a master-detail selector. The six capabilities live in a
 * rail on the left; selecting one crossfades its scope panel on the right.
 * Deliberately a different interaction model from /what-we-build's
 * case-study blocks.
 */
function ServiceDetail({ service }: { service: Service }) {
  return (
    <motion.div
      key={service.n}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -14 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      style={{ ["--service-accent" as never]: service.accent }}
      className="grid gap-10 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-12"
    >
      <div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.22em]" style={{ color: service.accent }}>
            {service.n}
          </span>
          <span className="h-px w-10" style={{ background: service.accent }} />
          <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Typical engagement · {service.duration}
          </span>
        </div>

        <h3 className="mt-6 text-[1.75rem] leading-[1.14] font-medium tracking-display md:text-[2.25rem]">
          {service.title}
        </h3>
        <p className="mt-5 max-w-xl text-base leading-[1.85] text-muted-foreground">
          {service.body}
        </p>

        <p className="mt-10 text-[0.7rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          What's included
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {service.included.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3 text-sm leading-[1.7] text-foreground/85"
            >
              <Check className="mt-[0.2rem] size-4 shrink-0" style={{ color: service.accent }} />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

      <DrawIn className="w-full md:justify-self-end" delay={40}>
        <service.Glyph className="h-32 w-full md:h-40" style={{ color: service.accent }} />
      </DrawIn>
    </motion.div>
  );
}

export function Services({
  condensed = false,
  heading = true,
}: {
  condensed?: boolean;
  heading?: boolean;
}) {
  const items = condensed ? services.slice(0, 3) : services;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = (items[activeIndex] ?? items[0])!;

  return (
    <section className={`relative overflow-hidden ${heading ? "section" : "section pt-0 md:pt-0"}`}>
      <SectionFloaters variant="b" />
      <div className="container-x relative z-10">
        {heading ? (
          <>
            <Reveal>
              <p className="eyebrow">Services</p>
            </Reveal>
            <Reveal delay={50}>
              <h2 className="mt-6 max-w-2xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
                Engineering across the full operational stack
              </h2>
            </Reveal>
          </>
        ) : null}

        <Reveal delay={80}>
          <div className="mt-12 grid gap-0 overflow-hidden rounded-lg border border-border bg-card/40 lg:grid-cols-[20rem_minmax(0,1fr)]">
            {/* Selector rail */}
            <div
              role="tablist"
              aria-label="Services"
              aria-orientation="vertical"
              className="flex overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0"
            >
              {items.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={s.n}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    className={`group relative flex shrink-0 items-center gap-4 px-6 py-5 text-left transition-colors duration-300 ease-out lg:shrink lg:border-b lg:border-border lg:last:border-b-0 ${
                      isActive
                        ? "bg-background/70 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[2px] origin-top transition-transform duration-400 ease-out"
                      style={{
                        background: s.accent,
                        transform: `scaleY(${isActive ? 1 : 0})`,
                      }}
                    />
                    <span
                      className="font-mono text-[0.7rem] tracking-[0.2em]"
                      style={{ color: isActive ? s.accent : undefined }}
                    >
                      {s.n}
                    </span>
                    <span className="text-sm font-medium tracking-[-0.005em] whitespace-nowrap lg:whitespace-normal">
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div className="relative min-h-[26rem] p-8 md:p-12">
              <AnimatePresence mode="wait" initial={false}>
                <ServiceDetail key={active.n} service={active} />
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {condensed ? (
          <Reveal delay={200}>
            <div className="mt-12">
              <LearnMore to="/services" label="All services" />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}


/* -------------------------------- PROBLEM --------------------------------- */

export { Problem } from "./ProblemSection";


/* ------------------------------ WHAT WE BUILD ----------------------------- */

const useCases = [
  {
    sector: "HVAC",
    title: "After-hours AI answering",
    body: "Every call captured, qualified, and dispatched—overnight and on weekends. The phone stops being a leak in the funnel.",
    metric: "24/7",
    metricLabel: "call coverage",
    accent: "var(--gold)",
    Glyph: GlyphAnswering,
  },
  {
    sector: "Real Estate",
    title: "Custom CRM",
    body: "Listings, buyers, and follow-up sequences in one pipeline built for your desk—valuations, viewings, and offers tracked in the same system your team already lives in.",
    metric: "01",
    metricLabel: "single pipeline",
    accent: "var(--teal)",
    Glyph: GlyphPipeline,
  },
  {
    sector: "Healthcare",
    title: "Patient workflow automation",
    body: "Intake, reminders, and records movement automated within compliance boundaries—so clinical time goes to patients instead of paperwork and re-entry.",
    metric: "0",
    metricLabel: "manual re-entry",
    accent: "var(--emerald)",
    Glyph: GlyphWorkflow,
  },
  {
    sector: "Professional Services",
    title: "Client onboarding systems",
    body: "Engagement letters, data collection, and kickoff orchestrated end to end, with every handoff visible and nothing waiting on a reminder someone forgot to send.",
    metric: "03",
    metricLabel: "steps, automated",
    accent: "var(--primary)",
    Glyph: GlyphOnboarding,
  },
];

type UseCase = (typeof useCases)[number];

/** Hero-scale sector block. Every case gets identical weight and padding. */
function UseCaseBlock({ useCase, flip }: { useCase: UseCase; flip: boolean }) {
  return (
    <article
      className="group grid grid-cols-1 items-center gap-10 rounded-xl border border-border bg-card/30 p-8 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--case-accent)_50%,transparent)] hover:bg-card/50 hover:shadow-[0_18px_48px_-24px_color-mix(in_oklab,var(--case-accent)_50%,transparent)] md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:p-12 lg:p-14"
      style={{ ["--case-accent" as never]: useCase.accent }}
    >
      <div className={flip ? "md:order-2" : undefined}>
        <span className="eyebrow" style={{ color: useCase.accent }}>
          {useCase.sector}
        </span>
        <h3 className="mt-5 max-w-lg text-[1.75rem] leading-[1.15] font-medium tracking-display md:text-[2.4rem]">
          {useCase.title}
        </h3>
        <p className="mt-6 max-w-xl text-base leading-[1.8] text-muted-foreground">{useCase.body}</p>
        <div className="mt-9 flex items-baseline gap-5">
          <span
            className="origin-left text-5xl leading-none font-light tracking-display transition-transform duration-500 ease-out group-hover:scale-105 md:text-6xl"
            style={{ color: useCase.accent }}
          >
            {useCase.metric}
          </span>
          <span className="text-xs tracking-[0.16em] uppercase text-muted-foreground">
            {useCase.metricLabel}
          </span>
        </div>
      </div>
      <DrawIn className={`w-full ${flip ? "md:order-1" : ""}`} delay={80}>
        <useCase.Glyph
          className="h-44 w-full opacity-80 transition-opacity duration-300 ease-out group-hover:opacity-100 md:h-56"
          style={{ color: useCase.accent }}
        />
      </DrawIn>
    </article>
  );
}


export function WhatWeBuild({
  condensed = false,
  heading = true,
}: {
  condensed?: boolean;
  heading?: boolean;
}) {
  const shown = condensed ? useCases.slice(0, 3) : useCases;

  return (
    <section
      className={`section relative overflow-hidden ${heading ? "border-t border-border" : "pt-0 md:pt-0"}`}
    >
      <SectionFloaters variant="c" />
      <div className="container-x relative z-10">
        {heading ? (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow">What We Build</p>
              </Reveal>
              <Reveal delay={50}>
                <h2 className="mt-6 max-w-xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
                  Systems in production, by sector
                </h2>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <p className="max-w-xs text-sm leading-[1.7] text-muted-foreground">
                Four operations, four different architectures. None of them started from a template.
              </p>
            </Reveal>
          </div>
        ) : null}

        {/* Equal-weight hero blocks, alternating diagram side */}
        <div className="mt-12 flex flex-col gap-10 md:gap-14">
          {shown.map((u, i) => (
            <Reveal key={u.title} delay={i * 80} distance={16}>
              <UseCaseBlock useCase={u} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>


        {condensed ? (
          <Reveal delay={200}>
            <div className="mt-14 border-t border-border pt-10">
              <LearnMore to="/what-we-build" label="See all use cases" />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* -------------------------------- PROCESS --------------------------------- */

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "We map how your business runs today—people, handoffs, systems, and cost of friction.",
    accent: "text-secondary",
    Glyph: GlyphDiscover,
  },
  {
    n: "02",
    title: "Design",
    body: "Architecture, data model, and interface designed around the workflow you actually use.",
    accent: "text-primary",
    Glyph: GlyphDesign,
  },
  {
    n: "03",
    title: "Build",
    body: "Shipped in tight increments with production-grade engineering and continuous review.",
    accent: "text-gold",
    Glyph: GlyphBuild,
  },
  {
    n: "04",
    title: "Scale",
    body: "Monitoring, iteration, and expansion as the system becomes core infrastructure.",
    accent: "text-secondary",
    Glyph: GlyphScale,
  },
];

/**
 * Process illustration: draws itself in on scroll, breathes with a slow float
 * and tilts in 3D on hover — the same treatment for every step.
 */
function ProcessGlyph({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`w-full max-w-[17rem] shrink-0 md:max-w-[18rem] ${step.accent}`}
      style={{ transformPerspective: 900 }}
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? {} : { rotateX: 6, rotateY: -8, scale: 1.05 }}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
      >
        <DrawIn delay={120 + index * 60}>
          <step.Glyph className="w-full" />
        </DrawIn>
      </motion.div>
    </motion.div>
  );
}


/**
 * One timeline step. `active` is driven by the section's scroll progress, so the
 * step animates in exactly as the rail fill reaches its marker.
 */
function ProcessStep({
  step,
  index,
  active,
}: {
  step: (typeof steps)[number];
  index: number;
  active: boolean;
}) {
  return (
    <li className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-6 pb-16 last:pb-0 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-12 md:pb-24">
      {/* marker sitting on the rail */}
      <div className="relative">
        <span
          aria-hidden
          className={`absolute top-2 left-[0.4rem] size-3 rounded-full border transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out md:left-[0.65rem] ${
            active ? "scale-110 border-transparent" : "border-border-strong bg-background"
          }`}
          style={
            active
              ? {
                  backgroundColor: "currentColor",
                  boxShadow: "0 0 0 5px color-mix(in oklab, currentColor 16%, transparent)",
                }
              : undefined
          }
        />
        <span
          className={`block pl-9 font-light tracking-display transition-[opacity,transform] duration-700 ease-out md:pl-12 ${step.accent} ${
            active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-30"
          } text-3xl md:text-5xl`}
        >
          {step.n}
        </span>
      </div>

      <div
        className={`group transition-[opacity,transform] duration-700 ease-out ${
          active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 40}ms` }}
      >
        <div className="flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-start md:justify-between md:gap-14">
          <div>
            <h3 className="text-2xl font-medium tracking-display md:text-[2.2rem]">{step.title}</h3>
            <p className="mt-5 max-w-md text-sm leading-[1.8] text-muted-foreground md:text-base">
              {step.body}
            </p>
          </div>
          <ProcessGlyph step={step} index={index} />
        </div>
      </div>
    </li>
  );
}

export function Process({
  condensed = false,
  heading = true,
}: {
  condensed?: boolean;
  heading?: boolean;
}) {
  const { ref, progress } = useElementProgress<HTMLOListElement>();

  return (
    <section
      className={`section relative overflow-hidden ${heading ? "border-t border-border" : "pt-0 md:pt-0"}`}
    >
      <SectionFloaters variant="a" />
      <div className="container-x relative z-10">
        {heading ? (
          <>
            <Reveal>
              <p className="eyebrow">Process</p>
            </Reveal>
            <Reveal delay={50}>
              <h2 className="mt-6 max-w-2xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
                Discover → Design → Build → Scale
              </h2>
            </Reveal>
          </>
        ) : null}

        <ol ref={ref} className="relative mt-14">
          {/* rail + scroll-driven fill */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[0.95rem] w-px bg-border md:left-[1.2rem]"
          >
            <div
              className="proc-rail-fill h-full w-px bg-primary"
              style={{ ["--proc-progress" as never]: progress }}
            />
          </div>

          {steps.map((s, i) => (
            <ProcessStep
              key={s.n}
              step={s}
              index={i}
              active={progress >= (i + 0.35) / steps.length}
            />
          ))}
        </ol>

        {condensed ? (
          <Reveal delay={260}>
            <div className="mt-14">
              <LearnMore to="/process" label="How we work" />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}


/* ------------------------------- WHY ZOCALO ------------------------------- */

const reasons = [
  {
    title: "Custom-first",
    body: "We start from your operation, never from a template or someone else's product roadmap.",
  },
  {
    title: "Built for your exact workflow",
    body: "The software adapts to your process—your team doesn't reshape itself around software.",
  },
  {
    title: "Scalable architecture",
    body: "Clean data models and modular services that hold up as volume and headcount grow.",
  },
  {
    title: "Enterprise-grade engineering",
    body: "Security, observability, and testing standards expected of critical infrastructure.",
  },
  {
    title: "Long-term partnership",
    body: "We stay accountable for outcomes long after launch, not just delivery milestones.",
  },
];

/**
 * Architectural bedrock centrepiece: staggered foundation layers that stack up
 * on scroll, with a slow drifting mote field for a sense of life.
 */
function BedrockPanel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [stacked, setStacked] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStacked(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Narrow at the top, widest at the base — a plinth in cut-away section.
  const layers = [
    { width: "58%", accent: "var(--primary)" },
    { width: "70%", accent: "var(--teal)" },
    { width: "82%", accent: "var(--cream)" },
    { width: "92%", accent: "var(--gold)" },
    { width: "100%", accent: "var(--amber)" },
  ];

  return (
    <div
      ref={ref}
      data-stacked={stacked ? "true" : "false"}
      className="relative overflow-hidden rounded-2xl border border-border-strong p-9 md:p-12 lg:sticky lg:top-28"
      style={{
        backgroundImage:
          "linear-gradient(160deg, var(--indigo) 0%, var(--surface) 55%, color-mix(in oklab, var(--gold) 10%, var(--surface)) 100%)",
      }}
    >
      <div aria-hidden className="motes pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative">
        <p className="eyebrow text-cream/70">The name</p>
        <blockquote className="mt-6 text-[2.1rem] leading-[1.08] font-light tracking-[-0.03em] text-cream text-balance md:text-[3rem]">
          A foundation,
          <br />
          <span className="text-cream/60">not a subscription</span>
        </blockquote>

        {/* Cut-away foundation layers — stack up from the base, then breathe */}
        <motion.div
          aria-hidden
          className="mt-10 flex flex-col items-center gap-2"
          animate={reduced ? {} : { y: [0, -6, 0], scale: [1, 1.012, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {layers.map((l, i) => (
            <motion.div
              key={l.width}
              className="h-7 rounded-md border md:h-9"
              style={{
                width: l.width,
                borderColor: `color-mix(in oklab, ${l.accent} 55%, transparent)`,
                background: `linear-gradient(90deg, color-mix(in oklab, ${l.accent} 30%, transparent), transparent)`,
              }}
              initial={{ opacity: 0, y: 34, scale: 0.94 }}
              animate={
                stacked
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      boxShadow: [
                        `0 10px 30px -18px color-mix(in oklab, ${l.accent} 40%, transparent)`,
                        `0 14px 44px -16px color-mix(in oklab, ${l.accent} 85%, transparent)`,
                        `0 10px 30px -18px color-mix(in oklab, ${l.accent} 40%, transparent)`,
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 0.75,
                delay: (layers.length - 1 - i) * 0.13,
                ease: [0.16, 1, 0.3, 1],
                boxShadow: {
                  duration: 4.5,
                  delay: (layers.length - 1 - i) * 0.13,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          ))}
        </motion.div>

        <Reveal delay={700} distance={15}>
          <p className="mt-10 max-w-md text-lg leading-[1.75] tracking-[0.005em] text-cream/80 md:text-xl">
            Zocalo means the base a structure is built on. We engineer the layer your business stands
            on for the next decade.
          </p>
        </Reveal>
      </div>
    </div>
  );
}


export function WhyZocalo({
  condensed = false,
  heading = true,
}: {
  condensed?: boolean;
  heading?: boolean;
}) {
  const shown = condensed ? reasons.slice(0, 3) : reasons;


  return (
    <section
      className={`section relative overflow-hidden ${heading ? "border-t border-border" : "pt-0 md:pt-0"}`}
    >
      {/* faint animated grid — keeps the list feeling alive, stays at z-0 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="alive-grid absolute inset-0 opacity-[0.5]" />
      </div>
      <SectionFloaters variant="d" />

      <div className="container-x relative z-10">
        {heading ? (
          <Reveal>
            <p className="eyebrow mb-12">Why Zocalo</p>
          </Reveal>
        ) : null}

        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <ol className="counter-rhythm">
            {shown.map((r, i) => (
              <ReasonRow key={r.title} reason={r} index={i} />
            ))}
          </ol>

          <BedrockPanel />
        </div>


        {condensed ? (
          <Reveal delay={220}>
            <div className="mt-14">
              <LearnMore to="/why-zocalo" label="Why Zocalo" />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/** One reason: slides in from the left, tilts subtly and reveals an underline. */
function ReasonRow({
  reason,
  index,
}: {
  reason: (typeof reasons)[number];
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.li
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? {} : { rotateX: 3, rotateY: -3, y: -3 }}
      style={{ transformPerspective: 900 }}
      className="group relative grid grid-cols-[3.25rem_1fr] items-start gap-4 border-b border-border py-8 first:border-t md:gap-8"
    >
      <span className="pt-1 text-2xl leading-none font-light tracking-display text-muted-foreground/40 transition-colors duration-200 ease-out group-hover:text-gold md:text-[2rem]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="relative inline-block text-lg font-medium tracking-[-0.02em] md:text-xl">
          {reason.title}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
          />
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-[1.8] tracking-[0.005em] text-muted-foreground">
          {reason.body}
        </p>
      </div>
    </motion.li>
  );
}


/* --------------------------- STATS / CREDIBILITY -------------------------- */

/*
 * [PLACEHOLDER] Swap these figures for real numbers when available.
 * Keep the shape: value + unit + label.
 */
const stats = [
  { value: "$250K+", label: "in software delivered" },
  { value: "6", label: "disciplines under one roof" },
  { value: "100%", label: "custom-built, zero templates" },
  { value: "10+", label: "years of engineering experience" },
];

/** Credibility band — large numerals, short labels. Homepage social proof. */
export function StatsBand() {
  return (
    <section className="section relative overflow-hidden border-t border-border">
      <GlowDotsBackdrop />
      <div className="container-x relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">By the numbers</p>
          </Reveal>
          <Reveal delay={60}>
            <p className="max-w-sm text-sm leading-[1.7] text-muted-foreground">
              Engineering measured in systems that stayed in production — not decks.
            </p>
          </Reveal>
        </div>

        <motion.dl
          className="mt-14 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.12 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t border-border pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp
                  value={s.value}
                  className="stat-glow block origin-left text-5xl leading-[0.95] font-light tracking-display text-foreground transition-transform duration-500 ease-out group-hover:scale-[1.04] md:text-6xl"
                />
                <span className="mt-5 block max-w-[13rem] text-xs leading-[1.6] tracking-[0.16em] uppercase text-muted-foreground">
                  {s.label}
                </span>
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <Reveal delay={380}>
          <p className="mt-16 max-w-3xl border-t border-border pt-10 text-xl leading-[1.4] font-light tracking-[-0.02em] text-balance md:text-2xl">
            Clients stay because the system keeps earning its place.{" "}
            <span className="text-muted-foreground">
              {/* [PLACEHOLDER] retention figure */}
              Retention across engagements: 100%.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- FINAL CTA -------------------------------- */

export function FinalCta() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const finalCtaRef = useRef<HTMLElement | null>(null);
  const { setInFinalCta } = useHeaderTheme();

  const { scrollYProgress } = useScroll({
    target: finalCtaRef,
    offset: ["start end", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setInFinalCta(v > 0 && v < 1);
  });

  return (
    <section
      ref={finalCtaRef}
      id="final-cta"
      className="section relative overflow-hidden border-t border-border"
      onMouseMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - r.left) / r.width - 0.5,
          y: (e.clientY - r.top) / r.height - 0.5,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      {/* continuously animated field behind the closing conversion point */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="cta-field absolute -inset-24 opacity-70" />
        <div className="cta-grid absolute inset-0 opacity-[0.35]" />

        {/* soft mouse-reactive radial glows in brand blue + gold */}
        <div
          className="absolute -inset-32"
          style={{
            background:
              "radial-gradient(40% 46% at 30% 32%, color-mix(in oklab, var(--primary) 24%, transparent), transparent 70%), radial-gradient(34% 40% at 72% 68%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 72%)",
            transform: `translate3d(${pos.x * -26}px, ${pos.y * -18}px, 0)`,
            transition: "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* slowly rotating geometric frames */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 text-primary opacity-[0.12]"
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <rect x="34" y="34" width="132" height="132" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </motion.svg>
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.14]"
          animate={reduced ? {} : { rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <rect x="46" y="46" width="108" height="108" rx="14" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </motion.svg>

        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{ background: "linear-gradient(to bottom, var(--background), transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
        />
      </div>

      <div className="container-x relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <StaggerWords
            text="Ready to Build Software That Fits Your Business?"
            stagger={75}
            scale
            className="mx-auto max-w-3xl text-3xl leading-[1.1] font-medium tracking-display text-balance md:text-[3.25rem]"
          />
        </motion.div>
        <Reveal delay={140}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-[1.75] text-muted-foreground">
            Tell us how your business runs. We'll show you what should be engineered.
          </p>
        </Reveal>
        <motion.div
          className="mt-11 flex justify-center"
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="halo-ring relative rounded-md">
            <div className="shimmer-sweep relative overflow-hidden rounded-md">
              <MagneticCta to="/contact" variant="gold">
                Let's Build It
              </MagneticCta>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* --------------------------------- FOOTER --------------------------------- */

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-10">
      <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Link to="/" aria-label="Zocalo home" className="inline-flex items-center gap-2.5">
          <span className="float-soft inline-flex">
            <img src={navMark.url} alt="" aria-hidden className="h-10 w-10 object-contain" />
          </span>
          <span className="text-[1.15rem] font-medium tracking-[-0.02em] lowercase">zocalo</span>
        </Link>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zocalo. Bespoke software engineering.
        </p>
      </div>
    </footer>
  );
}

/* --------------------------- HOMEPAGE TEASERS ----------------------------- */

export function SectionTeaser({
  eyebrow,
  title,
  body,
  to,
  label = "Learn more",
  first = false,
  visual,
}: {
  eyebrow: string;
  title: string;
  body: string;
  to: Path;
  label?: string;
  first?: boolean;
  visual?: ReactNode;
}) {
  return (
    <section
      className={`section group/teaser transition-colors duration-500 ease-out hover:bg-card/40${
        first ? "" : " border-t border-border"
      }`}
    >
      <div className="container-x grid gap-8 md:grid-cols-12 md:items-start">
        <div className="md:col-span-4">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={60}>
            <h2 className="max-w-2xl text-[1.75rem] leading-[1.15] font-medium tracking-display text-balance md:text-[2.5rem]">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground">{body}</p>
          </Reveal>
          {visual ? <div className="mt-10">{visual}</div> : null}
          <Reveal delay={180}>
            <div className="mt-8">
              <LearnMore to={to} label={label} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TEASER VISUALS ------------------------------- */

/** Fading horizontal pill list of service names. */
export function ServicesTeaserVisual() {
  return (
    <Reveal delay={150}>
      <div className="relative -mx-1 overflow-hidden">
        <ul className="flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {serviceNames.map((name, i) => (
            <li
              key={name}
              className="shrink-0 rounded-full border border-border px-4 py-2 text-xs whitespace-nowrap text-muted-foreground transition-all duration-300 ease-out group-hover/teaser:border-primary/40 group-hover/teaser:text-foreground"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {name}
            </li>
          ))}
        </ul>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"
        />
      </div>
    </Reveal>
  );
}

/** Two asymmetric mini cards previewing sectors. */
export function WhatWeBuildTeaserVisual() {
  const preview = useCases.slice(0, 2);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {preview.map((u, i) => (
        <Reveal key={u.title} delay={150 + i * 60}>
          <article
            className={`flex h-full items-start justify-between gap-4 border-t border-border pt-5 transition-transform duration-300 ease-out group-hover/teaser:-translate-y-1 ${
              i === 1 ? "sm:mt-10" : ""
            }`}
          >
            <div>
              <span className="eyebrow text-primary/80">{u.sector}</span>
              <h3 className="mt-3 text-base font-medium tracking-[-0.01em]">{u.title}</h3>
            </div>
            <u.Glyph className="h-10 w-20 shrink-0 opacity-50 transition-opacity duration-300 ease-out group-hover/teaser:opacity-90" />
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/** Condensed four-dot process timeline. */
export function ProcessTeaserVisual() {
  return (
    <Reveal delay={150}>
      <ol className="flex w-full items-start justify-between">
        {steps.map((s, i) => (
          <li key={s.n} className="relative flex flex-1 flex-col items-start gap-3">
            <div className="relative flex w-full items-center">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full bg-border transition-colors duration-300 ease-out group-hover/teaser:bg-primary"
                style={{ transitionDelay: `${i * 70}ms` }}
              />
              {i < steps.length - 1 ? (
                <span aria-hidden className="h-px flex-1 bg-border" />
              ) : null}
            </div>
            <span className="font-mono text-[0.7rem] tracking-[0.16em] text-primary/70">{s.n}</span>
            <span className="text-xs text-muted-foreground">{s.title}</span>
          </li>
        ))}
      </ol>
    </Reveal>

  );
}

/** Large pull-quote lifted from the Why section. */
export function WhyTeaserVisual() {
  return (
    <Reveal delay={150}>
      <blockquote className="border-l border-gold/60 pl-6 text-xl leading-[1.3] font-light tracking-[-0.025em] text-balance transition-colors duration-300 ease-out md:text-[1.9rem]">
        A foundation,{" "}
        <span className="text-muted-foreground group-hover/teaser:text-foreground">
          not a subscription
        </span>
      </blockquote>
    </Reveal>
  );
}
