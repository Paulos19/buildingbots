"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { Workflow, Zap, Database } from "lucide-react"

// Variantes tipadas para a animação em cascata (Stagger) da lista
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
}

const technologies = [
  {
    name: "Automação n8n",
    description: "Orquestração de workflows complexos e integrações assíncronas com zero falhas.",
    icon: <Workflow className="w-8 h-8 text-bb-impacto" />,
  },
  {
    name: "Next.js 16 Core",
    description: "Interfaces cinematográficas servidas no edge com React Server Components.",
    icon: <Zap className="w-8 h-8 text-bb-impacto" />,
  },
  {
    name: "Prisma x PostgreSQL",
    description: "Modelagem de dados blindada e escalável para aplicações enterprise.",
    icon: <Database className="w-8 h-8 text-bb-impacto" />,
  },
]

export function AutomationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Parallax suave exclusivo para a imagem da esquerda
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section 
      ref={sectionRef} 
      // O fundo amarelo cria a continuidade perfeita da expansão do círculo da Hero
      className="relative min-h-screen w-full bg-bb-impacto flex items-center justify-center py-24 px-6 overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Lado Esquerdo: A Arte Conceitual */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
          <motion.div 
            style={{ y: imageY }}
            className="absolute inset-0 border-8 border-bb-dark bg-bb-white shadow-[16px_16px_0px_0px_var(--color-bb-dark)] overflow-hidden"
          >
            {/* Imagem gerada pelo Nano Banana */}
            <img 
              src="/auto.png" 
              alt="Representação abstrata de automação de software" 
              className="w-full h-full object-cover object-center mix-blend-multiply opacity-95 grayscale-[20%] contrast-125"
            />
            
            {/* Overlay gráfico Mid-Century (Ruído extra e grid) */}
            <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwdjIwaDIwVjIwSDIweiIgZmlsbD0iIzAwMEUyMSIgZmlsbC1vcGFjaXR5PSIwLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] mix-blend-overlay" />
          </motion.div>
        </div>

        {/* Lado Direito: Tipografia e Tecnologias */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-black uppercase tracking-tighter text-bb-dark mb-6">
              A Máquina <br />
              <span className="text-bb-white stroke-text-dark">Por Dentro.</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold text-bb-semidark mb-12 max-w-xl border-l-4 border-bb-dark pl-6">
              Não construímos apenas interfaces bonitas. Desenhamos arquiteturas que automatizam o seu negócio de ponta a ponta.
            </p>
          </motion.div>

          <motion.ul 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="flex flex-col gap-6"
          >
            {technologies.map((tech, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                className="flex items-start gap-6 p-6 border-4 border-bb-dark bg-bb-dark text-bb-white shadow-[8px_8px_0px_0px_var(--color-bb-white)] hover:translate-x-2 transition-transform duration-300"
              >
                <div className="shrink-0 p-3 bg-bb-white/10 border-2 border-bb-white/20">
                  {tech.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-black uppercase tracking-wide text-bb-impacto">
                    {tech.name}
                  </h3>
                  <p className="text-bb-variante font-medium text-lg leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

      </div>
    </section>
  )
}