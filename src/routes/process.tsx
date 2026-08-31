import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHeader, Process, TrustStatement } from "@/components/site/sections";

const title = "Process — Discover, Design, Build, Scale | Zocalo";
const description =
  "How Zocalo delivers bespoke software: discovery of how your business runs, architecture and interface design, incremental production builds, then monitoring and scale.";

export const Route = createFileRoute("/process")({
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
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="Four phases, one accountable team"
        body="No discovery theatre and no black-box delivery. You see the system take shape from the first increment."
      />
      <Process heading={false} />
      <TrustStatement />
      <FinalCta />
    </>
  );
}
