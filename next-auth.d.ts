import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    createdAt: DateTime
    isTwoFactorEnabled: boolean
}
 

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}