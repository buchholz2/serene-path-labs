import { CalendarCheck, MessageCircle, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: CalendarCheck,
    title: "Agende",
    description: "Entre em contato pelo Instagram e escolha o melhor horário para você.",
  },
  {
    icon: MessageCircle,
    title: "Primeira Sessão",
    description: "Conheça o espaço terapêutico e compartilhe suas demandas em um ambiente acolhedor.",
  },
  {
    icon: TrendingUp,
    title: "Acompanhamento",
    description: "Sessões contínuas com estratégias práticas para promover mudanças reais na sua vida.",
  },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="como-funciona" className="bg-card py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary-dark font-medium text-sm tracking-widest uppercase mb-3">
            Como Funciona
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Três passos simples
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary-dark" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
