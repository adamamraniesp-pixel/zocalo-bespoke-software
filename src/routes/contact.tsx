import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/sections";
import { Reveal, StaggerWords } from "@/components/site/motion";

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
    body: "We walk your workflow end to end—handoffs, tools, and where margin leaks out.",
  },
  {
    n: "02",
    title: "A candid build assessment",
    body: "What should be engineered, what shouldn't, and what an honest scope looks like.",
  },
  {
    n: "03",
    title: "A written architecture outline",
    body: "Systems, data model, and sequencing—yours to keep whether we work together or not.",
  },
];

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's map what should be engineered."
        body="Tell us how your business runs. We'll show you what should be engineered."
      />

      <section className="section border-t border-border pt-0 md:pt-0">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <ol>
              {expectations.map((e, i) => (
                <Reveal key={e.n} delay={i * 55} as="li">
                  <div className="group grid grid-cols-[3rem_1fr] items-start gap-4 border-b border-border py-8 first:border-t md:gap-8">
                    <span className="pt-1 text-xl font-light tracking-display text-muted-foreground/40 transition-colors duration-200 ease-out group-hover:text-primary">
                      {e.n}
                    </span>
                    <div>
                      <h2 className="text-lg font-medium tracking-[-0.02em]">{e.title}</h2>
                      <p className="mt-3 text-sm leading-[1.75] text-muted-foreground">{e.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:pt-4">
            <StaggerWords
              text="Start the conversation."
              as="h2"
              className="text-2xl leading-[1.2] font-medium tracking-display md:text-[2.2rem]"
            />
            <Reveal delay={120}>
              <a
                href="mailto:hello@zocalo.dev?subject=Book%20a%20Consultation"
                className="group mt-9 flex items-center justify-between gap-6 border-y border-border py-6 transition-colors duration-200 ease-out hover:border-primary/60"
              >
                <span className="text-base md:text-lg">hello@zocalo.dev</span>
                <ArrowUpRight className="size-5 text-primary transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 max-w-md text-sm leading-[1.75] text-muted-foreground">
                Include a sentence or two about your operation and the bottleneck you feel most. We
                reply within one business day.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
