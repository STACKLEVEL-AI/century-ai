import type { Metadata } from 'next'
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
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'v.bakhmat@stacklevel.group',
          telephone: '+375296682127',
          availableLanguage: ['ru', 'en'],
          url: `${SITE_URL}/#contact`,
        },
      ],
      sameAs: [
        'https://www.linkedin.com/company/stacklevel',
        'https://www.youtube.com/@STACKLEVELGROUP',
      ],
      areaServed: [
        {
          '@type': 'Country',
          name: 'Russia',
        },
        {
          '@type': 'Country',
          name: 'Belarus',
        },
      ],
      knowsAbout: [
        'Enterprise LLM',
        'RAG with citations',
        'On-premise deployment',
        'Air-gapped infrastructure',
        'AI audit trails',
        'AI governance',
      ],
    },
    {
      '@type': 'Brand',
      '@id': `${SITE_URL}/#brand`,
      name: 'Century',
      url: SITE_URL,
      logo: `${SITE_URL}/assets/CENTURY_White_H.png`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'ru-RU',
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#service`,
      },
      breadcrumb: {
        '@id': `${SITE_URL}/#breadcrumb`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
      },
      inLanguage: 'ru-RU',
      dateModified: new Date().toISOString(),
      mainEntity: {
        '@id': `${SITE_URL}/#service`,
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#service`,
      name: 'Century',
      serviceType: 'Внедрение корпоративных LLM и RAG-сервисов',
      description:
        'Платформа и методология для запуска LLM-сценариев в регулируемой среде: от выбора кейса и KPI до промышленного контура с аудитом и контролем качества.',
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      brand: {
        '@id': `${SITE_URL}/#brand`,
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'Russia',
        },
        {
          '@type': 'Country',
          name: 'Belarus',
        },
      ],
      audience: {
        '@type': 'BusinessAudience',
        audienceType:
          'Крупные организации и государственные структуры в регулируемых отраслях',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Сценарии первых 90 дней',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'База знаний и поддержка',
              description:
                'Агенты для ответов по регламентам, триажа обращений и онбординга с цитатами источников.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Документы: продажи, юристы, закупки',
              description:
                'Агенты для анализа договоров, тендеров и подготовки коммерческих материалов.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Риски и комплаенс',
              description:
                'Проверка политик, сбор доказательной цепочки и отчёты по инцидентам для аудита.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Операции и SLA',
              description:
                'Автоматизация входящих потоков, контроль SLA и ответы по отчётным данным.',
            },
          },
        ],
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#application`,
      name: 'Century Platform',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'On-premise, Private Cloud, Air-gapped',
      url: SITE_URL,
      description:
        'Корпоративная LLM-платформа с интеграциями в ERP/CRM/ITSM/IAM, проверяемыми ответами и журналом аудита.',
      brand: {
        '@id': `${SITE_URL}/#brand`,
      },
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      featureList: [
        'Локальное развертывание и изолированный контур',
        'Гибридный RAG с цитированием источников',
        'Наблюдаемость и аудит запросов/ответов',
        'OpenAI-совместимый API и сменяемые компоненты',
        'Контроль доступа по ролям (IAM)',
      ],
      availableLanguage: ['ru', 'en'],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#scenario-list`,
      name: 'Портфель сценариев Century',
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
          name: 'Документные процессы',
          item: `${SITE_URL}/#scenarios`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Риски и комплаенс',
          item: `${SITE_URL}/#scenarios`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Операции и SLA',
          item: `${SITE_URL}/#scenarios`,
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: `${SITE_URL}/`,
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
          type="text/plain"
          href={`${SITE_URL}/llms.txt`}
          title="LLMs.txt"
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
