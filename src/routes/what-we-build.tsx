import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHeader, Problem, WhatWeBuild } from "@/components/site/sections";

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
      <Problem />
      <FinalCta />
    </>
  );
}
