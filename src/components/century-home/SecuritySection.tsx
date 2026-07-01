const departmentGroups = [
  {
    title: "Отделы и процессы",
    items: ["Продажи", "Маркетинг", "Поддержка", "Финансы", "Юристы"],
  },
  {
    title: "Системы",
    items: ["CRM", "ERP", "HRM", "BI", "1C"],
  },
  {
    title: "Цифровые продукты",
    items: ["Мобильные сервисы", "Маркетплейс", "Веб-приложения"],
  },
] as const;

const platformCapabilities = [
  {
    title: "Чат",
    description: "Сотрудники общаются с ИИ",
  },
  {
    title: "Конструктор",
    description: "Автоматизации создаёте сами",
  },
  {
    title: "API",
    description: "Интеграция со всем",
  },
] as const;

const platformBenefits = [
  {
    title: "Безопасность",
    description: "Данные не покидают контур",
  },
  {
    title: "Единые данные",
    description: "Один слой обработки",
  },
  {
    title: "Комплаенс",
    description: "Единые правила и аудит",
  },
  {
    title: "Масштаб",
    description: "ИИ растёт без зоопарка",
  },
] as const;

const platformBase = [
  {
    title: "Любые модели",
    description: "Облачные и локальные",
  },
  {
    title: "Ваши данные",
    description: "Хранятся у вас",
  },
  {
    title: "Инфраструктура",
    description: "Ваши серверы или в облаке",
  },
] as const;

