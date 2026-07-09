export default function CasesIntroSection() {
  return (
    <section
      id="cases-intro"
      data-landing-section
      data-nav-section="cases"
      className="hero-grid min-h-[100svh] w-full overflow-hidden bg-white"
    >
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-5 pb-10 pt-16 sm:px-8 sm:pt-24 lg:px-[100px] lg:pb-[100px] lg:pt-[100px]">
        <div className="flex items-center gap-3 text-[14px] font-medium uppercase leading-none tracking-[0] text-[#868686]">
          <span className="h-[10px] w-[10px] shrink-0 bg-[#240CFF]" />
          <span>CENTURY / ПЛАТФОРМА</span>
        </div>

        <div className="flex flex-1 items-center justify-center py-14 sm:py-16 lg:-mt-14 lg:py-0">
          <div className="w-full text-center">
            <h2 className="text-[clamp(54px,12vw,160px)] font-bold leading-[0.9] tracking-[0] text-black">
              <span className="block">ИИ, который</span>
              <span className="block text-[#240CFF]">работает</span>
            </h2>

            <p className="mx-auto mt-9 max-w-[850px] text-[20px] font-normal leading-[1.2] tracking-[0] text-[#868686] sm:mt-12 sm:text-[22px] lg:mt-[81px] lg:text-[26px]">
              Пять реальных кейсов, где платформа превращает модели в
              результат для бизнеса
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
