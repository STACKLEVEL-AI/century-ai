import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, Phone, Send, Youtube } from "lucide-react";
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_RAW,
  TELEGRAM_HANDLE,
} from "@/lib/site";

export default function FooterMultiColumn() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <section>
        <div className="shell footer-grid">
          <article className="footer-brand">
            <Link href="/" className="footer-logo" aria-label="Century by Stacklevel Group">
              <span className="footer-line">
                <Image
                  className="footer-stacklevel"
                  src="/assets/sl.png"
                  alt="Stacklevel Group logo"
                  width={277}
                  height={23}
                />
              </span>
            </Link>
            <p className="footer-note">
              Контуры внедрения корпоративного ИИ для промышленной эксплуатации в
              организациях.
            </p>
          </article>

          <article className="footer-col">
            <p className="footer-title">Контакты</p>
            <div className="footer-contacts">
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">
                <Mail size={16} />
                <span>{CONTACT_EMAIL}</span>
              </a>

              <a href={`tel:${CONTACT_PHONE_RAW}`} className="contact-link">
                <Phone size={16} />
                <span>{CONTACT_PHONE}</span>
              </a>

              <a
                href="https://stacklevel.group"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Globe size={16} />
                <span>{COMPANY_NAME}</span>
              </a>

              <a
                href={`tg://resolve?domain=${TELEGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Send size={16} />
                <span>Telegram</span>
              </a>

              <a
                href="https://www.youtube.com/@STACKLEVELGROUP"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Youtube size={16} />
                <span>Youtube</span>
              </a>
            </div>
          </article>

          <article className="footer-col footer-col--qr">
            <p className="footer-title">QR-код</p>
            <div className="footer-qr">
              <Image
                src="/assets/qr-code.png"
                alt="QR code for Century contact"
                width={120}
                height={120}
                className="qr-image"
                loading="eager"
              />
            </div>
          </article>
        </div>

        <div className="shell footer-bottom">
          <p>
            &copy; {year} Century by{" "}
            <a href="https://stacklevel.group/" target="_blank" rel="noopener noreferrer">
              {COMPANY_NAME}
            </a>
            .
          </p>
        </div>
      </section>
    </footer>
  );
}
