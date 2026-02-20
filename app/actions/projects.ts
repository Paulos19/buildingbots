"use server"

import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

export async function createProject(formData: FormData) {
  // 1. Blindagem de segurança
  const session = await auth()
  if (!session || session.user?.email !== process.env.EMAIL_ADMIN) {
    throw new Error("Não autorizado")
  }

  // 2. Extração dos dados
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const demoUrl = formData.get('demoUrl') as string
  const sourceUrl = formData.get('sourceUrl') as string
  const imageFile = formData.get('image') as File

  if (!title || !description || !imageFile) {
    throw new Error("Campos obrigatórios faltando")
  }

  try {
    // 3. Upload para Vercel Blob
    const blob = await put(`projects/${Date.now()}-${imageFile.name}`, imageFile, {
      access: 'public',
    })

    // 4. Salvar no banco com Prisma v6
    const project = await prisma.project.create({
      data: {
        title,
        description,
        demoUrl,
        sourceUrl,
        imageUrl: blob.url,
      }
    })

    // 5. Revalidar a página da LP para mostrar o novo projeto instantaneamente
    revalidatePath('/')
    revalidatePath('/admin/dashboard')

    return { success: true, project }
  } catch (error) {
    console.error("Erro ao criar projeto:", error)
    return { success: false, error: "Falha ao processar a requisição" }
  }
}
