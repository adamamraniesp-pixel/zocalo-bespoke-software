import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, Hero, Problem, StatsBand, TrustStatement } from "@/components/site/sections";
import { LiveDemo } from "@/components/site/LiveDemo";

const title = "Commercial Business Financing | Zocalo";
const description =
  "Zocalo matches businesses with commercial lenders and the right financing product through one streamlined application.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustStatement />
      {/* Credibility band replaces the old section previews — the dedicated
          pages in the nav own that content. */}
      <StatsBand />
      <Problem />
      <LiveDemo />
      <FinalCta />
    </>
  );
}
