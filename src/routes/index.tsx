import { createFileRoute } from "@tanstack/react-router";
import {
  FinalCta,
  Hero,
  Problem,
  ProcessTeaserVisual,
  SectionTeaser,
  ServicesTeaserVisual,
  TrustStatement,
  WhatWeBuildTeaserVisual,
  WhyTeaserVisual,
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
      <SectionTeaser
        eyebrow="Services"
        title="Six disciplines, one engineering standard."
        body="Bespoke software, CRM systems, AI automation, internal platforms, websites, and integrations — built to fit your operation, not the other way around."
        to="/services"
        label="View all services"
        visual={<ServicesTeaserVisual />}
      />
      <Problem />
      <SectionTeaser
        eyebrow="What we build"
        title="Systems shaped by the industries that run on them."
        body="HVAC, real estate, healthcare, and professional services teams use Zocalo systems to remove manual work from their day."
        to="/what-we-build"
        label="See what we build"
        visual={<WhatWeBuildTeaserVisual />}
      />
      <SectionTeaser
        eyebrow="Process"
        title="Discover, design, build, scale."
        body="A deliberate four-stage engagement — deep operational discovery first, working software fast, then scale without a rebuild."
        to="/process"
        label="Explore the process"
        visual={<ProcessTeaserVisual />}
      />
      <SectionTeaser
        eyebrow="Why Zocalo"
        title="Custom-first, built to last, partnered long-term."
        body="No templates and no unnecessary subscriptions — scalable architecture and a team that stays with the system after launch."
        to="/why-zocalo"
        label="Why Zocalo"
        visual={<WhyTeaserVisual />}
      />
      <FinalCta />
    </>
  );
}
