'use client';
import { useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import SearchArticlePage from "@/app/articles/search/page";

const SearchArticleInput = () => {

    const router = useRouter();
    const [searchText, setSearchText] = useState('');
   

    const formSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault();
        if(searchText === '') return toast.error("searchText is required");
       
        console.log({searchText});
        router.push(`/articles/search?searchText=${searchText}`)
    }

    return (

        <form onSubmit={formSubmitHandler} className="my-5 w-full md:w-2/3 m-auto">
            <input 
            className="w-full p-3 text-xl border-none text-gray-900 focus:outline-none" 
            type="search" 
            placeholder="Search for articles"
            value={searchText}
            onChange={(e)=> setSearchText(e.target.value)}
            />
        </form>

    )
}

export default SearchArticleInput