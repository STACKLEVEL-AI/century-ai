import {
  AssistantsAndAgentsGrid,
  CaseCards,
  DeploymentModeCards,
  FeatureGridSection,
  FinalCtaBlock,
  HeroExecutionPlatform,
  ObservabilityDashboardMock,
  SecurityGovernanceAccordion,
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
  workflowContent,
} from "@/lib/site-content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Century — платформа управляемого внедрения корпоративного ИИ",
  description:
    "Century показывает корпоративный ИИ как единую платформу: ассистенты, многошаговые сценарии, workflow, сервисный каталог, аудит и метрики в закрытом контуре.",
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
