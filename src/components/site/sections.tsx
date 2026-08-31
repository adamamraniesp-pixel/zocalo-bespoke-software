import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DrawIn, Reveal, StaggerWords, useElementProgress } from "./motion";
import { MagneticCta } from "./MagneticCta";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroSystemGraphic } from "./HeroSystemGraphic";

import { ZocaloLogo } from "./ZocaloLogo";
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
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
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

        {/* Self-drawing system schematic */}
        <div className="hidden lg:block">
          <HeroSystemGraphic className="h-auto w-full" />
        </div>
      </div>

    </section>
  );
}

/* ------------------------------ TRUST STATEMENT --------------------------- */

export function TrustStatement() {
  return (
    <section className="section border-y border-border">
      <div className="container-x">
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
  Glyph: (props: { className?: string; style?: CSSProperties }) => ReactElement;
};

const services: Service[] = [
  {
    n: "01",
    title: "Bespoke Software Development",
    body: "Systems engineered from first principles for your operation. No templates, no forced workflows.",
    accent: "var(--primary)",
    Glyph: GlyphBespoke,
  },
  {
    n: "02",
    title: "CRM Systems",
    body: "Pipelines, data models, and automations that mirror how your team actually sells and serves.",
    accent: "var(--secondary)",
    Glyph: GlyphCrm,
  },
  {
    n: "03",
    title: "AI Automation",
    body: "Answering, triage, summarisation, and decision support wired directly into your operations.",
    accent: "var(--amber)",
    Glyph: GlyphAi,
  },
  {
    n: "04",
    title: "Internal Platforms",
    body: "One operating system for scheduling, reporting, and approvals—replacing spreadsheets and silos.",
    accent: "var(--teal)",
    Glyph: GlyphPlatform,
  },
  {
    n: "05",
    title: "Websites",
    body: "High-performance, conversion-focused front ends engineered for speed and search visibility.",
    accent: "var(--gold)",
    Glyph: GlyphWebsite,
  },
  {
    n: "06",
    title: "Integrations",
    body: "APIs and data pipelines that connect the tools you keep and retire the ones you don't.",
    accent: "var(--primary)",
    Glyph: GlyphIntegration,
  },
];

export const serviceNames = services.map((s) => s.title);

/**
 * Services identity: a full-width vertical stacked list. Each service is one
 * hairline-separated row — numeral rail, copy column, diagram parked to the
 * side. Deliberately *not* a card grid, so it reads differently from
 * /what-we-build.
 */
function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal delay={index * 70} distance={14} as="li">
      <article
        className="group relative grid grid-cols-1 items-center gap-8 border-t border-border py-12 transition-[background-color,padding] duration-300 ease-out hover:bg-card/40 md:grid-cols-[6rem_minmax(0,1fr)_16rem] md:gap-12 md:py-16 lg:grid-cols-[7rem_minmax(0,1fr)_20rem]"
        style={{ ["--service-accent" as never]: service.accent }}
      >
        {/* accent edge that grows on hover */}
        <span
          aria-hidden
          className="absolute top-0 left-0 h-px w-0 origin-left transition-[width] duration-500 ease-out group-hover:w-full"
          style={{ background: service.accent }}
        />

        <span
          className="font-mono text-sm tracking-[0.22em] transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-base"
          style={{ color: service.accent }}
        >
          {service.n}
        </span>

        <div>
          <h3 className="text-[1.65rem] leading-[1.14] font-medium tracking-display md:text-[2.15rem]">
            {service.title}
          </h3>
          <p className="mt-5 max-w-xl text-base leading-[1.85] tracking-[0.005em] text-muted-foreground">
            {service.body}
          </p>
        </div>

        <DrawIn className="w-full md:justify-self-end" delay={60}>
          <service.Glyph
            className="h-28 w-full opacity-60 transition-opacity duration-300 ease-out group-hover:opacity-100 md:h-32"
            style={{ color: service.accent }}
          />
        </DrawIn>
      </article>
    </Reveal>
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

  return (
    <section className={`relative ${heading ? "section" : "section pt-0 md:pt-0"}`}>
      <div className="container-x relative">
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

        <ol className="mt-4 border-b border-border">
          {items.map((s, i) => (
            <ServiceRow key={s.n} service={s} index={i} />
          ))}
        </ol>

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

const pains = [
  "Missed calls after hours",
  "Manual admin and re-entry",
  "Disconnected tools",
  "Repetitive work",
  "Lost opportunities",
];

const painAccents = [
  "var(--primary)",
  "var(--amber)",
  "var(--teal)",
  "var(--gold)",
  "var(--secondary)",
];

export function Problem() {
  return (
    <section className="section border-t border-border">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">The Problem</p>
          </Reveal>
          <Reveal delay={50}>
            <h2 className="mt-6 text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
              Growth stalls in the gaps between your tools
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 text-base leading-[1.75] text-muted-foreground">
              Most businesses don't lose margin to strategy—they lose it to friction. Work handed
              between inboxes, spreadsheets, and subscriptions no one owns.
            </p>
          </Reveal>
        </div>

        <div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pains.map((p, i) => (
              <Reveal key={p} delay={i * 80} distance={12} as="li">
                <div
                  className="group flex h-full items-start gap-5 border border-border border-l-2 border-l-primary/35 bg-card/25 px-6 py-7 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:border-[color-mix(in_oklab,var(--pain-accent)_50%,transparent)] hover:bg-card/40 hover:shadow-[0_14px_36px_-22px_color-mix(in_oklab,var(--pain-accent)_55%,transparent)]"
                  style={{ ["--pain-accent" as never]: painAccents[i % painAccents.length] }}
                >
                  <span
                    className="origin-left font-mono text-sm leading-none tracking-[0.12em] text-muted-foreground/55 transition-[transform,color] duration-300 ease-out group-hover:scale-105 group-hover:text-[color-mix(in_oklab,var(--pain-accent)_80%,white)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.975rem] leading-[1.6] text-foreground/90">{p}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={240}>
            <p className="mt-12 border-t border-border pt-8 text-xl leading-[1.4] font-medium tracking-[-0.02em] text-balance md:text-2xl">
              We build software that eliminates those bottlenecks
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

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
    metric: "04",
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
    <section className={`section ${heading ? "border-t border-border" : "pt-0 md:pt-0"}`}>
      <div className="container-x">
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
    accent: "text-primary",
    Glyph: GlyphDiscover,
  },
  {
    n: "02",
    title: "Design",
    body: "Architecture, data model, and interface designed around the workflow you actually use.",
    accent: "text-cream",
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
    accent: "text-primary",
    Glyph: GlyphScale,
  },
];

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
          <DrawIn
            delay={80}
            className={`w-full max-w-[13rem] shrink-0 ${step.accent} opacity-70 transition-opacity duration-300 ease-out hover:opacity-100`}
          >
            <step.Glyph className="w-full" />
          </DrawIn>
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
    <section className={`section ${heading ? "border-t border-border" : "pt-0 md:pt-0"}`}>
      <div className="container-x">
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

        {/* Cut-away foundation layers */}
        <div aria-hidden className="mt-10 flex flex-col items-center gap-2">
          {layers.map((l, i) => (
            <div
              key={l.width}
              className="bedrock-layer h-7 rounded-md border md:h-9"
              style={{
                width: l.width,
                borderColor: `color-mix(in oklab, ${l.accent} 55%, transparent)`,
                background: `linear-gradient(90deg, color-mix(in oklab, ${l.accent} 30%, transparent), transparent)`,
                ["--layer-delay" as never]: `${(layers.length - 1 - i) * 110}ms`,
                boxShadow: `0 10px 30px -18px color-mix(in oklab, ${l.accent} 60%, transparent)`,
              }}
            />
          ))}
        </div>

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
    <section className={`section ${heading ? "border-t border-border" : "pt-0 md:pt-0"}`}>
      <div className="container-x">
        {heading ? (
          <Reveal>
            <p className="eyebrow mb-12">Why Zocalo</p>
          </Reveal>
        ) : null}

        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <ol className="counter-rhythm">
            {shown.map((r, i) => (
              <Reveal key={r.title} delay={i * 150} distance={15} as="li">
                <div className="group grid grid-cols-[3.25rem_1fr] items-start gap-4 border-b border-border py-8 first:border-t md:gap-8">
                  <span className="pt-1 text-2xl leading-none font-light tracking-display text-muted-foreground/40 transition-colors duration-200 ease-out group-hover:text-gold md:text-[2rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.02em] md:text-xl">{r.title}</h3>
                    <p className="mt-3 max-w-lg text-sm leading-[1.8] tracking-[0.005em] text-muted-foreground">
                      {r.body}
                    </p>
                  </div>
                </div>
              </Reveal>
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
    <section className="section border-t border-border">
      <div className="container-x">
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

        <dl className="mt-14 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} distance={14}>
              <div className="group border-t border-border pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block origin-left text-5xl leading-[0.95] font-light tracking-display text-foreground transition-transform duration-500 ease-out group-hover:scale-[1.04] md:text-6xl">
                    {s.value}
                  </span>
                  <span className="mt-5 block max-w-[13rem] text-xs leading-[1.6] tracking-[0.16em] uppercase text-muted-foreground">
                    {s.label}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

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
  return (
    <section className="section relative overflow-hidden border-t border-border">
      {/* continuously animated field behind the closing conversion point */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="cta-field absolute -inset-24 opacity-70" />
        <div className="cta-grid absolute inset-0 opacity-[0.35]" />
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{ background: "linear-gradient(to bottom, var(--background), transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
        />
      </div>

      <div className="container-x relative text-center">
        <StaggerWords
          text="Ready to Build Software That Fits Your Business?"
          stagger={75}
          scale
          className="mx-auto max-w-3xl text-3xl leading-[1.1] font-medium tracking-display text-balance md:text-[3.25rem]"
        />
        <Reveal delay={140}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-[1.75] text-muted-foreground">
            Tell us how your business runs. We'll show you what should be engineered.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-11 flex justify-center">
            <div className="halo-ring relative rounded-md">
              <div className="shimmer-sweep relative overflow-hidden rounded-md">
                <MagneticCta to="/contact" variant="gold">
                  Let's Build It
                </MagneticCta>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* --------------------------------- FOOTER --------------------------------- */

const footerLinks: { to: Path; label: string }[] = [
  { to: "/services", label: "Services" },
  { to: "/what-we-build", label: "What We Build" },
  { to: "/process", label: "Process" },
  { to: "/why-zocalo", label: "Why Zocalo" },
  { to: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-10">
      <div className="container-x flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <Link to="/" aria-label="Zocalo home">
          <ZocaloLogo size={26} />
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-xs text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
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
