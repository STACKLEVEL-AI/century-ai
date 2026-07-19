"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";

export default function CasesIntroSection() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].casesIntro;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.42 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cases-intro"
      ref={sectionRef}
      data-landing-section
      data-nav-section="cases"
      className={`cases-intro-slide hero-grid min-h-[100svh] w-full overflow-hidden bg-white${isRevealed ? " is-revealed" : ""}`}
    >
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-5 pb-10 pt-16 sm:px-8 sm:pt-24 lg:px-[100px] lg:pb-[100px] lg:pt-[100px]">
        <div className="cases-intro-slide__eyebrow flex items-center gap-3 text-[14px] font-medium uppercase leading-none tracking-[0] text-[#868686]">
          <span className="h-[10px] w-[10px] shrink-0 bg-[#240CFF]" />
          <span>{copy.eyebrow}</span>
        </div>

        <div className="flex flex-1 items-center justify-center py-14 sm:py-16 lg:-mt-14 lg:py-0">
          <div className="w-full text-center">
            <h2 className="cases-intro-slide__title text-[clamp(54px,12vw,160px)] font-bold leading-[0.9] tracking-[0] text-black">
              <span className="block">{copy.titleOne}</span>
              <span className="block text-[#240CFF]">{copy.titleTwo}</span>
            </h2>

            <p className="cases-intro-slide__description mx-auto mt-9 max-w-[850px] text-[20px] font-normal leading-[1.2] tracking-[0] text-[#868686] sm:mt-12 sm:text-[22px] lg:mt-[81px] lg:text-[26px]">
              {copy.description}
            </p>
          </div>
        </div>
      </div>

      <div className="cases-intro-slide__pulse" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
