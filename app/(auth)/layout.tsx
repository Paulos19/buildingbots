export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1. Removemos o bg-noise da div principal
    <div className="relative min-h-screen w-full flex items-center justify-center bg-bb-dark p-4 overflow-hidden">
      
      {/* 2. Camada de Ruído (Noise) isolada, cobrindo a tela sem bloquear cliques */}
      <div className="bg-noise fixed inset-0 z-50 pointer-events-none" />

      {/* Elementos geométricos decorativos Mid-Century */}
      {/* 3. Atualizamos as cores para bater 100% com os tokens do globals.css */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-bb-destaque rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-bb-impacto rounded-full mix-blend-multiply blur-3xl opacity-20" />
      
      {/* 4. O conteúdo (Formulário de Login/Setup) protegido com z-10 */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  )
}