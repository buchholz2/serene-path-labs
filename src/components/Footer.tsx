import { Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-xl font-semibold text-background mb-1">
              Arnaldo Antunes
            </p>
            <p className="text-sm">Psicólogo — CRP 08/37610</p>
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
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-background/10 text-center text-xs text-background/50">
          © {new Date().getFullYear()} Arnaldo Antunes — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
