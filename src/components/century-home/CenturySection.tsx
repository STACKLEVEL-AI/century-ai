"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

const SLIDE_VIDEO_SRC = "/slider-image/video/communicating_with_data.mp4";

const centurySlides = [
  {
    step: "01",

    title: "Сквозная аналитика",
    lead: "Сводим данные о клиентах из всех источников в один прозрачный профиль.",
    body: "Как общаются, как платят, что пишут в поддержку, как ведут себя в цифровом пространстве: все в одном профиле. Бизнес видит, где узкие места в воронке, что оптимизировать и какое решение принять на данных.",
    tags: ["ROI ПО КАНАЛАМ", "ТОЧКИ ОТТОКА", "РЕШЕНИЕ ПО БЮДЖЕТУ"],
    mediaSrc: SLIDE_VIDEO_SRC,
  },
  {
    step: "02",
    title: "РАЗГОВОРНЫЙ ИИ",
    lead: "Клиенты и сотрудники получают ответ, без очереди и ожидания.",
    body: "ИИ принимает обращения круглосуточно, отвечает на типовые вопросы, оформляет заявки и передает сложные кейсы человеку. Поддержка перестает заниматься рутиной и занимается тем, где нужен живой специалист.",
    tags: ["ПЕРВАЯ ЛИНИЯ 24/7", "УМНАЯ ЭСКАЛАЦИЯ", "АВТОЗАКРЫТИЕ ОБРАЩЕНИЙ"],
    mediaSrc: SLIDE_VIDEO_SRC,
  },
  {
    step: "03",
    title: "ПАМЯТЬ КОМПАНИИ",
    lead: "Спрашиваете своими словами, получаете точный ответ со ссылкой на документ.",
    body: "Регламенты, инструкции, договоры, переписка: все знания компании в одном поиске. Новый сотрудник входит в курс за дни, а не за месяцы, и экспертиза не уходит вместе с людьми.",
    tags: ["ОТВЕТ СО ССЫЛКОЙ", "ОНБОРДИНГ ЗА ДНИ", "ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ"],
    mediaSrc: SLIDE_VIDEO_SRC,
  },
  {
    step: "04",
    title: "ОБЩЕНИЕ С ДАННЫМИ",
    lead: "Вопрос на обычном языке превращаем в точный ответ и готовый дашборд.",
    body: "Оценка последнего звонка, сводка возражений, детали из CRM, следующий шаг по клиенту: спрашиваете в чате, ответ приходит цифрой и дашбордом. Руководитель продаж видит скоринг сделок и риск оттока, СЕО видит прогнозы и сквозные выводы: на что смотреть и какое решение принять.",
    tags: ["СКОРИНГ СДЕЛОК", "ПРОГНОЗЫ ДЛЯ CEO", "РИСК ОТТОКА И LTV"],
    mediaSrc: SLIDE_VIDEO_SRC,
  },
  {
    step: "05",
    title: "ИИ ПОД КОНТРОЛЕМ",
    lead: "Каждый запрос виден: кто, какая модель, сколько токенов и денег.",
    body: "Логирование по каждому обращению, разграничение доступа, защита от утечек и prompt injection, работа on-premise. Вы управляете тем, что ИИ может и не может делать, и проходите аудит без сюрпризов.",
    tags: ["ДОСТУП ПО РОЛЯМ", "ON-PREMISE", "СТОИМОСТЬ ПО ЗАПРОСУ"],
    mediaSrc: SLIDE_VIDEO_SRC,
  },
] as const;

const SWIPE_MAX_WIDTH = 1024;
const SWIPE_MIN_DISTANCE = 48;
const SWIPE_DIRECTION_RATIO = 1.2;
const HEADER_SUPPRESS_CLASS = "century-slider-active";
const SECTION_ENTRY_THRESHOLD_PX = 120;
const SECTION_ALIGN_TOLERANCE_PX = 2;
const SCROLL_SNAP_DURATION_SECONDS = { min: 0.2, max: 0.55 };
const SLIDE_TRANSITION_MS = 920;
const SLIDE_SWITCH_DELAY_MS = 300;
const SLIDE_TRANSITION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const LANDING_SLIDER_INDEX_RESTORE_KEY = "century:landing-slider-index";

