import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/sections";
import { Reveal } from "@/components/site/motion";

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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailto();
      }}
      className="space-y-7"
    >
      {fields.map((f) => (
        <div key={f.id}>
          <label
            htmlFor={f.id}
            className="block text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase"
          >
            {f.label}
          </label>
          <input
            id={f.id}
            name={f.id}
            type={f.type}
            required={f.required}
            placeholder={f.placeholder}
            value={values[f.id]}
            onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
            className="mt-3 w-full border-b border-border bg-transparent pb-3 text-base text-foreground transition-colors duration-200 ease-out outline-none placeholder:text-muted-foreground/45 focus:border-primary"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="message"
          className="block text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase"
        >
          Brief message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          placeholder="A sentence or two about your operation and the bottleneck you feel most."
          className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-base leading-[1.7] text-foreground transition-colors duration-200 ease-out outline-none placeholder:text-muted-foreground/45 focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-7 py-4 text-sm font-medium tracking-[0.02em] text-gold-foreground transition-colors duration-200 ease-out hover:bg-gold/90"
      >
        Book a consultation
        <ArrowUpRight className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>

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
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's map what should be engineered."
        body="Tell us how your business runs. We'll show you what should be engineered."
      />

      <section className="section border-t border-border pt-0 md:pt-0">
        <div className="container-x">
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-border bg-card/60">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* Left — value proposition and formal timeline */}
                <div className="border-b border-border p-8 md:p-14 lg:border-r lg:border-b-0">
                  <p className="text-[0.7rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    What the consultation covers
                  </p>
                  <h2 className="mt-6 text-2xl leading-[1.18] font-medium tracking-display text-balance md:text-[2.1rem]">
                    A structured review before a single line of code.
                  </h2>
                  <div className="mt-10 h-px w-full bg-border" />

                  <ol className="mt-2">
                    {expectations.map((e) => (
                      <li key={e.n}>
                        <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-7 last:border-b-0 md:gap-8">
                          <span className="pt-1 font-mono text-xs tracking-[0.14em] text-muted-foreground/60">
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
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Right — booking form */}
                <div className="bg-background/40 p-8 md:p-14">
                  <p className="text-[0.7rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    Request a slot
                  </p>
                  <h2 className="mt-6 text-xl font-medium tracking-[-0.02em] md:text-2xl">
                    Start the conversation.
                  </h2>
                  <div className="mt-8 mb-9 h-px w-full bg-border" />
                  <ConsultationForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
