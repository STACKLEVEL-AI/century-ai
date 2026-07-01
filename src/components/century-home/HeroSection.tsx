export default function HeroSection() {
  return (
    <section className="relative hero-grid flex h-screen  flex-col lg:pt-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between px-5 sm:px-8 lg:px-[100px]">
        <div className="flex justify-end">
          <h1 className="max-w-[604px] text-right text-[clamp(34px,8vw,60px)] font-normal uppercase leading-[1] tracking-[0.02em] [font-family:var(--font-lato)]">
            Бизнес будущего
          </h1>
        </div>

        <div className="mb-14 pt-16 sm:mb-20 sm:pt-24 lg:mb-[100px] lg:pt-32">
          <p className="select-none text-[clamp(64px,15vw,180px)] font-[600] uppercase leading-[0.92] tracking-[0] [font-family:var(--font-lato)]">
            Century
          </p>
        </div>
      </div>
    </section>
  );
}
