import {
  DemoConversionSection,
  FeatureGridSection,
  PageHero,
  PreviewBoard,
} from "@/components/site/Sections";
import { createPageMetadata } from "@/lib/site";

const prepCards = [
  {
    title: "Контур и режим поставки",
    text: "Есть ли требования к on-prem, air-gapped или hybrid-модели, и какие ограничения задаёт ИБ.",
  },
  {
    title: "Источники и данные",
    text: "Какие документы, файлы, базы данных и сервисы должны войти в рабочий execution-контур.",
  },
  {
    title: "Первый сценарий",
    text: "Какой use case важнее показать первым: знания, документы, комплаенс, операции или многошаговый workflow.",
  },
  {
    title: "Критерии допуска к эксплуатации",
    text: "Какие требования есть к доступу, проверяемости результата, audit trail, observability и support readiness.",
  },
];

export const metadata = createPageMetadata({
  title: "Запросить демо",
  description:
    "Запрос демо Century: рабочая сессия по сценарию, ограничениям контура, источникам, governance и controlled rollout в корпоративной среде.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Demo"
        title="Запросить демо / рабочую сессию"
        description="Покажем Century как единую AI execution platform в вашем контуре: ассистенты, workflow, сервисы, доступ, аудит и observability."
        badges={["Demo", "Working session", "Architecture review", "Controlled rollout"]}
        actions={[
          {
            href: "/platform",
            label: "Открыть платформу",
            variant: "secondary",
            trackingLabel: "demo_platform",
          },
        ]}
      >
        <PreviewBoard
          eyebrow="Что покажем"
          title="Фокус демо"
          items={[
            "Ассистенты и сценарии",
            "Century Workflow",
            "Каталог сервисов",
            "Security и audit",
            "Metrics и observability",
          ]}
          footer="Смысл демо — показать продуктовую систему, а не отдельный промпт или единичный чат."
        />
      </PageHero>

      <DemoConversionSection
        title="Рабочая сессия по вашему корпоративному AI-контуру"
        description="За одну сессию определим первый рабочий сценарий, ограничения среды, контур данных и критерии допуска результата к реальной эксплуатации."
        bullets={[
          "Поймём, какой сценарий имеет смысл запускать первым.",
          "Разберём, какой deployment mode подходит вашему контуру.",
          "Определим, как должны выглядеть workflow, сервисы, доступ и observability.",
        ]}
        steps={[
          {
            title: "Контекст",
            text: "Уточняем бизнес-кейс, ограничения ИБ, источники и роли пользователей.",
          },
          {
            title: "Маршрут",
            text: "Формируем execution-сценарий: ассистенты, workflow, сервисные модули и контрольные точки.",
          },
          {
            title: "Следующий шаг",
            text: "Фиксируем формат запуска: рабочая сессия, pilot launch или корпоративное развёртывание.",
          },
        ]}
      />

      <FeatureGridSection
        title="Что подготовить к демо"
        description="Чем точнее входной контур, тем быстрее можно показать Century как работающий корпоративный продукт."
        cards={prepCards}
        columns="four"
      />
    </>
  );
}
