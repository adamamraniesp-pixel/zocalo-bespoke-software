import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/sections";
import { SectionFloaters } from "@/components/site/SectionFloaters";
import { useReducedMotion } from "@/components/site/motion";

const title = "Contact — Book a Consultation | Zocalo";
const description =
  "Tell us how your business runs and we'll show you what should be engineered. Book a consultation with Zocalo's bespoke software team.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const expectations = [
  {
    n: "01",
    title: "A 30-minute operational review",
    meta: "~30 min",
    body: "We walk your workflow end to end—handoffs, tools, and where margin leaks out.",
  },
  {
    n: "02",
    title: "A candid build assessment",
    meta: "Same call",
    body: "What should be engineered, what shouldn't, and what an honest scope looks like.",
  },
  {
    n: "03",
    title: "A written architecture outline",
    meta: "Within 2 days",
    body: "Systems, data model, and sequencing—yours to keep whether we work together or not.",
  },
];

const fields = [
  { id: "name", label: "Name", type: "text", placeholder: "Jane Doe", required: true },
  { id: "email", label: "Email", type: "email", placeholder: "jane@company.com", required: true },
  { id: "company", label: "Company", type: "text", placeholder: "Company name", required: false },
] as const;

/** Input shell with an animated glow border on hover/focus. */
function FieldShell({
  htmlFor,
  label,
  children,
}: {
  htmlFor: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label
        htmlFor={htmlFor}
        className="block text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase transition-colors duration-200 group-focus-within:text-primary"
      >
        {label}
      </label>
      <div className="relative mt-3 rounded-md transition-shadow duration-300 ease-out group-hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_45%,transparent)] group-focus-within:shadow-[0_0_0_1px_var(--primary),0_10px_30px_-16px_color-mix(in_oklab,var(--primary)_70%,transparent)]">
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-focus-within:scale-x-100"
        />
      </div>
    </div>
  );
}

function ConsultationForm() {
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });

  const mailto = () => {
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company}`,
      "",
      values.message,
    ].join("\n");
    return `mailto:hello@zocalo.dev?subject=${encodeURIComponent(
      "Book a Consultation",
    )}&body=${encodeURIComponent(body)}`;
  };

  const inputCls =
    "w-full rounded-md border border-border bg-background/70 px-4 py-3 text-base text-foreground transition-colors duration-200 ease-out outline-none placeholder:text-muted-foreground/45 focus:border-primary";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailto();
      }}
      className="space-y-6"
    >
      {fields.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: EASE }}
        >
          <FieldShell htmlFor={f.id} label={f.label}>
            <input
              id={f.id}
              name={f.id}
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              value={values[f.id]}
              onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
              className={inputCls}
            />
          </FieldShell>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.34, ease: EASE }}
      >
        <FieldShell htmlFor="message" label="Brief message">
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            placeholder="A sentence or two about your operation and the bottleneck you feel most."
            className={`${inputCls} resize-none leading-[1.7]`}
          />
        </FieldShell>
      </motion.div>

      <motion.button
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-7 py-4 text-sm font-medium tracking-[0.02em] text-gold-foreground shadow-[0_14px_36px_-20px_color-mix(in_oklab,var(--gold)_80%,transparent)] transition-colors duration-200 ease-out hover:bg-gold/90"
      >
        Book a consultation
        <ArrowUpRight className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </motion.button>

      <p className="text-xs leading-[1.7] text-muted-foreground">
        We reply within one business day. Prefer email?{" "}
        <a
          href="mailto:hello@zocalo.dev?subject=Book%20a%20Consultation"
          className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
        >
          hello@zocalo.dev
        </a>
      </p>
    </form>
  );
}

function ContactPage() {
  const reduced = useReducedMotion();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's map what should be engineered"
        body="Tell us how your business runs. We'll show you what should be engineered."
      />

      <section className="section relative overflow-hidden border-t border-border pt-0 md:pt-0">
        <SectionFloaters variant="b" />
        <div className="container-x relative">
          <div className="overflow-hidden rounded-lg border border-border bg-card/60">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              {/* Left — value proposition and formal timeline */}
              <div className="border-b border-border p-8 md:p-14 lg:border-r lg:border-b-0">
                <motion.p
                  className="text-[0.7rem] font-medium tracking-[0.2em] text-muted-foreground uppercase"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  What the consultation covers
                </motion.p>
                <motion.h2
                  className="mt-6 text-2xl leading-[1.18] font-medium tracking-display text-balance md:text-[2.1rem]"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                >
                  A structured review before a single line of code
                </motion.h2>
                <div className="mt-10 h-px w-full bg-border" />

                <ol className="mt-2">
                  {expectations.map((e, i) => (
                    <motion.li
                      key={e.n}
                      initial={{ opacity: 0, x: -28 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: 0.18 + i * 0.12, ease: EASE }}
                    >
                      <div className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-7 last:border-b-0 md:gap-8">
                        <span className="pt-1 font-mono text-xs tracking-[0.14em] text-muted-foreground/60 transition-colors duration-300 group-hover:text-gold">
                          {e.n}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                            <h3 className="text-base font-medium tracking-[-0.01em] md:text-lg">
                              {e.title}
                            </h3>
                            <span className="text-[0.7rem] font-medium tracking-[0.14em] text-primary/80 uppercase">
                              {e.meta}
                            </span>
                          </div>
                          <p className="mt-2.5 max-w-md text-sm leading-[1.75] text-muted-foreground">
                            {e.body}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* Right — booking form with floating shape behind */}
              <div className="relative overflow-hidden bg-background/40 p-8 md:p-14">
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%)",
                  }}
                  animate={reduced ? {} : { y: [0, 22, 0], x: [0, -14, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)",
                  }}
                  animate={reduced ? {} : { y: [0, -18, 0], x: [0, 16, 0] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative">
                  <motion.p
                    className="text-[0.7rem] font-medium tracking-[0.2em] text-muted-foreground uppercase"
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    Request a slot
                  </motion.p>
                  <motion.h2
                    className="mt-6 text-xl font-medium tracking-[-0.02em] md:text-2xl"
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
                  >
                    Start the conversation
                  </motion.h2>
                  <div className="mt-8 mb-9 h-px w-full bg-border" />
                  <ConsultationForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
