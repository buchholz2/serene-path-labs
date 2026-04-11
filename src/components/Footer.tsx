import { Instagram } from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left flex items-center gap-3">
            <img src="/logo-icon.png" alt="Logo" className="w-10 h-10 object-contain brightness-0 invert opacity-80" />
            <div>
              <p className="font-serif text-xl font-semibold text-background mb-1">
                Arnaldo Antunes
              </p>
              <p className="text-sm">Psicólogo — CRP 08/37610</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-background transition-colors"
            >
              <Instagram size={20} />
              <span className="text-sm">@psicologoarnaldoantunes</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-background transition-colors"
            >
              <span className="text-sm">(41) 99168-1082</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-background/10 text-center text-xs text-background/50">
          © {new Date().getFullYear()} Arnaldo Antunes — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
