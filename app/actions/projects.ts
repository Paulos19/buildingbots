"use server"

import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

// O State inicial agora mapeia erros e sucesso
export type ProjectState = {
  error?: string;
  success?: boolean;
}

export async function createProject(prevState: ProjectState, formData: FormData): Promise<ProjectState> {
  const session = await auth()
  
  if (!session || session.user?.email !== process.env.EMAIL_ADMIN) {
    return { error: "Acesso negado." }
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const demoUrl = formData.get('demoUrl') as string
  const sourceUrl = formData.get('sourceUrl') as string
  const imageFile = formData.get('image') as File

  if (!title || !description || !imageFile || imageFile.size === 0) {
    return { error: "Título, descrição e imagem são obrigatórios." }
  }

  try {
    // 1. Upload brutalmente rápido pro Vercel Blob
    const blob = await put(`projetos-bb/${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`, imageFile, {
      access: 'public',
    })

    // 2. Persistência no Prisma v6
    await prisma.project.create({
      data: {
        title,
        description,
        demoUrl: demoUrl || null,
        sourceUrl: sourceUrl || null,
        imageUrl: blob.url,
      }
    })

    // 3. Revalidações: Garante que o usuário veja a mudança na hora
    revalidatePath('/')
    revalidatePath('/admin/dashboard')

    return { success: true }
  } catch (error) {
    console.error("Erro ao criar projeto:", error)
    return { error: "Falha ao enviar o projeto. Tente novamente." }
  }
}
