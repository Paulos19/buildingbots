"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDownRight } from "lucide-react"

export function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null)

  // 1. A MÁGICA DO TIMING: "end end" significa que o progresso chega a 1 
  // exatamente quando o container deixa de estar "colado" na tela.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Os textos somem mais rápido (na primeira metade do scroll)
  const yText = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // 2. CRESCIMENTO EXPONENCIAL: O círculo escala lentamente até a metade, 
  // depois explode para um tamanho massivo (50) garantindo que cobre até monitores ultrawide.
  const scaleCircle = useTransform(scrollYProgress, [0, 0.6, 1], [1, 3, 50])
  const yCircle = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const xBlockLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const xBlockRight = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    // 3. COLOR MATCHING: O fundo do container global agora é amarelo (impacto).
    // Assim, não existe "vazio branco" entre esta secção e a próxima.
    <section ref={containerRef} className="relative h-[200vh] w-full bg-bb-impacto">
      
      {/* O container sticky real ganha o fundo branco original */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-6 bg-bb-white">
        
        {/* Gráficos de fundo Mid-Century */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none -z-10">
          <motion.div 
            style={{ x: xBlockLeft }}
            className="absolute left-[-10%] top-[20%] h-[60vh] w-[30vw] bg-bb-variante mix-blend-multiply rounded-full blur-[100px] opacity-70"
          />
          <motion.div 
            style={{ x: xBlockRight }}
            className="absolute right-[-10%] bottom-[10%] h-[50vh] w-[40vw] bg-bb-destaque mix-blend-multiply rounded-tl-[200px] blur-[80px] opacity-60"
          />
          
          {/* Círculo Principal Geométrico Rígido */}
          <motion.div 
            style={{ scale: scaleCircle, y: yCircle }}
            className="absolute top-[15%] right-[20%] h-64 w-64 bg-bb-impacto rounded-full origin-center"
          />
        </div>

        {/* Conteúdo Tipográfico */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full"
        >
          <div className="col-span-1 lg:col-span-8">
            <h1 className="text-[clamp(4rem,8vw,10rem)] leading-[0.85] font-black uppercase tracking-tighter text-bb-dark">
              Building <br/> 
              <span className="text-bb-destaque">Bots.</span>
            </h1>
          </div>
          
          <div className="col-span-1 lg:col-span-4 pb-4 flex flex-col gap-6">
            <p className="text-xl md:text-2xl font-medium text-bb-semidark leading-tight">
              Desenvolvimento de software de alta performance e automações modulares com <span className="font-bold text-bb-dark bg-bb-impacto px-1">n8n</span> e <span className="font-bold text-bb-dark">Next.js</span>.
            </p>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-8 py-4 bg-bb-dark text-bb-impacto font-bold uppercase tracking-wider rounded-none hover:bg-bb-semidark transition-colors">
                Descubra a Máquina
                <ArrowDownRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Indicador de Scroll Inferior */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="absolute bottom-10 left-6 flex items-center gap-4 text-bb-dark font-bold uppercase text-sm tracking-widest"
        >
          <div className="w-10 h-10 border-2 border-bb-dark rounded-full flex items-center justify-center overflow-hidden">
            <motion.div 
              animate={{ y: [0, 50, -50, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-bb-dark rounded-full"
            />
          </div>
          Scroll para explorar
        </motion.div>

      </div>
    </section>
  )
}