import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/utils/db";
import { verifyToken } from "@/app/utils/verifyToken";
import { UpdateUserDto } from "@/app/utils/dtos";
import bcrypt from "bcryptjs";
import { UpdateUserSchema } from "@/app/utils/validationSchemas";

interface Props {
    params: { id: string }
}


/**
* @method DELETE
* @route ~/api/users/profile/:id
* @description Delete profile
* @access private (only user himself can delete this account)
*/


export async function DELETE(request: NextRequest, { params }: Props) {
   
    try {
        
        const userFromDB = await prisma.user.findUnique({ 
            where: { id: Number(params.id) },
            include: {comments: true}
            
        });

        if (!userFromDB) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }




        // Verify the token from the request
        const userFromToken = verifyToken(request)

        // If the token is not valid or the user is not the same as the user in the token
        if (userFromToken !== null && userFromToken.id === userFromDB.id) {
            // Deleting the user from the database
            await prisma.user.delete({ where: { id: Number(params.id) } });

            return NextResponse.json({ message: "Your profile (Account) has been removed successfully" })
        }

        // Deleting the comments that relate to this user
        const commentIds = userFromDB.comments.map(comment => comment.id)
        

        await prisma.comment.deleteMany({ 
            where: { 
                id: {in: commentIds}
            } });

        return NextResponse.json(
            { message: "Only user himself can delete his profile, forbidden" },
            { status: 403 } // 403 means Forbidden
        )

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}




/**
* @method GET
* @route ~/api/users/profile/:id
* @description Get profile by Id
* @access private (only user himself can get this account)
*/
export async function GET(request: NextRequest, { params }: Props) {
    try {

        // user from database
        const userFromDb = await prisma.user.findUnique(
            {
                where: { id: parseInt(params.id) },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    createdAt: true,
                    updatedAt: true,
                    isAdmin: true
                }
            });

        if (!userFromDb) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }


        // Verify the token from the request
        const userFromToken = verifyToken(request);

        if (userFromToken === null || userFromToken.id !== userFromDb.id) {
            return NextResponse.json({ message: "You are not allowed, access denined" }, { status: 403 });
        }




        return NextResponse.json(userFromDb, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



/**
* @method PUT
* @route ~/api/users/profile/:id
* @description Update profile by Id
* @access private (only user himself can update this account/profile)
*/


export async function PUT(request: NextRequest, { params }: Props) {
    try {

        const userFromDB = await prisma.user.findUnique({
            where: { id: parseInt(params.id) }
        })

        if (!userFromDB) {
            return NextResponse.json({ message: "Profile not found" }, { status: 404 });
        }

        const userFromToken = verifyToken(request);

        if (userFromToken === null || userFromToken.id !== userFromDB.id) {
            return NextResponse.json({ message: "You are not allowed, access denined" }, { status: 403 })
        }

        const body = await request.json() as UpdateUserDto;
        const validation = UpdateUserSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }

        if (body.password) {          
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt)
        }

        const updatedUser = await prisma.user.update(
            {
                where: { id: parseInt(params.id) },
                data: {
                    email: body.email,
                    username: body.username,
                    password: body.password
                }
            })

            // Returns a JSON response with the updated user data, excluding the password.
            const {password, ...other} = updatedUser;
            return NextResponse.json({...other}, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

