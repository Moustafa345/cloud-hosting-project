import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { redirect } from "next/navigation";
import DeleteCommentButton from "./deleteCommentButton";
import { getAllComments } from "../adminApiCall";
import { Comment } from "@prisma/client";



const AdminCommentsTable = async () => {

  const token = cookies().get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);

  if (!userPayload?.isAdmin) redirect("/");
  

  const comments: Comment[] = await getAllComments(token)
  return (
    <section className="p-5">
    <h1 className="mb-7 text-2xl font-semibold text-gray-700">Comments</h1>
    <table className="table w-full text-left">
     <thead className="border-t-2 border-b-2 border-gray-500 text-xl">
       <tr>
         <th className="p-2">Comment</th>
         <th className="hidden lg:inline-block p-3">Created At</th>
         <th>Actions</th>
       </tr>
     </thead>
     <tbody>
       {comments.map(comment => (
         <tr key={comment.id} className="border-b border-t border-gray-300 hover:bg-gray-300">
           <td className="p-3 text-gray-700">
             {comment.text}
           </td>
           <td className="text-gray-700 p-3 font-normal hidden lg:inline-block">
             {new Date(comment.createdAt).toDateString()}
           </td>
           <td>
             <DeleteCommentButton commentId={comment.id} />
           </td>
         </tr>
       ))}
     </tbody>
    </table>
   </section>
  )
}

export default AdminCommentsTable