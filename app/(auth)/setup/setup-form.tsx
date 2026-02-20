"use client"

import { useActionState } from "react"
import { initializeAdmin } from "@/app/actions/setup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SetupForm() {
  // useActionState retorna: [estadoAtual, actionDespachada, estaCarregando]
  const [state, formAction, isPending] = useActionState(initializeAdmin, null)

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-bb-dark uppercase tracking-wider">
          Email Master (Deve bater com o .env)
        </label>
        <Input 
          name="email" 
          type="email" 
          required 
          placeholder="admin@buildingbots.com" 
          className="border-bb-impact focus-visible:ring-bb-impact"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-bb-dark uppercase tracking-wider">
          Nova Senha Forte
        </label>
        <Input 
          name="password" 
          type="password" 
          required 
          placeholder="••••••••" 
        />
      </div>

      {/* Exibição elegante do erro */}
      {state?.error && (
        <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 text-sm font-bold shadow-[4px_4px_0px_0px_#ef4444] animate-in fade-in slide-in-from-top-2">
          {state.error}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isPending}
        className="w-full mt-6 bg-bb-impact hover:bg-yellow-400 text-bb-dark"
      >
        {isPending ? "Inicializando o Core..." : "Inicializar Sistema"}
      </Button>
    </form>
  )
}
