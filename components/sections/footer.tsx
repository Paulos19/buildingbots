import { MessageCircle } from "lucide-react"

export function Footer() {
  // Coloque aqui o número do Daniel com código do país (ex: 5511999999999)
  const whatsappNumber = "5511000000000" 
  const whatsappMessage = encodeURIComponent("Olá Daniel, vi a Landing Page da Building Bots e gostaria de falar sobre um projeto.")

  return (
    <footer className="w-full bg-bb-dark border-t-8 border-bb-white text-bb-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Logo/Branding */}
        <div className="flex flex-col text-center md:text-left">
          <span className="text-3xl font-black uppercase tracking-tighter text-bb-impacto">
            Building Bots.
          </span>
          <span className="text-sm font-bold tracking-widest uppercase text-bb-variante mt-2">
            Engenharia Bruta © {new Date().getFullYear()}
          </span>
        </div>

        {/* Botão de WhatsApp Direto */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 bg-[#25D366] text-bb-dark px-8 py-4 font-black uppercase tracking-wider hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_#E8EEFC]"
        >
          <MessageCircle size={24} /> Falar com o Daniel
        </a>

      </div>
    </footer>
  )
}