function GroupCard({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <article className="h-full w-full rounded-[10px] border border-[#3A32FF] bg-white px-[14px] py-3 shadow-[0_10px_22px_rgba(58,50,255,0.06)] xl:max-w-[360px]">
      <h3 className="text-[22px] font-bold leading-[1.05] tracking-[0.03em] text-[#240CFF] sm:text-[24px] lg:text-[28px]">
        {title}
      </h3>

      <div className="mt-[13px] flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-[10px] border border-[#ACACAC4D] bg-[#EFEFEF] p-[6.5px] text-center text-[13px] leading-none tracking-[0.02em] text-[#202020] sm:min-w-[70px] sm:text-[14px] lg:text-[16px]"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function SecuritySection() {
  return (
    <section className="hero-grid w-full pb-16 pt-10 sm:pb-20 lg:pt-25 lg:pb-25">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
        <div className="mx-0 rounded-[20px] border border-dashed border-[#240CFF] bg-[#240CFF08] pb-5 sm:pb-8">
          <div className="relative -mt-4 ml-4 w-[calc(100%-2rem)] max-w-[242px] rounded-full bg-white px-2 py-2 text-[14px] leading-none tracking-[-0.02em] text-[#1C1C1C] sm:ml-8 sm:text-[16px]">
            Защищённый контур компании
          </div>

          <div
            className="rounded-[24px]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(82, 79, 255, 0.18) 1.4px, transparent 1.4px)",
              backgroundSize: "42px 42px",
            }}
          >
            <div className="mt-8 flex h-auto flex-col overflow-hidden sm:mt-10 lg:mt-13 xl:max-h-[300px] lg:overflow-hidden">
              <div className="relative z-10 grid gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:px-10 max-xl:mb-10 xl:grid-cols-3">
                {departmentGroups.map((group) => (
                  <GroupCard
                    key={group.title}
                    title={group.title}
                    items={group.items}
                  />
                ))}
              </div>

              <div data-dc-tpl="38" className="relative mx-0 mb-0 mt-0.5 hidden h-[88px] justify-end xl:block">
                <svg
                  data-dc-tpl="39"
                  viewBox="0 0 1144 88"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full overflow-visible"
                >
                  <g
                    data-dc-tpl="40"
                    strokeDasharray="4 8"
                    className="fill-none stroke-[#240cff] [stroke-width:1.4]"
                  >
                    <path
                      data-dc-tpl="41"
                      d="M 100 0 C 100 52, 572 38, 572 88"
                      className="cy-flow opacity-40"
                    />
                    <path
                      data-dc-tpl="42"
                      d="M 184 0 C 184 48, 572 38, 572 88"
                      className="cy-flow opacity-[.62] [animation-delay:.2s]"
                    />
                    <path
                      data-dc-tpl="43"
                      d="M 268 0 C 268 52, 572 38, 572 88"
                      className="cy-flow opacity-40 [animation-delay:.4s]"
                    />
                    <path
                      data-dc-tpl="44"
                      d="M 572 0 L 572 88"
                      className="cy-flow opacity-75 [animation-delay:.1s]"
                    />
                    <path
                      data-dc-tpl="45"
                      d="M 876 0 C 876 52, 572 38, 572 88"
                      className="cy-flow opacity-40 [animation-delay:.5s]"
                    />
                    <path
                      data-dc-tpl="46"
                      d="M 960 0 C 960 48, 572 38, 572 88"
                      className="cy-flow opacity-[.62] [animation-delay:.3s]"
                    />
                    <path
                      data-dc-tpl="47"
                      d="M 1044 0 C 1044 52, 572 38, 572 88"
                      className="cy-flow opacity-40 [animation-delay:.6s]"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="relative mx-3 rounded-[20px] border border-[#9B9B9B] bg-[#240CFF0A] px-3 py-[17px] sm:mx-[18px] sm:px-[18px]">
              <div className="absolute left-1/2 top-0 h-7 w-px -translate-x-1/2 -translate-y-full bg-[#AFAFAF]" />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="cy-node-pulse absolute inset-[-12px] rounded-full bg-[radial-gradient(circle,rgba(36,12,255,0.28),transparent_70%)]" />
                <div className="absolute inset-[-5px] rounded-full border border-[#240CFF59]" />
                <svg
                  viewBox="0 0 20 20"
                  className="cy-circlet absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_2px_10px_rgba(36,12,255,0.55)]"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="6"
                    fill="#240cff"
                  />
                  <circle cx="10" cy="10" r="2" fill="#ffffff" />
                </svg>
              </div>

                <div className="rounded-[10px] bg-[linear-gradient(135deg,#2410FF_0%,#3928FF_52%,#2200FF_100%)] px-[14px] pb-[22px] pt-[13px] text-white">
                  <div className="max-w-[680px]">
                  <div className="text-[36px] font-semibold uppercase leading-none tracking-[-0.02em] sm:text-[42px] lg:text-[48px]">
                    CENTURY
                  </div>
                  <p className="mt-[13px] text-[16px] leading-[1.15] tracking-[0.02em] text-[#FFFFFF]">
                    Единая точка входа для ИИ в компании
                  </p>
                </div>

                <div className="mt-[26px] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {platformCapabilities.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[5px] bg-white px-[14px] pb-[20px] pt-[10px] text-[#1A1A1A]"
                    >
                      <h4 className="text-[24px] font-bold tracking-[0.04em] text-[#240CFF] lg:text-[28px]">
                        {item.title}
                      </h4>
                      <p className="mt-4 text-[16px] leading-[1.2] tracking-[0.02em] text-[#000000]">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid overflow-hidden rounded-[4px] border border-[#B8B8B8] bg-white sm:grid-cols-2 lg:grid-cols-4">
                {platformBenefits.map((item) => (
                  <article
                    key={item.title}
                    className="border-b border-[#B8B8B8] p-4 last:border-b-0 sm:p-5 lg:border-b-0 lg:border-r lg:last:border-r-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#240CFF]" />
                      <div>
                        <h4 className="text-[18px] font-bold leading-none tracking-[0.04em] text-[#240CFF] lg:text-[20px]">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-[14px] font-normal leading-[1.2] tracking-[0.02em] text-[#000000]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-[23px] flex justify-center">
                <div className="rounded-[20px] bg-white px-5 py-2 text-center text-[14px] leading-none tracking-[0.02em] text-[#000000] sm:px-8 sm:text-[16px]">
                  Фундамент платформы
                </div>
              </div>

              <div className="mt-[23px] grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {platformBase.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[10px] border border-[#9B9B9B] bg-white px-2.5 py-3.5"
                  >
                    <h4 className="text-[24px] font-bold leading-none tracking-[0.04em] text-[#240CFF] lg:text-[28px]">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-[16px] leading-[1.2] tracking-[0.02em] text-[#000000]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

