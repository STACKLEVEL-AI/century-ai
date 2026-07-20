"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";

function TypedPhrase({
  text,
  active,
  characterDelay,
  className,
}: {
  text: string;
  active: boolean;
  characterDelay: number;
  className?: string;
}) {
  let characterIndex = 0;
  const characterCount = Array.from(text.replaceAll(" ", "")).length;

  return (
    <span
      className={`cases-intro-slide__phrase${active ? " is-typing" : ""}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {text.split(" ").map((word, wordIndex) => (
        <span className="cases-intro-slide__word" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((character) => {
            const index = characterIndex;
            characterIndex += 1;

            return (
              <span
                key={`${character}-${index}`}
                className="cases-intro-slide__char"
                style={
                  {
                    "--char-index": index,
                    "--char-reverse-index": characterCount - index - 1,
                    "--char-delay": `${characterDelay}ms`,
                  } as CSSProperties
                }
              >
                {character}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function getStage(progress: number) {
  if (progress >= 0.66) return 3;
  if (progress >= 0.4) return 2;
  if (progress >= 0.02) return 1;
  return 0;
}

export default function CasesIntroSection() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].casesIntro;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateStage = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const nextStage = reduceMotion ? 3 : getStage(progress);

      setStage((current) => (current === nextStage ? current : nextStage));
    };

    const queueUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateStage);
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
            className={`cases-intro-slide__eyebrow${stage >= 1 ? " is-visible" : ""} flex items-center gap-3 text-[14px] font-medium uppercase leading-none tracking-[0] text-[#868686]`}
          >
            <span className="h-[10px] w-[10px] shrink-0 bg-[#240CFF]" />
            <span>{copy.eyebrow}</span>
          </div>

          <div className="flex flex-1 items-center justify-center py-14 sm:py-16 lg:-mt-14 lg:py-0">
            <div className="w-full text-center">
              <h2
                className="cases-intro-slide__title text-[clamp(54px,12vw,160px)] font-bold leading-[0.9] tracking-[0] text-black"
                aria-label={`${copy.titleOne} ${copy.titleTwo}`}
                data-locale={locale}
              >
                <TypedPhrase
                  className="cases-intro-slide__line"
                  text={copy.titleOne}
                  active={stage >= 1}
                  characterDelay={52}
                />
                {locale === "en" ? <span aria-hidden="true"> </span> : null}
                <TypedPhrase
                  className="cases-intro-slide__line text-[#240CFF]"
                  text={copy.titleTwo}
                  active={stage >= 2}
                  characterDelay={58}
                />
              </h2>

              <p
                className="cases-intro-slide__description mx-auto mt-9 max-w-[850px] text-[20px] font-normal leading-[1.2] tracking-[0] text-[#868686] sm:mt-12 sm:text-[22px] lg:mt-[81px] lg:text-[26px]"
                aria-label={copy.description}
              >
                <TypedPhrase
                  text={copy.description}
                  active={stage >= 3}
                  characterDelay={14}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
