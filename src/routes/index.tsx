import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import {
  FinalCta,
  Hero,
  Problem,
  Process,
  Services,
  SiteFooter,
  TrustStatement,
  WhatWeBuild,
  WhyZocalo,
} from "@/components/site/sections";

const title = "Zócalo — Bespoke Software Built Around Your Business";
const description =
  "Zócalo designs and builds bespoke software: custom CRMs, AI automation, internal platforms, high-performance websites, and integrations engineered around how your business operates.";

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
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <TrustStatement />
        <Services />
        <Problem />
        <WhatWeBuild />
        <Process />
        <WhyZocalo />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
