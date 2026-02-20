"use server"

import prisma from "@/lib/prisma"
import { put } from "@vercel/blob"

export type FeedbackState = {
  success?: boolean;
  error?: string;
}

// Correção: prevState agora aceita null
export async function submitFeedback(prevState: FeedbackState | null, formData: FormData): Promise<FeedbackState> {
  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const content = formData.get("content") as string
  const imageFile = formData.get("image") as File | null

  if (!name || !content) {
    return { error: "Nome e depoimento são obrigatórios." }
  }

  try {
    let imageUrl = null

    // Processa a imagem no Vercel Blob se o usuário tiver enviado
    if (imageFile && imageFile.size > 0) {
      const blob = await put(`feedbacks/${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`, imageFile, {
        access: 'public',
      })
      imageUrl = blob.url
    }

    await prisma.feedback.create({
      data: {
        name,
        role: role || null,
        content,
        imageUrl,
        approved: false, // Fica oculto até o admin aprovar
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Erro ao submeter feedback:", error)
    return { error: "Falha ao enviar feedback. Tente novamente." }
  }
}