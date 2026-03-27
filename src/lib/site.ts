import type { Metadata } from "next";

export const SITE_URL = "https://century-ai.ru";
export const SITE_NAME = "Century";
export const SITE_TAGLINE = "Корпоративная AI execution platform";
export const COMPANY_NAME = "Stacklevel Group";
export const CONTACT_EMAIL = "v.bakhmat@stacklevel.group";
export const CONTACT_PHONE = "+375 (29) 668-21-27";
export const CONTACT_PHONE_RAW = "+375296682127";
export const TELEGRAM_HANDLE = "vitalibakhmat";
export const OG_IMAGE_PATH = "/og/century-ai-og.svg";

export type NavItem = {
  href: string;
  label: string;
};

export const siteNavigation: NavItem[] = [
  { href: "/platform", label: "Платформа" },
  { href: "/workflow", label: "Workflow" },
  { href: "/services", label: "Сервисы" },
  { href: "/assistants", label: "Ассистенты" },
  { href: "/security", label: "Безопасность" },
  { href: "/observability", label: "Метрики" },
  { href: "/cases", label: "Кейсы" },
  { href: "/pricing", label: "Стоимость" },
];

export const footerProductLinks = [
  { href: "/platform", label: "Платформа" },
  { href: "/workflow", label: "Workflow" },
  { href: "/services", label: "Сервисы" },
  { href: "/assistants", label: "Ассистенты" },
  { href: "/observability", label: "Метрики" },
];

export const footerMaterialLinks = [
  { href: "/cases", label: "Кейсы" },
  { href: "/security", label: "Безопасность" },
  { href: "/pricing", label: "Стоимость" },
];

const COMMON_KEYWORDS = [
  "century ai",
  "корпоративная ai platform",
  "ai execution platform",
  "enterprise ai platform",
  "on-prem ai",
  "air-gapped ai",
  "workflow orchestration",
  "ai observability",
  "многоагентные системы",
  "корпоративные ассистенты",
  "workflow для llm",
  "журнал исполнения ai",
];

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: MetadataInput): Metadata {
  const fullTitle = `${title} | Century`;
  const url = absoluteUrl(path);

  return {
    title: fullTitle,
    description,
    keywords: [...COMMON_KEYWORDS, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "ru_RU",
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
      title: fullTitle,
      description,
      images: [absoluteUrl(OG_IMAGE_PATH)],
    },
  };
}
