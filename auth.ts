import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import db from "@/lib/db"
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";


export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
 } = NextAuth ({
  callbacks: {
    async session({token, session}) {
      console.log({
        sessionToken: token, session
      })

      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.createdAt = token.createdAt;
      }
      
      return session
    },
    async jwt({token}) {
      console.log('JWT callback:', { token });
      if (!token.sub) return token;
      
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.user = existingUser;
      token.createdAt = existingUser.createdAt;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  ...authConfig,
  
});