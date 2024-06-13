import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { SignInSchema } from "@/lib/schemas/signIn-schema";
import { getUserByEmail } from "@/data/user";
import { compare } from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
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
    GitHub,
  ],
} satisfies NextAuthConfig