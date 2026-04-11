import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Cuidar da saúde emocional é um passo essencial para viver com mais equilíbrio,
              clareza e bem-estar. Meu trabalho é oferecer um espaço acolhedor, seguro e baseado
              na ciência, onde você possa compreender melhor seus pensamentos, emoções e comportamentos.
            </p>
            <p>
              Atuo com a <strong className="text-foreground">Terapia Cognitivo-Comportamental (TCC)</strong> e
              a <strong className="text-foreground">Análise do Comportamento Aplicada (ABA)</strong>, com
              foco em atendimentos online, ajudando pessoas a lidarem com desafios emocionais do dia a dia
              de forma prática e eficaz — atendendo pacientes em todo o Brasil e também no exterior.
            </p>
            <p>
              Acredito em um atendimento humanizado, individualizado e focado em resultados reais,
              respeitando sua história e seu tempo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
