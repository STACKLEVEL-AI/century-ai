"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";

export default function HeroSection() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].hero;
  const videoName = locale === "ru" ? "ru" : "en";

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
        key={locale}
        className="century-home-hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={`/hero-video/hero-${videoName}-poster.jpg`}
        aria-label={`${copy.lineOne} ${copy.lineTwo}`}
      >
        <source
          src={`/hero-video/hero-${videoName}-mobile.webm`}
          type="video/webm"
          media="(max-width: 767px)"
        />
        <source
          src={`/hero-video/hero-${videoName}-mobile.mp4`}
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src={`/hero-video/hero-${videoName}.webm`} type="video/webm" />
        <source src={`/hero-video/hero-${videoName}.mp4`} type="video/mp4" />
      </video>
    </section>
  );
}
