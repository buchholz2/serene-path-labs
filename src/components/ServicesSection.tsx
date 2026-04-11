import { Brain, Heart, Sparkles, Users, Monitor } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Brain,
    title: "Psicoterapia Individual",
    description:
      "Atendimento voltado para quem deseja cuidar da saúde emocional, lidar com dificuldades internas e desenvolver mais equilíbrio na vida.",
    tags: ["Ansiedade", "Depressão", "Baixa autoestima", "Estresse"],
  },
  {
    icon: Heart,
    title: "Ansiedade e Depressão",
    description:
      "Acompanhamento focado na compreensão e manejo de sintomas emocionais que impactam sua rotina.",
    tags: ["Padrões negativos", "Equilíbrio emocional", "Controle"],
  },
  {
    icon: Users,
    title: "Relacionamentos",
    description:
      "Espaço terapêutico para trabalhar questões relacionadas a vínculos, afetividade e dificuldades nos relacionamentos.",
    tags: ["Dependência emocional", "Conflitos", "Autonomia"],
  },
  {
    icon: Sparkles,
    title: "Desenvolvimento Pessoal",
    description:
      "Para quem busca crescimento emocional, autoconhecimento, autoconfiança e clareza de objetivos.",
    tags: ["Autoconfiança", "Inteligência emocional", "Clareza"],
  },
  {
    icon: Monitor,
    title: "Atendimento Online",
    description:
      "Sessões realizadas de forma online, com a mesma qualidade e ética do atendimento presencial. Mais praticidade e conforto.",
    tags: ["Flexibilidade", "Privacidade", "Qualquer lugar"],
  },
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="servicos" className="py-20 md:py-28 relative">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`group bg-card rounded-2xl p-7 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary-dark" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {service.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
