import prisma from "@/lib/prisma"
import { TestimonialsGrid } from "./testimonials-grid"

export async function TestimonialsSection() {
  const feedbacks = await prisma.feedback.findMany({
    where: { approved: true }, // Apenas aprovados
    orderBy: { createdAt: "desc" }
  })

  return (
    <section className="relative min-h-screen bg-bb-semidark text-bb-white py-32 px-6 overflow-hidden z-20 border-t-8 border-bb-dark">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div>
            <h2 className="text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-black uppercase tracking-tighter mb-4 text-bb-white">
              Voz da <br/> <span className="text-bb-impacto">Máquina.</span>
            </h2>
            <p className="text-xl text-bb-variante max-w-lg">O impacto da nossa engenharia nas operações de quem confia no nosso código.</p>
          </div>
        </div>

        {/* Componente Client que lida com o Grid e o Modal de Novo Feedback */}
        <TestimonialsGrid feedbacks={feedbacks} />
      </div>
    </section>
  )
}