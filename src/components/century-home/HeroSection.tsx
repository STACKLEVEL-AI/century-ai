"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";

export default function HeroSection() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].hero;
  const industries =
    locale === "ru"
      ? ["Финансы", "Агробизнес", "Металлургия", "Логистика", "Космос"]
      : ["Finance", "Agribusiness", "Metallurgy", "Logistics", "Space"];

  return (
    <section
      id="hero"
      className="century-home-hero"
      aria-label={`${copy.lineOne} ${copy.lineTwo}`}
    >
      <h1 className="sr-only">
        {locale === "ru"
          ? "Century — платформа корпоративного ИИ для бизнеса"
          : "Century — enterprise AI platform for business"}
      </h1>
      <video
        className="century-home-hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={`${copy.lineOne} ${copy.lineTwo}`}
      >
        <source src="/hero-video/century-main-visual.mp4" type="video/mp4" />
      </video>

      <div className="century-home-hero__overlay" aria-hidden="true">
        <p className="century-home-hero__title">
          <span>{copy.lineOne}</span>
          <span>{copy.lineTwo}</span>
        </p>
        <div className="century-home-hero__industries">
          {industries.map((industry) => (
            <span key={industry}>{industry}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
