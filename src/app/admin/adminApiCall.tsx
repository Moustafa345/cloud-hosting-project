import { Comment } from "@prisma/client";
import { DOMAIN } from "../utils/constants";

export async function getAllComments(token:string) : Promise<Comment[]> {
    const response =  await fetch(`${DOMAIN}/api/comments`, {
        headers: {
          cookie: `jwtToken=${token}`
        }
      }); 
    
      if(!response.ok) {
        throw new Error("Error fetching comments");
      }
      return await response.json();
}