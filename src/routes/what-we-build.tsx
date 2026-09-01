import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHeader, WhatWeBuild } from "@/components/site/sections";

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

      {/* New outcome-focused pull-quote section (replaces Problem) */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <blockquote className="text-2xl md:text-3xl font-light text-white/90 border-l-4 border-blue-500 pl-8 italic">
            “We don’t build features — we build outcomes. Our clients see an average 3× increase in qualified leads
            within 30 days.”
          </blockquote>
          <p className="mt-6 text-right text-white/50">— Zocalo team</p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
