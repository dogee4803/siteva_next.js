import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hash } from 'bcrypt'
import * as z from 'zod';

const schema = z.object({
    username: z.string().min(1, 'Username must be at least 1 character').max(100, 'Username must be at most 100 characters'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters').min(1, 'Password is required'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        const userData = schema.parse({
            username: username,
            email: email,
            password: password
        });

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists." }, { status: 409 });
        }

        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username already exists." }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });

        const { password: newUserPassword, ...rest } = newUser;
        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
