import { useLanguage } from "@/i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute -top-20 -right-32 w-[500px] h-[500px] bg-primary/10 clip-blob-2 blur-sm" />
      <div className="absolute -bottom-20 -left-32 w-[400px] h-[400px] bg-secondary clip-blob-2" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 md:order-1">
          <p className="text-primary-dark font-medium text-sm tracking-widest uppercase mb-4">
            {t("hero.subtitle")}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Arnaldo<br />Antunes
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contato"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              {t("hero.cta")}
            </a>
            <a
              href="#servicos"
              className="border-2 border-primary text-primary-dark px-8 py-3.5 rounded-full font-medium hover:bg-primary/10 transition-colors"
            >
              {t("hero.services")}
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 bg-primary/15 rounded-[40%_60%_55%_45%/50%_40%_60%_50%]" />
            <img
              src="/hero-banner.png"
              alt="Psicólogo Arnaldo Antunes"
              className="relative w-full rounded-[40%_60%_55%_45%/50%_40%_60%_50%] object-cover object-top h-[500px] sm:h-[550px] lg:h-[600px]"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60C360 120 720 0 1080 60C1260 90 1380 80 1440 70V120H0V60Z" fill="hsl(0 0% 100%)" />
        </svg>
      </div>
    </section>
  );
}
