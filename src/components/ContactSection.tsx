import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Send, CheckCircle } from "lucide-react";

const serviceOptions = [
  "Ansiedade",
  "Depressão",
  "Baixa autoestima",
  "Relacionamentos",
  "Desenvolvimento pessoal",
  "Estresse e sobrecarga",
  "Outro",
];

const timeOptions = [
  "Manhã (8h - 12h)",
  "Tarde (13h - 17h)",
  "Noite (18h - 21h)",
];

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [] as string[],
    preferredTimes: [] as string[],
    message: "",
  });

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const toggleTime = (time: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(time)
        ? prev.preferredTimes.filter((t) => t !== time)
        : [...prev.preferredTimes, time],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent("Solicitação de Agendamento - Psicólogo Arnaldo Antunes");
    const body = encodeURIComponent(
      `Nome: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Telefone: ${formData.phone}\n` +
      `Áreas de interesse: ${formData.services.join(", ") || "Não informado"}\n` +
      `Horários preferidos: ${formData.preferredTimes.join(", ") || "Não informado"}\n` +
      `Mensagem: ${formData.message || "Sem mensagem adicional"}`
    );

    window.open(`mailto:contato@psicologoarnaldoantunes.com.br?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contato" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            Mensagem preparada!
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Seu aplicativo de email deve ter aberto com os dados preenchidos. 
            Caso não tenha aberto, entre em contato pelo WhatsApp: (41) 99168-1082.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-primary-dark underline hover:text-foreground transition-colors"
          >
            Enviar nova mensagem
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 clip-blob-2" />
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-secondary clip-blob-2" />

      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-primary-dark font-medium text-sm tracking-widest uppercase mb-3">
            Contato
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Agende sua sessão
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Preencha o formulário abaixo e entrarei em contato para confirmar o agendamento.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border space-y-6">
          {/* Name & Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nome completo *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Telefone / WhatsApp</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Em que posso te ajudar? <span className="text-muted-foreground font-normal">(selecione uma ou mais opções)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleService(s)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    formData.services.includes(s)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred times */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Horários de preferência <span className="text-muted-foreground font-normal">(selecione os que funcionam para você)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTime(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    formData.preferredTimes.includes(t)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Mensagem adicional <span className="text-muted-foreground font-normal">(opcional)</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              placeholder="Conte um pouco sobre o que você está buscando..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar Solicitação
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Ou entre em contato pelo WhatsApp: <a href="https://wa.me/5541991681082" target="_blank" rel="noopener noreferrer" className="text-primary-dark hover:underline">(41) 99168-1082</a>
          </p>
        </form>
      </div>
    </section>
  );
}
