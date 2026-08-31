import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHeader, WhyZocalo } from "@/components/site/sections";

const title = "Why Zocalo — A Foundation, Not a Subscription";
const description =
  "Custom-first engineering, software built for your exact workflow, scalable architecture, enterprise-grade standards, and a long-term partnership after launch.";

export const Route = createFileRoute("/why-zocalo")({
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
  component: WhyZocaloPage,
});

function WhyZocaloPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why Zocalo"
        title="We engineer the layer your business stands on"
        body="Not a product you rent. Infrastructure you own, built to hold up as the operation grows."
      />
      <WhyZocalo heading={false} />
      <FinalCta />
    </>
  );
}
