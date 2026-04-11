import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    image: "/service-individual.jpg",
    title: "Psicoterapia Individual",
    description:
      "Atendimento voltado para quem deseja cuidar da saúde emocional, lidar com dificuldades internas e desenvolver mais equilíbrio na vida.",
    tags: ["Ansiedade", "Depressão", "Baixa autoestima", "Estresse"],
  },
  {
    image: "/service-anxiety.jpg",
    title: "Ansiedade e Depressão",
    description:
      "Acompanhamento focado na compreensão e manejo de sintomas emocionais que impactam sua rotina. Identifique padrões negativos e retome o controle.",
    tags: ["Padrões negativos", "Equilíbrio emocional", "Controle"],
  },
  {
    image: "/service-relationships.jpg",
    title: "Relacionamentos e Vida Emocional",
    description:
      "Espaço terapêutico para trabalhar questões relacionadas a vínculos, afetividade e dificuldades nos relacionamentos.",
    tags: ["Dependência emocional", "Conflitos", "Autonomia"],
  },
  {
    image: "/service-development.jpg",
    title: "Desenvolvimento Pessoal",
    description:
      "Para quem busca crescimento emocional, autoconhecimento, autoconfiança e clareza de objetivos na vida.",
    tags: ["Autoconfiança", "Inteligência emocional", "Clareza"],
  },
  {
    image: "/service-online.jpg",
    title: "Atendimento Online",
    description:
      "Sessões realizadas de forma online, com a mesma qualidade e ética do atendimento presencial. Mais praticidade, conforto e privacidade.",
    tags: ["Flexibilidade", "Privacidade", "De qualquer lugar"],
  },
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

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
            Serviços
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Como posso te ajudar
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ofereço diferentes abordagens terapêuticas para atender às suas necessidades emocionais.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((s, i) => (
            <ServiceRow key={s.title} service={s} index={i} reverse={i % 2 !== 0} />
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

  return (
    <div
      ref={ref}
      className={`group flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12 bg-card rounded-3xl p-6 md:p-8 border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="w-full md:w-2/5 flex-shrink-0">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={800}
            height={512}
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-3/5">
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-secondary text-muted-foreground px-4 py-1.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
