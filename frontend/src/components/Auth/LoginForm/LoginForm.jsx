import React, { useState } from 'react';
import { Loader } from "lucide-react";
import toast from 'react-hot-toast';

const initialState = {
    username: "",
    password: "",
};


const LoginForm = () => {
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = state;

        setIsLoading(true);

        try {
            const res = await fetch('https://linkedin-clone-mern.onrender.com/api/v1/auth/login', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ username, password }),
                credentials: "include",
            });

            const data = await res.json(); // Extract JSON data here

            if (res.ok) {
                localStorage.setItem('token', data.token); // Store the token directly
                if (data.success) {
                    toast.success(data.message, { position: 'top-center' });
                } else {
                    toast.error(data.message, { position: 'top-center' });
                }
            } else {
                toast.error(data.message || "Login failed", { position: 'top-center' });
            }
        } catch (error) {
            toast.error(error.message || "An error occurred", { position: 'top-center' });
        } finally {
            setIsLoading(false);
            setState(initialState);
        }
    };



    return (
        <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-md'>
            <input
                type='text'
                name='username'
                value={state.username}
                onChange={handleChange}
                placeholder='Username'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
            />
            <input
                type='password'
                name='password'
                value={state.password}
                onChange={handleChange}
                placeholder='Password'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
            />

            <button type='submit' className='bg-blue-500 hover:bg-blue-700 p-2 text-white w-full rounded-md'>

                {isLoading ? <Loader className='size-5 animate-spin flex items-center justify-center' /> : "Login"}
            </button>
        </form>
    )
}

export default LoginForm