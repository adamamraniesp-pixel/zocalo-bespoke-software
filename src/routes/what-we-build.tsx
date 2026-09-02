import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHeader, WhatWeBuild } from "@/components/site/sections";
import { Reveal } from "@/components/site/motion";

const title = "What We Build — Systems in Production by Sector | Zocalo";
const description =
  "After-hours AI answering for HVAC, custom CRMs for real estate, patient workflow automation for healthcare, and client onboarding systems for professional services.";

export const Route = createFileRoute("/what-we-build")({
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
  component: WhatWeBuildPage,
});

function WhatWeBuildPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Build"
        title="Examples of systems in production"
        body="Different operations, different architectures. Each one engineered around a specific bottleneck."
      />
      <WhatWeBuild heading={false} />
      <StandardStatement />
      <FinalCta />
    </>
  );
}

function StandardStatement() {
  return (
    <section className="section relative overflow-hidden border-t border-border">
      <div className="container-x relative z-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">The Standard</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-6 max-w-xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
              Four industries. One engineering standard
            </h2>
          </Reveal>
        </div>
        <div className="lg:pt-16">
          <Reveal delay={110}>
            <p className="text-base leading-[1.8] text-muted-foreground">
              The sectors differ; the engineering does not. Every system ships with typed
              interfaces, documented data models, observability, and an owner who understands the
              operation it serves.
            </p>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-6 text-base leading-[1.8] text-muted-foreground">
              That consistency is why a dispatch platform and a patient workflow can be built by the
              same team, to the same standard, and still fit each business exactly.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
