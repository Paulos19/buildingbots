"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax agressivo para criar a sensação de "camadas"
  const yText = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const yGraphic = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"])

  return (
    <section ref={ref} className="relative w-full min-h-screen bg-bb-white text-bb-dark overflow-hidden flex items-center py-24 px-6 z-20">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Bloco de Copy Brutalista */}
        <motion.div style={{ y: yText }} className="flex flex-col relative z-10">
          <h2 className="text-xl font-bold uppercase tracking-widest text-bb-destaque mb-4">O Manifesto</h2>
          <h3 className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] font-black uppercase tracking-tighter mb-8">
            Nascemos da <br/> frustração com <br/> <span className="text-bb-impacto stroke-text-dark">o genérico.</span>
          </h3>
          <div className="space-y-6 text-lg md:text-xl font-medium text-bb-semidark border-l-4 border-bb-dark pl-6">
            <p>
              A Building Bots não é uma agência tradicional. Somos uma boutique de engenharia focada em extrair o caos das operações empresariais e injetar automação cirúrgica.
            </p>
            <p>
              Enquanto o mercado entrega templates frágeis, nós construímos infraestruturas blindadas com <strong>Next.js</strong> e orquestramos integrações complexas com <strong>n8n</strong>. 
            </p>
            <p className="font-bold text-bb-dark">
              Nós não fazemos apenas sites. Nós construímos máquinas.
            </p>
          </div>
        </motion.div>

        {/* Gráfico Geométrico Decorativo */}
        <motion.div style={{ y: yGraphic }} className="relative h-full min-h-[500px] w-full hidden lg:block">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-bb-variante rounded-full mix-blend-multiply blur-3xl opacity-50" />
          <div className="absolute inset-4 border-8 border-bb-dark bg-bb-semidark shadow-[20px_20px_0px_0px_var(--color-bb-impacto)] flex items-center justify-center p-12">
            <div className="w-full h-full border-4 border-dashed border-bb-variante opacity-30 flex items-center justify-center rounded-full animate-spin-slow">
              <div className="w-1/2 h-1/2 bg-bb-impacto rounded-full" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}