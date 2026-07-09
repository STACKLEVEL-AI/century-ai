"use client";

import Image from "next/image";
import { useState } from "react";

const modes = [
  {
    step: "01",
    title: "Chat",
    badge: "до 90% рутинных задач",
    description:
      "Внутрикорпоративный чат, где каждый сотрудник работает со своим ИИ-ассистентом. Доступ к внутренним документам и базам знаний без риска утечек за периметр компании. Поиск по корпоративным данным, генерация и редактирование документов, ответы на вопросы в одном окне.",
    visual: "chat",
  },
  {
    step: "02",
    title: "Agentic Automation Workflow",
    badge: "сквозная автоматизация",
    description:
      "ИИ-агенты самостоятельно выполняют многошаговые задачи: планируют, принимают решения и действуют в ваших системах. Один запрос запускает цепочку действий — от сбора данных до готового результата, с контролем человека в ключевых точках.",
    visual: "workflow",
  },
  {
    step: "03",
    title: "Robotic Process Automation",
    badge: "роботизация операций",
    description:
      "Программные роботы повторяют рутинные действия в существующих интерфейсах: переносят данные, заполняют формы, сверяют записи. Автоматизация по чётким правилам — без изменения текущих систем и с предсказуемым результатом.",
    visual: "robotic",
  },
  {
    step: "04",
    title: "Text-to-SQL",
    badge: "процессы под ИИ",
    description:
      "Не автоматизация старого процесса, а его пересборка с нуля вокруг возможностей ИИ. Пересматриваем логику работы целиком, чтобы получить кратный, а не линейный прирост эффективности.",
    visual: "sql",
  },
  {
    step: "05",
    title: "Human-only",
    badge: "зона ответственности человека",
    description:
      "Осознанный выбор оставить задачу за человеком. Там, где важны суждение, эмпатия и личная ответственность, ИИ не применяется — он берёт на себя рутину, освобождая людей для решений, которые нельзя делегировать.",
    visual: "human",
  },
] as const;

type ModeVisual = (typeof modes)[number]["visual"];

function ModeIllustration({ variant }: { variant: ModeVisual }) {
  const imageByVariant: Record<ModeVisual, string> = {
    chat: "/ai-mode-section-image/schema-1.svg",
    workflow: "/ai-mode-section-image/schema-2.svg",
    robotic: "/ai-mode-section-image/schema-3.svg",
    sql: "/ai-mode-section-image/schema-4.svg",
    human: "/ai-mode-section-image/schema-5.svg",
  };

  return (
    <Image
      src={imageByVariant[variant]}
      alt=""
      aria-hidden="true"
      width={350}
      height={216}
      className="h-full max-h-[216px] w-full max-w-[350px] object-contain"
    />
  );
}

export default function AiModesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMode = modes[activeIndex];

  return (
    <section
      id="modes"
      data-landing-section
      className="relative hero-grid flex min-h-[100svh] flex-col bg-white"
    >

      <div className="h-px w-full bg-[var(--color-line)]" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-14 pt-9 sm:px-8 lg:px-[100px] lg:pb-20 lg:pt-8">
        <div className=" w-full max-w-[1440px]">
          <h2 className="max-w-[542px] text-[40px] font-bold leading-[100%] tracking-[2%] text-black">
            Пять режимов работы с ИИ
          </h2>

          <p className="mt-5 max-w-[860px] text-[28px] font-normal leading-[100%] tracking-[0] text-black sm:mt-6">
            Выберите режим: посмотрите, как он устроен и что даёт бизнесу.
          </p>

          <div className="mt-10 flex justify-between gap-8 max-[1040px]:flex-col max-[1040px]:items-center sm:mt-12 lg:mt-14 lg:gap-10">
            <div className="flex h-full w-full max-w-[600px] flex-col border-t border-[#A7A7A7]">
              {modes.map((mode, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={mode.step}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(index)}
                    className={`flex w-full cursor-pointer grid-cols-[82px_minmax(0,1fr)] items-center border-b border-[#A7A7A7] py-5 text-left transition-colors duration-300 sm:grid-cols-[112px_minmax(0,1fr)] sm:py-7 lg:py-[45px] ${
                      isActive ? "text-[#240CFF] font-bold" : "text-black hover:text-[#240CFF] font-normal"
                    }`}
                  >
                    <span className="mr-4 max-h-[34px] max-w-[34px] text-[22px] leading-none tracking-[0] sm:mr-8 sm:text-[26px] lg:mr-[50px] lg:text-[28px]">
                      {mode.step}
                    </span>
                    <span className="min-w-0 text-[22px] leading-[1.08] tracking-[0] sm:text-[26px] lg:text-[32px]">
                      {mode.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <article className="h-full max-h-[640px] min-h-0 w-full max-w-[600px] overflow-hidden rounded-[12px] border border-[#A7A7A7] bg-white lg:min-h-[640px]">
              <div className="flex min-h-[220px] items-center justify-center border-b border-[#A7A7A7] py-8 sm:h-[320px] lg:h-[350px]">
                <div key={activeMode.visual} className="flex media-fade-in h-full w-full items-center justify-center">
                  <ModeIllustration variant={activeMode.visual} />
                </div>
              </div>

              <div className="px-6 pb-8 pt-7 sm:pl-[18px] sm:pr-4 sm:pb-10 sm:pt-8">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[#240CFF]">
                  <span className="text-[24px] font-bold leading-none tracking-[0] sm:text-[28px]">
                    {activeMode.step}
                  </span>
                  <h3 className="min-w-0 text-[26px] font-bold leading-[1.05] tracking-[0] sm:text-[32px]">
                    {activeMode.title}
                  </h3>
                </div>

                <div className="mt-6 inline-flex max-w-full rounded-full border border-[#240CFF] px-4 py-2 text-[14px] font-normal leading-tight tracking-[0] text-[#240CFF] sm:mt-7 sm:px-5 sm:text-[16px]">
                  {activeMode.badge}
                </div>

                <p className="mt-6 max-w-[566px] text-[15px] font-normal leading-[1.4] tracking-[0.02em] text-black sm:mt-7 sm:text-[16px]">
                  {activeMode.description}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
