import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const services: {
  image: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  tagKeys: TranslationKey[];
}[] = [
  {
    image: "/service-individual.jpg",
    titleKey: "service.individual.title",
    descKey: "service.individual.desc",
    tagKeys: ["tag.anxiety", "tag.depression", "tag.selfEsteem", "tag.stress"],
  },
  {
    image: "/service-anxiety.jpg",
    titleKey: "service.anxiety.title",
    descKey: "service.anxiety.desc",
    tagKeys: ["tag.negativePatterns", "tag.emotionalBalance", "tag.control"],
  },
  {
    image: "/service-relationships.jpg",
    titleKey: "service.relationships.title",
    descKey: "service.relationships.desc",
    tagKeys: ["tag.emotionalDependence", "tag.conflicts", "tag.autonomy"],
  },
  {
    image: "/service-development.jpg",
    titleKey: "service.development.title",
    descKey: "service.development.desc",
    tagKeys: ["tag.selfConfidence", "tag.emotionalIntelligence", "tag.clarity"],
  },
  {
    image: "/service-online.jpg",
    titleKey: "service.online.title",
    descKey: "service.online.desc",
    tagKeys: ["tag.flexibility", "tag.privacy", "tag.anywhere"],
  },
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section id="servicos" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 clip-blob-2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary-dark font-medium text-sm tracking-widest uppercase mb-3">
            {t("services.label")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("services.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="space-y-8">
          {services.map((s, i) => (
            <ServiceRow key={s.titleKey} service={s} index={i} reverse={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
  reverse,
}: {
  service: (typeof services)[number];
  index: number;
  reverse: boolean;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useLanguage();

  return (
    <div
      ref={ref}
      className={`group flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12 bg-card rounded-3xl p-6 md:p-8 border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="w-full md:w-2/5 flex-shrink-0">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={service.image}
            alt={t(service.titleKey)}
            className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={800}
            height={512}
          />
        </div>
      </div>

      <div className="w-full md:w-3/5">
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
          {t(service.titleKey)}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          {t(service.descKey)}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.tagKeys.map((tagKey) => (
            <span
              key={tagKey}
              className="text-xs bg-secondary text-muted-foreground px-4 py-1.5 rounded-full font-medium"
            >
              {t(tagKey)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
