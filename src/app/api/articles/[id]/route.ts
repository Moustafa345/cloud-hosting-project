import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/app/utils/dtos";
import prisma from "@/app/utils/db";
import { updateArticleSchema } from "@/app/utils/validationSchemas";
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
            where: {
                id: Number(params.id)
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
* @method PUT
* @route ~/api/articles/:id
* @description Update Article
* @access public
*/



export async function PUT(request: NextRequest, { params }: Props) {

    try {


        const body = (await request.json()) as UpdateArticleDto;

        const validation = updateArticleSchema.safeParse(body);

        const article = await prisma.article.findUnique({
            where: { id: Number(params.id) }
        })

        if (!validation.success) {
            return NextResponse.json({ message: validation.error?.errors[0].message }, { status: 400 })
        }

        const updatedArticle = await prisma.article.update({
            where: { id: Number(params.id) },
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
* @access public
*/



export async function DELETE(request: NextRequest, { params }: Props) {

    try {

        const article = await prisma.article.findUnique({ where: { id: Number(params.id) } })
        if (!article) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 })
        }

        await prisma.article.delete({ where: { id: Number(params.id) } })

        return NextResponse.json({ message: "article deleted" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
