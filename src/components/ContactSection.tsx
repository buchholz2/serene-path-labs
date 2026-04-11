import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/i18n/LanguageContext";
import { Send, CheckCircle } from "lucide-react";
import type { TranslationKey } from "@/i18n/translations";

const serviceOptionKeys: TranslationKey[] = [
  "option.anxiety",
  "option.depression",
  "option.selfEsteem",
  "option.relationships",
  "option.personalDev",
  "option.stress",
  "option.other",
];

const timeOptionKeys: TranslationKey[] = [
  "time.morning",
  "time.afternoon",
  "time.evening",
];

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
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
            {t("contact.successTitle")}
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            {t("contact.successMsg")}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-primary-dark underline hover:text-foreground transition-colors"
          >
            {t("contact.newMessage")}
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
            {t("contact.label")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("contact.name")} *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder={t("contact.namePlaceholder")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("contact.email")} *</label>
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

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t("contact.phone")}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              {t("contact.helpLabel")} <span className="text-muted-foreground font-normal">{t("contact.helpHint")}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {serviceOptionKeys.map((key) => {
                const label = t(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleService(label)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.services.includes(label)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              {t("contact.timesLabel")} <span className="text-muted-foreground font-normal">{t("contact.timesHint")}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {timeOptionKeys.map((key) => {
                const label = t(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleTime(label)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.preferredTimes.includes(label)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("contact.messageLabel")} <span className="text-muted-foreground font-normal">{t("contact.messageOptional")}</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              placeholder={t("contact.messagePlaceholder")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {t("contact.submit")}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            {t("contact.whatsappAlt")} <a href="https://wa.me/5541991681082" target="_blank" rel="noopener noreferrer" className="text-primary-dark hover:underline">(41) 99168-1082</a>
          </p>
        </form>
      </div>
    </section>
  );
}
