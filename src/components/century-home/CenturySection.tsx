"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const centurySlides = [
  {
    step: "01",

    title: "Сквозная аналитика",
    lead: "Сводим данные о клиентах из всех источников в один прозрачный профиль.",
    body: "Как общаются, как платят, что пишут в поддержку, как ведут себя в цифровом пространстве: все в одном профиле. Бизнес видит, где узкие места в воронке, что оптимизировать и какое решение принять на данных.",
    tags: ["ROI ПО КАНАЛАМ", "ТОЧКИ ОТТОКА", "РЕШЕНИЕ ПО БЮДЖЕТУ"],
    mediaSrc: "/slider-image/analytics-preview.webp",
  },
  {
    step: "02",
    title: "РАЗГОВОРНЫЙ ИИ",
    lead: "Клиенты и сотрудники получают ответ, без очереди и ожидания.",
    body: "ИИ принимает обращения круглосуточно, отвечает на типовые вопросы, оформляет заявки и передает сложные кейсы человеку. Поддержка перестает заниматься рутиной и занимается тем, где нужен живой специалист.",
    tags: ["ПЕРВАЯ ЛИНИЯ 24/7", "УМНАЯ ЭСКАЛАЦИЯ", "АВТОЗАКРЫТИЕ ОБРАЩЕНИЙ"],
    mediaSrc: "/slider-image/image-2.webp",
  },
  {
    step: "03",
    title: "ПАМЯТЬ КОМПАНИИ",
    lead: "Спрашиваете своими словами, получаете точный ответ со ссылкой на документ.",
    body: "Регламенты, инструкции, договоры, переписка: все знания компании в одном поиске. Новый сотрудник входит в курс за дни, а не за месяцы, и экспертиза не уходит вместе с людьми.",
    tags: ["ОТВЕТ СО ССЫЛКОЙ", "ОНБОРДИНГ ЗА ДНИ", "ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ"],
    mediaSrc: "/slider-image/image-3.webp",
  },
  {
    step: "04",
    title: "ОБЩЕНИЕ С ДАННЫМИ",
    lead: "Вопрос на обычном языке превращаем в точный ответ и готовый дашборд.",
    body: "Оценка последнего звонка, сводка возражений, детали из CRM, следующий шаг по клиенту: спрашиваете в чате, ответ приходит цифрой и дашбордом. Руководитель продаж видит скоринг сделок и риск оттока, СЕО видит прогнозы и сквозные выводы: на что смотреть и какое решение принять.",
    tags: ["СКОРИНГ СДЕЛОК", "ПРОГНОЗЫ ДЛЯ CEO", "РИСК ОТТОКА И LTV"],
    mediaSrc: "/slider-image/image-4.webp",
  },
  {
    step: "05",
    title: "ИИ ПОД КОНТРОЛЕМ",
    lead: "Каждый запрос виден: кто, какая модель, сколько токенов и денег.",
    body: "Логирование по каждому обращению, разграничение доступа, защита от утечек и prompt injection, работа on-premise. Вы управляете тем, что ИИ может и не может делать, и проходите аудит без сюрпризов.",
    tags: ["ДОСТУП ПО РОЛЯМ", "ON-PREMISE", "СТОИМОСТЬ ПО ЗАПРОСУ"],
    mediaSrc: "/slider-image/image-5.webp",
  },
] as const;

const SWIPE_MAX_WIDTH = 1024;
const SWIPE_MIN_DISTANCE = 48;
const SWIPE_DIRECTION_RATIO = 1.2;

