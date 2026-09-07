import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHeader, Services } from "@/components/site/sections";

const title = "Commercial Loan Products | Zocalo";
const description = "Compare commercial funding options including MCA, lines of credit, equipment financing, SBA loans, invoice factoring, and short-term loans.";

export const Route = createFileRoute("/loan-products")({
  head: () => ({ meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LoanProductsPage,
});

function LoanProductsPage() {
  return <><PageHeader eyebrow="Loan Products" title="Capital for the way your business qualifies" body="Explore six commercial financing structures, each matched to a different business profile, purpose, and timeline." /><Services heading={false} /><FinalCta /></>;
}