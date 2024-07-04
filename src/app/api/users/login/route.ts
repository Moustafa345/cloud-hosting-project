import prisma from '@/app/utils/db';
import { LoginUserDto } from '@/app/utils/dtos';
import { LoginUserSchema } from '@/app/utils/validationSchemas';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { setCookie } from '@/app/utils/generateTokens';




/**
* @method POST
* @route ~/api/users/login
* @description Login user
* @access public
*/


export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as LoginUserDto;
        const validation = LoginUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (!user) {
            return NextResponse.json(
                { message: 'invalid email or password' },
                { status: 400 }
            )
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: 'invalid email or password' },
                { status: 400 }
            );
        }

        const cookie = setCookie({
            id: user.id,
            isAdmin: user.isAdmin,
            username: user.username,
            email: user.email
        });

        return NextResponse.json(
            { message: "Login successful" }, 
            { status: 200 ,
                headers: {
                    'Set-Cookie': cookie
                
                }
            });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}