"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";

export default function HeroSection() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].hero;

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
        preload="auto"
        aria-label={`${copy.lineOne} ${copy.lineTwo}`}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
