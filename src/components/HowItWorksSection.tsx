import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Entre em Contato",
    description: "Preencha o formulário ou envie uma mensagem. Vou entender suas necessidades e encontrar o melhor horário.",
    color: "bg-primary/10",
  },
  {
    number: "02",
    title: "Primeira Sessão",
    description: "Conheça o espaço terapêutico online. Juntos, vamos traçar um plano de acompanhamento personalizado.",
    color: "bg-secondary",
  },
  {
    number: "03",
    title: "Transformação",
    description: "Com sessões contínuas e estratégias práticas, você vai desenvolver ferramentas para uma vida mais equilibrada.",
    color: "bg-primary/10",
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
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative inline-block mb-6">
        <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
          <span className="font-serif text-3xl font-bold text-primary-dark">{step.number}</span>
        </div>
        {index < 2 && (
          <ArrowRight className="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2 w-6 h-6 text-primary/40" />
        )}
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