type SliderScrollTrigger = {
  start: number;
  end: number;
  progress: number;
  kill: () => void;
};

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
        className="absolute left-[124px] top-[25px] z-[1] h-px bg-black transition-[width]"
        style={{
          width: `calc((100% - 212px) * ${progress / 100})`,
          transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
          transitionTimingFunction: SLIDE_TRANSITION_EASE,
        }}
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
  isActive,
}: {
  src: string;
  alt: string;
  currentStep: string;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isActive]);

  return (
    <div className="ml-auto h-full min-h-0 max-h-[554px] w-full lg:pr-25">
      <div
        key={currentStep}
        className="media-fade-in relative h-full overflow-hidden rounded-[18px] border border-black bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="relative h-full min-h-[240px] w-full bg-[#F7F7F7] sm:min-h-[320px] lg:min-h-[420px] xl:min-h-[480px]">
          <video
            ref={videoRef}
            aria-label={alt}
            autoPlay={isActive}
            loop
            muted
            playsInline
            preload={isActive ? "auto" : "metadata"}
            className="absolute inset-0 h-full w-full object-fill"
          >
            <source src={src} type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.03))]" />
        </div>
      </div>
    </div>
  );
}

export default function CenturySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sliderTriggerRef = useRef<SliderScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const swipeStartRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDisplayedIndex(activeIndex);
    }, SLIDE_SWITCH_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const sectionEnd = sectionTop + Math.max(window.innerHeight, section.offsetHeight);
    const currentY = window.scrollY;
    const isInsideSliderRange =
      currentY >= sectionTop - SECTION_ALIGN_TOLERANCE_PX &&
      currentY <= sectionEnd + SECTION_ALIGN_TOLERANCE_PX;

    if (!isInsideSliderRange) return;

    sessionStorage.setItem(LANDING_SLIDER_INDEX_RESTORE_KEY, String(activeIndex));
  }, [activeIndex]);

  const scrollToSlide = useCallback((index: number, syncScrollPosition = true) => {
    const nextIndex = Math.max(0, Math.min(index, centurySlides.length - 1));
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);

    if (!syncScrollPosition || window.innerWidth <= SWIPE_MAX_WIDTH) return;

    const trigger = sliderTriggerRef.current;
    if (!trigger) return;

    const progress = nextIndex / (centurySlides.length - 1);
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: "smooth",
    });
  }, []);

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

    let frame = 0;

    const updateHeaderSuppression = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const suppressThreshold = Math.max(
        SECTION_ENTRY_THRESHOLD_PX,
        Math.round(window.innerHeight * 0.35),
      );
      const trigger = sliderTriggerRef.current;
      const shouldSuppressHeader = trigger
        ? window.scrollY >= trigger.start - SECTION_ALIGN_TOLERANCE_PX &&
          window.scrollY <= trigger.end + SECTION_ALIGN_TOLERANCE_PX
        : rect.top <= suppressThreshold && rect.bottom > SECTION_ENTRY_THRESHOLD_PX;

      document.body.classList.toggle(HEADER_SUPPRESS_CLASS, shouldSuppressHeader);
    };

    const queueHeaderSuppressionUpdate = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(updateHeaderSuppression);
    };

    queueHeaderSuppressionUpdate();
    window.addEventListener("scroll", queueHeaderSuppressionUpdate, { passive: true });
    window.addEventListener("resize", queueHeaderSuppressionUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      document.body.classList.remove(HEADER_SUPPRESS_CLASS);
      window.removeEventListener("scroll", queueHeaderSuppressionUpdate);
      window.removeEventListener("resize", queueHeaderSuppressionUpdate);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isMounted = true;
    let cleanupDesktopSlider: (() => void) | null = null;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const lastSlideIndex = centurySlides.length - 1;
      const desktopMediaQuery = window.matchMedia(`(min-width: ${SWIPE_MAX_WIDTH + 1}px)`);
      let sliderTrigger: SliderScrollTrigger | null = null;

      const setupDesktopSlider = () => {
        sliderTrigger?.kill();
        sliderTrigger = null;
        sliderTriggerRef.current = null;

        if (!desktopMediaQuery.matches) return;

        sliderTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * lastSlideIndex}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / lastSlideIndex,
            duration: SCROLL_SNAP_DURATION_SECONDS,
            delay: 0.05,
            ease: "power2.out",
          },
          onUpdate: (trigger) => {
            scrollToSlide(Math.round(trigger.progress * lastSlideIndex), false);
          },
        });

        sliderTriggerRef.current = sliderTrigger;
        scrollToSlide(Math.round(sliderTrigger.progress * lastSlideIndex), false);
        ScrollTrigger.refresh();
      };

      setupDesktopSlider();
      desktopMediaQuery.addEventListener("change", setupDesktopSlider);

      cleanupDesktopSlider = () => {
        desktopMediaQuery.removeEventListener("change", setupDesktopSlider);
        sliderTrigger?.kill();
        sliderTriggerRef.current = null;
      };
    })();

    return () => {
      isMounted = false;
      cleanupDesktopSlider?.();
      sliderTriggerRef.current = null;
    };
  }, [scrollToSlide]);

  return (
    <section
      id="cases"
      ref={sectionRef}
      data-landing-section
      data-nav-section="cases"
      className="relative hero-grid flex flex-col overflow-hidden pb-16 sm:pb-24 lg:pb-[235px]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
        <div className="h-px w-full bg-[var(--color-line)]" />

        <div className="hero-grid flex min-h-0 flex-1 flex-col px-5 pt-5 sm:px-8 lg:px-0">
          <Stepper activeIndex={activeIndex} onStepClick={scrollToSlide} />

          <div
            className="no-scrollbar mt-8 w-full touch-pan-y select-none overflow-hidden lg:mt-[85px]"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div
              className="flex h-full transform-gpu will-change-transform transition-transform"
              style={{
                transform: `translateX(-${displayedIndex * 100}%)`,
                transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
                transitionTimingFunction: SLIDE_TRANSITION_EASE,
              }}
            >
              {centurySlides.map((slide, index) => {
                const isActive = index === displayedIndex;

                return (
                  <article
                    key={slide.step}
                    className={`grid h-full min-h-0 w-full shrink-0 gap-8 will-change-opacity transition-opacity lg:min-h-[600px] lg:grid-cols-[480px_minmax(0,1fr)] lg:items-start lg:gap-14 xl:grid-cols-[520px_minmax(0,1fr)] xl:gap-20 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
                      transitionTimingFunction: SLIDE_TRANSITION_EASE,
                    }}
                  >
                    <div className="flex h-full justify-between min-h-[370px] max-h-[554px] flex-col pt-0 lg:overflow-hidden lg:pl-25 max-sm:min-h-[483px]">
                      <div className="flex flex-col justify-between overflow-visible lg:overflow-hidden">
                        <h2 className="max-w-[560px] text-[34px] font-bold uppercase leading-[100%] tracking-[0.03em] text-[#240CFF] sm:text-[40px] lg:max-w-[335px] lg:text-[40px]">
                          {slide.title}
                        </h2>

                        <p className="mt-7 max-w-[520px] text-[22px] font-normal leading-[30px] tracking-[0.02em] text-black sm:text-[24px] lg:mt-[40px] lg:max-w-[400px] xl:mt-10 xl:text-[28px]">
                          {slide.lead}
                        </p>

                        <p className=" max-w-[560px] h-full min-h-[96px] text-[16px] font-normal leading-[22px] tracking-[0.002em] text-[#4F4F4F] lg:mt-5 lg:max-w-[392px]">
                          {slide.body}
                        </p>
                      </div>

                      <div className="mt-8 flex max-w-[520px] shrink-0 flex-wrap gap-3 lg:mt-auto">
                        {slide.tags.map((tag) => (
                          <span
                            key={tag}
                            className="max-w-full rounded-[20px] border border-[#3028FF] px-[9px] py-[6px] text-[12px] font-bold uppercase leading-[24px] tracking-[0.02em] text-[#240CFF] sm:text-[14px]"
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
                      isActive={isActive}
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
