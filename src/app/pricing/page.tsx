import {
  CommercialModelsCards,
  FeatureGridSection,
  NarrativeBand,
  PageHero,
  PreviewBoard,
} from "@/components/site/Sections";
import { createPageMetadata } from "@/lib/site";
import { commercialContent } from "@/lib/site-content";

const commercialModels = [
  {
    title: "Рабочая сессия / discovery",
    text: "Короткий формат для определения сценария, ограничений контура, источников, рисков и ожидаемого эффекта.",
  },
  {
    title: "Пилотный запуск / scoped delivery",
    text: "Рабочий маршрут для одного сценария с подключением источников, сервисов, контрольных точек и эксплуатационных метрик.",
  },
  {
    title: "Платформенное развёртывание / enterprise rollout",
    text: "Формирование продуктового контура Century для портфеля сценариев с governance, workflow, observability и административным слоем.",
  },
];

export const metadata = createPageMetadata({
  title: "Стоимость и форматы взаимодействия",
  description:
    "Century: рабочая сессия, пилотный запуск и корпоративное развёртывание. Форматы взаимодействия и коммерческие модели зависят от режима поставки и архитектуры.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Стоимость"
        title="Как начинается работа с Century"
        description="От первого сценария до корпоративного развёртывания в управляемом контуре."
        badges={["Discovery", "Pilot launch", "Enterprise rollout"]}
        actions={[
          {
            href: "/demo",
            label: "Запросить демо",
            variant: "primary",
            trackingLabel: "pricing_demo",
          },
          {
            href: "/cases",
            label: "Посмотреть кейсы",
            variant: "secondary",
            trackingLabel: "pricing_cases",
          },
        ]}
      >
        <PreviewBoard
          eyebrow="Форматы"
          title="Как обычно стартуют проекты"
          items={[
            "Рабочая сессия",
            "Пилотный сценарий",
            "Корпоративное развёртывание",
            "Controlled rollout",
          ]}
          footer="Состав работ зависит от режима поставки, контура данных и глубины продуктового запуска."
        />
      </PageHero>

      <CommercialModelsCards {...commercialContent} />

      <FeatureGridSection
        title="Форматы взаимодействия и коммерческие модели"
        description="Century можно запускать поэтапно, но каждую стадию лучше оценивать как часть будущего продуктового контура, а не как отдельный временный пилот."
        cards={commercialModels}
        columns="three"
      />

      <NarrativeBand
        title="Что влияет на стоимость"
        description="Инфраструктура, вычислительные ресурсы и состав внедрения определяются отдельно в зависимости от режима поставки и архитектуры решения."
        body="На цену также влияют объём источников, требования по доступу, состав сервисного каталога, набор workflow и глубина observability/governance слоя."
      />
    </>
  );
}
