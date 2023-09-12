import { authenticate } from "@/utils/functions/serverHelpers"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (typeof credentials !== "undefined") {
            const res = await authenticate(credentials)
            console.log('res', res)
            if (typeof res !== "undefined") {
              // return { ...res.user, apiToken: res.token }
              return res
            } else {
              return null
            }
          } else {
            return null
          }
        } catch (error) {
          console.log('error', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  // session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }