import db from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const TwoFactorToken = await db.twoFactorToken.findFirst({
            where: {token}
        });

        return TwoFactorToken;
    } catch {
        return null;
    }
};

export const getTwoFactorTokenByemail = async (email: string) => {
    try {
        const TwoFactorToken = await db.twoFactorToken.findFirst({
            where: {email}
        });

        return TwoFactorToken;
    } catch {
        return null;
    }
};

