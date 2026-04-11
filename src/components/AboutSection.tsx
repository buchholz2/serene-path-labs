import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCap, Globe, Award } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Formação Acadêmica",
    text: "Graduado em Psicologia (UNAMA) e Especialista em Intervenção ABA pelo CBI of Miami (EUA)",
  },
  {
    icon: Award,
    title: "Experiência Clínica",
    text: "Atuação em clínicas de referência com TCC, ABA e atendimento a diversas demandas emocionais",
  },
  {
    icon: Globe,
    title: "Atendimento Internacional",
    text: "Atendo pacientes no Brasil e no exterior, com sessões em português e inglês",
  },
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sobre" className="bg-card py-20 md:py-28">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Photo */}
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

        {/* Text */}
        <div>
          <p className="text-primary-dark font-medium text-sm tracking-widest uppercase mb-3">
            Sobre Mim
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Um espaço acolhedor para você
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
            <p>
              Sou psicólogo graduado pela <strong className="text-foreground">Universidade da Amazônia (UNAMA)</strong> e 
              especialista em <strong className="text-foreground">Intervenção ABA para Autismo e Deficiência Intelectual</strong> pelo 
              CBI of Miami (EUA). Atuo com a <strong className="text-foreground">Terapia Cognitivo-Comportamental (TCC)</strong> e 
              a <strong className="text-foreground">Análise do Comportamento Aplicada (ABA)</strong>.
            </p>
            <p>
              Com experiência em clínicas de referência e atendimento a diversas demandas emocionais, 
              ofereço um espaço terapêutico seguro, humanizado e baseado em evidências científicas — 
              atendendo pacientes em todo o Brasil e também no exterior, com sessões em português e inglês.
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary-dark" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{h.title}</p>
                    <p className="text-muted-foreground text-sm">{h.text}</p>
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
