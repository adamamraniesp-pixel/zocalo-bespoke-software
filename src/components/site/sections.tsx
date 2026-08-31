import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal, StaggerWords } from "./motion";
import { MagneticCta } from "./MagneticCta";
import { HeroBackdrop } from "./HeroBackdrop";
import { ZocaloLogo } from "./ZocaloLogo";
import {
  GlyphAi,
  GlyphAnswering,
  GlyphBespoke,
  GlyphCrm,
  GlyphIntegration,
  GlyphOnboarding,
  GlyphPipeline,
  GlyphPlatform,
  GlyphPlinth,
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
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">Bespoke Software Engineering</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-7 max-w-4xl text-[2.75rem] leading-[1.06] font-medium tracking-display text-balance md:text-[4.25rem]">
            Software Built Around Your Business.
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
            <MagneticCta to="/contact">Book a Consultation</MagneticCta>
            <MagneticCta to="/what-we-build" variant="ghost">
              View Our Work
            </MagneticCta>
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
    n: "01",
    title: "Bespoke Software Development",
    body: "Systems engineered from first principles for your operation. No templates, no forced workflows.",
    Glyph: GlyphBespoke,
  },
  {
    n: "02",
    title: "CRM Systems",
    body: "Pipelines, data models, and automations that mirror how your team actually sells and serves.",
    Glyph: GlyphCrm,
  },
  {
    n: "03",
    title: "AI Automation",
    body: "Answering, triage, summarisation, and decision support wired directly into your operations.",
    Glyph: GlyphAi,
  },
  {
    n: "04",
    title: "Internal Platforms",
    body: "One operating system for scheduling, reporting, and approvals—replacing spreadsheets and silos.",
    Glyph: GlyphPlatform,
  },
  {
    n: "05",
    title: "Websites",
    body: "High-performance, conversion-focused front ends engineered for speed and search visibility.",
    Glyph: GlyphWebsite,
  },
  {
    n: "06",
    title: "Integrations",
    body: "APIs and data pipelines that connect the tools you keep and retire the ones you don't.",
    Glyph: GlyphIntegration,
  },
];

export const serviceNames = services.map((s) => s.title);

