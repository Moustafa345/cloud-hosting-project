'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';


const LoginForm = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault();
        if(email === '') return toast.error("Email is required");
        if(password === '') return toast.error("password is required");
        console.log({email, password});
        router.replace('/');
    }

    return (

        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input 
            className="mb-4 border rounded p-2 text-xl" 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />

            <input 
            className="mb-4 border rounded p-2 text-xl" 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />

            <button 
            className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold" 
            type="submit">Login
            </button>
        </form>

    )
}

export default LoginForm