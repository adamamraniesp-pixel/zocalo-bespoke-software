import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHeader, Process } from "@/components/site/sections";

const title = "How Business Funding Works | Zocalo";
const description = "Apply once, get matched across Zocalo's commercial lender panel, and move automatically to the next suitable lender when needed.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return <><PageHeader eyebrow="How It Works" title="One application. A wider path to approval." body="We review your business once, match it across our lender panel, and keep the process moving until the right fit is found." /><Process heading={false} /><FinalCta /></>;
}