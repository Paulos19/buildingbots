"use client"

import { useActionState, useState } from "react"
import { motion } from "framer-motion"
import { submitFeedback } from "@/app/actions/feedback"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquarePlus, Quote } from "lucide-react"

type Feedback = {
  id: string; name: string; role: string | null; content: string; imageUrl: string | null;
}

export function TestimonialsGrid({ feedbacks }: { feedbacks: Feedback[] }) {
  const [state, formAction, isPending] = useActionState(submitFeedback, null)
  const [isOpen, setIsOpen] = useState(false)

  // Fecha o modal caso o sucesso seja atingido
  if (state?.success && isOpen) {
    setIsOpen(false)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {feedbacks.length === 0 ? (
          <div className="col-span-full border-4 border-dashed border-bb-variante/30 p-12 text-center text-bb-variante font-medium text-xl">
            Nenhum registro encontrado. Seja o primeiro a relatar a experiência.
          </div>
        ) : (
          feedbacks.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              key={item.id} className="bg-bb-white text-bb-dark border-4 border-bb-dark p-8 shadow-[8px_8px_0px_0px_var(--color-bb-impacto)] flex flex-col relative"
            >
              <Quote className="absolute top-6 right-6 text-bb-semidark opacity-20 w-12 h-12" />
              <p className="text-lg font-medium mb-8 flex-1 italic relative z-10">"{item.content}"</p>
              <div className="flex items-center gap-4 pt-6 border-t-2 border-bb-dark/20">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-full border-2 border-bb-dark object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-full border-2 border-bb-dark bg-bb-impacto flex items-center justify-center font-black text-xl">{item.name.charAt(0)}</div>
                )}
                <div>
                  <h4 className="font-black uppercase tracking-tight leading-tight">{item.name}</h4>
                  {item.role && <p className="text-sm font-bold text-bb-semidark uppercase">{item.role}</p>}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="flex justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 bg-bb-impacto text-bb-dark font-black px-8 py-4 uppercase tracking-widest hover:bg-bb-white hover:-translate-y-1 shadow-[8px_8px_0px_0px_var(--color-bb-dark)] transition-all">
              <MessageSquarePlus size={24} /> Registrar Feedback
            </button>
          </DialogTrigger>
          <DialogContent className="bg-bb-white border-4 border-bb-dark shadow-[16px_16px_0px_0px_var(--color-bb-dark)] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase text-bb-dark">Deixar Registro</DialogTitle>
            </DialogHeader>
            {state?.success ? (
              <div className="p-8 text-center bg-green-100 border-4 border-green-500 text-green-800 font-bold">
                Relatório submetido! Aguardando moderação do sistema.
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <Input name="name" placeholder="Seu Nome" required className="border-2 border-bb-dark focus-visible:ring-bb-impacto rounded-none bg-white" />
                <Input name="role" placeholder="Cargo / Empresa" className="border-2 border-bb-dark focus-visible:ring-bb-impacto rounded-none bg-white" />
                <textarea name="content" required placeholder="Escreva seu relato técnico..." className="w-full h-32 p-3 border-2 border-bb-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-impacto rounded-none bg-white font-medium resize-none" />
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-bb-semidark">Foto de Perfil (Opcional)</label>
                  <Input type="file" name="image" accept="image/*" className="border-2 border-bb-dark rounded-none bg-white cursor-pointer file:text-bb-dark file:font-bold file:bg-bb-impacto file:border-0 file:px-4 file:py-1 file:mr-4 hover:file:bg-bb-white transition-colors" />
                </div>
                {state?.error && <p className="text-red-600 font-bold text-sm bg-red-100 p-2 border border-red-500">{state.error}</p>}
                <Button type="submit" disabled={isPending} className="w-full bg-bb-dark text-bb-impacto hover:bg-bb-semidark font-black uppercase rounded-none mt-4 h-12">
                  {isPending ? "Transmitindo..." : "Submeter Dados"}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}