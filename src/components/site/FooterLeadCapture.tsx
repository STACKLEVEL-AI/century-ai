import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, TELEGRAM_HANDLE } from "@/lib/site";

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
    src: "/footer-image/Vitali.png",
    alt: "Vitali",
  },
  {
    src: "/footer-image/Vadim.png",
    alt: "Vadim",
  },
  {
    src: "/footer-image/Egor.png",
    alt: "Egor",
  },
];

export default function FooterLeadCapture() {
  return (
    <footer
      id="contacts"
      className="site-footer site-footer--lead mb-6 border-b border-[#9B9B9B80] bg-white text-black sm:mb-[45px]"
    >
      <section className="site-footer__surface overflow-hidden bg-white" aria-labelledby="footer-brief-title">
        <div className="shell py-[clamp(34px,7vw,100px)] max-w-[1440px] px-[100px]">
          <div className="grid grid-cols-1 gap-[clamp(28px,4vw,84px)] min-[1081px]:grid-cols-[minmax(240px,340px)_minmax(0,1fr)]">
            <aside className="grid min-w-0 content-start gap-6 sm:gap-7" aria-label="Контакты Century">
              <div
                className="flex w-full flex-wrap items-center gap-[clamp(12px,3vw,39px)] border-b border-[rgba(19,21,27,0.14)] pb-3 sm:pb-2.5"
                aria-label="Команда Century"
              >
                {teamMembers.map(({ src, alt }) => (
                  <div
                    key={src}
                    className="footer-team-photo-frame relative h-[clamp(64px,5vw,80px)] w-[clamp(64px,5vw,80px)] shrink-0 overflow-hidden rounded-full bg-[#d8d8dc] shadow-[inset_0_0_0_1px_rgba(19,21,27,0.06)]"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 720px) 64px, 80px"
                      className="footer-team-photo object-cover"
                      style={{
                        filter: "grayscale(1) contrast(1.08) brightness(0.96)",
                        transform: "scale(1.02)",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-1 grid w-full gap-3 border-b border-[rgba(19,21,27,0.14)] pb-5 sm:mt-0 sm:gap-[11px] sm:pb-6.5">
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

              <div className="mt-1 grid gap-1 pt-[2px] sm:mt-2">
                <Link
                  href="/#hero"
                  className="w-fit text-[clamp(2.45rem,7vw,3.6rem)] leading-[0.9] font-bold tracking-[-0.07em] text-black no-underline"
                  aria-label="Century home"
                >
                  CENTURY
                </Link>
                <p className="m-0 max-w-[340px] text-[15px] font-medium leading-[100%] tracking-[0.02em] text-[#151515] sm:text-[16px]">
                  Корпоративная ИИ-платформа будущего
                </p>
              </div>
            </aside>

            <div className="w-full min-w-0 justify-self-stretch bg-[#f7f7f8] px-[clamp(20px,5vw,60px)] py-[clamp(24px,4vw,39px)] shadow-[0_2px_2px_rgba(172,172,172,0.3)] min-[1081px]:min-h-[280px] min-[1081px]:max-w-[820px] min-[1081px]:justify-self-end">
              <h2
                id="footer-brief-title"
                className="m-0 max-w-[700px] text-[clamp(2rem,4vw,40px)] leading-[100%] font-semibold tracking-[0.02em] text-black"
              >
                Начните с цифр, а не с презентаций
              </h2>
              <p className="mt-3 max-w-[720px] text-[clamp(1rem,2vw,20px)] font-normal leading-[100%] tracking-[0.001em] text-[#000000] max-[720px]:max-w-none">
                Отправим 3-5 сценариев внедрения ИИ под вашу компанию — с расчетом бизнес-эффекта по
                каждому
              </p>

              <form className="mt-5 grid w-full max-w-[700px] gap-3 sm:gap-4">
                <div className="grid grid-cols-1 items-stretch gap-[9px] md:grid-cols-[minmax(0,1fr)_190px]">
                  <input
                    className="min-h-[50px] w-full max-w-none rounded-none border border-[rgba(19,21,27,0.14)] bg-white px-4 text-[16px] text-black outline-none transition-[border-color,box-shadow] duration-[180ms] placeholder:text-[#a3a3aa] focus-visible:border-[var(--color-primary-600)] focus-visible:shadow-[0_0_0_2px_rgba(33,13,255,0.08)] md:pl-11 md:pr-[18px]"
                    type="email"
                    name="work_email"
                    autoComplete="email"
                    placeholder="ivanov@company.ru"
                    aria-label="Рабочий email"
                  />
                  <button
                    type="button"
                    className="min-h-[50px] w-full max-w-none cursor-pointer rounded-none border border-transparent bg-[#240CFF] px-3 text-[12px] font-medium leading-[100%] text-white transition-colors duration-[180ms] hover:bg-[var(--color-primary-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(33,13,255,0.2)] md:max-w-[190px]"
                  >
                    Получить сценарии
                  </button>
                </div>
                <div className="flex w-full items-start gap-2 text-[13px] font-normal leading-[1.3] text-[#000000] sm:text-[14px]">
                  <label className="mt-[2px] flex shrink-0 items-start">
                    <input
                      className="h-[17px] w-[17px] shrink-0 cursor-pointer rounded-none accent-[var(--color-primary-600)]"
                      type="checkbox"
                      name="consent"
                    />
                  </label>
                  <div className="min-w-0">
                    Нажимая на кнопку, я даю{" "}
                    <Link className="underline decoration-[#240CFF] underline-offset-2" href="/">
                      <span className="text-[#240CFF] ">согласие</span>
                    </Link>
                    {" "}на обработку персональных данных
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
