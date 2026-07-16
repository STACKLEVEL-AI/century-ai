"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";

export default function HeroSection() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].hero;

  return (
    <section
      id="hero"
      className="century-home-hero relative flex flex-col overflow-hidden pt-5 sm:pt-6 lg:pt-10"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 px-5 pb-5 sm:px-8 sm:pb-6 lg:px-[100px] lg:pb-8">
        <div className="relative hero-grid-30 flex flex-1 flex-col justify-between border border-[#D9D9D9] px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5 lg:px-[20px] lg:pb-[20px] lg:pt-[20px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-1px] top-[-1px] h-[20px] w-px bg-[#240CFF] lg:h-[30px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-1px] top-[-1px] h-px w-[20px] bg-[#240CFF] lg:w-[30px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-1px] top-[-1px] h-[20px] w-px bg-[#240CFF] lg:h-[30px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-1px] top-[-1px] h-px w-[20px] bg-[#240CFF] lg:w-[30px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-1px] left-[-1px] h-[20px] w-px bg-[#240CFF] lg:h-[30px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-1px] left-[-1px] h-px w-[20px] bg-[#240CFF] lg:w-[30px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-1px] right-[-1px] h-[20px] w-px bg-[#240CFF] lg:h-[30px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-1px] right-[-1px] h-px w-[20px] bg-[#240CFF] lg:w-[30px]"
          />

          <div className="flex justify-end">
            <h1 className="max-w-[260px] text-right text-[48px] font-semibold uppercase leading-[100%] tracking-[0] [font-family:var(--font-lato)] sm:max-w-[300px] lg:max-w-[292px]">
              <span className="block">{copy.lineOne}</span>
              <span className="block">{copy.lineTwo}</span>
            </h1>
          </div>

          <div className="pt-12 sm:pt-16 lg:pt-20">
            <p className="select-none text-[160px] font-semibold uppercase leading-[100%] tracking-[0] [font-family:var(--font-lato)]">
              Century
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