function Stepper({
  activeIndex,
  onStepClick,
}: {
  activeIndex: number;
  onStepClick: (index: number) => void;
}) {
  const progress = (activeIndex / (centurySlides.length - 1)) * 100;

  return (
    <div className="relative mx-auto hidden w-full max-w-[1730px] md:block">
      <div className="absolute left-[128px] right-[86px] top-[25px] z-[1] h-px bg-[rgba(17,17,17,0.18)]" />
      <div
        className="absolute left-[124px] top-[25px] z-[1] h-px bg-black transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: `calc((100% - 212px) * ${progress / 100})` }}
      />

      <div className="flex items-start justify-between px-[86px]">
        {centurySlides.map((slide, index) => {
          const isCompleted = index <= activeIndex;
          const isActive = index === activeIndex;

          return (
            <div key={slide.step} className="flex flex-col items-center max-w-[50px] max-h-[50px]">
              <button
                type="button"
                onClick={() => onStepClick(index)}
                aria-label={`Перейти к слайду ${slide.step}`}
                aria-current={isActive ? "step" : undefined}
                className={`flex h-[50px] w-[50px] items-center justify-center rounded-full border text-[20px] leading-none transition-all duration-300 ${
                  isCompleted
                    ? "border-black bg-black text-white z-10"
                    : "border-[rgba(17,17,17,0.35)] z-10 bg-white text-[rgba(17,17,17,0.4)]"
                }`}
              >
                {slide.step}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileSliderNav({
  activeIndex,
  onStepClick,
}: {
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onStepClick: (index: number) => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4 md:hidden">

      <div className="flex min-w-0 items-center justify-center gap-2">
        {centurySlides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.step}
              type="button"
              onClick={() => onStepClick(index)}
              aria-label={`Перейти к слайду ${slide.step}`}
              aria-current={isActive ? "step" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive ? "w-8 bg-[#240CFF]" : "w-2.5 bg-[rgba(17,17,17,0.2)]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

function MediaFrame({
  src,
  alt,
  currentStep,
}: {
  src: string;
  alt: string;
  currentStep: string;
}) {
  return (
    <div className="ml-auto h-full min-h-0 w-full lg:pr-25">
      <div
        key={currentStep}
        className="media-fade-in relative h-full overflow-hidden rounded-[18px] border border-black bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="relative h-full min-h-[240px] w-full bg-[#F7F7F7] sm:min-h-[320px] lg:min-h-[420px] xl:min-h-[480px]">
          <Image src={src} alt={alt} fill className="object-contain object-center" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.03))]" />

          <div className="absolute bottom-5 left-5 rounded-full border border-[rgba(17,17,17,0.1)] bg-white/90 px-4 py-2 text-[12px] text-[#5C5C5C] shadow-[0_8px_18px_rgba(0,0,0,0.06)]">
            {currentStep} / poster / future video
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CenturySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const snapLockRef = useRef(false);
  const swipeStartRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollToSlide = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, centurySlides.length - 1));
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth > SWIPE_MAX_WIDTH || !event.isPrimary) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    swipeStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth > SWIPE_MAX_WIDTH) {
      swipeStartRef.current = null;
      return;
    }

    const start = swipeStartRef.current;
    swipeStartRef.current = null;

    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = start.x - event.clientX;
    const deltaY = start.y - event.clientY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < SWIPE_MIN_DISTANCE || absX < absY * SWIPE_DIRECTION_RATIO) {
      return;
    }

    scrollToSlide(activeIndexRef.current + (deltaX > 0 ? 1 : -1));
  };

  const handlePointerCancel = () => {
    swipeStartRef.current = null;
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ENTRY_THRESHOLD_PX = 120;

    // Старт горизонтального скролла только когда центр секции совпал с центром экрана
    // (получается слишком строго? поставь большее значение, напр. 25)
    const isSectionActive = (direction: number) => {
      const rect = section.getBoundingClientRect();

      if (direction > 0) {
        return rect.top <= ENTRY_THRESHOLD_PX && rect.bottom > ENTRY_THRESHOLD_PX;
      }

      return (
        rect.top <= ENTRY_THRESHOLD_PX &&
        rect.bottom > ENTRY_THRESHOLD_PX
      );
    };

    const snapSectionIntoPlace = () => {
      const rect = section.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top;

      if (Math.abs(targetTop - window.scrollY) < 1) return;

      snapLockRef.current = true;
      window.scrollTo({ top: targetTop, behavior: "auto" });

      window.setTimeout(() => {
        snapLockRef.current = false;
      }, 80);
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      if (!isSectionActive(direction)) return;

      const currentIndex = activeIndexRef.current;
      const isFirstSlide = currentIndex === 0;
      const isLastSlide = currentIndex === centurySlides.length - 1;

      const canLeaveSection =
        (direction < 0 && isFirstSlide) || (direction > 0 && isLastSlide);

      if (canLeaveSection) return;

      event.preventDefault();
      event.stopPropagation();

      if (snapLockRef.current || wheelLockRef.current) return;

      snapSectionIntoPlace();

      const nextIndex = currentIndex + direction;
      wheelLockRef.current = true;
      scrollToSlide(nextIndex);

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 720);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative hero-grid flex flex-col overflow-hidden pb-16 sm:pb-24 lg:pb-[235px]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">

        <div className="h-px w-full bg-[var(--color-line)]" />

        <div className="hero-grid flex min-h-0 flex-1 flex-col px-5 pb-5 pt-5 sm:px-8 lg:px-0 lg:pb-6 lg:pt-27">
          <Stepper activeIndex={activeIndex} onStepClick={scrollToSlide} />

          <div
            className="no-scrollbar mt-8 w-full touch-pan-y select-none overflow-hidden lg:mt-[85px]"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div
              className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {centurySlides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <article
                    key={slide.step}
                    className={`grid h-full min-h-0 w-full shrink-0 gap-8 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-[600px] lg:grid-cols-[480px_minmax(0,1fr)] lg:items-start lg:gap-14 xl:grid-cols-[520px_minmax(0,1fr)] xl:gap-20 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                      <div className="flex h-full justify-between min-h-[370px] flex-col pt-0 lg:overflow-hidden lg:pl-25 max-sm:min-h-[483px]">
                      <div className="overflow-visible lg:overflow-hidden">
                        <h2 className="max-w-[560px] text-[34px] font-bold uppercase leading-[1.02] tracking-[0] text-[#240CFF] sm:text-[44px] lg:max-w-[335px] lg:text-[56px]">
                          {slide.title}
                        </h2>

                        <p className="mt-7 max-w-[520px] text-[22px] font-normal leading-[1.12] tracking-[0.1px] text-black sm:text-[24px] lg:mt-[40px] lg:max-w-[400px] xl:mt-10 xl:text-[28px]">
                          {slide.lead}
                        </p>

                        <p className="mt-6 max-w-[560px] h-full min-h-[96px] text-[15px] font-light leading-6 tracking-[0.5] text-[#4F4F4F] lg:mt-10 lg:max-w-[392px] xl:mt-10 xl:text-[16px]">
                          {slide.body}
                        </p>
                      </div>

                      <div className="mt-8 flex max-w-[520px] shrink-0 flex-wrap gap-3 lg:mt-auto">
                        {slide.tags.map((tag) => (
                          <span
                            key={tag}
                            className="max-w-full rounded-full border border-[#3028FF] px-4 py-3 text-[12px] font-bold uppercase leading-none tracking-[0] text-[#240CFF] sm:text-[14px] xl:px-6 xl:py-4"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <MediaFrame
                      src={slide.mediaSrc}
                      alt={slide.title}
                      currentStep={slide.step}
                    />
                  </article>
                );
              })}
            </div>
          <MobileSliderNav
            activeIndex={activeIndex}
            onPrevious={() => scrollToSlide(activeIndex - 1)}
            onNext={() => scrollToSlide(activeIndex + 1)}
            onStepClick={scrollToSlide}
          />
          </div>
        </div>
      </div>
    </section>
  );
}

