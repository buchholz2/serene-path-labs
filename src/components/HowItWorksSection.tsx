import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageCircle, Video, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Entre em Contato",
    description: "Preencha o formulário ou envie uma mensagem. Vou entender suas necessidades e encontrar o melhor horário.",
  },
  {
    icon: Video,
    title: "Primeira Sessão",
    description: "Conheça o espaço terapêutico online. Juntos, vamos traçar um plano de acompanhamento personalizado.",
  },
  {
    icon: Sparkles,
    title: "Transformação",
    description: "Com sessões contínuas e estratégias práticas, você vai desenvolver ferramentas para uma vida mais equilibrada.",
  },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="como-funciona" className="bg-card py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 clip-blob-2" />

      <div className="max-w-5xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary-dark font-medium text-sm tracking-widest uppercase mb-3">
            Como Funciona
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Sua jornada de transformação
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Um processo simples e acolhedor para você dar o primeiro passo.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line behind the icons */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-primary/20 z-0" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Icon circle */}
      <div className="relative mb-6 z-20">
        <div className="w-24 h-24 rounded-full bg-card shadow-md flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/15 to-secondary flex items-center justify-center">
            <Icon className="w-10 h-10 text-primary-dark" strokeWidth={1.5} />
          </div>
        </div>
        {/* Step number badge */}
        <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow">
          {index + 1}
        </span>
      </div>

      <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
        {step.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
        {step.description}
      </p>
    </div>
  );
}
