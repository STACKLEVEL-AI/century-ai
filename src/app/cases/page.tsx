import {
  CaseCards,
  FinalCtaBlock,
  PageHero,
  PreviewBoard,
  TextColumnsSection,
} from "@/components/site/Sections";
import { createPageMetadata } from "@/lib/site";

const caseCards = [
  {
    title: "Политики и регламенты",
    text: "Ответы по внутренним требованиям, процедурам и правилам с проверяемыми ссылками и учётом доступа.",
  },
  {
    title: "Документы и договоры",
    text: "Анализ договоров, отчётов, закупочных пакетов и потоков документной обработки.",
  },
  {
    title: "Комплаенс и доказательства",
    text: "Сбор доказательной структуры по вопросу, результату, источникам и маршруту исполнения.",
  },
  {
    title: "Операции и intake",
    text: "Извлечение данных, маршрутизация, отчётность и контроль исполнения в операционных процессах.",
  },
  {
    title: "Поддержка и базы знаний",
    text: "Knowledge assistants для внутренних регламентов, triage и поддерживающих корпоративных функций.",
  },
  {
    title: "Risk-aware сценарии",
    text: "Процессы, где важны policy checks, human review и audit-ready выпуск результата.",
  },
];

const rolloutColumns = [
  {
    title: "Первый кейс как рабочий сценарий",
    text: "Century помогает собрать пилот не как презентационный чат, а как маршрут, который сразу пригоден к оценке, проверке и сопровождению.",
  },
  {
    title: "Переход к портфелю сценариев",
    text: "Когда execution layer, сервисы и метрики уже встроены в платформу, следующий кейс запускается быстрее и с меньшим архитектурным риском.",
  },
  {
    title: "Промышленная эксплуатация",
    text: "Ключевая сила Century проявляется там, где сценарии нужно не просто показать, а удерживать под управлением в закрытом корпоративном контуре.",
  },
];

export const metadata = createPageMetadata({
  title: "Кейсы и сценарии применения",
  description:
    "Сценарии применения Century для политик, документов, комплаенса, операций и knowledge-процессов, где нужны проверяемость, доступ и controlled runtime.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Кейсы"
        title="Сценарии, где важен не только ответ, но и допуск к эксплуатации"
        description="Century особенно силён там, где обычный чат не проходит требования проверки, воспроизводимости, контроля доступа и сопровождения."
        badges={["Policies", "Documents", "Compliance", "Operations"]}
        actions={[
          {
            href: "/demo",
            label: "Запросить демо",
            variant: "primary",
            trackingLabel: "cases_demo",
          },
          {
            href: "/pricing",
            label: "Посмотреть формат запуска",
            variant: "secondary",
            trackingLabel: "cases_pricing",
          },
        ]}
      >
        <PreviewBoard
          eyebrow="Use cases"
          title="Где Century особенно силён"
          items={[
            "Политики и регламенты",
            "Документы и договоры",
            "Комплаенс и доказательства",
            "Операции и маршрутизация",
          ]}
          footer="Century рассчитан на сценарии, где ответ должен быть проверяемым и допустимым к работе."
        />
      </PageHero>

      <CaseCards
        title="Сценарии применения"
        description="Платформа показывает глубину именно там, где нужен управляемый enterprise-runtime, а не только интерфейс к модели."
        cards={caseCards}
        columns="three"
      />

      <TextColumnsSection
        title="Как кейсы превращаются в портфель"
        description="Тема controlled rollout остаётся важной, но она встроена в продуктовую рамку Century, а не подменяет её."
        columns={rolloutColumns}
      />

      <FinalCtaBlock
        title="Покажем кейс Century на вашем контуре данных, документов или операций"
        description="На демо имеет смысл смотреть не абстрактную витрину, а конкретный сценарий с доступом, workflow, сервисами и observability."
        actions={[
          {
            href: "/demo",
            label: "Запросить демо",
            variant: "primary",
            trackingLabel: "cases_final_demo",
          },
          {
            href: "/pricing",
            label: "Открыть формат запуска",
            variant: "text",
            trackingLabel: "cases_final_pricing",
          },
        ]}
      />
    </>
  );
}
