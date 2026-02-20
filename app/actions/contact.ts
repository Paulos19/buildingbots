"use server"

import nodemailer from "nodemailer"

export type ContactState = {
  success?: boolean;
  error?: string;
}

// Correção: prevState agora aceita null
export async function sendContactEmail(prevState: ContactState | null, formData: FormData): Promise<ContactState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return { error: "Todos os campos são obrigatórios." }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT) || 465,
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SERVER_USER, // Envia para você mesmo (o admin)
      subject: `[BB Nova Lead] Contato de ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 4px solid #000E21; background-color: #E8EEFC;">
          <h2 style="color: #000E21; text-transform: uppercase;">Nova Mensagem de Contato</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <h3 style="color: #000E21; border-top: 2px solid #000E21; padding-top: 10px;">Mensagem:</h3>
          <p style="font-size: 16px; color: #091C53;">${message}</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return { error: "Falha ao enviar mensagem. Tente novamente mais tarde." }
  }
}