'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';
import { DOMAIN } from "@/app/utils/constants";
import { Article } from "@prisma/client";


interface EditArticleFormProps {
    article: Article;
}


const EditArticleForm = ({article}: EditArticleFormProps) => {
    const router = useRouter();
    const [title, setTitle] = useState(article.title);
    const [description, setDescription] = useState(article.description);

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault();
        if(title === '') return toast.error("Title is required");
        if(description === '') return toast.error("Description is required");
            
        try {
            await axios.put(`${DOMAIN}/api/articles/${article.id}`, {title, description});           
            toast.success("Article updated successfully");
            router.push(`${DOMAIN}/admin/articles-table?pageNumber=1`)
            router.refresh();
        } catch (error:any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
       
    }

    return (

        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input 
            className="mb-4 border rounded p-2 text-xl focus:outline-none" 
            type="text" 
            placeholder="Edit article title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            />

           <textarea 
           className="mb-4 p-2 lg:text-xl rounded resize-none focus:outline-none" 
           rows={5}
           placeholder="Edit article description"
           value={description}
           onChange={(e)=> setDescription(e.target.value)}
           ></textarea>

            <button 
            className="text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold" 
            type="submit">Edit
            </button>
        </form>

    )
}

export default EditArticleForm