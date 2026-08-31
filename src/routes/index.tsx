import { createFileRoute } from "@tanstack/react-router";
import {
  CurveDivider,
  FinalCtaBand,
  HomeHero,
  HowItWorks,
  Industries,
  MobileCtaBar,
  Objections,
  ProblemSolution,
  ServicesGrid,
  SocialProof,
  WhyZocaloBlock,
} from "@/components/site/home";

const title = "Zocalo — Custom Software for HVAC, Real Estate & Healthcare";
const description =
  "Zocalo builds bespoke software for HVAC, real estate, and healthcare teams — AI automation, custom apps, CRM integrations. No templates, no subscriptions.";

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
    <div className="page-load">
      <HomeHero />
      <div className="text-surface">
        <CurveDivider />
      </div>
      <SocialProof />
      <div className="rotate-180 text-surface">
        <CurveDivider />
      </div>
      <ServicesGrid />
      <div className="text-surface">
        <CurveDivider />
      </div>
      <Industries />
      <div className="rotate-180 text-surface">
        <CurveDivider />
      </div>
      <ProblemSolution />
      <div className="text-surface">
        <CurveDivider />
      </div>
      <HowItWorks />
      <div className="rotate-180 text-surface">
        <CurveDivider />
      </div>
      <WhyZocaloBlock />
      <div className="text-surface">
        <CurveDivider />
      </div>
      <Objections />
      <FinalCtaBand />
      <MobileCtaBar />
    </div>
  );
}
