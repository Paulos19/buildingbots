"use client"

import { useActionState } from "react"
import { motion } from "framer-motion"
import { sendContactEmail } from "@/app/actions/contact"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, null)

  return (
    <section className="relative w-full bg-bb-dark text-bb-white overflow-hidden z-20 border-t-8 border-bb-impacto">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />

      {/* Marquee Background */}
      <div className="absolute top-10 left-0 w-full overflow-hidden flex whitespace-nowrap opacity-[0.03] pointer-events-none">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }} className="flex gap-8 text-[15rem] font-black uppercase tracking-tighter">
          <span>SYSTEM OFFLINE? • INITIATE OVERRIDE • SYSTEM OFFLINE? • </span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[clamp(3rem,6vw,6rem)] leading-[0.85] font-black uppercase tracking-tighter mb-6">
            Inicie o <br /> <span className="text-bb-impacto">Protocolo.</span>
          </h2>
          <p className="text-xl text-bb-variante mb-8 border-l-4 border-bb-impacto pl-4 max-w-md">
            Pronto para transformar processos arcaicos em arquiteturas escaláveis? Deixe sua mensagem e nós configuramos a máquina.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-bb-white text-bb-dark p-8 border-4 border-bb-dark shadow-[16px_16px_0px_0px_var(--color-bb-impacto)] relative">
          
          {state?.success ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-black uppercase">Sinal Recebido!</h3>
              <p className="font-medium text-bb-semidark">Retornaremos o contato em breve.</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-bb-dark">Identificação</label>
                <Input name="name" required placeholder="Seu nome ou empresa" className="border-4 border-bb-dark rounded-none h-12 bg-bb-white focus-visible:ring-0 focus-visible:border-bb-impacto text-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-bb-dark">Canal Seguro (Email)</label>
                <Input type="email" name="email" required placeholder="contato@empresa.com" className="border-4 border-bb-dark rounded-none h-12 bg-bb-white focus-visible:ring-0 focus-visible:border-bb-impacto text-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-bb-dark">Parâmetros do Projeto</label>
                <textarea name="message" required placeholder="Descreva o gargalo atual da sua operação..." className="w-full h-32 p-3 border-4 border-bb-dark bg-bb-white focus-visible:outline-none focus-visible:border-bb-impacto rounded-none text-lg resize-none font-medium" />
              </div>
              
              {state?.error && <p className="text-red-600 font-bold bg-red-100 p-3 border-2 border-red-500">{state.error}</p>}
              
              <Button type="submit" disabled={isPending} className="w-full h-16 bg-bb-dark hover:bg-bb-impacto hover:text-bb-dark text-bb-impacto font-black text-xl uppercase tracking-widest rounded-none transition-colors border-4 border-transparent hover:border-bb-dark">
                {isPending ? "Enviando Dados..." : "Transmitir Pedido"}
              </Button>
            </form>
          )}

        </motion.div>
      </div>
    </section>
  )
}