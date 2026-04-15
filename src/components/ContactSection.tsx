import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/i18n/LanguageContext";
import { GOOGLE_FORM_URL } from "@/lib/constants";
import { Send, CheckCircle, ExternalLink } from "lucide-react";
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
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [] as TranslationKey[],
    preferredTimes: [] as TranslationKey[],
    message: "",
    website: "",
  });

  const toggleService = (service: TranslationKey) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const toggleTime = (time: TranslationKey) => {
    setFormData((prev) => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(time)
        ? prev.preferredTimes.filter((t) => t !== time)
        : [...prev.preferredTimes, time],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      services: formData.services.map((key) => t(key)),
      preferredTimes: formData.preferredTimes.map((key) => t(key)),
      message: formData.message.trim(),
      lang,
      website: formData.website,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        if (data?.error === "too_many_requests") {
          throw new Error("too_many_requests");
        }

        throw new Error("send_failed");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        services: [],
        preferredTimes: [],
        message: "",
        website: "",
      });
    } catch (error) {
      if (error instanceof Error && error.message === "too_many_requests") {
        setErrorMessage(t("contact.sendTooManyRequests"));
      } else {
        setErrorMessage(t("contact.sendError"));
      }
    } finally {
      setIsSubmitting(false);
    }
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
          <p className="text-sm text-muted-foreground mb-6">
            {t("contact.whatsappAlt")}{" "}
            <a
              href="https://wa.me/5541988713305"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark hover:underline"
            >
              {t("contact.whatsappNumber")}
            </a>
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
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("contact.name")} *</label>
              <input
                type="text"
                required
                minLength={2}
                autoComplete="name"
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
                autoComplete="email"
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
              autoComplete="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder={t("contact.phonePlaceholder")}
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
                    onClick={() => toggleService(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.services.includes(key)
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
                    onClick={() => toggleTime(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.preferredTimes.includes(key)
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
              maxLength={2000}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              placeholder={t("contact.messagePlaceholder")}
            />
          </div>

          {errorMessage ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? t("contact.submitLoading") : t("contact.submit")}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            {t("contact.fallbackGoogleForm")}{" "}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark hover:underline inline-flex items-center gap-1"
            >
              {t("contact.openGoogleForm")} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </p>

          <p className="text-center text-xs text-muted-foreground">
            {t("contact.whatsappAlt")} <a href="https://wa.me/5541988713305" target="_blank" rel="noopener noreferrer" className="text-primary-dark hover:underline">{t("contact.whatsappNumber")}</a>
          </p>
        </form>
      </div>
    </section>
  );
}
