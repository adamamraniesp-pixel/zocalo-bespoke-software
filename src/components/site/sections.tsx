import {
  ArrowRight,
  Blocks,
  Bot,
  Cpu,
  Gauge,
  Globe,
  LayoutGrid,
  Link2,
  PhoneOff,
  Repeat,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Unplug,
  Users,
  Workflow,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { ZocaloLogo } from "./ZocaloLogo";

/* ---------------------------------- HERO ---------------------------------- */

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden px-6 pt-32 pb-24 md:px-10 md:pt-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(60% 55% at 18% 0%, color-mix(in oklab, var(--secondary) 55%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">Bespoke Software Engineering</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-7 max-w-4xl text-[2.75rem] leading-[1.06] font-medium tracking-display text-balance md:text-[4.25rem]">
            Software Built Around Your Business.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
            We design and build bespoke software—from CRMs and AI systems to internal platforms,
            automation, and high-performance websites—built around the way your business actually
            works.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90"
            >
              Book a Consultation
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              View Our Work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
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

const services = [
  {
    icon: Cpu,
    title: "Bespoke Software Development",
    body: "Systems engineered from first principles for your operation. No templates, no forced workflows.",
  },
  {
    icon: Users,
    title: "CRM Systems",
    body: "Pipelines, data models, and automations that mirror how your team actually sells and serves.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    body: "Answering, triage, summarisation, and decision support wired directly into your operations.",
  },
  {
    icon: LayoutGrid,
    title: "Internal Platforms",
    body: "One operating system for scheduling, reporting, and approvals—replacing spreadsheets and silos.",
  },
  {
    icon: Globe,
    title: "Websites",
    body: "High-performance, conversion-focused front ends engineered for speed and search visibility.",
  },
  {
    icon: Link2,
    title: "Integrations",
    body: "APIs and data pipelines that connect the tools you keep and retire the ones you don't.",
  },
];

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Services</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-6 max-w-2xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
            Engineering across the full operational stack.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <article className="group h-full border-r border-b border-border p-8 transition-colors duration-500 hover:bg-card md:p-10">
                <s.icon className="size-5 text-primary transition-transform duration-500 group-hover:-translate-y-0.5" />
                <h3 className="mt-7 text-base font-medium tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- PROBLEM --------------------------------- */

const pains = [
  { icon: PhoneOff, label: "Missed calls after hours" },
  { icon: Workflow, label: "Manual admin and re-entry" },
  { icon: Unplug, label: "Disconnected tools" },
  { icon: Repeat, label: "Repetitive work" },
  { icon: TrendingDown, label: "Lost opportunities" },
];

export function Problem() {
  return (
    <section className="section border-t border-border">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">The Problem</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-6 text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
              Growth stalls in the gaps between your tools.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-base leading-[1.75] text-muted-foreground">
              Most businesses don't lose margin to strategy—they lose it to friction. Work handed
              between inboxes, spreadsheets, and subscriptions no one owns.
            </p>
          </Reveal>
        </div>

        <div>
          <ul className="border-t border-border">
            {pains.map((p, i) => (
              <Reveal key={p.label} delay={i * 50} as="li">
                <div className="group flex items-center gap-5 border-b border-border py-6 transition-colors duration-500 hover:bg-card/60">
                  <p.icon className="size-4 shrink-0 text-muted-foreground transition-colors duration-500 group-hover:text-primary" />
                  <span className="text-base">{p.label}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={300}>
            <p className="mt-10 text-xl leading-[1.4] font-medium tracking-[-0.02em] text-balance md:text-2xl">
              We build software that eliminates those bottlenecks.
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
    body: "Every call captured, qualified, and dispatched—overnight and on weekends.",
  },
  {
    sector: "Real Estate",
    title: "Custom CRM",
    body: "Listings, buyers, and follow-up sequences in one pipeline built for your desk.",
  },
  {
    sector: "Healthcare",
    title: "Patient workflow automation",
    body: "Intake, reminders, and records movement automated within compliance boundaries.",
  },
  {
    sector: "Professional Services",
    title: "Client onboarding systems",
    body: "Engagement letters, data collection, and kickoff orchestrated end to end.",
  },
];

export function WhatWeBuild() {
  return (
    <section id="work" className="section border-t border-border">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">What We Build</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-6 max-w-2xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
            Examples of systems in production.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          {useCases.map((u, i) => (
            <Reveal key={u.title} delay={i * 70}>
              <article className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-card md:p-12">
                <span className="eyebrow text-primary/80">{u.sector}</span>
                <h3 className="mt-6 text-xl font-medium tracking-[-0.02em] md:text-2xl">
                  {u.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-[1.75] text-muted-foreground">
                  {u.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
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
  },
  {
    n: "02",
    title: "Design",
    body: "Architecture, data model, and interface designed around the workflow you actually use.",
  },
  {
    n: "03",
    title: "Build",
    body: "Shipped in tight increments with production-grade engineering and continuous review.",
  },
  {
    n: "04",
    title: "Scale",
    body: "Monitoring, iteration, and expansion as the system becomes core infrastructure.",
  },
];

export function Process() {
  return (
    <section id="process" className="section border-t border-border">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Process</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-6 max-w-2xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
            Discover → Design → Build → Scale.
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} as="li">
              <div className="border-t border-border pt-7">
                <div className="flex items-center gap-3">
                  <span className="text-xs tracking-[0.18em] text-primary">{s.n}</span>
                  <span aria-hidden className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------- WHY ZÓCALO ------------------------------- */

const reasons = [
  {
    icon: Sparkles,
    title: "Custom-first",
    body: "We start from your operation, never from a template or someone else's product roadmap.",
  },
  {
    icon: Workflow,
    title: "Built for your exact workflow",
    body: "The software adapts to your process—your team doesn't reshape itself around software.",
  },
  {
    icon: Blocks,
    title: "Scalable architecture",
    body: "Clean data models and modular services that hold up as volume and headcount grow.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade engineering",
    body: "Security, observability, and testing standards expected of critical infrastructure.",
  },
  {
    icon: Gauge,
    title: "Long-term partnership",
    body: "We stay accountable for outcomes long after launch, not just delivery milestones.",
  },
];

export function WhyZocalo() {
  return (
    <section id="why" className="section border-t border-border">
      <div className="container-x grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Why Zócalo</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-6 text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
              A foundation, not a subscription.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-base leading-[1.75] text-muted-foreground">
              Zócalo means the base a structure is built on. We engineer the layer your business
              stands on for the next decade.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 60}
              className={i === reasons.length - 1 ? "sm:col-span-2" : ""}
            >
              <div className="h-full bg-background p-8 transition-colors duration-500 hover:bg-card">
                <r.icon className="size-5 text-primary" />
                <h3 className="mt-6 text-base font-medium tracking-[-0.01em]">{r.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FINAL CTA -------------------------------- */

export function FinalCta() {
  return (
    <section id="contact" className="section border-t border-border">
      <div className="container-x text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl leading-[1.1] font-medium tracking-display text-balance md:text-[3.25rem]">
            Ready to Build Software That Fits Your Business?
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-[1.75] text-muted-foreground">
            Tell us how your business runs. We'll show you what should be engineered.
          </p>
        </Reveal>
        <Reveal delay={170}>
          <a
            href="mailto:hello@zocalo.dev?subject=Start%20Your%20Project"
            className="group mt-11 inline-flex items-center gap-2 rounded-md border border-gold/60 px-7 py-3.5 text-sm font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-gold-foreground"
          >
            Start Your Project
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER --------------------------------- */

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-10">
      <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <ZocaloLogo size={26} />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zócalo. Bespoke software engineering.
        </p>
      </div>
    </footer>
  );
}
