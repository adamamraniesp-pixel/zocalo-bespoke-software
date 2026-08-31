import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Cloud,
  Compass,
  LayoutTemplate,
  LineChart,
  PenTool,
  PhoneMissed,
  Puzzle,
  Rocket,
  Ruler,
  Smartphone,
  Blocks,
  Timer,
  Boxes,
} from "lucide-react";
import { Reveal } from "./motion";
import { ZocaloLogo } from "./ZocaloLogo";

/* ------------------------------- primitives ------------------------------- */

export function CurveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className="-mb-px w-full overflow-hidden leading-[0]">
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className={`h-[38px] w-full md:h-[56px] ${flip ? "rotate-180" : ""}`}
      >
        <path
          d="M0 60C240 6 480 0 720 12s480 42 720 12v36H0V60Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function AmberButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`amber-glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  body,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-[2.6rem] md:leading-[1.1]">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">{body}</p>
      ) : null}
    </Reveal>
  );
}

/* ---------------------------------- hero ---------------------------------- */

const logos = [
  "HVAC Co",
  "Real Estate Group",
  "HealthNet",
  "Northline Trades",
  "Meridian Clinics",
  "Harbor Realty",
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-background px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_70%)]"
      />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Bespoke software, built to be yours
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground md:text-6xl">
            Software Built Around Your Business
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
            Custom software for HVAC, Real Estate, and Healthcare teams. No templates. No
            subscriptions. No unnecessary complexity.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AmberButton href="#book">Book a free consultation</AmberButton>
            <a
              href="#how-it-works"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
            >
              See how it works
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-16">
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
            Trusted by teams across 3 industries
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.slice(0, 6).map((name) => (
              <li
                key={name}
                className="text-sm font-semibold tracking-tight text-muted-foreground/45 transition-colors duration-200 hover:text-muted-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ social proof ------------------------------ */

const stats = [
  { value: "50+", label: "projects delivered" },
  { value: "40%", label: "average time savings" },
  { value: "98%", label: "client retention" },
];

export function SocialProof() {
  return (
    <section className="bg-surface px-6 py-20 md:px-10 md:py-24">
      <div className="container-x">
        <div className="grid gap-5 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="lift-card h-full rounded-2xl border border-border bg-card p-8 text-center shadow-[0_1px_2px_rgba(30,41,59,0.04)]">
                <p className="text-4xl font-extrabold tracking-[-0.03em] text-primary">{s.value}</p>
                <p className="mt-2 text-sm font-light text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160} className="mt-14">
          <div className="marquee-mask overflow-hidden">
            <div className="marquee flex w-max items-center gap-14">
              {[...logos, ...logos].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="whitespace-nowrap text-sm font-semibold tracking-tight text-muted-foreground/40"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- services -------------------------------- */

const services = [
  { icon: Bot, title: "AI Automation", body: "Workflows that replace manual work" },
  { icon: Blocks, title: "Custom Web Apps", body: "High-performance, scalable applications" },
  { icon: Smartphone, title: "Mobile Apps", body: "iOS and Android, built for your users" },
  { icon: Puzzle, title: "CRM & Integrations", body: "Connect your tools, unify your data" },
  { icon: PenTool, title: "UI/UX Design", body: "Interfaces your clients will love" },
  { icon: Cloud, title: "Cloud Infrastructure", body: "Reliable, secure, scalable" },
];

export function ServicesGrid() {
  return (
    <section id="services" className="bg-background px-6 py-24 md:px-10 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Services"
          title="What We Build"
          body="Six disciplines, one engineering standard — assembled around the way your team already works."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <article className="group h-full rounded-2xl border border-l-2 border-border border-l-transparent bg-card p-7 shadow-[0_1px_3px_rgba(30,41,59,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-l-primary hover:shadow-[0_18px_40px_-24px_rgba(30,41,59,0.35)]">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-[-0.01em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- industries ------------------------------- */

const verticals = [
  {
    icon: Boxes,
    title: "HVAC & Trades",
    body: "Dispatch software, scheduling automation, fleet tracking",
    metric: "Saved 20 hours/week",
  },
  {
    icon: LayoutTemplate,
    title: "Real Estate",
    body: "Deal management, client portals, MLS integrations",
    metric: "3x faster deal turnaround",
  },
  {
    icon: LineChart,
    title: "Healthcare",
    body: "Patient workflows, compliance, billing automation",
    metric: "60% less admin time",
  },
];

export function Industries() {
  return (
    <section id="industries" className="bg-surface px-6 py-24 md:px-10 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Industries"
          title="Built for Your Industry"
          body="We start from your operation — the dispatch board, the deal pipeline, the patient intake desk."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {verticals.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <article className="lift-card h-full rounded-2xl border border-border bg-card p-8">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.01em] text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
                <p className="mt-6 border-t border-border pt-5 text-sm font-semibold text-primary">
                  {v.metric}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- problem → solution --------------------------- */

const painPoints = [
  { icon: PhoneMissed, problem: "Missed calls after hours", solution: "Automated intake and routing" },
  { icon: Boxes, problem: "Scattered tools everywhere", solution: "One unified system" },
  { icon: Timer, problem: "Manual admin eating profit", solution: "AI-powered automation" },
  { icon: Ruler, problem: "Software that doesn't fit", solution: "Built exactly around you" },
];

export function ProblemSolution() {
  return (
    <section id="problem" className="bg-background px-6 py-24 md:px-10 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Problem → Solution"
          title="The problem we solve"
          body="Four bottlenecks we hear in nearly every discovery call — and what replaces them."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {painPoints.map((p, i) => (
            <Reveal key={p.problem} delay={i * 80}>
              <article className="lift-card flex h-full items-start gap-5 rounded-2xl border border-border bg-card p-7">
                <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold tracking-[-0.01em] text-foreground">
                    <p.icon className="size-4 text-muted-foreground" aria-hidden />
                    {p.problem}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-sm font-light text-muted-foreground">
                    <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden />
                    {p.solution}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ how it works ------------------------------ */

const stages = [
  { icon: Compass, title: "Discover", body: "We learn your business" },
  { icon: Ruler, title: "Design", body: "We map your workflows" },
  { icon: Blocks, title: "Build", body: "We build your software" },
  { icon: Rocket, title: "Scale", body: "We optimize and grow" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface px-6 py-24 md:px-10 md:py-28">
      <div className="container-x">
        <SectionHead eyebrow="Process" title="How we work" />
        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-6 top-0 hidden h-px w-full bg-border md:block md:left-0 md:top-6"
          />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {stages.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} as="li" className="relative">
                <span className="group relative inline-flex size-12 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                  <s.icon className="size-5" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-[-0.01em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm font-light text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- why zocalo ------------------------------- */

export function WhyZocaloBlock() {
  return (
    <section id="why" className="bg-background px-6 py-24 md:px-10 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="rounded-3xl border border-border border-l-4 border-l-primary bg-primary/[0.04] px-7 py-12 md:px-16 md:py-16">
            <p className="eyebrow text-primary">Why Zocalo</p>
            <blockquote className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-[-0.025em] text-foreground md:text-[2.75rem]">
              “A foundation, not a subscription.”
            </blockquote>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
              We don't take a monthly cut. We build something that's yours — forever. No recurring
              fees eating into your margins.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- objections ------------------------------- */

const faqs = [
  {
    q: "Isn't this just another expensive dev agency?",
    a: "We're not. We're a software partner. Fixed-scope projects, transparent pricing, and delivery on time or we keep working for free.",
  },
  {
    q: "What if we already use tools like Zapier or Make?",
    a: "We integrate with everything. Often we make your existing tools 10x more powerful.",
  },
  { q: "How long does it take?", a: "Most projects ship in 4-8 weeks. Complex builds in 12." },
  {
    q: "What does it cost?",
    a: "Projects start at $5,000. We'll give you a fixed quote before we write a single line of code.",
  },
];

export function Objections() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface px-6 py-24 md:px-10 md:py-28">
      <div className="container-x">
        <SectionHead eyebrow="FAQ" title="You're probably thinking..." />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold tracking-[-0.01em] text-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {f.q}
                      <ChevronDown
                        className={`size-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm font-light leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- final CTA ------------------------------ */

export function FinalCtaBand() {
  return (
    <section id="book" className="bg-navy px-6 py-24 md:px-10 md:py-28">
      <div className="container-x text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.025em] text-white md:text-[2.75rem]">
            Ready to build software that actually fits?
          </h2>
          <div className="mt-9">
            <AmberButton href="mailto:hello@zocalo.dev?subject=Free%20consultation">
              Book your free consultation
              <ArrowRight className="size-4" />
            </AmberButton>
          </div>
          <p className="mt-5 text-sm font-light text-white/55">
            No obligation. 30-minute call. Cancel anytime.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ mobile CTA bar ---------------------------- */

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-xl md:hidden">
      <a
        href="#book"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        Book a consultation
        <ArrowRight className="size-4" />
      </a>
    </div>
  );
}

/* --------------------------------- footer --------------------------------- */

const footerNav = [
  { to: "/services", label: "Services" },
  { to: "/what-we-build", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/why-zocalo", label: "About" },
] as const;

export function HomeFooter() {
  return (
    <footer className="bg-navy px-6 pb-24 pt-16 text-white md:px-10 md:pb-16">
      <div className="container-x flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <Link to="/" aria-label="Zocalo home" className="text-white">
          <ZocaloLogo size={28} wordmarkClassName="text-white" />
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2">
          {footerNav.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-white/45">
          © {new Date().getFullYear()} Zocalo. Bespoke software engineering.
        </p>
      </div>
    </footer>
  );
}
