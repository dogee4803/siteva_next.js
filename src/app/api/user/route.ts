import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hash } from 'bcrypt'

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, email, password, registrationdate, lastlogindate } = body;

        const existingUserByEmail = await db.users.findFirst({
            where: { email: { equals: email }}
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists." }, { status: 409 });
        }

        const existingUserByUsername = await db.users.findFirst({
            where: { username: { equals: username } }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username already exists." }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        const formattedRegistrationDate = new Date(registrationdate).toISOString();
        const formattedLastLoginDate = new Date(lastlogindate).toISOString();

        try {
            const newUser = await db.users.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    registrationdate: formattedRegistrationDate,
                    lastlogindate: formattedLastLoginDate
                }
            });
            const { password: newUserPassword, ...rest } = newUser;
            return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });
        }  catch (error) {
            if (error instanceof Error) {
                console.error('Error creating user:', error);
                if (error.name === 'PrismaClientValidationError') {
                    // Handle Prisma client validation errors
                    const validationErrors = error.message.split('\n').slice(1).map(line => line.trim());
                    return NextResponse.json({ message: 'Validation errors:', errors: validationErrors }, { status: 400 });
                } else {
                    // Handle other errors
                    return NextResponse.json({ message: `Something went wrong: ${error.message}` }, { status: 500 });
                }
            } else {
                // Handle unknown errors
                return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong123!" }, { status: 500 });
    }
}
