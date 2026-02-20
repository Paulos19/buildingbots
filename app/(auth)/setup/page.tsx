import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { ShieldAlert, DatabaseZap } from "lucide-react"
import { SetupForm } from "./setup-form" // Importamos o Client Component

export default async function SetupPage() {
  // Blindagem Server-Side: Se já tem admin, ninguém nem vê essa tela
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" }
  })

  if (existingAdmin) {
    redirect("/login")
  }

  return (
    <div className="bg-bb-white border-4 border-bb-dark p-8 shadow-[8px_8px_0px_0px_var(--color-bb-impact)] relative">
      <div className="absolute -top-6 -left-6 bg-bb-impact border-2 border-bb-dark p-3 shadow-[4px_4px_0px_0px_var(--color-bb-dark)] animate-bounce">
        <DatabaseZap className="w-8 h-8 text-bb-dark" strokeWidth={2.5} />
      </div>

      <div className="mt-4 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="text-red-500 w-6 h-6" />
          <span className="text-red-500 font-bold tracking-widest uppercase text-xs">
            Setup do Sistema Ativo
          </span>
        </div>
        <h1 className="text-3xl font-heading font-black text-bb-dark uppercase tracking-tight leading-none">
          Inicialização do Core
        </h1>
        <p className="text-bb-semidark font-body text-sm mt-3 font-medium border-l-4 border-bb-highlight pl-3">
          Configure a credencial master da Building Bots. 
          Esta tela será desativada permanentemente após a primeira execução.
        </p>
      </div>

      {/* Renderiza o formulário interativo */}
      <SetupForm />
    </div>
  )
}
