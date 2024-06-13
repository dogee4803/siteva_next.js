import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
