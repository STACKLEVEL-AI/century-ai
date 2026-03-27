import {
  NarrativeBand,
  ObservabilityDashboardMock,
  PageHero,
  PreviewBoard,
} from "@/components/site/Sections";
import { createPageMetadata } from "@/lib/site";

const observabilityCards = [
  {
    title: "Количество сообщений и диалогов",
    text: "Платформа показывает объём использования, диалоги и характер пользовательской активности по временным срезам.",
  },
  {
    title: "История использования по времени и пользователям",
    text: "Наблюдаемость привязана к конкретным подразделениям, ролям, командам и рабочим интервалам использования.",
  },
  {
    title: "Токены и стоимость",
    text: "Стоимость и токены видны в контексте сценариев, моделей и маршрутов исполнения, а не во внешней табличной отчётности.",
  },
  {
    title: "Нагрузка по моделям",
    text: "Century помогает понимать, какие сценарии и рабочие потоки расходуют ресурсы конкретных моделей и контуров.",
  },
  {
    title: "Журнал запросов",
    text: "Подробный request log связывает пользователя, вопрос, сценарий, источники, результат и эксплуатационные события.",
  },
  {
    title: "Повторяемость сценариев",
    text: "Платформа фиксирует, какие рабочие сценарии реально воспроизводятся, где возникают сбои и как меняется качество процесса.",
  },
  {
    title: "Как наблюдаемость помогает эксплуатации",
    text: "Observability в Century нужна не для отчётности ради отчётности, а для сопровождения, оптимизации стоимости и controlled rollout.",
  },
];

export const metadata = createPageMetadata({
  title: "Метрики и наблюдаемость",
  description:
    "Метрики, стоимость и наблюдаемость Century: история использования, токены, нагрузка по моделям, журнал запросов и повторяемость сценариев.",
  path: "/observability",
});

export default function ObservabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Метрики"
        title="Метрики, стоимость и наблюдаемость Century"
        description="Организация должна видеть не только то, что модель ответила, но и как используется платформа, какие сценарии нагружают контур и что стоит сопровождение."
        badges={["Requests", "Tokens", "Cost", "Model load", "Execution log"]}
        actions={[
          {
            href: "/demo",
            label: "Запросить демо",
            variant: "primary",
            trackingLabel: "observability_demo",
          },
          {
            href: "/platform",
            label: "Посмотреть архитектуру",
            variant: "secondary",
            trackingLabel: "observability_platform",
          },
        ]}
      >
        <PreviewBoard
          eyebrow="Observability"
          title="Что видно команде сопровождения"
          items={[
            "messages / dialogs",
            "usage by time and users",
            "tokens / cost",
            "load by model",
            "request log",
            "scenario repeatability",
          ]}
          footer="Наблюдаемость встроена в продукт и работает как operational control layer."
        />
      </PageHero>

      <ObservabilityDashboardMock
        title="Наблюдаемость как часть эксплуатации"
        description="Century делает эксплуатационную картину продукта прозрачной: от пользовательской активности до модели, токенов, стоимости и журнала исполнения."
        cards={observabilityCards}
        caption="Наблюдаемость нужна для сопровождения, оптимизации и допуска сценариев к масштабированию."
      />

      <NarrativeBand
        title="Наблюдаемость поддерживает controlled rollout"
        description="Когда организация переносит первый успешный сценарий в портфель use cases, ей нужен не только новый workflow, но и единая картина нагрузки, стоимости и качества процесса."
      />
    </>
  );
}
