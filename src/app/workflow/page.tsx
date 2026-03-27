import {
  FeatureGridSection,
  FinalCtaBlock,
  NarrativeBand,
  PageHero,
  PreviewBoard,
  TextColumnsSection,
} from "@/components/site/Sections";
import { createPageMetadata } from "@/lib/site";

const workflowBasics = [
  {
    title: "Workflow как execution layer",
    text: "Century Workflow управляет не только генерацией ответа, но и всей логикой маршрута до результата: retrieve, policy check, service modules, model step, human review и output.",
  },
  {
    title: "Воспроизводимые сценарии",
    text: "Процессы собираются как повторяемые маршруты с понятной структурой шагов, правил и контрольных точек для эксплуатации.",
  },
  {
    title: "Управляемый runtime",
    text: "Команда сопровождения видит шаги, ошибки, промежуточные результаты и может разбирать поведение сценария как рабочей системы.",
  },
];

const workflowModules = [
  {
    title: "Retrieve and citations",
    text: "Поиск по знаниям и документам с возвратом проверяемых цитат на источник и версию данных.",
  },
  {
    title: "Access-aware retrieval",
    text: "Маршрут retrieval учитывает ролевые границы и разрешённый контур документов и данных пользователя.",
  },
  {
    title: "Anonymization",
    text: "Подготовка входящих данных к безопасному использованию внутри сценария и дальнейшей обработке.",
  },
  {
    title: "Extraction",
    text: "Извлечение структурированных полей и рабочих сущностей из документов, вложений и входящих пакетов.",
  },
  {
    title: "Policy gate",
    text: "Контрольный узел для проверки результата на соответствие политике, роли и допустимости к выпуску.",
  },
  {
    title: "Human review",
    text: "Встраиваемый шаг ручной проверки и подтверждения, когда сценарий требует управляемого выпуска.",
  },
  {
    title: "Metrics hook",
    text: "Сбор эксплуатационных метрик, токенов, стоимости и параметров runtime в рамках одного workflow.",
  },
];

export const metadata = createPageMetadata({
  title: "Century Workflow",
  description:
    "Century Workflow — оркестрация корпоративных AI-сценариев: визуальный execution layer, runtime, совместимость с n8n-подходом и собственные сервисные модули.",
  path: "/workflow",
});

export default function WorkflowPage() {
  return (
    <>
      <PageHero
        eyebrow="Workflow"
        title="Century Workflow — оркестрация корпоративных AI-сценариев"
        description="Визуальный слой исполнения для многошаговых процессов: анализ, ветвление, трансформация, сервисная обработка, модельные шаги и выпуск результата."
        badges={["Visual builder", "n8n-compatible", "Controlled runtime", "Policy gates"]}
        actions={[
          {
            href: "/demo",
            label: "Запросить демо Workflow",
            variant: "primary",
            trackingLabel: "workflow_hero_demo",
          },
          {
            href: "/services",
            label: "Открыть сервисы",
            variant: "secondary",
            trackingLabel: "workflow_services",
          },
        ]}
      >
        <PreviewBoard
          eyebrow="Runtime"
          title="Маршрут исполнения"
          items={[
            "input",
            "retrieve",
            "policy check",
            "transform",
            "service module",
            "model step",
            "human review",
            "output",
          ]}
          footer="Century Workflow делает маршрут результата прозрачным и пригодным к сопровождению."
        />
      </PageHero>

      <TextColumnsSection
        title="Что такое Century Workflow"
        description="Century Workflow выступает execution layer для сценариев, где корпорации важно не просто получить ответ, а контролировать сам маршрут до результата."
        columns={workflowBasics}
      />

      <NarrativeBand
        title="Совместимость с n8n"
        description="На сайте Century Workflow описан как совместимый с n8n-подходом к workflow-оркестрации и дополненный собственными модулями Century для корпоративного AI-контура."
        body="Это снимает разрыв между знакомой логикой визуальных цепочек и требованиями закрытого enterprise-контура, где нужны IAM-aware ответы, audit trail, controlled runtime и observability."
      />

      <FeatureGridSection
        title="Модули Century"
        description="Workflow собирается из прикладных AI-модулей и контрольных шагов, которые отражают реальный корпоративный маршрут исполнения."
        cards={workflowModules}
        columns="three"
      />

      <NarrativeBand
        title="Почему это важно"
        description="Для корпорации важна не только генерация ответа, но и сам маршрут до результата: как он построен, как исполняется, где проверяется и как сопровождается."
      />

      <NarrativeBand
        title="Как workflow помогает масштабированию"
        description="Workflow превращает отдельные удачные эксперименты в повторяемые рабочие сценарии, которые можно тиражировать на другие подразделения и процессы."
        body="Это делает controlled rollout частью продукта и снижает зависимость от разовых проектных сборок вокруг каждого нового кейса."
      />

      <FinalCtaBlock
        title="Покажем Century Workflow на реальном корпоративном сценарии"
        description="Демо имеет смысл там, где нужно показать не чат, а контролируемый маршрут исполнения с сервисами, policy gates и human review."
        actions={[
          {
            href: "/demo",
            label: "Запросить демо Workflow",
            variant: "primary",
            trackingLabel: "workflow_final_demo",
          },
          {
            href: "/services",
            label: "Открыть сервисы",
            variant: "text",
            trackingLabel: "workflow_final_services",
          },
        ]}
      />
    </>
  );
}
