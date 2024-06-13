import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hash } from 'bcryptjs'
import { getUserByEmail } from "@/lib/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        const existingUserByEmail = await getUserByEmail(email);

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists." }, { status: 408 });
        }

        const existingUserByUsername = await db.user.findFirst({
            where: { name: { equals: name } }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this name already exists." }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        try {
            const newUser = await db.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                }
            });

            const verificationToken = await generateVerificationToken(email);

            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token,
            );

            const { password: newUserPassword, ...rest } = newUser;
            return NextResponse.json({ user: rest, message: "Confirmation email sent" }, { status: 201 });
        }  catch (error) {
            if (error instanceof Error) {
                console.error('Error creating user:', error);
                if (error.name === 'PrismaClientValidationError') {
                    // Handle Prisma client validation errors
                    const validationErrors = error.message.split('\n').slice(1).map(line => line.trim());
                    return NextResponse.json({ message: 'Validation errors:', errors: validationErrors }, { status: 400 });
                } else {
                    // Handle other errors
                    return NextResponse.json({ message: `Something went wrong during creating user in db: ${error.message}` }, { status: 500 });
                }
            } else {
                // Handle unknown errors
                return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something unknown went wrong!" }, { status: 500 });
    }
}
