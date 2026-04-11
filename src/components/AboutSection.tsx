import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/i18n/LanguageContext";
import { GraduationCap, Globe, Award } from "lucide-react";
import type { TranslationKey } from "@/i18n/translations";

const highlights: { icon: typeof GraduationCap; titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { icon: GraduationCap, titleKey: "about.highlight1.title", textKey: "about.highlight1.text" },
  { icon: Award, titleKey: "about.highlight2.title", textKey: "about.highlight2.text" },
  { icon: Globe, titleKey: "about.highlight3.title", textKey: "about.highlight3.text" },
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section id="sobre" className="bg-card py-20 md:py-28">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary rounded-[2rem] rotate-3" />
            <img
              src="/about-photo.png"
              alt="Arnaldo Antunes fazendo anotações durante sessão"
              className="relative w-full max-w-sm rounded-[1.5rem] object-cover shadow-xl"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <p className="text-primary-dark font-medium text-sm tracking-widest uppercase mb-3">
            {t("about.label")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t("about.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
            <p dangerouslySetInnerHTML={{ __html: t("about.p1") }} />
            <p>{t("about.p2")}</p>
          </div>

          <div className="space-y-4">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.titleKey} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary-dark" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{t(h.titleKey)}</p>
                    <p className="text-muted-foreground text-sm">{t(h.textKey)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
