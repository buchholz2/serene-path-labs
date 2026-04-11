import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WHATSAPP_URL } from "@/lib/constants";

export default function CtaSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 clip-blob-2" />
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-secondary clip-blob-2" />

      <div
        ref={ref}
        className={`max-w-2xl mx-auto px-6 text-center relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Dê o primeiro passo para cuidar de você
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Juntos, podemos construir estratégias para promover mais qualidade de vida e bem-estar emocional.
          Agende sua sessão online agora.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full text-lg font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
        >
          Agende sua Sessão
        </a>
      </div>
    </section>
  );
}
