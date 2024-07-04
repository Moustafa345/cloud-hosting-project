
import jwt from 'jsonwebtoken';
import { JWTPayload } from './types';
import { serialize } from 'cookie';



/**
 * Generate a JWT token
 * @param jwtPayload - The payload to be encoded in the token
 * @returns A JWT token
 */
export function generateJWT(jwtPayload: JWTPayload): string {

    const privateKey = process.env.JWT_SECRET as string
    const token = jwt.sign(jwtPayload, privateKey, {
        expiresIn: "30d"
    });
    return token;

}




/**
 * Generates a JWT token and sets it as a cookie.
 * @param jwtPayload - The payload to be included in the JWT token.
 * @returns The generated cookie string.
 */
export function setCookie(jwtPayload: JWTPayload) : string {

   const token = generateJWT(jwtPayload);

   const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // development=http, production=https
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
   })

    return cookie;
}