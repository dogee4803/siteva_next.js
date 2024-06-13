import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import db from "@/lib/db"
import authConfig from "./auth.config";
import { getUserById } from "@/lib/user";


export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
 } = NextAuth ({
  pages: {
    signIn: "/sign-in"
  },
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign-in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
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
      token.createdAt = existingUser.createdAt;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  ...authConfig,
  
});