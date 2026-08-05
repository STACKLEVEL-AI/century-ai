"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";

const HERO_VIDEO_LOAD_DELAY = 1200;

export default function HeroSection() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShouldLoadVideo(true);
    }, HERO_VIDEO_LOAD_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!shouldLoadVideo || !video) {
      return;
    }

    video.load();
    void video.play().catch(() => {
      // Browsers can still defer autoplay in power-saving modes.
    });
  }, [shouldLoadVideo]);

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
        ref={videoRef}
        className="century-home-hero__video"
        autoPlay
        loop
        muted
        playsInline
        poster="/og/century-ai-og.png"
        preload="none"
        aria-label={`${copy.lineOne} ${copy.lineTwo}`}
      >
        {shouldLoadVideo ? <source src="/hero-video.mp4" type="video/mp4" /> : null}
      </video>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="century-home-hero__video"
          src="/og/century-ai-og.png"
          alt="Century — платформа корпоративного ИИ"
        />
      </noscript>
    </section>
  );
}
