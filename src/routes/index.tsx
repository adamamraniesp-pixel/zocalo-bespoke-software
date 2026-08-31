import { createFileRoute } from "@tanstack/react-router";
import {
  FinalCta,
  Hero,
  Problem,
  Process,
  Services,
  TrustStatement,
  WhatWeBuild,
  WhyZocalo,
} from "@/components/site/sections";

const title = "Zocalo — Bespoke Software Built Around Your Business";
const description =
  "Zocalo designs and builds bespoke software: custom CRMs, AI automation, internal platforms, high-performance websites, and integrations engineered around how your business operates.";

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
      <Services condensed />
      <Problem />
      <WhatWeBuild condensed />
      <Process condensed />
      <WhyZocalo condensed />
      <FinalCta />
    </>
  );
}
