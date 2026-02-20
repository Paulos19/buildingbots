import prisma from "@/lib/prisma"
import { PortfolioGrid } from "./portfolio-grid"

export async function PortfolioSection() {
  // Busca direta e ultra-rápida no banco de dados usando Prisma
  // Trazemos apenas os projetos ativos e ordenados pelos mais recentes
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <section className="relative min-h-screen w-full bg-bb-white py-32 px-6 overflow-hidden z-20">
      {/* Padrão de Fundo Sutil (Grid) */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#000E2108_1px,transparent_1px),linear-gradient(to_bottom,#000E2108_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Cabeçalho da Secção */}
        <div className="mb-20">
          <h2 className="text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-black uppercase tracking-tighter text-bb-dark mb-6">
            Obras <br />
            <span className="text-bb-destaque stroke-text-dark">Concluídas.</span>
          </h2>
          <div className="w-24 h-4 bg-bb-impacto mb-6" />
          <p className="text-xl md:text-2xl font-bold text-bb-semidark max-w-2xl">
            Sistemas em produção. Código limpo, infraestrutura blindada e automações que escalam negócios.
          </p>
        </div>

        {/* Injeção do Client Component com os dados */}
        <PortfolioGrid projects={projects} />
      </div>
    </section>
  )
}