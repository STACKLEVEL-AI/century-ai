import type { ReactNode } from "react";
import Link from "next/link";
import { ActionLink } from "@/components/site/ActionLink";
import DemoRequestForm from "@/components/site/DemoRequestForm";
import type { AccordionItem, FeatureCard, LinkAction } from "@/lib/site-content";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  badges?: string[];
  actions?: LinkAction[];
  children?: ReactNode;
};

type FeatureGridSectionProps = {
  id?: string;
  title: string;
  description: string;
  cards: FeatureCard[];
  note?: string;
  columns?: "two" | "three" | "four";
  className?: string;
  cta?: LinkAction;
};

type WorkflowShowcaseProps = {
  title: string;
  description: string;
  body: string;
  cards: FeatureCard[];
  steps: string[];
  caption: string;
};

type VerifiableAnswersProps = {
  title: string;
  description: string;
  points: string[];
};

type ObservabilityProps = {
  title: string;
  description: string;
  cards: FeatureCard[];
  caption: string;
};

type SecuritySectionProps = {
  title: string;
  description: string;
  cards: FeatureCard[];
  faqs: AccordionItem[];
};

type LayerItem = {
  label: string;
  title: string;
  text: string;
};

type LayerStackSectionProps = {
  title: string;
  description: string;
  layers: LayerItem[];
  note?: string;
};

type TextBlock = {
  title: string;
  text: string;
  bullets?: string[];
};

type TextColumnsSectionProps = {
  title: string;
  description: string;
  columns: TextBlock[];
};

type ServiceDetail = {
  title: string;
  what: string;
  where: string;
  workflow: string;
  why: string;
};

type ServiceDetailSectionsProps = {
  title: string;
  description: string;
  items: ServiceDetail[];
};

type ProcessItem = {
  title: string;
  text: string;
};

type ProcessStripProps = {
  title: string;
  description: string;
  items: ProcessItem[];
};

type NarrativeBandProps = {
  title: string;
  description: string;
  body?: string;
  note?: string;
};

type PreviewBoardProps = {
  eyebrow?: string;
  title: string;
  items: string[];
  footer?: string;
};

type DemoConversionSectionProps = {
  title: string;
  description: string;
  bullets: string[];
  steps: ProcessItem[];
};

function renderAction(action: LinkAction, context: string) {
  const className =
    action.variant === "secondary"
      ? "btn btn-ghost"
      : action.variant === "text"
        ? "btn btn-blue-ghost"
        : "btn btn-blue";

  return (
    <ActionLink
      key={action.label}
      href={action.href}
      className={className}
      trackingLabel={action.trackingLabel}
      trackingContext={context}
    >
      {action.label}
    </ActionLink>
  );
}

function renderFeatureBadges(card: FeatureCard) {
  const badges = card.bullets?.slice(0, 3) ?? [card.title.split(" ")[0], "Century", "Execution"];
  return (
    <ul className="agent-badges" aria-label={card.title}>
      {badges.map((badge) => (
        <li key={badge}>{badge}</li>
      ))}
    </ul>
  );
}

