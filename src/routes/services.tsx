import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHeader, Services } from "@/components/site/sections";

const title = "Services — Bespoke Software, CRMs & AI Automation | Zocalo";
const description =
  "Bespoke software development, custom CRM systems, AI automation, internal platforms, high-performance websites, and integrations engineered by Zocalo.";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Engineering across the full operational stack"
        body="Six disciplines, one standard: software designed from first principles around the way your business actually runs."
      />
      <Services heading={false} />
      <FinalCta />
    </>
  );
}
