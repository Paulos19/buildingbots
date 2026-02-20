import { ReactNode } from "react"

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-bb-white text-bb-dark selection:bg-bb-impacto selection:text-bb-dark">
      {/* Overlay de Textura Mid-Century */}
      <div className="bg-noise fixed inset-0 z-50 pointer-events-none" />
      
      {/* Aqui entraria a Navigation/Header global da LP futuramente */}
      
      <main className="relative w-full">
        {children}
      </main>
    </div>
  )
}