import GitHub from "next-auth/providers/github";
import vk from "next-auth/providers/vk";
import yandex from "next-auth/providers/yandex";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { SignInSchema } from "@/lib/schemas/signIn-schema";
import { getUserByEmail } from "@/lib/user";
import { compare } from "bcryptjs";


// Notice this is only an object, not a full Auth.js instance
export default {
  debug: true,
  providers: [
    Credentials({
      authorize: async(credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          
          const passwordsMatch = await compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        };

        return null;
      }
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    vk({
      clientId: process.env.AUTH_VK_ID as string,
      clientSecret: process.env.AUTH_VK_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    yandex({
      clientId: process.env.AUTH_YANDEX_ID as string,
      clientSecret: process.env.AUTH_YANDEX_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig