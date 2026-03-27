import {
  NarrativeBand,
  PageHero,
  PreviewBoard,
  SecurityGovernanceAccordion,
} from "@/components/site/Sections";
import { createPageMetadata } from "@/lib/site";
import { securityFaqs } from "@/lib/site-content";

const securityBlocks = [
  {
    title: "Ролевые границы",
    text: "Каждый сценарий строится вокруг корпоративной модели доступа и ролевых ограничений пользователя.",
  },
  {
    title: "Ответы с учётом доступа",
    text: "Retrieval, цитаты и итоговый ответ учитывают разрешённый контур знаний, файлов и баз данных.",
  },
  {
    title: "Журнал исполнения",
    text: "Century сохраняет ключевые события запроса, сценария, источников, промежуточных шагов и финального результата.",
  },
  {
    title: "Проверяемость результата",
    text: "Ответ связан с источником, маршрутом исполнения и контекстом обработки, поэтому пригоден к последующей проверке.",
  },
  {
    title: "Контролируемый выпуск",
    text: "Human review, policy gates и наблюдаемый runtime позволяют допускать сценарии к реальной эксплуатации осознанно.",
  },
  {
    title: "Готовность к сопровождению",
    text: "Команда эксплуатации получает логи, метрики, проблемные зоны исполнения и инструменты для разбора поведения системы.",
  },
];

export const metadata = createPageMetadata({
  title: "Безопасность и governance",
  description:
    "Безопасность Century: ролевые границы, ответы с учётом доступа, журнал исполнения, проверяемость результата и controlled release для промышленной эксплуатации.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Безопасность"
        title="Безопасность, аудит и допуск к промышленной эксплуатации"
        description="Страница про security в Century показывает не только контроль доступа, но и весь набор условий, при которых AI-сценарий допустим к реальной работе внутри закрытого корпоративного контура."
        badges={["Role boundaries", "Audit trail", "Controlled release", "Support readiness"]}
        actions={[
          {
            href: "/demo",
            label: "Запросить демо",
            variant: "primary",
            trackingLabel: "security_demo",
          },
          {
            href: "/platform",
            label: "Открыть платформу",
            variant: "secondary",
            trackingLabel: "security_platform",
          },
        ]}
      >
        <PreviewBoard
          eyebrow="Governance"
          title="Контур контроля"
          items={[
            "Ролевые границы",
            "Access-aware answers",
            "Execution log",
            "Verifiable result",
            "Controlled release",
            "Support readiness",
          ]}
          footer="Century проектируется так, чтобы AI-процесс был пригоден к проверке и сопровождению."
        />
      </PageHero>

      <SecurityGovernanceAccordion
        title="Security и governance по умолчанию"
        description="Century помогает пройти путь от security-совместимого прототипа до сценария, допущенного к промышленной эксплуатации."
        cards={securityBlocks}
        faqs={securityFaqs}
      />

      <NarrativeBand
        title="Безопасность встроена в execution layer"
        description="В Century security narrative не отделён от продукта: ролевые границы, policy gates, observability и audit являются частью самого runtime."
      />
    </>
  );
}
