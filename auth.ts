import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email as string
        const ADMIN_EMAIL = process.env.EMAIL_ADMIN

        // Regra de Ouro: Se tentar logar/cadastrar com e-mail não autorizado, rejeita sumariamente
        if (email !== ADMIN_EMAIL) {
          throw new Error("Acesso negado. Apenas o administrador possui acesso.")
        }

        let user = await prisma.user.findUnique({ where: { email } })

        // Se o admin não existir no banco (primeiro login), criamos a conta dele
        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password as string, 10)
          user = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
              role: "ADMIN"
            }
          })
          return user
        }

        // Valida senha se o admin já existe
        const isValid = await bcrypt.compare(credentials.password as string, user.password)
        if (!isValid) throw new Error("Credenciais inválidas.")

        return user
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) session.user.id = token.sub
      return session
    }
  },
  pages: {
    signIn: "/login", // Criaremos uma página customizada com visual BB
  }
})
