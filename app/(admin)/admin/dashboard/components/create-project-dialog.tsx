"use client"

import { useActionState, useEffect, useState } from "react"
import { createProject, ProjectState } from "@/app/actions/projects"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, ImagePlus, Loader2 } from "lucide-react"

const initialState: ProjectState = { error: undefined, success: false }

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [state, formAction, isPending] = useActionState(createProject, initialState)

  // Fecha o modal e limpa o form se tiver sucesso
  useEffect(() => {
    if (state.success) {
      setOpen(false)
      setPreview(null)
      // O Next.js já revalidou a rota na Action, a tela atualizará sozinha.
    }
  }, [state.success])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={20} strokeWidth={3} /> Novo Projeto
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Obra</DialogTitle>
          <p className="text-sm font-medium text-bb-semidark border-l-4 border-bb-highlight pl-2 mt-2">
            Insira os detalhes técnicos e visuais do novo projeto.
          </p>
        </DialogHeader>

        <form action={formAction} className="space-y-6 mt-4 flex flex-col h-[calc(100vh-180px)]">
          
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            
            {/* Título */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-bb-dark uppercase tracking-wider">Nome do Projeto *</label>
              <Input name="title" required placeholder="Ex: Painel n8n Core" />
            </div>

            {/* Descrição (Usando textarea estilizada como nosso Input) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-bb-dark uppercase tracking-wider">Descrição Técnica *</label>
              <textarea 
                name="description" 
                required 
                rows={4}
                placeholder="Detalhes da automação ou arquitetura..."
                className="flex w-full border-2 border-bb-dark bg-bb-white px-4 py-2 text-base text-bb-dark shadow-[2px_2px_0px_0px_var(--color-bb-dark)] transition-all focus-visible:outline-none focus-visible:ring-0 focus-visible:border-bb-highlight focus-visible:shadow-[4px_4px_0px_0px_var(--color-bb-highlight)] resize-none font-body"
              />
            </div>

            {/* Imagem com Preview Brutalista */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-bb-dark uppercase tracking-wider">Capa do Projeto *</label>
              <div className="relative border-4 border-dashed border-bb-dark bg-bb-variant/30 hover:bg-bb-variant/50 transition-colors p-4 group cursor-pointer text-center">
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  required 
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                
                {preview ? (
                  <div className="relative aspect-video w-full overflow-hidden border-2 border-bb-dark">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all" />
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center text-bb-semidark">
                    <ImagePlus size={32} className="mb-2" />
                    <span className="font-bold text-sm uppercase">Clique ou arraste a imagem</span>
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-bb-dark uppercase tracking-wider">URL Demo</label>
                <Input name="demoUrl" type="url" placeholder="https://" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-bb-dark uppercase tracking-wider">Repositório</label>
                <Input name="sourceUrl" type="url" placeholder="https://github.com/..." />
              </div>
            </div>

            {/* Alerta de Erro */}
            {state.error && (
              <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 text-sm font-bold shadow-[4px_4px_0px_0px_#ef4444]">
                {state.error}
              </div>
            )}
          </div>

          {/* Botão Fixo no Rodapé do Slide-Over */}
          <div className="pt-6 border-t-4 border-bb-dark bg-bb-white mt-auto">
            <Button type="submit" disabled={isPending} className="w-full h-14 text-lg">
              {isPending ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando Upload...</>
              ) : (
                "Publicar Projeto"
              )}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}
