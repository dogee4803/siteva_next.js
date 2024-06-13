import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA Код",
        html: `<p>Ваш 2FA код: ${token}</p>`
    });
};

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Подтверждение адреса электронной почты",
        html: `<p>Нажмите <a href="${confirmLink}">на ссылку</a>, чтобы подтвердить почтовый ящик.<p/>`
    });
};
