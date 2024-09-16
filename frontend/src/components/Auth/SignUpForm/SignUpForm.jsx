import React, { useState } from 'react';
import toast from 'react-hot-toast';

const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
};

const SignUpForm = () => {
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, username, email, password } = state;

        setIsLoading(true);

        try {
            const res = await fetch(`https://linkedin-clone-mern.onrender.com/api/v1/auth/signup`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ name, username, email, password }),
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    toast.success(data.message, { position: 'top-center' });
                    window.location.reload();
                } else {
                    toast.error(data.message, { position: 'top-center' });
                }
            } else {
                const errorData = await res.json();
                console.error("Failed to sign up:", res.statusText, errorData);
                toast.error(errorData.message || "Sign-up failed", { position: 'top-center' });
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            toast.error(error.message || "An error occurred");
        } finally {
            setIsLoading(false);
            setState(initialState);

        }
    };


    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
                type='text'
                name='name'
                value={state.name}
                placeholder='Full name'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
                onChange={handleChange}
            />
            <input
                type='text'
                name='username'
                value={state.username}
                placeholder='Username'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
                onChange={handleChange}
            />
            <input
                type='email'
                name='email'
                value={state.email}
                placeholder='Email'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
                onChange={handleChange}
            />
            <input
                type='password'
                name='password'
                value={state.password}
                placeholder='Password (6+ characters)'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
                onChange={handleChange}
            />
            <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 p-2 text-white w-full rounded'
                disabled={isLoading}
            >
                {isLoading ? "Submitting..." : "Sign Up"}
            </button>
        </form>
    );
};

export default SignUpForm;

