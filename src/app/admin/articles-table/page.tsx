import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { redirect } from "next/navigation";


const AdminArticlesTable = () => {

  
  const token = cookies().get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);

  if (!userPayload?.isAdmin) {
      redirect("/");
  }
  
  return (
    <div>AdminArticlesTable</div>
  )
}

export default AdminArticlesTable