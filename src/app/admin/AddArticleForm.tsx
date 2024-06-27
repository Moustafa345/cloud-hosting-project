'use client';
import { useState } from "react";
import { toast } from 'react-toastify';

const AddArticleForm = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const formSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault();
        if(title === '') return toast.error("Title is required");
        if(description === '') return toast.error("Description is required");
        console.log({title, description});
    }

    return (

        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input 
            className="mb-4 border rounded p-2 text-xl focus:outline-none" 
            type="text" 
            placeholder="Enter article title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            />

           <textarea 
           className="mb-4 p-2 lg:text-xl rounded resize-none focus:outline-none" 
           rows={5}
           placeholder="Enter article description"
           value={description}
           onChange={(e)=> setDescription(e.target.value)}
           id=""></textarea>

            <button 
            className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold" 
            type="submit">Add
            </button>
        </form>

    )
}

export default AddArticleForm