'use client';

import { DOMAIN } from "@/app/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface UpdateCommentModalProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    commentId: number;
    text: string;
}

const UpdateCommentModal = ({setOpen, commentId, text}: UpdateCommentModalProps) => {

const [updatedText, setUpdatedText] = useState(text);
const router = useRouter();

const formSubmitHandler = async(e: FormEvent) => {
    e.preventDefault();
    if(updatedText === "") return toast.info("The comment field cannot be empty");
    try {
        await axios.put(`${DOMAIN}/api/comments/${commentId}`, {text: updatedText});
        router.refresh();
        // setUpdatedText("");
        setOpen(false);
      } catch (error:any) {
        toast.error(error?.response?.data.message);
        console.log(error);
      }
}

 

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
            <div className="flex justify-end items-start mb-5">
                <IoMdCloseCircleOutline onClick={()=> setOpen(false)} className="text-red-500 cursor-pointer text-3xl" />
            </div>
            <form onSubmit={formSubmitHandler}>
                <input 
                type="text"
                placeholder="Edit Comment..."
                className="text-xl rounded-lg p-2 w-full bg-white mb-2"
                value={updatedText}
                onChange={(e)=> setUpdatedText(e.target.value)}
                 />
                 <button 
                 type="submit" 
                 className="bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition">
                    Edit
                 </button>

            </form>
        </div>
    </div>
  )
}

export default UpdateCommentModal






