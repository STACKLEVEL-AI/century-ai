"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function revealBetween(progress: number, start: number, end: number) {
  return clamp((progress - start) / Math.max(end - start, 0.001));
}

function ScrollRevealLine({
  text,
  progress,
  start,
  end,
  className,
}: {
  text: string;
  progress: number;
  start: number;
  end: number;
  className?: string;
}) {
  const characters = Array.from(text);
  const step = (end - start) / Math.max(characters.length + 3, 1);
  const duration = Math.max(step * 4, 0.04);

  return (
    <span className={className} aria-hidden="true">
      {characters.map((character, index) => {
        const localProgress = revealBetween(
          progress,
          start + index * step,
          start + index * step + duration,
        );

        return (
          <span
            key={`${character}-${index}`}
            className="cases-intro-slide__char"
            style={{
              opacity: localProgress,
              filter: `blur(${(1 - localProgress) * 5}px)`,
              transform: `translateY(${(1 - localProgress) * 0.5}em)`,
            }}
          >
            {character === " " ? "\u00a0" : character}
          </span>
        );
      })}
    </span>
  );
}

export default function CasesIntroSection() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].casesIntro;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const nextProgress = reduceMotion ? 1 : clamp(-rect.top / travel);

      setProgress((current) =>
        Math.abs(current - nextProgress) > 0.001 ? nextProgress : current,
      );
    };

    const queueUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, []);

  const eyebrowProgress = revealBetween(progress, 0, 0.08);
  const descriptionProgress = revealBetween(progress, 0.72, 0.92);

  return (
    <section
      id="cases-intro"
      ref={sectionRef}
      data-landing-section
      data-nav-section="cases"
      data-slide-scroll-section
      className="cases-intro-slide hero-grid w-full bg-white"
    >
      <div className="cases-intro-slide__sticky">
        <div className="cases-intro-slide__shell mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-5 pb-10 pt-16 sm:px-8 sm:pt-24 lg:px-[100px] lg:pb-[100px] lg:pt-[100px]">
          <div
            className="cases-intro-slide__eyebrow flex items-center gap-3 text-[14px] font-medium uppercase leading-none tracking-[0] text-[#868686]"
            style={{
              opacity: eyebrowProgress,
              transform: `translateY(${(1 - eyebrowProgress) * 14}px)`,
            }}
          >
            <span className="h-[10px] w-[10px] shrink-0 bg-[#240CFF]" />
            <span>{copy.eyebrow}</span>
          </div>

          <div className="flex flex-1 items-center justify-center py-14 sm:py-16 lg:-mt-14 lg:py-0">
            <div className="w-full text-center">
              <h2
                className="cases-intro-slide__title text-[clamp(54px,12vw,160px)] font-bold leading-[0.9] tracking-[0] text-black"
                aria-label={`${copy.titleOne} ${copy.titleTwo}`}
              >
                <ScrollRevealLine
                  className="cases-intro-slide__line"
                  text={copy.titleOne}
                  progress={progress}
                  start={0.04}
                  end={0.34}
                />
                <ScrollRevealLine
                  className="cases-intro-slide__line text-[#240CFF]"
                  text={copy.titleTwo}
                  progress={progress}
                  start={0.39}
                  end={0.68}
                />
              </h2>

              <p
                className="cases-intro-slide__description mx-auto mt-9 max-w-[850px] text-[20px] font-normal leading-[1.2] tracking-[0] text-[#868686] sm:mt-12 sm:text-[22px] lg:mt-[81px] lg:text-[26px]"
                style={{
                  opacity: descriptionProgress,
                  filter: `blur(${(1 - descriptionProgress) * 4}px)`,
                  transform: `translateY(${(1 - descriptionProgress) * 18}px)`,
                }}
              >
                {copy.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
