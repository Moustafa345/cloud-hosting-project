import AddCommentForm from "@/Components/comments/addCommentForm";
import CommentItem from "@/Components/comments/commentItem";
import { getSingleArticle } from "@/app/api/apiCalls/articleApiCall";
import { SingleArticle } from "@/app/utils/types";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { cookies } from "next/headers";


interface SingleArticlePageProps {
    params: {id: string}
}

const SingleArticlePage = async ({params}:SingleArticlePageProps) => {

    // await new Promise(resolve => setTimeout(resolve, 3000))

    const token = cookies().get("jwtToken")?.value || "";
    const userPayLoad =  verifyTokenForPage(token);

     const article: SingleArticle = await getSingleArticle(params.id);
  return (
   <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
    <div className=" bg-white p-7 rounded-lg mb-7">
        <h1 className=" text-3xl font-bold text-gray-700 mb-2">{article.title}</h1>
        <div className=" text-gray-400">{new Date(article.createdAt).toDateString()}</div>
        <p className=" text-gray-800 text-xl mt-5">{article.description}</p>
    </div>
    <div className="mt-7">
        {userPayLoad? (
            <AddCommentForm articleId={article.id}/>
        ): (
            <p className="text-blue-600 md:text-xl">
                To write a comment, you should be logged-in first
            </p>
        )}
    </div>
    <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
    </h4>
    {article.comments.map(comment => (
         <CommentItem key={comment.id} comment={comment} userId={userPayLoad?.id}  />
    ) )}
   
    
   </section>
  )
}

export default SingleArticlePage;