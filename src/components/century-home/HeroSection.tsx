"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";
import type { CSSProperties } from "react";

const overlayStyle = {
  position: "absolute",
  zIndex: 1,
  inset: 0,
  pointerEvents: "none",
} as const;

const titleStyle = {
  position: "absolute",
  bottom: "clamp(46px, 8vh, 88px)",
  left: "clamp(24px, 6.8vw, 112px)",
  display: "grid",
  color: "#fff",
  fontSize: "clamp(2.65rem, 6.8vw, 7.5rem)",
  fontWeight: 400,
  lineHeight: 0.9,
  textTransform: "uppercase",
  textShadow: "0 3px 24px rgba(0, 0, 0, 0.38)",
} as CSSProperties;

const industriesStyle = {
  position: "absolute",
  top: "clamp(108px, 18vh, 220px)",
  right: "clamp(24px, 6.8vw, 112px)",
  display: "grid",
  gap: "0.12em",
  color: "rgba(255, 255, 255, 0.96)",
  fontSize: "clamp(1.05rem, 3.4vw, 3.75rem)",
  fontWeight: 400,
  lineHeight: 0.94,
  textAlign: "right",
  textTransform: "uppercase",
  textShadow: "0 3px 24px rgba(0, 0, 0, 0.38)",
} as CSSProperties;

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

      <div className="century-home-hero__overlay" style={overlayStyle} aria-hidden="true">
        <p className="century-home-hero__title" style={titleStyle}>
          <span>{copy.lineOne}</span>
          <span>{copy.lineTwo}</span>
        </p>
        <div className="century-home-hero__industries" style={industriesStyle}>
          {industries.map((industry) => (
            <span key={industry}>{industry}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
