'use client';
import ButtonSpinner from "@/Components/buttonSpinner";
import { DOMAIN } from "@/app/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';


const LoginForm = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === '') return toast.error("Email is required");
        if (password === '') return toast.error("password is required");

        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/users/login`, { email, password });
            router.replace('/');
            setLoading(false);
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response.data.message);
            console.log(error);
            setLoading(false);
        }



    }

    return (

        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="mb-4 border rounded p-2 text-xl"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                disabled={loading}
                className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
                type="submit"> {loading ? <ButtonSpinner /> : "Login"}

            </button>
        </form>

    )
}

export default LoginForm