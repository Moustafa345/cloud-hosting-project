import { redirect } from "next/navigation";
import AddArticleForm from "./AddArticleForm"
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";

const AdminPage = () => {

    const token = cookies().get("jwtToken")?.value || "";
    const userPayload = verifyTokenForPage(token);

    if (!userPayload?.isAdmin) {
        redirect("/");
    }
  
  return (
    <div className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
            Add new article
        </h2>
        <AddArticleForm />
      </div>
    </div>
    
  )
}

export default AdminPage