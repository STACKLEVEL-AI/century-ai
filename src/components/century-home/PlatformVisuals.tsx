import type { Locale } from "@/lib/home-i18n";

type LayerVisualProps = {
  index: number;
  locale: Locale;
};

export function PlatformLayerIcon({ index }: { index: number }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle {...common} cx="9" cy="8" r="4" />
        <path {...common} d="M2.5 20c.4-4.3 2.6-6.5 6.5-6.5s6.1 2.2 6.5 6.5" />
        <path {...common} d="M15 4.8a3.8 3.8 0 0 1 0 6.6M16.2 14c3 .6 4.7 2.6 5 6" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M12 2.8c.7 5.4 3.4 8.1 8.8 8.8-5.4.7-8.1 3.4-8.8 8.8-.7-5.4-3.4-8.1-8.8-8.8 5.4-.7 8.1-3.4 8.8-8.8Z" />
        <path {...common} d="M19 2v4M17 4h4" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M12 2.7c2.6 2 5.1 2.7 7.4 2.8v6.1c0 4.8-2.8 8-7.4 9.7-4.6-1.7-7.4-4.9-7.4-9.7V5.5C6.9 5.4 9.4 4.7 12 2.7Z" />
        <path {...common} d="m8.6 12.1 2.2 2.2 4.8-5" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse {...common} cx="12" cy="5.2" rx="7.8" ry="3" />
        <path {...common} d="M4.2 5.2v6.7c0 1.7 3.5 3 7.8 3s7.8-1.3 7.8-3V5.2" />
        <path {...common} d="M4.2 11.9v6.7c0 1.7 3.5 3 7.8 3s7.8-1.3 7.8-3v-6.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect {...common} x="4.3" y="10" width="15.4" height="11" rx="2" />
      <path {...common} d="M7.7 10V7.3a4.3 4.3 0 0 1 8.6 0V10" />
      <path {...common} d="M12 14.5v2.2" />
    </svg>
  );
}

function Tag({ x, y, width, children }: { x: number; y: number; width: number; children: string }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="18" rx="4" fill="#f7f7f8" stroke="#dedee5" />
      <text x={x + 8} y={y + 12.2} fill="#2d2d35" fontSize="8.5">
        {children}
      </text>
    </g>
  );
}

function CardFrame({ fill = "#fff", stroke = "#240cff" }: { fill?: string; stroke?: string }) {
  return <rect x="5" y="5" width="390" height="390" rx="22" fill={fill} stroke={stroke} strokeWidth="0.5" />;
}

