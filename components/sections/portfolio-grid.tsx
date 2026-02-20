"use client"

import { motion, Variants } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"

// Tipagem baseada no seu Prisma Schema
type Project = {
  id: string
  title: string
  description: string
  imageUrl: string
  demoUrl: string | null
  sourceUrl: string | null
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="w-full border-4 border-dashed border-bb-dark p-16 text-center bg-bb-variante/30">
        <h3 className="text-3xl font-black uppercase text-bb-dark mb-4 tracking-tighter">
          Nenhuma obra em exibição
        </h3>
        <p className="text-xl font-medium text-bb-semidark">
          A galeria aguarda os seus primeiros sistemas automatizados.
        </p>
      </div>
    )
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
    >
      {projects.map((project) => (
        <motion.article 
          key={project.id}
          variants={cardVariants}
          className="group relative flex flex-col border-4 border-bb-dark bg-bb-white shadow-[12px_12px_0px_0px_var(--color-bb-dark)] hover:shadow-[16px_16px_0px_0px_var(--color-bb-impacto)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300"
        >
          {/* Imagem do Projeto com Efeito Mid-Century */}
          <div className="relative aspect-video w-full border-b-4 border-bb-dark bg-bb-semidark overflow-hidden">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale-[50%] contrast-125 mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-700"
            />
            {/* Ruído sobre a imagem */}
            <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
          </div>

          {/* Corpo do Cartão */}
          <div className="p-6 flex flex-col flex-1 bg-bb-white">
            <h3 className="text-2xl font-black uppercase tracking-tight text-bb-dark mb-3 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-lg font-medium text-bb-semidark mb-8 line-clamp-3 flex-1">
              {project.description}
            </p>
            
            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-4 border-t-4 border-bb-dark pt-6 mt-auto">
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-bb-dark text-bb-impacto font-bold uppercase tracking-wider hover:bg-bb-semidark transition-colors"
                >
                  Live Demo <ArrowUpRight className="w-5 h-5" />
                </a>
              )}
              {project.sourceUrl && (
                <a 
                  href={project.sourceUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-bb-variante border-2 border-bb-dark text-bb-dark font-bold uppercase tracking-wider hover:bg-bb-destaque transition-colors"
                >
                  <Github className="w-5 h-5" /> Source
                </a>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}