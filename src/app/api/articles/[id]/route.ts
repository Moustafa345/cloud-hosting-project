import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/app/utils/dtos";
import prisma from "@/app/utils/db";
import { updateArticleSchema } from "@/app/utils/validationSchemas";
import { verifyToken } from "@/app/utils/verifyToken";
/**
* @method GET
* @route ~/api/articles/:id
* @description Get a single article by Id
* @access public
*/


interface Props {
    params: { id: string }
}




export async function GET(request: NextRequest, { params }: Props) {

    try {
        const article = await prisma.article.findUnique({
            where: { id: Number(params.id) },
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        if (!article) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 });
        }



        return NextResponse.json(article, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

/**
 *  @method  PUT
 *  @route   ~/api/articles/:id
 *  @desc    Update Article
 *  @access  private (Only admins can update articles)
 */
export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const userFromToken = verifyToken(request);
        if (userFromToken === null || userFromToken.isAdmin === false) {
            return NextResponse.json(
                { message: 'Only admins can update articles, access denied' },
                { status: 403 }
            )
        }

        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) }
        });

    

        if (!article) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 });
        }

        const body = (await request.json()) as UpdateArticleDto;
        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description
            }
        });

        return NextResponse.json(updatedArticle, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

/**
* @method DELETE
* @route ~/api/articles/:id
* @description Delete a single article by Id
* @access Private (only admins can delete articles)
*/



export async function DELETE(request: NextRequest, { params }: Props) {

    try {

        const userFromToken = verifyToken(request);
        if (userFromToken === null || userFromToken.isAdmin === false) {
            return NextResponse.json(
                { message: 'Only admins can delete articles, access denied' },
                { status: 403 }
            )
        }

        // Get an article with all its comments
        const articleFromDB = await prisma.article.findUnique(
            { 
                where: { id: Number(params.id) },
                include: { comments: true}
            }
           
        )
        if (!articleFromDB) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 })
        }

        // Deleting the article
        await prisma.article.delete({ where: { id: Number(params.id) } })

        // Deleting the comments that are related to this article
        const commentIds : number[] = articleFromDB?.comments.map(comment => comment.id);
        await prisma.comment.deleteMany({
            where: {id: {in: commentIds}}
    })

        return NextResponse.json({ message: "Article deleted" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
