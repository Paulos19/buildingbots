import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUpRight } from "lucide-react"

export default async function DashboardPage() {
  // Busca os projetos direto no banco (Server Component nativo e performático)
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end border-b-4 border-bb-dark pb-6">
        <div>
          <h1 className="text-5xl font-heading font-black uppercase text-bb-dark tracking-tighter">
            Projetos Ativos
          </h1>
          <p className="font-medium text-bb-semidark mt-2">
            Gerencie o portfólio da Building Bots.
          </p>
        </div>
        
        {/* Este botão chamará nosso Client Component de Formulário depois */}
        <Button className="gap-2">
          <Plus size={20} strokeWidth={3} /> Novo Projeto
        </Button>
      </header>

      {projects.length === 0 ? (
        <div className="border-4 border-dashed border-bb-dark p-12 text-center bg-bb-variant/50">
          <h3 className="text-2xl font-heading font-bold mb-2">Nenhum projeto encontrado.</h3>
          <p className="text-bb-semidark">Sua galeria Mid-Century aguarda a primeira obra.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="border-4 border-bb-dark bg-bb-white shadow-[8px_8px_0px_0px_var(--color-bb-impact)] transition-transform hover:-translate-y-2 flex flex-col"
            >
              <div className="aspect-video w-full border-b-4 border-bb-dark bg-bb-semidark overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-heading font-black text-xl uppercase mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-sm font-medium text-bb-semidark mb-6 line-clamp-2 flex-1">
                  {project.description}
                </p>
                
                <div className="flex gap-4 border-t-2 border-bb-dark pt-4 mt-auto">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm font-bold uppercase flex items-center gap-1 hover:text-bb-highlight transition-colors">
                      Demo <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="text-sm font-bold uppercase flex items-center gap-1 hover:text-bb-impact transition-colors">
                      Code <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
