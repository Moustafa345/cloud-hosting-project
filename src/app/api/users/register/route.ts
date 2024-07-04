import { RegisterUserDto } from "@/app/utils/dtos";
import { RegisterUserSchema } from "@/app/utils/validationSchemas";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/utils/db";
import bcrypt from "bcryptjs";
import { setCookie } from "@/app/utils/generateTokens";

/**
* @method POST
* @route ~/api/users/register
* @description Create a new user
* @access public
*/


export async function POST(request: NextRequest) {

    try {

        const body = await request.json() as RegisterUserDto;
        const validation = RegisterUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }
        const user = await prisma.user.findUnique({ where: { email: body.email } })

        if (user) {
            return NextResponse.json({ message: "This user is already registered" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword
            },
            select: {
                username: true,
                email: true,
                id: true,
                isAdmin: true
            }
        })


        const cookie = setCookie({
            id: newUser.id,
            isAdmin: newUser.isAdmin,
            username: newUser.username,
            email: newUser.email
        })



        return NextResponse.json(
            { ...newUser, message: "Registered & Authenticated"},
            {
                 status: 201, 
                 headers: {"Set-Cookie": cookie}
            });


    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}