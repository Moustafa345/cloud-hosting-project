import prisma from "@/app/utils/db";
import { UpdateCommentDto } from "@/app/utils/dtos";
import { verifyToken } from "@/app/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string }
}




/**
* @method PUT
* @route ~/api/comments/:id
* @description Update a comment by Id
* @access private (only user himself can update this comment)
*/


export async function PUT(request: NextRequest, {params}: Props) {
    
    try {

        const commentFromDB = await prisma.comment.findUnique({where: {id: parseInt(params.id)}});
        if(!commentFromDB) {
            return NextResponse.json({message: "Comment not found"}, {status: 404})
        }

        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== commentFromDB.userId) {
            return NextResponse.json({message: "Only the user who created this comment can update it"}, {status: 403})
        }

        const body = await request.json() as UpdateCommentDto;
        const updatedComment = await prisma.comment.update({
            where: {id: parseInt(params.id)},
            data: {text: body.text}
        });

        return NextResponse.json(updatedComment, {status: 200})

       
        
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}




/**
* @method DELETE
* @route ~/api/comments/:id
* @description Delete a comment by Id
* @access private (only user himself or admins can delete this comment)
*/



export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const commentFromDB = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });
        if (!commentFromDB) {
            return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
        }

        const userFromToken = verifyToken(request);
        if (userFromToken === null) {
            return NextResponse.json(
                { message: 'No token provided, access denied' },
                { status: 401 }
            )
        }

        if (userFromToken.isAdmin || userFromToken.id === commentFromDB.userId) {
            await prisma.comment.delete({ where: { id: parseInt(params.id) } });
            return NextResponse.json(
                { message: 'Comment deleted successfully' },
                { status: 200 }
            )
        }

        return NextResponse.json(
            { message: 'You are not allowed, access denied' },
            { status: 403 }
        )
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})   
    }
}