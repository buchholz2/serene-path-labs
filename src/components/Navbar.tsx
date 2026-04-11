import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const linkKeys = [
  { key: "nav.home" as const, href: "#inicio" },
  { key: "nav.about" as const, href: "#sobre" },
  { key: "nav.services" as const, href: "#servicos" },
  { key: "nav.howItWorks" as const, href: "#como-funciona" },
  { key: "nav.contact" as const, href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="Logo" className="w-9 h-9 object-contain" />
          <span className="font-serif text-xl font-semibold text-foreground">Arnaldo Antunes</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {linkKeys.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(l.key)}
            </a>
          ))}

          {/* Language selector */}
          <div className="flex items-center gap-1 border border-border rounded-full px-1 py-0.5">
            <button
              onClick={() => setLang("pt")}
              className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                lang === "pt" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLang("en")}
              className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="#contato"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            {t("nav.cta")}
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border px-6 pb-6">
          {linkKeys.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(l.key)}
            </a>
          ))}
          {/* Mobile language selector */}
          <div className="flex items-center gap-2 py-3">
            <button
              onClick={() => setLang("pt")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                lang === "pt" ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground border-border"
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLang("en")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                lang === "en" ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground border-border"
              }`}
            >
              EN
            </button>
          </div>
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium"
          >
            {t("nav.cta")}
          </a>
        </div>
      )}
    </nav>
  );
}
