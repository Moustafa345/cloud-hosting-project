import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";
import { JWTPayload } from './types';


// Verifies the JWT token from the request cookies and returns the decoded payload.
export function verifyToken(request: NextRequest): JWTPayload | null {

    try {

        const jwtToken = request.cookies.get("jwtToken");
        const token = jwtToken?.value as string; // get token from cookie
        if(!token) return null;

        const privateKey = process.env.JWT_SECRET as string;
        const userPayload =  jwt.verify(token, privateKey) as JWTPayload;
        if(!userPayload) return null;
        
        return userPayload;

    } catch (error) {
        return null;
    }

}


// Verifies the JWT token for the page and decrypts the token and returns it
export function verifyTokenForPage(token: string): JWTPayload | null {

    try {
        
        const privateKey = process.env.JWT_SECRET as string;
        const userPayload =  jwt.verify(token, privateKey) as JWTPayload;
        return userPayload;

    } catch (error) {
        return null;
    }

}
