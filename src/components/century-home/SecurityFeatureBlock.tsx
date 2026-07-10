import Image from "next/image";

const securityFeatures = [
  {
    number: "01",
    title: "РАЗМЕЩЕНИЕ",
    description: "Изолированный экземпляр\nна ваших серверах",
  },
  {
    number: "02",
    title: "ЛОКАЛЬНАЯ\nОБРАБОТКА",
    description: "AI-модели, запросы\nи результаты остаются\nвнутри вашего контура.",
  },
  {
    number: "03",
    title: "ИНТЕГРАЦИЯ С\nСИСТЕМАМИ",
    description: "Подключение\nк внутренним базам\nи корпоративным сервисам.",
  },
  {
    number: "04",
    title: "АУДИТ, ЛОГИ И\nСООТВЕТСТВИЕ",
    description: "Соответствие требованиям\nнационального регулятора.",
  },
] as const;

export default function SecurityFeatureBlock() {
  return (
    <section
      id="security"
      data-landing-section
      className="w-full py-16 sm:py-20 lg:py-[130px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(154, 162, 198, 0.38) 1.7px, transparent 1.8px), linear-gradient(to top right, #0B0F28 0%, #080A19 100%)",
        backgroundPosition: "0 0, center",
        backgroundSize: "40px 40px, cover",
        backgroundRepeat: "repeat, no-repeat",
        backgroundColor: "#0B0F28",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
        <div className="overflow-hidden border border-[#151923] bg-[#03070F]">
          <div className="px-5 pb-14 pt-12 sm:px-9 sm:pb-18 sm:pt-15 lg:pb-21">
            <h2 className="text-[34px] font-bold leading-none text-white sm:text-[40px]">
              Безопасность
            </h2>

            <p className="mt-4 max-w-[1290px] text-[21px] font-light leading-[1.28] sm:text-[24px] lg:text-[28px]">
              <span className="font-bold text-white">Century</span>{" "}
              <span className="font-light leading-[1.28] text-[#C6C5D7]">
                становится частью вашей ИТ-среды — без выноса критичных процессов
              за пределы контролируемого контура.
              </span>
            </p>
          </div>

          <div className="grid border-t border-[#343942] md:grid-cols-2 lg:grid-cols-4">
            {securityFeatures.map((feature, index) => (
              <article
                key={feature.number}
                className={`px-4 pb-12 pt-4 sm:px-5 sm:pb-16 lg:min-h-[312px] lg:px-3.5 lg:pb-17 lg:pt-3.5 ${
                  index > 0 ? "lg:border-l lg:border-[#343942]" : ""
                } ${index > 1 ? "md:border-t md:border-[#343942] lg:border-t-0" : ""}`}
              >
                <div className="text-[28px] font-semibold leading-none text-white sm:text-[32px]">
                  {feature.number}
                </div>

                <h3 className="mt-5 whitespace-pre-line text-[20px] font-bold uppercase leading-[1.12] text-white sm:text-[22px] lg:mt-6 sm:min-h-[64px] lg:text-[24px]">
                  {feature.title}
                </h3>

                <p className="mt-6 whitespace-pre-line text-[16px] font-normal leading-[1.25] text-[#FFFFFF] sm:text-[18px] lg:mt-[32px] lg:text-[20px] lg:leading-[1.18]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside
          className="mt-14 border border-[#ACACAC4D] shadow-[0_4px_4px_rgba(0,0,0,0.25)] grid gap-8 bg-[linear-gradient(to_top_right,#080A19_0%,#0B0F28_100%)] rounded-[6px] px-6 pt-9 sm:mt-[75px] sm:px-8 sm:pt-10 lg:mt-[75px] lg:grid-cols-[150px_minmax(0,1fr)] lg:items-center lg:px-6 lg:pt-[34px] pb-[24px]">
          <Image
            src="/hoster-icon.svg"
            alt="hoster.by"
            width={150}
            height={48}
            className="h-auto w-[132px] sm:w-[150px]"
          />

          <div>
            <h3 className="text-[24px] font-bold leading-[1.15] text-white sm:text-[28px]">
              Стратегический инфраструктурный партнёр
            </h3>

            <p className="mt-5 w-full max-w-[1000px] text-[18px] font-light leading-[100%] tracking-[2%] text-[#C6C5D7]">
              Крупнейший локальный облачный провайдер. Совместное предложение
              для клиентов: платформа + инфраструктура в одном пакете.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
