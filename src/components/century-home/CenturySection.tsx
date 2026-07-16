"use client";

import Image from "next/image";
import { useLanguage } from "@/components/site/LanguageProvider";
import { useScrollDrivenSteps } from "@/hooks/useScrollDrivenSteps";
import { homeCopy } from "@/lib/home-i18n";

const slideMedia = [
  "/slider-image/analytics-preview.webp",
  "/slider-image/image-2.webp",
  "/slider-image/image-3.webp",
  "/slider-image/image-4.webp",
  "/slider-image/image-5.webp",
] as const;

function Stepper({
  activeIndex,
  label,
  onStepClick,
}: {
  activeIndex: number;
  label: string;
  onStepClick: (index: number) => void;
}) {
  const progress = (activeIndex / (slideMedia.length - 1)) * 100;

  return (
    <div className="century-cases__stepper" role="tablist" aria-label={label}>
      <span className="century-cases__stepper-line" aria-hidden="true" />
      <span
        className="century-cases__stepper-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      {slideMedia.map((_, index) => {
        const step = String(index + 1).padStart(2, "0");
        const isActive = index === activeIndex;
        const isComplete = index <= activeIndex;

        return (
          <button
            key={step}
            id={`case-tab-${step}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="case-slide-panel"
            tabIndex={isActive ? 0 : -1}
            className={`century-cases__step${isComplete ? " is-complete" : ""}${isActive ? " is-active" : ""}`}
            onClick={() => onStepClick(index)}
          >
            {step}
          </button>
        );
      })}
    </div>
  );
}

export default function CenturySection() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].cases;
  const { activeIndex, scrollToStep, sectionRef } = useScrollDrivenSteps(slideMedia.length);

  return (
    <section
      id="cases"
      ref={sectionRef}
      data-landing-section
      data-nav-section="cases"
      data-slide-scroll-section
      className="century-cases hero-grid"
      aria-labelledby={`case-slide-title-${activeIndex + 1}`}
    >
      <div className="century-cases__sticky">
        <div className="century-cases__shell">
          <Stepper activeIndex={activeIndex} label={copy.tabsLabel} onStepClick={scrollToStep} />

          <div className="century-cases__slides" aria-live="polite">
            {copy.slides.map((slide, index) => {
              const step = String(index + 1).padStart(2, "0");
              const isActive = index === activeIndex;

              return (
                <article
                  key={`${locale}-${step}`}
                  id={isActive ? "case-slide-panel" : undefined}
                  className={`century-cases__slide${isActive ? " is-active" : ""}`}
                  role="tabpanel"
                  aria-hidden={!isActive}
                  aria-labelledby={`case-tab-${step}`}
                >
                  <div className="century-cases__copy">
                    <h2 id={`case-slide-title-${index + 1}`}>{slide.title}</h2>
                    <p className="century-cases__lead">{slide.lead}</p>
                    <p className="century-cases__body">{slide.body}</p>

                    <div className="century-cases__tags" aria-label={copy.effectsLabel}>
                      {slide.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="century-cases__media">
                    <Image
                      src={slideMedia[index]}
                      alt={isActive ? `${copy.imageAlt}: ${slide.title}` : ""}
                      width={1434}
                      height={1008}
                      priority={index === 0}
                      sizes="(max-width: 900px) 100vw, 58vw"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="century-cases__rail" aria-hidden="true">
        {slideMedia.map((_, index) => (
          <div key={index} className="century-cases__snap-step" />
        ))}
      </div>
    </section>
  );
}
