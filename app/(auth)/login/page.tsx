"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError(res.error)
      } else {
        router.push("/admin/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-bb-white border-4 border-bb-dark p-8 shadow-[8px_8px_0px_0px_var(--color-bb-impact)] relative">
      <div className="absolute -top-6 -left-6 bg-bb-highlight border-2 border-bb-dark p-3 shadow-[4px_4px_0px_0px_var(--color-bb-dark)]">
        <Building2 className="w-8 h-8 text-bb-dark" strokeWidth={2.5} />
      </div>

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-heading font-black text-bb-dark uppercase tracking-tight">
          System Access
        </h1>
        <p className="text-bb-semidark font-body text-sm mt-2 font-medium">
          Área restrita. O primeiro acesso do admin configurará a credencial master.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-bb-dark uppercase tracking-wider">
            Email Corporativo
          </label>
          <Input name="email" type="email" required placeholder="admin@buildingbots.com" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-bb-dark uppercase tracking-wider">
            Senha de Acesso
          </label>
          <Input name="password" type="password" required placeholder="••••••••" />
        </div>

        {error && (
          <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 text-sm font-bold shadow-[4px_4px_0px_0px_#ef4444]">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? "Autenticando..." : "Ingressar no Sistema"}
        </Button>
      </form>
    </div>
  )
}