function LayerOne({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  return (
    <>
      <CardFrame />
      <Tag x={31} y={20} width={isEn ? 94 : 113}>{isEn ? "01 AI CONSUMERS" : "01 ПОТРЕБИТЕЛИ ИИ"}</Tag>

      <rect x="32" y="76" width="336" height="82" rx="10" fill="#fff" stroke="#e2e2e8" />
      <circle cx="52" cy="96" r="12" fill="#fafaff" stroke="#ededff" />
      <circle cx="50" cy="92" r="4" fill="none" stroke="#240cff" />
      <path d="M43 106c.4-5 2.8-7.5 7-7.5s6.6 2.5 7 7.5M56 89.5c3 .8 4.5 3 4.8 6.5" fill="none" stroke="#240cff" strokeWidth="1.4" strokeLinecap="round" />
      <text x="72" y="100" fill="#240cff" fontSize="16" fontWeight="700">
        {isEn ? "Teams and functions" : "Отделы и процессы"}
      </text>
      <Tag x={72} y={112} width={57}>{isEn ? "Sales" : "Продажи"}</Tag>
      <Tag x={134} y={112} width={68}>{isEn ? "Marketing" : "Маркетинг"}</Tag>
      <Tag x={207} y={112} width={75}>{isEn ? "Support" : "Поддержка"}</Tag>
      <Tag x={72} y={134} width={62}>{isEn ? "Finance" : "Финансы"}</Tag>
      <Tag x={139} y={134} width={55}>{isEn ? "Legal" : "Юристы"}</Tag>

      <rect x="32" y="172" width="336" height="58" rx="10" fill="#fff" stroke="#e2e2e8" />
      <circle cx="52" cy="191" r="12" fill="#fafaff" stroke="#ededff" />
      <text x="47" y="195" fill="#240cff" fontSize="13">⌘</text>
      <text x="72" y="195" fill="#240cff" fontSize="16" fontWeight="700">{isEn ? "Systems" : "Системы"}</text>
      <Tag x={72} y={204} width={38}>CRM</Tag>
      <Tag x={115} y={204} width={38}>ERP</Tag>
      <Tag x={158} y={204} width={40}>HRM</Tag>
      <Tag x={203} y={204} width={28}>BI</Tag>
      <Tag x={236} y={204} width={28}>1C</Tag>

      <rect x="32" y="244" width="336" height="80" rx="10" fill="#fff" stroke="#e2e2e8" />
      <circle cx="52" cy="264" r="12" fill="#fafaff" stroke="#ededff" />
      <rect x="47" y="259" width="10" height="10" rx="2" fill="none" stroke="#240cff" />
      <text x="72" y="268" fill="#240cff" fontSize="16" fontWeight="700">{isEn ? "Digital products" : "Цифровые продукты"}</text>
      <Tag x={72} y={280} width={92}>{isEn ? "Mobile services" : "Мобильные сервисы"}</Tag>
      <Tag x={169} y={280} width={88}>{isEn ? "Marketplaces" : "Маркетплейс"}</Tag>
      <Tag x={72} y={302} width={92}>{isEn ? "Web apps" : "Веб-приложения"}</Tag>
    </>
  );
}

function LayerTwo({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  return (
    <>
      <CardFrame fill="#240cff" stroke="#fff" />
      <rect x="31" y="20" width="81" height="17" rx="3" fill="none" stroke="#fff" />
      <text x="39" y="32" fill="#fff" fontSize="9">02 CENTURY</text>
      <text x="31" y="72" fill="#fff" fontSize="27" fontWeight="800">CENTURY</text>
      <text x="31" y="95" fill="#fff" fontSize="14" fontWeight="700">
        {isEn ? "One entry point for AI" : "Единая точка входа для ИИ"}
      </text>
      <rect x="31" y="111" width={isEn ? 145 : 175} height="19" rx="3" fill="none" stroke="#fff" />
      <text x="40" y="124" fill="#fff" fontSize="8.5">
        {isEn ? "> ask AI anything" : "> спросите ИИ о чём угодно"}
      </text>
      {[
        { x: 32, title: isEn ? "Chat" : "Чат", text: isEn ? "Employees work with AI" : "Сотрудники общаются с ИИ" },
        { x: 140, title: isEn ? "Builder" : "Конструктор", text: isEn ? "Build automations" : "Автоматизации создаёте сами" },
        { x: 272, title: "API", text: isEn ? "Integration with everything" : "Интеграция со всем" },
      ].map((card) => (
        <g key={card.x}>
          <rect x={card.x} y="158" width={card.x === 140 ? 120 : 96} height="84" rx="10" fill="#fff" />
          <text x={card.x + 12} y="199" fill="#240cff" fontSize="14" fontWeight="700">{card.title}</text>
          <text x={card.x + 12} y="216" fill="#30303a" fontSize="8">{card.text}</text>
        </g>
      ))}
    </>
  );
}

function LayerThree({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const items = isEn
    ? [["Security", "Data stays inside"], ["Unified data", "One processing layer"], ["Compliance", "Policies and audit"], ["Scale", "AI grows without a zoo"]]
    : [["Безопасность", "Данные не покидают контур"], ["Единые данные", "Один слой обработки"], ["Комплаенс", "Единые правила и аудит"], ["Масштаб", "ИИ растёт без зоопарка"]];

  return (
    <>
      <CardFrame />
      <Tag x={31} y={20} width={isEn ? 94 : 84}>{isEn ? "03 GUARDRAILS" : "03 ГАРАНТИИ"}</Tag>
      {items.map(([title, text], index) => {
        const x = index % 2 === 0 ? 32 : 202;
        const y = index < 2 ? 132 : 216;
        return (
          <g key={title}>
            <rect x={x} y={y} width="165" height="52" rx="9" fill="#fff" stroke="#e2e2e8" />
            <text x={x + 12} y={y + 21} fill="#240cff" fontSize="13" fontWeight="700">{title}</text>
            <text x={x + 12} y={y + 38} fill="#30303a" fontSize="8.5">{text}</text>
          </g>
        );
      })}
    </>
  );
}

function LayerFour({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const rows = isEn
    ? [["Any model", "Cloud or local"], ["Your data", "Stored with you"], ["Infrastructure", "Your servers or cloud"]]
    : [["Любые модели", "Облачные и локальные"], ["Ваши данные", "Хранятся у вас"], ["Инфраструктура", "Ваши серверы или в облаке"]];

  return (
    <>
      <CardFrame />
      <Tag x={31} y={20} width={isEn ? 112 : 98}>{isEn ? "04 FOUNDATION" : "04 ФУНДАМЕНТ"}</Tag>
      {rows.map(([title, text], index) => {
        const y = 120 + index * 60;
        return (
          <g key={title}>
            <rect x="32" y={y} width="336" height="40" rx="9" fill="#fff" stroke="#e2e2e8" />
            <circle cx="51" cy={y + 20} r="10" fill="#fafaff" />
            <text x="69" y={y + 24} fill="#240cff" fontSize="14" fontWeight="700">{title}</text>
            <text x="356" y={y + 24} fill="#30303a" fontSize="8" textAnchor="end">{text}</text>
          </g>
        );
      })}
    </>
  );
}

function LayerFive({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  return (
    <>
      <CardFrame />
      <path d="M20 40V20h20M360 20h20v20M380 360v20h-20M40 380H20v-20" fill="none" stroke="#240cff" />
      <rect x="32" y="32" width="336" height="336" rx="18" fill="none" stroke="#240cff" />
      <rect x="72" y="187" width="256" height="26" rx="13" fill="#fff" stroke="#e2e2e8" />
      <text x="200" y="204" fill="#240cff" fontSize="10" fontWeight="700" textAnchor="middle">
        {isEn ? "PROTECTED COMPANY ENVIRONMENT" : "ЗАЩИЩЁННЫЙ КОНТУР КОМПАНИИ"}
      </text>
      <Tag x={106} y={329} width={52}>ON-PREM</Tag>
      <Tag x={164} y={329} width={40}>VPC</Tag>
      <Tag x={210} y={329} width={84}>{isEn ? "PRIVATE CLOUD" : "ЧАСТНОЕ ОБЛАКО"}</Tag>
    </>
  );
}

export function PlatformLayerArtwork({ index, locale }: LayerVisualProps) {
  return (
    <svg
      className="platform-layer-artwork"
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
    >
      <g className="platform-layer-artwork__surface">
        {index === 0 ? <LayerOne locale={locale} /> : null}
        {index === 1 ? <LayerTwo locale={locale} /> : null}
        {index === 2 ? <LayerThree locale={locale} /> : null}
        {index === 3 ? <LayerFour locale={locale} /> : null}
        {index === 4 ? <LayerFive locale={locale} /> : null}
      </g>
    </svg>
  );
}