function SectionHead({ title, description }: { title: string; description: string }) {
  return (
    <div className="shell section-head">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function HomeLikeHero({
  eyebrow,
  title,
  description,
  badges,
  actions,
  showcase,
  support,
  footerStrip,
  className,
  introUnderTitle,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  badges?: string[];
  actions?: LinkAction[];
  showcase: ReactNode;
  support?: string;
  footerStrip?: ReactNode;
  className?: string;
  introUnderTitle?: boolean;
}) {
  return (
    <section className={className ? `hero ${className}` : "hero"}>
      <div className="shell hero-layout">
        <div className="hero-copy">
          <div className="hero-main">
            {eyebrow ? <p className="show-type">{eyebrow}</p> : null}
            <h1>{title}</h1>
            {introUnderTitle ? (
              <div className="hero-intro-stack">
                {support ? <p className="hero-lead hero-intro-note">{support}</p> : null}
                {actions?.length ? <div className="hero-actions">{actions.map((action) => renderAction(action, title))}</div> : null}
              </div>
            ) : null}
          </div>
          <div className="hero-sidepanel">
            {introUnderTitle ? <h3 className="hero-sidepanel-title">Единый контур AI-сервисов</h3> : null}
            <p className="hero-lead">{description}</p>
            {!introUnderTitle && actions?.length ? (
              <div className="hero-actions">{actions.map((action) => renderAction(action, title))}</div>
            ) : null}
            {!introUnderTitle && support ? <p className="hero-lead">{support}</p> : null}
            {badges?.length ? (
              <ul className="hero-signals" aria-label="Ключевые сигналы">
                {badges.map((badge) => (
                  <li key={badge}>{badge}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="hero-showcase">{showcase}</div>
      </div>

      {footerStrip ? <div className="shell">{footerStrip}</div> : null}
    </section>
  );
}

export function PreviewBoard({ eyebrow, title, items, footer }: PreviewBoardProps) {
  return (
    <article className="show-card show-card-light preview-board-card">
      {eyebrow ? <p className="show-type">{eyebrow}</p> : null}
      <h3>{title}</h3>
      {footer ? <span>{footer}</span> : null}
      <ul className="agent-badges" aria-label={title}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export function PageHero({ eyebrow, title, description, badges, actions, children }: PageHeroProps) {
  return (
    <HomeLikeHero
      className="hero--page"
      eyebrow={eyebrow}
      title={title}
      description={description}
      badges={badges}
      actions={actions}
      showcase={children ?? <PreviewBoard title={title} items={badges ?? []} />}
    />
  );
}

export function HeroExecutionPlatform({
  eyebrow,
  title,
  description,
  support,
  badges,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  support: string;
  badges: string[];
  actions: LinkAction[];
}) {
  return (
    <HomeLikeHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      support={support}
      badges={badges}
      actions={actions}
      introUnderTitle
      showcase={
        <>
          <article className="show-card show-card-light">
            <p className="show-type">Проверяемые ответы</p>
            <h3>Ответ с цитатами и доступом</h3>
            <span>Источники, role-aware выдача и audit-ready результат.</span>
          </article>
          <article className="show-card show-card-blue">
            <p className="show-type">Century Workflow</p>
            <h3>Многошаговый runtime</h3>
            <span>Ветвление, service modules, policy gate и human review.</span>
          </article>
          <article className="show-card show-card-black">
            <p className="show-type">Каталог сервисов</p>
            <h3>Готовые модули обработки</h3>
            <span>Расшифровка, extraction, anonymization и normalization.</span>
          </article>
          <article className="show-card show-card-light">
            <p className="show-type">Метрики</p>
            <h3>Наблюдаемость и стоимость</h3>
            <span>Нагрузка по моделям, токены, execution log и стоимость.</span>
          </article>
        </>
      }
      footerStrip={
        <div className="stakeholders-inner" aria-label="Ключевые участники программы">
          <p>Ключевые участники</p>
          <div className="stakeholders-marquee">
            <div className="stakeholders-track">
              {[
                "CDTO",
                "CIO",
                "CDO",
                "Информационная безопасность",
                "Риск-офис",
                "Комплаенс",
                "Внутренний аудит",
                "Бизнес-владельцы",
                "CDTO",
                "CIO",
                "CDO",
                "Информационная безопасность",
                "Риск-офис",
                "Комплаенс",
                "Внутренний аудит",
                "Бизнес-владельцы",
              ].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}

function HookGrid({
  cards,
  cta,
  note,
  id,
  title,
  description,
  className,
  columns,
}: FeatureGridSectionProps) {
  return (
    <section id={id} className={`section hooks ${className ?? ""}`.trim()}>
      <SectionHead title={title} description={description} />
      <div
        className={`shell hook-grid${columns === "two" ? " hook-grid--two" : ""}${
          columns === "four" ? " hook-grid--four" : ""
        }`}
      >
        {cards.map((card, index) => (
          <article className="hook-card" key={card.title}>
            <p className="hook-num">{String(index + 1).padStart(2, "0")}</p>
            <div className="hook-content">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {card.meta || card.eyebrow ? <span>{card.meta || card.eyebrow}</span> : null}
              {card.bullets?.length ? (
                <div className="hook-advantages">
                  <div className="advantages-label">Ключевые элементы</div>
                  {card.bullets.map((bullet) => (
                    <p key={bullet} className="advantage-text">
                      {bullet}
                    </p>
                  ))}
                </div>
              ) : null}
              {card.href ? (
                <Link href={card.href} className="agent-workflow-btn">
                  Открыть
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      {note ? <p className="shell section-note-old">{note}</p> : null}
      {cta ? <div className="shell section-actions-old">{renderAction(cta, title)}</div> : null}
    </section>
  );
}

function ConnectorGridSection({
  cards,
  cta,
  note,
  id,
  title,
  description,
  className,
}: FeatureGridSectionProps) {
  return (
    <section id={id} className={`section platform ${className ?? ""}`.trim()}>
      <SectionHead title={title} description={description} />
      <div className="shell platform-panel simple-panel">
        <div className="connectors-head">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="connector-grid">
          {cards.map((card) => (
            <article className="connector-card" key={card.title}>
              <p>{card.title}</p>
              <span>{card.text}</span>
            </article>
          ))}
        </div>
        <div className="architecture-grid">
          {(cards.slice(0, 4) || []).map((card, index) => (
            <article key={`${card.title}-layer`}>
              <p>СЛОЙ {index + 1}</p>
              <h4>{card.title}</h4>
              <span>{card.text}</span>
            </article>
          ))}
        </div>
        <div className="connector-principles">
          <article>
            <h4>Execution</h4>
            <p>{note || "Продуктовый слой исполнения встроен в платформу, а не вынесен во внешний проектный контур."}</p>
          </article>
          <article>
            <h4>Governance</h4>
            <p>Ролевые границы, аудит и допуск к эксплуатации проходят через тот же продуктовый контур.</p>
          </article>
          <article>
            <h4>Rollout</h4>
            <p>Один рабочий сценарий можно переносить в следующий without rebuilding the platform from scratch.</p>
          </article>
        </div>
      </div>
      {cta ? <div className="shell section-actions-old">{renderAction(cta, title)}</div> : null}
    </section>
  );
}

export function FeatureGridSection(props: FeatureGridSectionProps) {
  if (props.columns === "four") {
    return <ConnectorGridSection {...props} />;
  }

  return <HookGrid {...props} />;
}

export function PlatformCapabilitiesGrid(props: FeatureGridSectionProps) {
  return <ConnectorGridSection {...props} className={props.className} />;
}

export function DeploymentModeCards({ title, description, cards, note, id }: FeatureGridSectionProps) {
  return (
    <section id={id} className="section trust">
      <SectionHead title={title} description={description} />
      <div className="shell deployment-grid">
        {cards.map((card, index) => (
          <article className="deployment-card" key={card.title}>
            <span className="deployment-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <span className="deployment-meta">
              {card.meta || "Развёртывание задаётся архитектурой, режимом доступа и требованиями эксплуатации."}
            </span>
          </article>
        ))}
      </div>
      {note ? <p className="shell section-note-old">{note}</p> : null}
    </section>
  );
}

export function WorkflowShowcase({
  title,
  description,
  body,
  cards,
  steps,
  caption,
}: WorkflowShowcaseProps) {
  return (
    <section className="section platform">
      <SectionHead title={title} description={description} />
      <div className="shell platform-panel workflow-panel">
        <div className="connectors-head">
          <h3>Century Workflow</h3>
          <p>{body}</p>
        </div>

        <div className="architecture-grid">
          <article>
            <p>СЛОЙ 1</p>
            <h4>Визуальный конструктор</h4>
            <span>{cards[0]?.text}</span>
          </article>
          <article>
            <p>СЛОЙ 2</p>
            <h4>Совместимость с n8n</h4>
            <span>{cards[1]?.text}</span>
          </article>
          <article>
            <p>СЛОЙ 3</p>
            <h4>Контролируемый runtime</h4>
            <span>{cards[2]?.text}</span>
          </article>
        </div>

        <div className="connector-grid">
          {steps.map((step) => (
            <article className="connector-card" key={step}>
              <p>{step}</p>
              <span>Workflow node в маршруте исполнения Century.</span>
            </article>
          ))}
        </div>
      </div>
      <p className="shell section-note-old">{caption}</p>
    </section>
  );
}

export function ServiceCatalogGrid(props: FeatureGridSectionProps) {
  return <ConnectorGridSection {...props} />;
}

export function VerifiableAnswersSection({ title, description, points }: VerifiableAnswersProps) {
  return (
    <section className="section motion">
      <SectionHead title={title} description={description} />
      <div className="shell brain-board">
        <div className="brain-sources">
          <p className="brain-label">Параметры выдачи</p>
          <ul className="brain-source-list" aria-label="Параметры выдачи">
            {points.map((point, index) => (
              <li key={point} className="source-line">
                <span className="source-line-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="source-line-copy">
                  <strong>{point}</strong>
                  <span>Century связывает ответ с доступом, маршрутом и источником.</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="brain-answer">
          <p className="brain-label">Проверяемый ответ</p>
          <p>
            Ответ Century привязан к источнику, маршруту исполнения, role-aware retrieval и сервисной обработке.
            Это делает результат пригодным для последующей проверки и допуска к реальной эксплуатации.
          </p>
          <div className="answer-trace">
            <div>
              <strong>Role</strong>
              <span>Finance manager</span>
            </div>
            <div>
              <strong>Route</strong>
              <span>retrieve → policy check → response</span>
            </div>
            <div>
              <strong>Source pack</strong>
              <span>4 documents / 2 policy nodes</span>
            </div>
          </div>
          <p className="permission-indicator">Принцип: нет источника — нет утверждения</p>
        </div>
      </div>
    </section>
  );
}

export function AssistantsAndAgentsGrid({ title, description, cards, note }: FeatureGridSectionProps) {
  return (
    <section className="section scenarios">
      <SectionHead title={title} description={description} />
      <div className="shell scenario-panels">
        <article className="scenario-panel is-active">
          <div className="scenario-main">
            <h3>{title}</h3>
            <p className="scenario-intro">{description}</p>
            <div className="agent-grid agent-grid--two">
              {cards.map((card) => (
                <article className="agent-card" key={card.title}>
                  <p className="agent-kicker">{card.title}</p>
                  <p>{card.text}</p>
                  {renderFeatureBadges(card)}
                </article>
              ))}
            </div>
          </div>
          <aside className="scenario-aside">
            <p>Ключевая идея</p>
            <span>{note || "Масштабируется не чат, а воспроизводимый рабочий сценарий."}</span>
          </aside>
        </article>
      </div>
    </section>
  );
}

export function ObservabilityDashboardMock({ title, description, cards, caption }: ObservabilityProps) {
  return (
    <section className="section black-platform">
      <div className="shell black-accent">
        <div className="black-accent-top">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="black-accent-grid">
          {cards.map((card, index) => (
            <article key={card.title}>
              <p>{String(index + 1).padStart(2, "0")}</p>
              <h3>{card.title}</h3>
              <span>{card.text}</span>
              <strong>Century observability</strong>
            </article>
          ))}
        </div>
      </div>
      <p className="shell section-note-old">{caption}</p>
    </section>
  );
}

export function SecurityGovernanceAccordion({ title, description, cards, faqs }: SecuritySectionProps) {
  return (
    <section className="section trust">
      <SectionHead title={title} description={description} />
      <div className="shell security-accordion-grid">
        {cards.map((card, index) => {
          const faq = faqs[index];

          return (
            <details className="security-accordion-card" key={card.title}>
              <summary>
                <span className="security-accordion-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="security-accordion-copy">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </summary>
              {faq ? (
                <div className="security-accordion-body">
                  <p className="security-accordion-question">{faq.question}</p>
                  <p>{faq.answer}</p>
                </div>
              ) : null}
            </details>
          );
        })}
      </div>
    </section>
  );
}

export function CaseCards({ title, description, cards, cta }: FeatureGridSectionProps) {
  return (
    <section className="section scenarios">
      <SectionHead title={title} description={description} />
      <div className="shell scenario-panels">
        <article className="scenario-panel is-active">
          <div className="scenario-main">
            <div className="agent-grid agent-grid--two">
              {cards.map((card) => (
                <article className="agent-card" key={card.title}>
                  <p className="agent-kicker">{card.title}</p>
                  <p>{card.text}</p>
                  {renderFeatureBadges(card)}
                </article>
              ))}
            </div>
          </div>
          {cta ? (
            <aside className="scenario-aside">
              <p>Следующий шаг</p>
              <span>{renderAction(cta, title)}</span>
            </aside>
          ) : null}
        </article>
      </div>
    </section>
  );
}

export function DocsCards(props: FeatureGridSectionProps) {
  return <HookGrid {...props} />;
}

export function CommercialModelsCards({ title, description, cards, note }: FeatureGridSectionProps) {
  return (
    <section className="section scenarios">
      <SectionHead title={title} description={description} />
      <div className="shell build-share-run">
        {cards.map((card) => (
          <article key={card.title}>
            <p>{card.title}</p>
            <span>{card.text}</span>
          </article>
        ))}
      </div>
      {note ? <p className="shell section-note-old">{note}</p> : null}
    </section>
  );
}

export function FinalCtaBlock({
  title,
  description,
  introTitle,
  introDescription,
  introCards,
  introNote,
}: {
  title: string;
  description: string;
  actions: LinkAction[];
  introTitle?: string;
  introDescription?: string;
  introCards?: FeatureCard[];
  introNote?: string;
}) {
  return (
    <section className="section contact">
      <div className="shell final-cta-block">
        {introCards?.length ? (
          <div className="final-cta-header">
            <div className="final-cta-intro">
              <h2>{introTitle}</h2>
              <p>{introDescription}</p>
            </div>
            <div className="final-cta-steps">
              {introCards.map((card, index) => (
                <article key={card.title} className="final-cta-step">
                  <span className="final-cta-step-num">{String(index + 1).padStart(2, "0")}</span>
                  <p>{card.title}</p>
                  <span>{card.text}</span>
                </article>
              ))}
            </div>
            {introNote ? <p className="final-cta-note">{introNote}</p> : null}
          </div>
        ) : null}

        <div className="final-cta-body">
          <div className="contact-copy">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <DemoRequestForm variant="stacklevel" />
        </div>
      </div>
    </section>
  );
}

export function LayerStackSection({ title, description, layers, note }: LayerStackSectionProps) {
  return (
    <section className="section platform">
      <SectionHead title={title} description={description} />
      <div className="shell platform-panel layer-panel-old">
        <div className="connectors-head">
          <h3>Архитектура</h3>
          <p>{description}</p>
        </div>
        <div className="architecture-grid">
          {layers.map((layer) => (
            <article key={layer.label}>
              <p>{layer.label}</p>
              <h4>{layer.title}</h4>
              <span>{layer.text}</span>
            </article>
          ))}
        </div>
        <div className="connector-grid">
          {layers.map((layer) => (
            <article className="connector-card" key={`${layer.label}-mini`}>
              <p>{layer.label}</p>
              <span>{layer.title}</span>
            </article>
          ))}
        </div>
        <div className="connector-principles">
          <article>
            <h4>Execution layer</h4>
            <p>Century соединяет ассистентов, workflow и сервисы как один продуктовый слой исполнения.</p>
          </article>
          <article>
            <h4>Governance layer</h4>
            <p>Безопасность, роли, audit trail и observability проходят через тот же архитектурный контур.</p>
          </article>
          <article>
            <h4>Industrial rollout</h4>
            <p>{note || "Архитектура рассчитана на controlled rollout из первого кейса в портфель сценариев."}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function TextColumnsSection({ title, description, columns }: TextColumnsSectionProps) {
  return (
    <section className="section hooks">
      <SectionHead title={title} description={description} />
      <div className="shell hook-grid">
        {columns.map((column, index) => (
          <article className="hook-card" key={column.title}>
            <p className="hook-num">{String(index + 1).padStart(2, "0")}</p>
            <div className="hook-content">
              <h3>{column.title}</h3>
              <p>{column.text}</p>
              {column.bullets?.length ? (
                <div className="hook-advantages">
                  <div className="advantages-label">Ключевые элементы</div>
                  {column.bullets.map((bullet) => (
                    <p key={bullet} className="advantage-text">
                      {bullet}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServiceDetailSections({ title, description, items }: ServiceDetailSectionsProps) {
  return (
    <section className="section scenarios">
      <SectionHead title={title} description={description} />
      <div className="shell scenario-panels service-panels-old">
        {items.map((item) => (
          <article key={item.title} className="scenario-panel is-active">
            <div className="scenario-main">
              <h3>{item.title}</h3>
              <div className="build-share-run build-share-run--inside">
                <article>
                  <p>Что делает сервис</p>
                  <span>{item.what}</span>
                </article>
                <article>
                  <p>Где используется</p>
                  <span>{item.where}</span>
                </article>
                <article>
                  <p>Как встраивается в workflow</p>
                  <span>{item.workflow}</span>
                </article>
                <article>
                  <p>Почему это важно</p>
                  <span>{item.why}</span>
                </article>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProcessStrip({ title, description, items }: ProcessStripProps) {
  return (
    <section className="section scenarios">
      <SectionHead title={title} description={description} />
      <div className="shell build-share-run">
        {items.map((item) => (
          <article key={item.title}>
            <p>{item.title}</p>
            <span>{item.text}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function NarrativeBand({ title, description, body, note }: NarrativeBandProps) {
  return (
    <section className="section black-platform">
      <div className="shell black-accent">
        <div className="black-accent-top">
          <h2>{title}</h2>
          <p>
            {description}
            {body ? ` ${body}` : ""}
            {note ? ` ${note}` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}

export function DemoConversionSection({
  title,
  description,
  bullets,
  steps,
}: DemoConversionSectionProps) {
  return (
    <section className="section contact">
      <div className="shell build-share-run">
        {steps.map((step) => (
          <article key={step.title}>
            <p>{step.title}</p>
            <span>{step.text}</span>
          </article>
        ))}
      </div>

      <div className="shell contact-layout">
        <div className="contact-copy">
          <h2>{title}</h2>
          <p>{description}</p>
          <ul>
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>

        <DemoRequestForm />
      </div>
    </section>
  );
}
