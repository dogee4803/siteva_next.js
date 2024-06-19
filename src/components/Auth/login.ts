"use server"

import { SignInSchema } from "@/lib/schemas/signIn-schema";
import * as z from "zod";
import { signIn } from '../../../auth';
import { AuthError } from "next-auth";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/lib/mail";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { getUserByEmail } from "@/lib/user";
import { getTwoFactorTokenByemail } from "@/lib/two-factor-token";
import db from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/lib/two-factor-confirmation";


const login = async (values: z.infer<typeof SignInSchema>) => {
    const validatedFields = SignInSchema.safeParse(values);
  
    if (!validatedFields.success) {
      throw new Error("Неверные данные для входа");
    }
  
    const { email, password, code} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password){
      return { error: "Эл. почта не существует!"}
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email)
      
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      )
      return { success: "Письмо для подтверждения отправлено!"};
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByemail(
          existingUser.email
        );

        if (!twoFactorToken) {
          return {error: "Неверный код!"}
        }

        if (twoFactorToken.token !== code) {
          return {error: "Неверный код!"}
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return {error: "Срок действия кода истёк!"}
        }

        await db.twoFactorToken.delete({
          where: {id: twoFactorToken.id}
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: {
              id: existingConfirmation.id
            }
          });
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          }
        });
      }
      else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token,
        );
  
        return {twoFactor: true }
      }
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
  