import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/form" // ou next/link
import { LogOut, LayoutDashboard } from "lucide-react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session || session.user?.email !== process.env.EMAIL_ADMIN) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-bb-white bg-noise text-bb-dark font-body flex">
      {/* Sidebar Mid-Century Minimalista */}
      <aside className="w-64 border-r-4 border-bb-dark bg-bb-variant flex flex-col justify-between">
        <div className="p-6">
          <h2 className="font-heading font-black text-2xl uppercase tracking-tighter border-b-4 border-bb-dark pb-4 mb-6">
            BB Admin
          </h2>
          <nav className="space-y-4">
            <a href="/admin/dashboard" className="flex items-center gap-3 font-bold hover:text-bb-highlight transition-colors">
              <LayoutDashboard size={20} /> Projetos
            </a>
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
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
