"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/site/LanguageProvider";
import { CONTACT_EMAIL, TELEGRAM_HANDLE } from "@/lib/site";
import { homeCopy } from "@/lib/home-i18n";

const contactLinks = [
  {
    href: `mailto:${CONTACT_EMAIL}`,
    label: CONTACT_EMAIL,
    iconSrc: "/footer-image/icon/Mail.svg",
    iconAlt: "Email",
  },
  {
    href: `https://t.me/${TELEGRAM_HANDLE}`,
    label: "Telegram",
    iconSrc: "/footer-image/icon/telegram.svg",
    iconAlt: "Telegram",
    external: true,
  },
];

const teamMembers = [
  {
    src: "/footer-image/vitali-bw.webp",
    alt: "Vitali",
    href: "https://www.linkedin.com/in/vbakhmat/",
    objectPosition: "50% 50%",
    scale: 1.36,
    translateX: -4,
    translateY: 12,
  },
  {
    src: "/footer-image/vadim-bw.webp",
    alt: "Vadim",
    href: "https://www.linkedin.com/in/vadimohka/",
    objectPosition: "50% 30%",
    scale: 1.1,
    translateX: 3,
    translateY: -1,
  },
  {
    src: "/footer-image/egor-bw.webp",
    alt: "Egor",
    href: "https://www.linkedin.com/in/ekrychev/",
    objectPosition: "50% 50%",
    scale: 1.15,
    translateX: 0,
    translateY: 0,
  },
];

