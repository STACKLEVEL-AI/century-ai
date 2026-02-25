import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const SITE_URL = 'https://century-ai.ru'
const SITE_NAME = 'Century by Stacklevel Group'
const SITE_TITLE =
  'Century — корпоративная платформа внедрения LLM для крупных организаций'
const SITE_DESCRIPTION =
  'Century помогает запускать корпоративные LLM-сервисы в безопасном контуре: on-prem/air-gapped, RAG с цитатами, аудит и контроль качества, интеграции с ERP/CRM/ITSM/IAM.'
const OG_IMAGE_URL = `${SITE_URL}/og/century-ai-og.svg`

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Century',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'Century',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'внедрение llm',
    'корпоративный rag',
    'on-prem ai',
    'air-gapped llm',
    'аудит llm',
    'enterprise ai platform',
    'openai-compatible api',
  ],
  authors: [{ name: 'Stacklevel Group', url: 'https://stacklevel.group' }],
  creator: 'Stacklevel Group',
  publisher: 'Stacklevel Group',
  category: 'enterprise ai',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
    shortcut: ['/favicon.png'],
    apple: [
      {
        url: '/favicon.png',
      },
    ],
  },
  alternates: {
    canonical: '/',
    languages: {
      'ru-RU': '/',
      'x-default': '/',
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Century by Stacklevel Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  verification: {
    google: 'G-9lIFOuqI7bxNAuFqZww-U_npp1rvShARY-mU1dBVs',
  },
}

export const viewport: Viewport = {
  themeColor: '#04070f',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Stacklevel Group',
      url: 'https://stacklevel.group',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/sl.png`,
        width: 656,
        height: 298,
      },
      email: 'v.bakhmat@stacklevel.group',
      telephone: '+375296682127',
      contactPoint: {
        '@id': `${SITE_URL}/#contactpoint`,
      },
      sameAs: ['https://www.youtube.com/@STACKLEVELGROUP'],
    },
    {
      '@type': 'ContactPoint',
      '@id': `${SITE_URL}/#contactpoint`,
      contactType: 'sales',
      email: 'v.bakhmat@stacklevel.group',
      telephone: '+375296682127',
      availableLanguage: ['ru', 'en'],
      url: `${SITE_URL}/#contact`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'ru',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: 'ru',
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#product`,
      },
      mainEntity: {
        '@id': `${SITE_URL}/#product`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
      },
    },
    {
      '@type': 'Product',
      '@id': `${SITE_URL}/#product`,
      name: 'Century',
      url: `${SITE_URL}/`,
      description:
        'Корпоративная платформа и конвейер внедрения LLM-сервисов для крупных организаций РФ и Беларуси: от выбора первого кейса с KPI до промышленного запуска в безопасном контуре.',
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/CENTURY_White_H.png`,
      },
      brand: {
        '@type': 'Brand',
        name: 'Century',
      },
      manufacturer: {
        '@id': `${SITE_URL}/#organization`,
      },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Крупные организации и государственные структуры',
      },
      category: 'Enterprise AI Platform',
      slogan: 'LLM в корпорации — из пилота в управленческое решение',
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#roadmap-list`,
      name: 'Дорожная карта CDTO к масштабируемым решениям',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: 3,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Подготовка и старт (месяц 1)',
          item: `${SITE_URL}/#narrative`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Внедрение и запуск (месяц 2)',
          item: `${SITE_URL}/#narrative`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Масштабирование (месяц 3)',
          item: `${SITE_URL}/#narrative`,
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#connector-list`,
      name: 'Коннекторы',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: 8,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ERP',
          item: `${SITE_URL}/#platform`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'СЭД',
          item: `${SITE_URL}/#platform`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'CRM',
          item: `${SITE_URL}/#platform`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'ITSM',
          item: `${SITE_URL}/#platform`,
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'IAM',
          item: `${SITE_URL}/#platform`,
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'SIEM',
          item: `${SITE_URL}/#platform`,
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'DWH',
          item: `${SITE_URL}/#platform`,
        },
        {
          '@type': 'ListItem',
          position: 8,
          name: 'Портал',
          item: `${SITE_URL}/#platform`,
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#scenario-list`,
      name: 'Сценарии первых 90 дней',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: 4,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'База знаний и поддержка',
          item: `${SITE_URL}/#scenarios`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Документы: продажи, юристы, закупки',
          item: `${SITE_URL}/#scenarios`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Риски / комплаенс',
          item: `${SITE_URL}/#scenarios`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Операции',
          item: `${SITE_URL}/#scenarios`,
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLdScript = JSON.stringify(structuredData).replace(/</g, '\\u003c')

  return (
    <html lang="ru" className={`${manrope.variable}`}>
      <head>
        <link
          rel="alternate"
          type="text/markdown"
          href={`${SITE_URL}/llms.txt`}
          title="LLMs.txt"
        />
        <link
          rel="alternate"
          type="text/plain"
          href={`${SITE_URL}/llms-full.txt`}
          title="LLMs full context"
        />
        <link
          rel="sitemap"
          type="application/xml"
          href={`${SITE_URL}/sitemap.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript }}
        />
      </head>
      <body>
        <div className="grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
