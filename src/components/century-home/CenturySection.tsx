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
const HEADER_SUPPRESS_CLASS = "century-slider-active";
const SECTION_ENTRY_THRESHOLD_PX = 120;
const SECTION_ALIGN_TOLERANCE_PX = 2;
const ENTRY_WHEEL_LOCK_MS = 640;
const ENTRY_ABSORB_IDLE_MS = 680;
const SLIDE_TRANSITION_MS = 920;
const SLIDE_TRANSITION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SLIDE_WHEEL_LOCK_MS = SLIDE_TRANSITION_MS + 120;
const SLIDER_RELEASE_LOCK_MS = 520;
const EDGE_RELEASE_IDLE_SECONDS = 0.42;
const ANCHOR_NAVIGATION_BYPASS_MS = 1200;
const LANDING_SCROLL_RESTORE_KEY = "century:landing-scroll-y";
const LANDING_SLIDER_INDEX_RESTORE_KEY = "century:landing-slider-index";
const LANDING_SCROLL_RESTORE_DELAYS_MS = [0, 120, 320, 700] as const;

type SliderObserver = {
  deltaY: number;
  event: Event;
  disable: () => void;
  enable: () => SliderObserver;
  kill: () => void;
};

type SliderScrollTrigger = {
  start: number;
  end: number;
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
}: {
  src: string;
  alt: string;
  currentStep: string;
}) {
  return (
    <div className="ml-auto h-full min-h-0 max-h-[554px] w-full lg:pr-25">
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
  const swipeStartRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
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

    let frame = 0;

    const updateHeaderSuppression = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const suppressThreshold = Math.max(
        SECTION_ENTRY_THRESHOLD_PX,
        Math.round(window.innerHeight * 0.35),
      );
      const shouldSuppressHeader =
        rect.top <= suppressThreshold && rect.bottom > SECTION_ENTRY_THRESHOLD_PX;

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

    let cleanupGsap: (() => void) | null = null;
    let gestureLockTimer: number | null = null;
    let entryAbsorbTimer: number | null = null;
    let releaseLockTimer: number | null = null;
    let isMounted = true;
    let anchorNavigationBypassUntil = 0;
    let forceReleaseCurrentSlider: (() => void) | null = null;
    let hasUserScrollIntent = false;
    let scrollRestoreFrame = 0;
    let scrollRestoreTimers: number[] = [];
    let saveScrollFrame = 0;
    let restoreCompletionTimer: number | null = null;
    let canSaveScrollPosition = false;
    const previousScrollRestoration = window.history.scrollRestoration;

    const isAnchorNavigationBypassed = () => Date.now() < anchorNavigationBypassUntil;
    const handleAnchorNavigationStart = () => {
      anchorNavigationBypassUntil = Date.now() + ANCHOR_NAVIGATION_BYPASS_MS;
      forceReleaseCurrentSlider?.();
    };
    const isInsideSliderRange = () => {
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const sectionEnd = sectionTop + Math.max(window.innerHeight, section.offsetHeight);
      const currentY = window.scrollY;

      return (
        currentY >= sectionTop - SECTION_ALIGN_TOLERANCE_PX &&
        currentY <= sectionEnd + SECTION_ALIGN_TOLERANCE_PX
      );
    };
    const saveScrollPosition = () => {
      sessionStorage.setItem(LANDING_SCROLL_RESTORE_KEY, String(window.scrollY));

      if (isInsideSliderRange()) {
        sessionStorage.setItem(
          LANDING_SLIDER_INDEX_RESTORE_KEY,
          String(activeIndexRef.current),
        );
        return;
      }

      sessionStorage.removeItem(LANDING_SLIDER_INDEX_RESTORE_KEY);
    };
    const queueScrollPositionSave = () => {
      if (!canSaveScrollPosition) return;
      if (saveScrollFrame) return;

      saveScrollFrame = window.requestAnimationFrame(() => {
        saveScrollFrame = 0;
        saveScrollPosition();
      });
    };
    const clearPendingScrollRestore = () => {
      if (scrollRestoreFrame) {
        window.cancelAnimationFrame(scrollRestoreFrame);
        scrollRestoreFrame = 0;
      }

      if (saveScrollFrame) {
        window.cancelAnimationFrame(saveScrollFrame);
        saveScrollFrame = 0;
      }

      if (restoreCompletionTimer !== null) {
        window.clearTimeout(restoreCompletionTimer);
        restoreCompletionTimer = null;
      }

      scrollRestoreTimers.forEach((timer) => window.clearTimeout(timer));
      scrollRestoreTimers = [];
    };
    const finishScrollRestore = () => {
      canSaveScrollPosition = true;
      queueScrollPositionSave();
    };
    const enableUserScrollIntent = () => {
      hasUserScrollIntent = true;
      clearPendingScrollRestore();
      finishScrollRestore();
    };
    const isScrollCaptureAllowed = () => hasUserScrollIntent;
    const shouldRestoreSavedScroll = () => {
      const navigationEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;

      return (
        navigationEntry?.type === "reload" ||
        navigationEntry?.type === "back_forward"
      );
    };
    const restoreSavedScroll = () => {
      if (!shouldRestoreSavedScroll()) {
        finishScrollRestore();
        return;
      }

      const savedScrollY = Number(sessionStorage.getItem(LANDING_SCROLL_RESTORE_KEY));
      if (!Number.isFinite(savedScrollY)) {
        finishScrollRestore();
        return;
      }

      const savedSlideIndex = Number(sessionStorage.getItem(LANDING_SLIDER_INDEX_RESTORE_KEY));
      if (Number.isFinite(savedSlideIndex)) {
        scrollToSlide(savedSlideIndex);
      }

      const applyScrollRestore = () => {
        if (!isMounted || hasUserScrollIntent) return;

        window.scrollTo({ top: savedScrollY, behavior: "auto" });
      };

      clearPendingScrollRestore();

      scrollRestoreFrame = window.requestAnimationFrame(() => {
        scrollRestoreFrame = window.requestAnimationFrame(() => {
          scrollRestoreFrame = 0;
          applyScrollRestore();
        });
      });

      scrollRestoreTimers = LANDING_SCROLL_RESTORE_DELAYS_MS.map((delay) =>
        window.setTimeout(() => {
          applyScrollRestore();
        }, delay),
      );

      restoreCompletionTimer = window.setTimeout(() => {
        restoreCompletionTimer = null;
        applyScrollRestore();
        finishScrollRestore();
      }, Math.max(...LANDING_SCROLL_RESTORE_DELAYS_MS) + 120);
    };

    const clearGestureLock = () => {
      if (gestureLockTimer !== null) {
        window.clearTimeout(gestureLockTimer);
        gestureLockTimer = null;
      }
    };

    const clearReleaseLock = () => {
      if (releaseLockTimer !== null) {
        window.clearTimeout(releaseLockTimer);
        releaseLockTimer = null;
      }
    };

    const clearEntryAbsorb = () => {
      if (entryAbsorbTimer !== null) {
        window.clearTimeout(entryAbsorbTimer);
        entryAbsorbTimer = null;
      }
    };

    window.addEventListener("century:anchor-navigation-start", handleAnchorNavigationStart);
    window.addEventListener("scroll", queueScrollPositionSave, { passive: true });
    window.addEventListener("wheel", enableUserScrollIntent, { passive: true, capture: true });
    window.addEventListener("touchstart", enableUserScrollIntent, { passive: true, capture: true });
    window.addEventListener("pointerdown", enableUserScrollIntent, { passive: true, capture: true });
    window.addEventListener("keydown", enableUserScrollIntent, { capture: true });
    window.history.scrollRestoration = "manual";

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { Observer }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/Observer"),
      ]);

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger, Observer);

      let interactionObserver: SliderObserver | null = null;
      let entryObserver: SliderObserver | null = null;
      let sliderTrigger: SliderScrollTrigger | null = null;
      let isGestureLocked = false;
      let isCaptured = false;
      let isEntryAbsorbing = false;
      let edgeReleaseReady = false;
      let releaseLockedUntil = 0;
      let releaseLockDirection: 1 | -1 | null = null;

      const lastSlideIndex = centurySlides.length - 1;
      const setHeaderSuppressed = (suppressed: boolean) => {
        document.body.classList.toggle(HEADER_SUPPRESS_CLASS, suppressed);
      };

      const getSliderStart = () =>
        sliderTrigger?.start ?? window.scrollY + section.getBoundingClientRect().top;
      const getSliderEnd = () =>
        sliderTrigger?.end ?? getSliderStart() + Math.max(window.innerHeight, section.offsetHeight);
      const isReleaseLocked = (direction?: 1 | -1) => {
        const locked = performance.now() < releaseLockedUntil;

        if (!locked) return false;

        return direction === undefined || releaseLockDirection === direction;
      };
      const canReleaseSlider = (direction: 1 | -1) =>
        direction < 0
          ? activeIndexRef.current === 0
          : activeIndexRef.current === lastSlideIndex;
      const getViewportEscapeDirection = () => {
        const currentY = window.scrollY;
        const sliderStart = getSliderStart();
        const sliderEnd = getSliderEnd();

        if (currentY < sliderStart - SECTION_ENTRY_THRESHOLD_PX) {
          return -1;
        }

        if (currentY > sliderEnd + SECTION_ENTRY_THRESHOLD_PX) {
          return 1;
        }

        return 0;
      };

      const lockGestures = (durationMs: number) => {
        isGestureLocked = true;
        clearGestureLock();

        gestureLockTimer = window.setTimeout(() => {
          isGestureLocked = false;
          gestureLockTimer = null;
        }, durationMs);
      };

      const lockRelease = (direction: 1 | -1) => {
        releaseLockedUntil = performance.now() + SLIDER_RELEASE_LOCK_MS;
        releaseLockDirection = direction;
        clearReleaseLock();

        releaseLockTimer = window.setTimeout(() => {
          releaseLockedUntil = 0;
          releaseLockDirection = null;
          releaseLockTimer = null;
        }, SLIDER_RELEASE_LOCK_MS);
      };

      const preventGesture = (observer?: SliderObserver | null) => {
        const event = observer?.event;

        if (event?.cancelable) {
          event.preventDefault();
        }

        event?.stopPropagation();
      };

      const stopEntryAbsorb = () => {
        isEntryAbsorbing = false;
        clearEntryAbsorb();
      };

      const refreshEntryAbsorb = () => {
        clearEntryAbsorb();

        entryAbsorbTimer = window.setTimeout(() => {
          stopEntryAbsorb();
        }, ENTRY_ABSORB_IDLE_MS);
      };

      const startEntryAbsorb = () => {
        isEntryAbsorbing = true;
        refreshEntryAbsorb();
      };

      const snapToSlider = (targetSlide?: number) => {
        if (targetSlide !== undefined) {
          scrollToSlide(targetSlide);
        }

        const targetY = getSliderStart();

        if (Math.abs(window.scrollY - targetY) > SECTION_ALIGN_TOLERANCE_PX) {
          window.scrollTo({ top: targetY, behavior: "auto" });
        }
      };

      const holdPinnedPosition = () => {
        if (!isCaptured) return;

        snapToSlider();
      };

      const captureSlider = (entryDirection: 1 | -1, observer?: SliderObserver | null) => {
        if (!isScrollCaptureAllowed()) return;
        if (isReleaseLocked(entryDirection) || isAnchorNavigationBypassed()) return;

        preventGesture(observer);
        isCaptured = true;
        edgeReleaseReady = false;
        setHeaderSuppressed(true);
        interactionObserver?.enable();
        startEntryAbsorb();
        snapToSlider(entryDirection > 0 ? 0 : lastSlideIndex);
        lockGestures(ENTRY_WHEEL_LOCK_MS);
      };

      const recaptureCurrentSlide = () => {
        if (!isScrollCaptureAllowed()) return;
        if (isAnchorNavigationBypassed()) return;

        isCaptured = true;
        edgeReleaseReady = false;
        setHeaderSuppressed(true);
        interactionObserver?.enable();
        startEntryAbsorb();
        snapToSlider();
        lockGestures(ENTRY_WHEEL_LOCK_MS);
      };

      const forceReleaseSlider = () => {
        isCaptured = false;
        isGestureLocked = false;
        stopEntryAbsorb();
        edgeReleaseReady = false;
        releaseLockedUntil = 0;
        releaseLockDirection = null;
        clearGestureLock();
        clearReleaseLock();
        setHeaderSuppressed(false);
        interactionObserver?.disable();
      };

      forceReleaseCurrentSlider = forceReleaseSlider;

      const releaseSlider = (direction: 1 | -1) => {
        if (!canReleaseSlider(direction)) {
          recaptureCurrentSlide();
          return;
        }

        isCaptured = false;
        stopEntryAbsorb();
        edgeReleaseReady = false;
        setHeaderSuppressed(false);
        interactionObserver?.disable();
        lockRelease(direction);

        const targetY =
          direction > 0
            ? getSliderEnd() + SECTION_ENTRY_THRESHOLD_PX
            : Math.max(0, getSliderStart() - SECTION_ENTRY_THRESHOLD_PX);

        window.scrollTo({ top: targetY, behavior: "auto" });
      };

      const handleSlideGesture = (direction: 1 | -1, observer: SliderObserver) => {
        preventGesture(observer);

        if (isEntryAbsorbing) {
          refreshEntryAbsorb();
          snapToSlider();
          return;
        }

        if (isGestureLocked) return;

        const currentIndex = activeIndexRef.current;
        const canMoveInside =
          (direction > 0 && currentIndex < lastSlideIndex) ||
          (direction < 0 && currentIndex > 0);

        if (!canMoveInside) {
          if (!edgeReleaseReady) {
            lockGestures(ENTRY_WHEEL_LOCK_MS);
            return;
          }

          releaseSlider(direction);
          return;
        }

        edgeReleaseReady = false;
        scrollToSlide(currentIndex + direction);
        lockGestures(SLIDE_WHEEL_LOCK_MS);
      };

      const handleEntryGesture = (direction: 1 | -1, observer: SliderObserver) => {
        if (
          isAnchorNavigationBypassed() ||
          isCaptured ||
          isReleaseLocked(direction) ||
          Math.abs(observer.deltaY) < 2
        ) {
          return;
        }

        const currentY = window.scrollY;
        const projectedY = Math.max(0, currentY + observer.deltaY);
        const sliderStart = getSliderStart();
        const sliderEnd = getSliderEnd();
        const enteringFromAbove =
          direction > 0 &&
          currentY < sliderStart - SECTION_ALIGN_TOLERANCE_PX &&
          projectedY >= sliderStart - SECTION_ENTRY_THRESHOLD_PX;
        const enteringFromBelow =
          direction < 0 &&
          currentY > sliderEnd + SECTION_ALIGN_TOLERANCE_PX &&
          projectedY <= sliderEnd + SECTION_ENTRY_THRESHOLD_PX;

        if (enteringFromAbove || enteringFromBelow) {
          captureSlider(direction, observer);
        }
      };

      interactionObserver = Observer.create({
        target: window,
        type: "wheel,touch",
        preventDefault: true,
        tolerance: 12,
        debounce: false,
        onStopDelay: EDGE_RELEASE_IDLE_SECONDS,
        onDown: (observer) => handleSlideGesture(1, observer),
        onUp: (observer) => handleSlideGesture(-1, observer),
        onStop: () => {
          if (isEntryAbsorbing) {
            stopEntryAbsorb();
            return;
          }

          edgeReleaseReady = true;
        },
      });
      interactionObserver.disable();

      entryObserver = Observer.create({
        target: window,
        type: "wheel,touch",
        capture: true,
        debounce: false,
        preventDefault: false,
        passive: false,
        tolerance: 4,
        onDown: (observer) => handleEntryGesture(1, observer),
        onUp: (observer) => handleEntryGesture(-1, observer),
      } as Parameters<typeof Observer.create>[0] & { passive: boolean });

      sliderTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight, section.offsetHeight)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => captureSlider(1),
        onEnterBack: () => captureSlider(-1),
        onLeave: () => {
          if (isAnchorNavigationBypassed()) {
            forceReleaseSlider();
            return;
          }

          if (getViewportEscapeDirection() > 0) {
            forceReleaseSlider();
            return;
          }

          if (!isReleaseLocked(1) || !canReleaseSlider(1)) recaptureCurrentSlide();
        },
        onLeaveBack: () => {
          if (isAnchorNavigationBypassed()) {
            forceReleaseSlider();
            return;
          }

          if (getViewportEscapeDirection() < 0) {
            forceReleaseSlider();
            return;
          }

          if (!isReleaseLocked(-1) || !canReleaseSlider(-1)) recaptureCurrentSlide();
        },
        onUpdate: holdPinnedPosition,
      });

      ScrollTrigger.refresh();
      restoreSavedScroll();

      cleanupGsap = () => {
        clearGestureLock();
        clearEntryAbsorb();
        clearReleaseLock();
        clearPendingScrollRestore();
        interactionObserver?.kill();
        entryObserver?.kill();
        sliderTrigger?.kill();
        setHeaderSuppressed(false);
        forceReleaseCurrentSlider = null;
        window.removeEventListener("century:anchor-navigation-start", handleAnchorNavigationStart);
      };
    })();

    return () => {
      isMounted = false;
      cleanupGsap?.();
      clearGestureLock();
      clearReleaseLock();
      clearPendingScrollRestore();
      forceReleaseCurrentSlider = null;
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("century:anchor-navigation-start", handleAnchorNavigationStart);
      window.removeEventListener("scroll", queueScrollPositionSave);
      window.removeEventListener("wheel", enableUserScrollIntent, true);
      window.removeEventListener("touchstart", enableUserScrollIntent, true);
      window.removeEventListener("pointerdown", enableUserScrollIntent, true);
      window.removeEventListener("keydown", enableUserScrollIntent, true);
      document.body.classList.remove(HEADER_SUPPRESS_CLASS);
    };
  }, []);

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
                transform: `translateX(-${activeIndex * 100}%)`,
                transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
                transitionTimingFunction: SLIDE_TRANSITION_EASE,
              }}
            >
              {centurySlides.map((slide, index) => {
                const isActive = index === activeIndex;

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
