import prisma from "@/app/utils/db";
import { CreateCommentDto } from "@/app/utils/dtos";
import { CreateCommentSchema } from "@/app/utils/validationSchemas";
import { verifyToken } from "@/app/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";


/**
* @method POST
* @route ~/api/comments
* @description Create a new comment
* @access private (only logged-in user can create a comment)
*/

export async function POST(request: NextRequest) {
    try {
        
        const userFromToken = verifyToken(request);

        if(!userFromToken) {
            return NextResponse.json({message: "Only Logged-In users, access denied"}, {status: 401})
        }

        const body = await request.json() as CreateCommentDto;

        const validation= CreateCommentSchema.safeParse(body);

        if(!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400});
        }

        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: userFromToken.id
            }
        });

        return NextResponse.json({newComment}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}




/**
* @method GET
* @route ~/api/comments
* @description Get ALl comments
* @access private (only admins can get a comment)
*/

export async function GET(request: NextRequest) {

    try {

        const userFromToken = verifyToken(request);

        if(userFromToken === null || userFromToken.isAdmin === false ) {
            return NextResponse.json({message: "Only Admins can access this route"}, {status: 403})
        }
      
        const allCommentsFromDb = await prisma.comment.findMany();

        return NextResponse.json(allCommentsFromDb, {status: 200})
        
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 200});
    }
};



