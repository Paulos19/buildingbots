"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

// A assinatura agora recebe o prevState (obrigatório para useActionState)
export async function initializeAdmin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const ADMIN_EMAIL = process.env.EMAIL_ADMIN

  if (!email || !password) {
    return { error: "Preencha todos os campos." }
  }

  if (email !== ADMIN_EMAIL) {
    return { error: "Acesso negado. Credencial não autorizada para setup." }
  }

  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    })

    if (existingAdmin) {
      return { error: "O sistema já foi inicializado." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN"
      }
    })
  } catch (err) {
    return { error: "Erro interno ao configurar o banco de dados." }
  }

  // O redirect deve ficar fora do bloco try/catch no Next.js
  redirect("/login")
}
