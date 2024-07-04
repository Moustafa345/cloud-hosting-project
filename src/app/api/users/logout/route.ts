import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
/**
* @method GET
* @route ~/api/users/logout
* @description Logout User
* @access private
*/


export async function GET(request: NextRequest) {
    try {
        
        cookies().delete("jwtToken");
        return NextResponse.json({message: "Successful Logout"}, {status: 200})

    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}