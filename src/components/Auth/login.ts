"use server"

import { SignInSchema } from "@/lib/schemas/signIn-schema";
import * as z from "zod";
import { signIn } from '../../../auth';
import { AuthError } from "next-auth";


const login = async (values: z.infer<typeof SignInSchema>) => {
    const validatedFields = SignInSchema.safeParse(values);
  
    if (!validatedFields.success) {
      throw new Error("Неверные данные для входа");
    }
  
    const { email, password } = validatedFields.data;
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            throw new Error("Неверный email или пароль");
          default:
            throw new Error("Произошла ошибка при входе");
        }
      }
      console.error(error);
      throw error;
    }
  };

export default login;
  