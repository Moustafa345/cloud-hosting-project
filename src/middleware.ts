import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {

    const jwtToken = request.cookies.get('jwtToken');
    const token = jwtToken?.value as string; // get token from cookie


        if(!token) {
           if(request.nextUrl.pathname.startsWith("/api/users/profile/")) {
            return NextResponse.json(
                {message: "No token provided, access denied, message from middleware"},
                {status: 401} // 401 means Unauthorized
            )
           }
        } else {
            if(request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
                return NextResponse.redirect(new URL('/', request.url));
            }
        
        }
}

// This middleware will be used in the route below
export const config= {
    matcher: ["/api/users/profile/:path*", "/login", "/register"] // :path* means that middleware recognizes any link after /api/users/profile/
}