export function Services({
  condensed = false,
  heading = true,
}: {
  condensed?: boolean;
  heading?: boolean;
}) {
  const items = condensed ? services.slice(0, 3) : services;
  const lead = items[0]!;
  const second = items[1];
  const rest = items.slice(2);

  return (
    <section className={heading ? "section" : "section pt-0 md:pt-0"}>
      <div className="container-x">
        {heading ? (
          <>
            <Reveal>
              <p className="eyebrow">Services</p>
            </Reveal>
            <Reveal delay={50}>
              <h2 className="mt-6 max-w-2xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
                Engineering across the full operational stack.
              </h2>
            </Reveal>
          </>
        ) : null}

        {/* Lead + secondary — asymmetric feature row */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <article className="group flex h-full flex-col justify-between gap-12 border-t border-border py-12 md:py-16 md:pr-16">
              <div>
                <span className="font-mono text-xs tracking-[0.18em] text-primary/70">
                  {lead.n}
                </span>
                <h3 className="mt-6 max-w-lg text-[1.9rem] leading-[1.12] font-medium tracking-display md:text-[2.75rem]">
                  {lead.title}
                </h3>
                <p className="mt-6 max-w-lg text-base leading-[1.75] text-muted-foreground">
                  {lead.body}
                </p>
              </div>
              <lead.Glyph className="w-full max-w-xs opacity-80 transition-opacity duration-300 ease-out group-hover:opacity-100" />
            </article>
          </Reveal>

          {second ? (
            <Reveal delay={80} className="md:col-span-5">
              <article className="group flex h-full flex-col justify-between gap-10 border-t border-border py-12 md:border-l md:py-16 md:pl-16">
                <div>
                  <span className="font-mono text-xs tracking-[0.18em] text-primary/70">
                    {second.n}
                  </span>
                  <h3 className="mt-6 text-xl leading-[1.18] font-medium tracking-[-0.02em] md:text-[1.8rem]">
                    {second.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-[1.75] text-muted-foreground">
                    {second.body}
                  </p>
                </div>
                <second.Glyph className="h-16 w-40 opacity-60 transition-opacity duration-300 ease-out group-hover:opacity-100" />
              </article>
            </Reveal>
          ) : null}
        </div>

        {/* Remaining services — tighter rhythm, staggered borders */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {rest.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <article
                className={`group flex h-full items-start justify-between gap-8 border-t border-border py-10 transition-colors duration-300 ease-out hover:bg-card/50 md:py-12 ${
                  i % 2 === 0 ? "md:pr-14" : "md:border-l md:pl-14"
                }`}
              >
                <div>
                  <span className="font-mono text-xs tracking-[0.18em] text-primary/70">{s.n}</span>
                  <h3 className="mt-5 text-lg font-medium tracking-[-0.02em] md:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-[1.7] text-muted-foreground">
                    {s.body}
                  </p>
                </div>
                <s.Glyph className="mt-1 hidden h-12 w-28 shrink-0 opacity-45 transition-opacity duration-300 ease-out group-hover:opacity-90 sm:block" />
              </article>
            </Reveal>
          ))}
        </div>

        {condensed ? (
          <Reveal delay={200}>
            <div className="mt-12 border-t border-border pt-10">
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
              Growth stalls in the gaps between your tools.
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
          <ul className="border-t border-border">
            {pains.map((p, i) => (
              <Reveal key={p} delay={i * 50} as="li">
                <div className="group flex items-baseline gap-6 border-b border-border py-6 transition-colors duration-200 ease-out hover:bg-card/60">
                  <span className="font-mono text-xs text-primary/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base transition-transform duration-200 ease-out group-hover:translate-x-1">
                    {p}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={280}>
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
    body: "Every call captured, qualified, and dispatched—overnight and on weekends. The phone stops being a leak in the funnel.",
    metric: "24/7",
    metricLabel: "call coverage",
    Glyph: GlyphAnswering,
  },
  {
    sector: "Real Estate",
    title: "Custom CRM",
    body: "Listings, buyers, and follow-up sequences in one pipeline built for your desk.",
    metric: "01",
    metricLabel: "single pipeline",
    Glyph: GlyphPipeline,
  },
  {
    sector: "Healthcare",
    title: "Patient workflow automation",
    body: "Intake, reminders, and records movement automated within compliance boundaries.",
    metric: "0",
    metricLabel: "manual re-entry",
    Glyph: GlyphWorkflow,
  },
  {
    sector: "Professional Services",
    title: "Client onboarding systems",
    body: "Engagement letters, data collection, and kickoff orchestrated end to end.",
    metric: "04",
    metricLabel: "steps, automated",
    Glyph: GlyphOnboarding,
  },
];

export function WhatWeBuild({
  condensed = false,
  heading = true,
}: {
  condensed?: boolean;
  heading?: boolean;
}) {
  const lead = useCases[0]!;
  const rest = useCases.slice(1);
  const shown = condensed ? rest.slice(0, 2) : rest;

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
                  Systems in production, by sector.
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

        {/* Editorial lead case — wide, asymmetric */}
        <Reveal delay={80}>
          <article className="group mt-4 grid grid-cols-1 items-end gap-10 border-t border-border pt-10 md:grid-cols-[1.25fr_0.75fr] md:gap-16">
            <div>
              <span className="eyebrow text-primary/80">{lead.sector}</span>
              <h3 className="mt-5 max-w-lg text-[1.75rem] leading-[1.15] font-medium tracking-display md:text-[2.4rem]">
                {lead.title}
              </h3>
              <p className="mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground">
                {lead.body}
              </p>
              <div className="mt-9 flex items-baseline gap-5">
                <span className="text-5xl leading-none font-light tracking-display text-primary md:text-6xl">
                  {lead.metric}
                </span>
                <span className="text-xs tracking-[0.16em] uppercase text-muted-foreground">
                  {lead.metricLabel}
                </span>
              </div>
            </div>
            <lead.Glyph className="w-full max-w-sm opacity-80 transition-opacity duration-200 ease-out group-hover:opacity-100" />
          </article>
        </Reveal>

        {/* Remaining cases — staggered offsets, alternating rhythm */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
          {shown.map((u, i) => (
            <Reveal key={u.title} delay={i * 60}>
              <article
                className={`group flex h-full flex-col justify-between gap-10 border-t border-border py-12 transition-colors duration-200 ease-out md:py-16 ${
                  i % 2 === 0 ? "md:pr-14" : "md:border-l md:pl-14"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-6">
                    <span className="eyebrow text-primary/80">{u.sector}</span>
                    <span className="text-3xl leading-none font-light tracking-display text-muted-foreground/50 transition-colors duration-200 ease-out group-hover:text-primary">
                      {u.metric}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl leading-[1.2] font-medium tracking-[-0.02em] md:text-[1.6rem]">
                    {u.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-[1.75] text-muted-foreground">
                    {u.body}
                  </p>
                </div>
                <u.Glyph className="h-16 w-40 opacity-55 transition-opacity duration-200 ease-out group-hover:opacity-100" />
              </article>
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

export function Process({
  condensed = false,
  heading = true,
}: {
  condensed?: boolean;
  heading?: boolean;
}) {
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
                Discover → Design → Build → Scale.
              </h2>
            </Reveal>
          </>
        ) : null}

        <ol className="mt-4 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 60} as="li">
              <div className="group border-t border-border pt-7">
                <div className="flex items-center gap-3">
                  <span className="text-xs tracking-[0.18em] text-primary">{s.n}</span>
                  <span
                    aria-hidden
                    className="h-px flex-1 origin-left bg-border transition-colors duration-200 ease-out group-hover:bg-primary/50"
                  />
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
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
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {heading ? (
              <Reveal>
                <p className="eyebrow">Why Zocalo</p>
              </Reveal>
            ) : null}
            <Reveal delay={50}>
              <blockquote className="mt-7 border-l border-gold/60 pl-6 text-2xl leading-[1.3] font-light tracking-[-0.025em] text-balance md:text-[2.4rem]">
                A foundation,
                <br />
                <span className="text-muted-foreground">not a subscription.</span>
              </blockquote>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-8 max-w-md text-base leading-[1.75] text-muted-foreground">
                Zocalo means the base a structure is built on. We engineer the layer your business
                stands on for the next decade.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <GlyphPlinth className="mt-12 w-56 opacity-70" />
            </Reveal>
          </div>

          <ol className="counter-rhythm">
            {shown.map((r, i) => (
              <Reveal key={r.title} delay={i * 55} as="li">
                <div className="group grid grid-cols-[3.25rem_1fr] items-start gap-4 border-b border-border py-9 first:border-t md:gap-8">
                  <span className="pt-1 text-2xl leading-none font-light tracking-display text-muted-foreground/40 transition-colors duration-200 ease-out group-hover:text-gold md:text-[2rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.02em] transition-transform duration-200 ease-out group-hover:translate-x-1 md:text-xl">
                      {r.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-[1.75] text-muted-foreground">
                      {r.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
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

/* ------------------------------- FINAL CTA -------------------------------- */

export function FinalCta() {
  return (
    <section className="section border-t border-border">
      <div className="container-x text-center">
        <StaggerWords
          text="Ready to Build Software That Fits Your Business?"
          className="mx-auto max-w-3xl text-3xl leading-[1.1] font-medium tracking-display text-balance md:text-[3.25rem]"
        />
        <Reveal delay={140}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-[1.75] text-muted-foreground">
            Tell us how your business runs. We'll show you what should be engineered.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-11 flex justify-center">
            <MagneticCta to="/contact" variant="gold" glow>
              Let's Build It
            </MagneticCta>
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
}: {
  eyebrow: string;
  title: string;
  body: string;
  to: Path;
  label?: string;
  first?: boolean;
}) {
  return (
    <section className={`section${first ? "" : " border-t border-border"}`}>
      <div className="container-x grid gap-8 md:grid-cols-12 md:items-end">
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
