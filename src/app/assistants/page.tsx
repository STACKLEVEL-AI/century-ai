import {
  FinalCtaBlock,
  NarrativeBand,
  PageHero,
  PreviewBoard,
  TextColumnsSection,
} from "@/components/site/Sections";
import { createPageMetadata } from "@/lib/site";

const assistantSections = [
  {
    title: "Пользовательские ассистенты",
    text: "Century поддерживает рабочих корпоративных ассистентов для знаний, регламентов, документов, операций и контрольных функций.",
    bullets: [
      "Работа по ролевой модели доступа",
      "Ответы с цитатами и маршрутами исполнения",
      "Включение в единый административный контур",
    ],
  },
  {
    title: "Многоагентные сценарии",
    text: "Платформа объединяет несколько ролей и шагов исполнения в одном маршруте: retrieve, extraction, policy check, model step, human review.",
    bullets: [
      "Разделение ролей по сценарию",
      "Ветвление логики и контрольные узлы",
      "Прозрачный runtime для сопровождения",
    ],
  },
  {
    title: "Сценарии по знаниям и документам",
    text: "Ассистенты работают с внутренними политиками, договорами, закупочными пакетами, отчётами и документными коллекциями.",
    bullets: [
      "Knowledge assistants",
      "Document agents",
      "Retrieval с учётом доступа",
    ],
  },
  {
    title: "Сценарии по рискам и операциям",
    text: "Century подходит для сценариев, где нужен контроль не только над ответом, но и над доказательной структурой, SLA и маршрутизацией.",
    bullets: [
      "Комплаенс и доказательства",
      "Операционные отчёты и intake",
      "Контроль исполнения и эскалаций",
    ],
  },
  {
    title: "Связь с workflow, сервисами и доступом",
    text: "Ассистенты не существуют отдельно: они используют сервисный каталог, workflow и административный контур Century как общую execution-среду.",
    bullets: [
      "Workflow как маршрут исполнения",
      "Service modules как функциональные блоки",
      "Access-aware ответы и audit trail",
    ],
  },
];

export const metadata = createPageMetadata({
  title: "Ассистенты и сценарии Century",
  description:
    "Ассистенты и многоагентные сценарии Century: от помощника по политикам до многошаговых процессов с документами, сервисами и контролируемым исполнением.",
  path: "/assistants",
});

export default function AssistantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Ассистенты"
        title="Ассистенты и многоагентные сценарии Century"
        description="От помощника по политикам до многошаговых агентных процессов с документами, сервисами и контрольными шагами."
        badges={["Knowledge assistants", "Document agents", "Compliance", "Operations"]}
        actions={[
          {
            href: "/demo",
            label: "Запросить демо",
            variant: "primary",
            trackingLabel: "assistants_demo",
          },
          {
            href: "/workflow",
            label: "Открыть Workflow",
            variant: "secondary",
            trackingLabel: "assistants_workflow",
          },
        ]}
      >
        <PreviewBoard
          eyebrow="Agentic execution"
          title="Рабочие роли"
          items={[
            "Агент знаний по регламентам",
            "Агент документов",
            "Агент комплаенса",
            "Агент операций",
            "Human review",
          ]}
          footer="Ассистенты Century масштабируются через воспроизводимые рабочие сценарии."
        />
      </PageHero>

      <TextColumnsSection
        title="Ассистенты и агентные процессы как продуктовый слой"
        description="Century раскрывает ассистентов отдельно от security narrative и показывает их как самостоятельную execution-возможность платформы."
        columns={assistantSections}
      />

      <NarrativeBand
        title="Единица масштабирования — сценарий, а не отдельный чат"
        description="Платформа сильна там, где один удачный помощник нужно превратить в контролируемый набор корпоративных сценариев для разных команд."
        body="Workflow, сервисный каталог, observability и governance делают этот переход системным, а не штучным."
      />

      <FinalCtaBlock
        title="Покажем ассистентов Century на сценарии знаний, документов или операций"
        description="Демо имеет смысл тогда, когда ассистент показан как часть общей product-системы с workflow, сервисами, доступом и audit trail."
        actions={[
          {
            href: "/demo",
            label: "Запросить демо",
            variant: "primary",
            trackingLabel: "assistants_final_demo",
          },
          {
            href: "/services",
            label: "Открыть сервисы",
            variant: "text",
            trackingLabel: "assistants_final_services",
          },
        ]}
      />
    </>
  );
}
