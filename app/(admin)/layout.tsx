import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LogOut, LayoutDashboard } from "lucide-react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session || session.user?.email !== process.env.EMAIL_ADMIN) {
    redirect("/login")
  }

  return (
    // 1. Removemos o bg-noise daqui. Adicionamos "relative" para ancorar a tela.
    <div className="relative min-h-screen bg-bb-white text-bb-dark flex">
      
      {/* 2. O Noise agora é uma camada separada que fica por cima, sem afetar o layout */}
      <div className="bg-noise fixed inset-0 z-50 pointer-events-none" />

      {/* Sidebar Mid-Century Minimalista */}
      <aside className="relative z-10 w-64 border-r-4 border-bb-dark bg-bb-variante flex flex-col justify-between">
        <div className="p-6">
          <h2 className="font-black text-2xl uppercase tracking-tighter border-b-4 border-bb-dark pb-4 mb-6">
            BB Admin
          </h2>
          <nav className="space-y-4">
            {/* O ideal no Next.js é usar o componente Link nativo */}
            <Link href="/admin/dashboard" className="flex items-center gap-3 font-bold hover:text-bb-impacto transition-colors">
              <LayoutDashboard size={20} /> Projetos
            </Link>
          </nav>
        </div>
        
        <div className="p-6 border-t-4 border-bb-dark">
          <form action={async () => {
            "use server"
            const { signOut } = await import("@/auth")
            await signOut({ redirectTo: "/login" })
          }}>
            <button className="flex items-center gap-3 font-bold text-red-600 hover:text-red-800 transition-colors uppercase text-sm">
              <LogOut size={20} /> Encerrar Sessão
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}