"use client";

import Image from "next/image";
import { useLanguage } from "@/components/site/LanguageProvider";
import { homeCopy } from "@/lib/home-i18n";

export default function SecurityFeatureBlock() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].security;

  return (
    <section
      id="security"
      data-landing-section
      className="security-slide"
      aria-labelledby="security-slide-title"
    >
      <div className="security-slide__shell">
        <div className="security-slide__panel">
          <header>
            <h2 id="security-slide-title">{copy.title}</h2>
            <p>
              <strong>Century</strong> {copy.descriptionPrefix} {copy.descriptionSuffix}
            </p>
          </header>

          <div className="security-slide__features">
            {copy.features.map((feature, index) => (
              <article key={feature.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="security-slide__partner">
          <Image src="/hoster-icon.svg" alt="hoster.by" width={150} height={48} />
          <div>
            <h3>{copy.partnerTitle}</h3>
            <p>{copy.partnerDescription}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
