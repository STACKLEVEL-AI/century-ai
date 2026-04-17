import {
  DeploymentModeCards,
  FeatureGridSection,
  FinalCtaBlock,
  LayerStackSection,
  PageHero,
  PreviewBoard,
} from "@/components/site/Sections";
import { createPageMetadata } from "@/lib/site";
import { commercialContent, deploymentModes, finalCtaContent } from "@/lib/site-content";

const architectureLayers = [
  {
    label: "СЛОЙ 1",
    title: "Пользователи и интерфейсы",
    text: "Рабочие пространства пользователей, прикладные интерфейсы, каналы взаимодействия и точки доступа к корпоративным ИИ-сервисам.",
  },
  {
    label: "СЛОЙ 2",
    title: "Ассистенты и agentic execution",
    text: "Пользовательские ассистенты и многоагентные сценарии, в которых роль, задача и маршрут исполнения управляются как часть платформы.",
  },
  {
    label: "СЛОЙ 3",
    title: "Workflow и сервисные модули",
    text: "Century Workflow, готовые сервисы обработки, policy gates, human review и контролируемый runtime для сложных сценариев.",
  },
  {
    label: "СЛОЙ 4",
    title: "Знания, документы, файлы и базы данных",
    text: "Корпоративные источники работают как часть execution-контура, а не как внешняя интеграция вокруг чата.",
  },
  {
    label: "СЛОЙ 5",
    title: "Управление, безопасность, метрики и администрирование",
    text: "Роли, аудит, журнал исполнения, эксплуатационные метрики, стоимость, конфигурация сервисов и административная панель.",
  },
];

const productCards = [
  {
    title: "Пользовательский контур",
    text: "Интерфейсы доступа к ассистентам, сценариям и рабочим сервисам под конкретные подразделения и роли.",
  },
  {
    title: "Execution layer",
    text: "Workflow и runtime, где маршрут результата строится как воспроизводимый управляемый сценарий.",
  },
  {
    title: "Сервисный каталог",
    text: "Готовые сервисы обработки, которые встраиваются в сценарии как штатные модули платформы.",
  },
  {
    title: "Governance layer",
    text: "Ролевые границы, policy checks, audit trail и контроль пригодности сценария к реальному использованию.",
  },
  {
    title: "Observability layer",
    text: "Токены, стоимость, нагрузка по моделям, история использования и журнал исполнения как часть продукта.",
  },
  {
    title: "Administrative layer",
    text: "Панель управления пользователями, сценариями, сервисами, конфигурацией и rollout портфеля кейсов.",
  },
];

export const metadata = createPageMetadata({
  title: "Платформа и архитектура",
  description:
    "Архитектура Century как единой среды управляемого внедрения ИИ: пользователи, ассистенты, workflow, знания, сервисы, observability и governance.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Платформа"
        title="Century как единая среда управляемого внедрения ИИ"
        description="Вместо узкого RAG-лендинга Century показывает полную архитектуру корпоративной AI execution platform: интерфейсы, ассистенты, workflow, сервисы, знания, observability и governance."
        badges={["Execution layer", "Workflow", "Сервисный каталог", "Governance", "Observability"]}
        actions={[
          {
            href: "/demo",
            label: "Запросить демо",
            variant: "primary",
            trackingLabel: "platform_demo",
          },
          {
            href: "/workflow",
            label: "Открыть Workflow",
            variant: "secondary",
            trackingLabel: "platform_workflow",
          },
        ]}
      >
        <PreviewBoard
          eyebrow="5 слоёв"
          title="Архитектурная рамка"
          items={[
            "Пользователи и интерфейсы",
            "Ассистенты и agentic execution",
            "Workflow и сервисные модули",
            "Знания, документы, файлы и базы данных",
            "Безопасность, метрики и администрирование",
          ]}
          footer="Century собирает корпоративный ИИ как продуктовую систему, а не как набор точечных интеграций."
        />
      </PageHero>

      <LayerStackSection
        title="Пятислойная архитектура платформы"
        description="Каждый слой отвечает не только за генерацию ответа, но и за управляемое исполнение, доступность к сопровождению и допуск к корпоративной эксплуатации."
        layers={architectureLayers}
      />

      <FeatureGridSection
        title="Что получает заказчик как продукт"
        description="Century упакован как готовая продуктовая система для controlled rollout из первого сценария в портфель корпоративных use cases."
        cards={productCards}
        columns="three"
      />

      <DeploymentModeCards {...deploymentModes} />

      <FinalCtaBlock
        {...finalCtaContent}
        introTitle={commercialContent.title}
        introDescription={commercialContent.description}
        introCards={commercialContent.cards}
        introNote={commercialContent.note}
      />
    </>
  );
}
