import {
  AssistantsAndAgentsGrid,
  CaseCards,
  DeploymentModeCards,
  FeatureGridSection,
  FinalCtaBlock,
  HeroExecutionPlatform,
  ObservabilityDashboardMock,
  SecurityGovernanceAccordion,
  VerifiableAnswersSection,
  WorkflowShowcase,
} from "@/components/site/Sections";
import {
  assistantsContent,
  casesContent,
  commercialContent,
  deploymentModes,
  finalCtaContent,
  homeCapabilities,
  homeHero,
  observabilityContent,
  securityContent,
  serviceCatalogContent,
  verifiableAnswersContent,
  workflowContent,
} from "@/lib/site-content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Century — платформа управляемого внедрения корпоративного ИИ",
  description:
    "Century показывает корпоративный ИИ как execution platform: ассистенты, многоагентные сценарии, workflow, сервисный каталог, observability и governance в закрытом контуре.",
  path: "/",
});

export default function Home() {
  return (
    <main className="home-page">
      <HeroExecutionPlatform {...homeHero} />
      <FeatureGridSection {...homeCapabilities} />
      <DeploymentModeCards {...deploymentModes} />
      <WorkflowShowcase {...workflowContent} />
      <FeatureGridSection {...serviceCatalogContent} />
       {/* <VerifiableAnswersSection {...verifiableAnswersContent} /> */}
      <AssistantsAndAgentsGrid {...assistantsContent} />
      <ObservabilityDashboardMock {...observabilityContent} />
      <SecurityGovernanceAccordion {...securityContent} />
      <CaseCards {...casesContent} />
      <FinalCtaBlock
        {...finalCtaContent}
        introTitle={commercialContent.title}
        introDescription={commercialContent.description}
        introCards={commercialContent.cards}
        introNote={commercialContent.note}
      />
    </main>
  );
}
