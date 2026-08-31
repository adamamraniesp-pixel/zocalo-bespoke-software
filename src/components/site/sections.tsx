import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DrawIn, Reveal, StaggerWords } from "./motion";
import { MagneticCta } from "./MagneticCta";
import { HeroBackdrop } from "./HeroBackdrop";
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

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className="group flex h-full flex-col justify-between gap-10 rounded-xl border border-border bg-card/40 p-8 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--service-accent)_55%,transparent)] hover:bg-card/60 hover:shadow-[0_18px_48px_-24px_color-mix(in_oklab,var(--service-accent)_50%,transparent)] md:p-12"
      style={{ ["--service-accent" as never]: service.accent }}
    >
      <div>
        <span className="font-mono text-sm tracking-[0.22em]" style={{ color: service.accent }}>
          {service.n}
        </span>
        <h3 className="mt-6 max-w-lg text-[1.75rem] leading-[1.14] font-medium tracking-display md:text-[2.3rem]">
          {service.title}
        </h3>
        <p className="mt-6 max-w-lg text-base leading-[1.85] tracking-[0.005em] text-muted-foreground">
          {service.body}
        </p>
      </div>
      <DrawIn className="w-full" delay={80}>
        <service.Glyph
          className="h-40 w-full opacity-75 transition-opacity duration-300 ease-out group-hover:opacity-100 md:h-52"
          style={{ color: service.accent }}
        />
      </DrawIn>
    </article>
  );
}

/** Slow, always-on data flow living in the gap between two service blocks. */
function ServiceConnector() {
  return (
    <div aria-hidden className="relative mx-auto h-full w-px">
      <div className="connector-rail absolute inset-y-6 left-1/2 w-px -translate-x-1/2 opacity-60" />
      <div className="absolute inset-y-6 left-1/2 w-px">
        <div className="connector-orb absolute top-0 left-1/2 h-2 w-2 rounded-full bg-primary shadow-[0_0_16px_4px_color-mix(in_oklab,var(--primary)_45%,transparent)]" />
      </div>
    </div>
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
  const rows: Service[][] = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));




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

        {/* Hero-scale blocks; each pair is its own row so cards breathe apart */}
        <div className="mt-12 flex flex-col gap-10 md:gap-14">
          {rows.map((row) => (
            <div
              key={row.map((r) => r.n).join("-")}
              className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-0"
            >
              {row.map((s, i) => (
                <Reveal
                  key={s.title}
                  delay={i * 150}
                  distance={15}
                  className={`h-full ${i === 0 ? "lg:pr-0" : ""}`}
                >
                  <ServiceCard service={s} />
                </Reveal>
              ))}
              {row.length === 2 ? (
                <div className="hidden lg:order-2 lg:block lg:w-14 xl:w-16">
                  {row.some((s) => s.n === "03") ? <ServiceConnector /> : null}
                </div>
              ) : null}
            </div>
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
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pains.map((p, i) => (
              <Reveal key={p} delay={i * 40} as="li">
                <div className="flex h-full items-start gap-5 border border-border border-l-2 border-l-primary/35 bg-card/25 px-6 py-7">
                  <span className="font-mono text-sm leading-none tracking-[0.12em] text-muted-foreground/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.975rem] leading-[1.6] text-foreground/90">{p}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={240}>
            <p className="mt-12 border-t border-border pt-8 text-xl leading-[1.4] font-medium tracking-[-0.02em] text-balance md:text-2xl">
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

/** Editorial process block. `scale` drives the asymmetric large/small rhythm. */
function ProcessStep({
  step,
  index,
  prominent,
}: {
  step: (typeof steps)[number];
  index: number;
  prominent: boolean;
}) {
  return (
    <Reveal delay={index * 60} as="li" className={prominent ? "md:col-span-7" : "md:col-span-5"}>
      <article
        className={`group relative flex flex-col overflow-hidden border-t border-border transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong hover:bg-card/40 ${
          prominent ? "gap-10 px-1 pt-9 pb-14 md:px-8 md:pt-12 md:pb-16" : "gap-8 px-1 pt-8 pb-12 md:px-8 md:pt-10 md:pb-14"
        }`}
      >
        <div>
          <div className="flex items-baseline gap-5">
            <span
              className={`origin-left font-light tracking-display transition-transform duration-500 ease-out group-hover:scale-105 ${step.accent} ${
                prominent ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"
              }`}
            >
              {step.n}
            </span>
            <span
              aria-hidden
              className="h-px flex-1 origin-left scale-x-100 bg-border transition-colors duration-300 ease-out group-hover:bg-primary/50"
            />
          </div>
          <h3
            className={`mt-8 font-medium tracking-display ${
              prominent ? "text-2xl md:text-[2.4rem]" : "text-xl md:text-[1.75rem]"
            }`}
          >
            {step.title}
          </h3>
          <p
            className={`mt-5 text-sm leading-[1.8] text-muted-foreground ${
              prominent ? "max-w-md md:text-base" : "max-w-sm"
            }`}
          >
            {step.body}
          </p>
        </div>
        <DrawIn
          delay={index * 120}
          className={`${step.accent} opacity-60 transition-opacity duration-300 ease-out group-hover:opacity-100 ${
            prominent ? "w-full max-w-[16rem] self-end" : "w-full max-w-[11rem]"
          }`}
        >
          <step.Glyph className="w-full" />
        </DrawIn>
      </article>
    </Reveal>
  );
}

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

        <ol className="mt-6 grid grid-cols-1 gap-x-14 md:grid-cols-12">
          {steps.map((s, i) => (
            <ProcessStep key={s.n} step={s} index={i} prominent={i === 0 || i === 3} />
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

  const layers = [
    { width: "100%", accent: "var(--amber)" },
    { width: "92%", accent: "var(--gold)" },
    { width: "84%", accent: "var(--teal)" },
    { width: "74%", accent: "var(--primary)" },
    { width: "62%", accent: "var(--indigo)" },
  ];

  return (
    <div
      ref={ref}
      data-stacked={stacked ? "true" : "false"}
      className="relative overflow-hidden rounded-2xl border border-border-strong p-9 md:p-12 lg:sticky lg:top-28"
      style={{
        backgroundImage:
          "linear-gradient(160deg, var(--indigo) 0%, var(--slateblue) 55%, color-mix(in oklab, var(--gold) 55%, var(--slateblue)) 100%)",
      }}
    >
      <div aria-hidden className="motes pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative">
        <p className="eyebrow text-cream/70">The name</p>
        <blockquote className="mt-6 text-[2.1rem] leading-[1.08] font-light tracking-[-0.03em] text-cream text-balance md:text-[3rem]">
          A foundation,
          <br />
          <span className="text-cream/60">not a subscription.</span>
        </blockquote>

        {/* Cut-away foundation layers */}
        <div aria-hidden className="mt-10 flex flex-col items-start gap-2">
          {layers.map((l, i) => (
            <div
              key={l.width}
              className="bedrock-layer h-7 rounded-md border md:h-9"
              style={{
                width: l.width,
                marginLeft: `${i * 5}%`,
                borderColor: `color-mix(in oklab, ${l.accent} 55%, transparent)`,
                background: `linear-gradient(90deg, color-mix(in oklab, ${l.accent} 30%, transparent), transparent)`,
                ["--layer-delay" as never]: `${(layers.length - 1 - i) * 110}ms`,
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
          not a subscription.
        </span>
      </blockquote>
    </Reveal>
  );
}