export default function FooterLeadCapture() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale].footer;
  const year = new Date().getFullYear();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("work_email") || "").trim();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: locale === "ru" ? "Запрос сценариев" : "Scenario request",
          email,
          company: "",
          role: "",
          message:
            locale === "ru"
              ? "Запросить 3–5 сценариев внедрения ИИ"
              : "Request 3–5 AI implementation scenarios",
          website: formData.get("website"),
        }),
      });

      if (!response.ok) throw new Error(`Contact API returned ${response.status}`);
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <footer
      id="contacts"
      className="site-footer site-footer--lead border-b border-[#9B9B9B80] bg-white text-black"
    >
      <section className="site-footer__surface overflow-hidden bg-white" aria-labelledby="footer-brief-title">
        <div className="shell max-w-[1440px] px-5 py-[clamp(34px,7vw,100px)] sm:px-8 lg:px-[100px]">
          <div className="grid grid-cols-1 gap-[clamp(28px,4vw,84px)] min-[1081px]:grid-cols-[minmax(240px,340px)_minmax(0,1fr)]">
            <aside className="footer-lead__contacts grid min-w-0 content-start" aria-label={copy.contacts}>
              <div
                className="flex flex-wrap items-center gap-[clamp(12px,3vw,39px)] border-b border-[rgba(19,21,27,0.14)] pb-3 sm:pb-2.5"
                aria-label={copy.team}
              >
                {teamMembers.map(({ src, alt, href, objectPosition, scale, translateX, translateY }) => (
                  <a
                    key={src}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn: ${alt}`}
                    className="footer-team-photo-frame relative h-[clamp(64px,5vw,80px)] w-[clamp(64px,5vw,80px)] shrink-0 overflow-hidden rounded-[18px] border border-[#d3d3d8] bg-[#d8d8dc] shadow-[0_4px_10px_rgba(19,21,27,0.08)]"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 720px) 120px, 160px"
                      className="footer-team-photo object-cover"
                      style={{
                        objectPosition,
                        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                        transformOrigin: "center",
                        filter: "grayscale(1) contrast(0.92)",
                      }}
                    />
                    <span aria-hidden="true" className="footer-team-photo-ring" />
                  </a>
                ))}
              </div>

              <div className="grid w-full mt-6.5 gap-3 border-b border-[rgba(19,21,27,0.14)] pb-5 sm:gap-[11px] sm:pb-6.5">
                {contactLinks.map(({ href, label, iconSrc, iconAlt, external }) => (
                  <a
                    key={href}
                    href={href}
                    className="inline-flex min-h-[25px] w-full max-w-full items-start gap-3 text-[clamp(1rem,2.2vw,1.25rem)] leading-[1.1] tracking-[0.02em] text-black no-underline transition-colors duration-[180ms] hover:text-[var(--color-primary-600)] sm:w-fit sm:items-center sm:gap-[15px]"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <span className="mt-[2px] flex h-[25px] w-[25px] shrink-0 items-center justify-center text-[var(--color-primary-600)] sm:mt-0">
                      <Image className="block" src={iconSrc} alt={iconAlt} width={20} height={20} />
                    </span>
                    <span className="w-full h-[25px] text-center leading-[1.1] [overflow-wrap:anywhere]">{label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-4 grid gap-1 pt-[2px]">
                <Link
                  href="/#hero"
                  className="w-fit text-[40px] leading-[100%] font-semibold tracking-[0] text-black no-underline"
                  aria-label={copy.home}
                >
                  CENTURY
                </Link>
                <p className="m-0 max-w-[340px] text-[16px] font-medium leading-[100%] tracking-[2%] text-[#000000]">
                  {copy.tagline}
                </p>
              </div>
            </aside>

            <div className="footer-lead__form w-full min-w-0 justify-self-stretch bg-[#f7f7f8] px-[clamp(20px,5vw,60px)] py-[clamp(24px,4vw,39px)] shadow-[0_2px_2px_rgba(172,172,172,0.3)] min-[1081px]:min-h-[320px] min-[1081px]:max-w-[820px] min-[1081px]:justify-self-end">
              <h2
                id="footer-brief-title"
                className="m-0 max-w-[700px] text-[clamp(2rem,4vw,40px)] leading-[100%] font-semibold tracking-[2%] text-black"
              >
                {copy.title}
              </h2>
              <p className="mt-3 w-full min-w-0 text-[clamp(1rem,2vw,20px)] font-normal leading-[100%] tracking-[0.02em] text-[#000000] max-[720px]:max-w-none">
                {copy.description}
              </p>

              <form onSubmit={handleSubmit} className="mt-5 grid w-full max-w-[700px] gap-3 sm:gap-4">
                <div className="grid grid-cols-1 items-stretch gap-[9px] md:grid-cols-[minmax(0,1fr)_190px]">
                  <input
                    className="min-h-[50px] w-full max-w-none rounded-none border border-[rgba(19,21,27,0.14)] bg-white px-4 text-[16px] text-black outline-none transition-[border-color,box-shadow] duration-[180ms] placeholder:text-[#a3a3aa] focus-visible:border-[var(--color-primary-600)] focus-visible:shadow-[0_0_0_2px_rgba(33,13,255,0.08)] md:pl-11 md:pr-[18px]"
                    type="email"
                    name="work_email"
                    required
                    autoComplete="email"
                    placeholder={copy.emailPlaceholder}
                    aria-label={copy.emailLabel}
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="min-h-[50px] w-full max-w-none cursor-pointer rounded-none border border-transparent bg-[#240CFF] px-3 text-[12px] font-medium leading-[100%] text-white transition-colors duration-[180ms] hover:bg-[var(--color-primary-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(33,13,255,0.2)] disabled:cursor-not-allowed disabled:opacity-60 md:max-w-[190px]"
                  >
                    {status === "sending" ? (locale === "ru" ? "Отправляем..." : "Sending...") : copy.submit}
                  </button>
                </div>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="sr-only"
                />
                <div className="flex w-full items-center gap-2 text-[13px] font-normal leading-[1.3] text-[#000000] sm:text-[14px]">
                  <label className="flex shrink-0 cursor-pointer items-start">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      name="consent"
                      required
                    />
                    <span
                      aria-hidden="true"
                      className="flex h-[20px] w-[20px] shrink-0 items-center justify-center border border-[#9B9B9B80] bg-white text-transparent transition-colors duration-[180ms] peer-checked:border-[var(--color-primary-600)] peer-checked:bg-[var(--color-primary-600)] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[rgba(33,13,255,0.18)]"
                    >
                      <svg
                        viewBox="0 0 12 10"
                        className="h-[10px] w-[12px]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5L4.5 8.5L11 1.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </label>
                  <div className="min-w-0 h-[20px] items-center text-center">
                    {copy.consentBefore}{" "}
                    <a
                      className="underline decoration-[#240CFF] underline-offset-2"
                      href="/documents/century-ai-personal-data-consent.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-[#240CFF]">{copy.consentLink}</span>
                    </a>
                    {" "}{copy.consentAfter}
                  </div>
                </div>
                {status === "success" ? (
                  <p className="m-0 text-sm text-green-700" role="status">
                    {locale === "ru" ? "Заявка отправлена." : "Your request was sent."}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="m-0 text-sm text-red-700" role="alert">
                    {locale === "ru"
                      ? "Не удалось отправить заявку. Попробуйте еще раз."
                      : "Could not send the request. Please try again."}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="footer-copyright">
        <div className="shell max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
          <p>&copy; {year} Century. {locale === "ru" ? "Все права защищены." : "All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
}
