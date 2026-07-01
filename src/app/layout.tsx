import type { Metadata, Viewport } from "next";
import { Lato, Manrope, Montserrat } from "next/font/google";
import SiteChrome from "@/components/site/SiteChrome";
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_RAW,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Century — платформа управляемого внедрения корпоративного ИИ",
  description:
    "Century — платформа управляемого внедрения корпоративного ИИ: ассистенты, многошаговые сценарии, workflow, сервисный каталог, аудит и метрики в on-prem, air-gapped или hybrid-контуре.",
  applicationName: SITE_NAME,
  keywords: [
    "century ai",
    "платформа корпоративного ии",
    "enterprise ai platform",
    "on-prem ai",
    "air-gapped ai",
    "workflow orchestration",
    "метрики и наблюдаемость ии",
  ],
  authors: [{ name: COMPANY_NAME, url: "https://stacklevel.group" }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  category: "enterprise ai",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/favicon.png" }],
  },
  openGraph: {
    title: "Century — платформа управляемого внедрения корпоративного ИИ",
    description:
      "Платформа управляемого внедрения корпоративного ИИ: workflow, готовые сервисы, ассистенты, журнал исполнения и эксплуатационные метрики.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: absoluteUrl(OG_IMAGE_PATH),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Century — платформа управляемого внедрения корпоративного ИИ",
    description:
      "Workflow, сервисный каталог, ассистенты, аудит и метрики для корпоративного AI-контура.",
    images: [absoluteUrl(OG_IMAGE_PATH)],
  },
  verification: {
    google: "pBlkUcnfTMSv0TeXGTpljTtBNWriJn5rCg3CwrzZZkc",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: COMPANY_NAME,
      url: "https://stacklevel.group",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_RAW,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "ru",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "Product",
      "@id": `${SITE_URL}/#product`,
      name: SITE_NAME,
      description:
        "Платформа управляемого внедрения ИИ: ассистенты, workflow, готовые сервисы, аудит, метрики и управляемое исполнение.",
      brand: {
        "@type": "Brand",
        name: SITE_NAME,
      },
      manufacturer: {
        "@id": `${SITE_URL}/#organization`,
      },
      category: "Enterprise AI Platform",
      slogan: SITE_TAGLINE,
      image: absoluteUrl(OG_IMAGE_PATH),
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Century — платформа управляемого внедрения корпоративного ИИ",
      inLanguage: "ru",
      about: {
        "@id": `${SITE_URL}/#product`,
      },
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${lato.variable} ${montserrat.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
