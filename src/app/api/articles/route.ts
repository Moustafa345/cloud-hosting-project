import { NextRequest, NextResponse } from 'next/server'
import { createArticleSchema } from '@/app/utils/validationSchemas';
import { CreateArticleDto } from '@/app/utils/dtos'
import { Article, Comment, User } from '@prisma/client';
import prisma from '@/app/utils/db'
import { ARTICLE_PER_PAGE } from '@/app/utils/constants';
import { verifyToken } from '@/app/utils/verifyToken';



/**
* @method GET
* @route ~/api/articles
* @description Get articles by page number
* @access public
*/


export async function GET(request: NextRequest) {

    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || '1';

        const articles = await prisma.article.findMany(
            {
                skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
                take: ARTICLE_PER_PAGE,
                orderBy: {createdAt: 'desc'}

            }
        )
        return NextResponse.json(articles, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }

}





/**
* @method POST
* @route ~/api/articles
* @description Create a new article
* @access private (Only admins can create articles)
*/

export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json(
                { message: 'Only admins can create articles, access denied' },
                { status: 403 }
            )
        }

        const body = (await request.json()) as CreateArticleDto;

        const validation = createArticleSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description
            }
        });

        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" },{ status: 500 })
    }
}