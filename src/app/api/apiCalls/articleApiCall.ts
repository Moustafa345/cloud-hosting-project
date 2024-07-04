
import { DOMAIN } from "@/app/utils/constants";
import { SingleArticle } from "@/app/utils/types";
import { Article } from "@prisma/client";
import { NextRequest } from "next/server";


// Get articles by pageNumber
export async function getArticles(pageNumber: string | undefined) : Promise<Article[]> {
    const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
      {next: {revalidate: 50}}
     );
   
     if(!response.ok) {
       throw new Error("Failed to get articles");
     }
   
     return  response.json();
  
  }


  // Get articles Count
export async function getArticlesCount() : Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`,
    {next: {revalidate: 50}}
   );
 
   if(!response.ok) {
     throw new Error("Failed to get articles count");
   }
 
   const {count} = await  response.json() as {count: number};
    return count;


}



// Get articles by searchText
export async function getArticlesBySearchtext(searchText: string) : Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`,
    {next: {revalidate: 50}}
   );
 
   if(!response.ok) {
     throw new Error("Failed to get articles");
   }
 
   return  response.json();

}


// Get single article by id
export async function getSingleArticle(articleId: string) : Promise<SingleArticle> {

  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: 'no-store'
  });
  console.log(response);
    if (!response.ok) {
        throw new Error("Failed to fetch article");
    }

    return await response.json();
}


