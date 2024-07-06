import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { redirect } from "next/navigation";
import { Article } from "@prisma/client";
import { getSingleArticle } from "@/app/api/apiCalls/articleApiCall";
import EditArticleForm from "../editArticleForm";


interface EditArticlePageProps {
    params: {id: string}
}

const EditArticlePage = async ({params:{id}}: EditArticlePageProps) => {

    const token = cookies().get("jwtToken")?.value || "";
    const userPayload = verifyTokenForPage(token);
    if (!userPayload?.isAdmin) redirect("/");

    const article : Article = await getSingleArticle(id);
    
  return (
    <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
    <div className='shadow p-4 bg-purple-200 rounded w-full'>
      <h2 className='text-2xl text-green-700 font-semibold mb-4'>
          Edit Article
      </h2>
      <EditArticleForm article={article} />
    </div>
  </section>
  )
}

export default EditArticlePage