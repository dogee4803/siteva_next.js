"use server"

import { SignInSchema } from "@/lib/schemas/signIn-schema";
import * as z from "zod";
import { signIn } from '../../../auth';
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/lib/user";


const login = async (values: z.infer<typeof SignInSchema>) => {
    const validatedFields = SignInSchema.safeParse(values);
  
    if (!validatedFields.success) {
      throw new Error("Неверные данные для входа");
    }
  
    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password){
      return { error: "Email does not exist!"}
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email)
      
      return { success: "Confirmation email sent!"};
    }

    try {
      const signInData = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {error: "Неверный email или пароль"}
          default:
            return {error: "Произошла ошибка при входе"}
        }
      }
      console.error(error);
      throw error;
    }
  };

export default login;
  