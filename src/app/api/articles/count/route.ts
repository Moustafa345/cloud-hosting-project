import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";


/**
* @method GET
* @route ~/api/articles/count
* @description Get articles Count
* @access public
*/

export async function GET(request: NextRequest) {
    try {
        const count = await prisma.article.count();

        return NextResponse.json({count}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}