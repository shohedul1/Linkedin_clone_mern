import React, { useState } from 'react'
import toast from 'react-hot-toast';


const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
}
const SignUpForm = () => {
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, username, email, password } = state;

        try {
            const userSingup = {
                name,
                username,
                email,
                password,
            };

            const response = await fetch('https://linkedin-clone-mern.onrender.com/api/v1/auth/signup', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(userSingup),
                credentials: "include",  // This sends cookies along with the request
            });


            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success(data.message, {
                        position: 'top-center'
                    });
                    setState(initialState);
                } else {
                    toast.error(data.message, {
                        position: 'top-center'
                    });
                }
            } else {
                toast.error("There was a problem with your request.", {
                    position: 'top-right'
                });
            }
        } catch (error) {
            setState(initialState);
            toast.error(error.message || "An error occurred");
        }
    };

    // console.log(state);
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

            <button type='submit' className='bg-blue-500 hover:bg-blue-700 p-2 text-white w-full rounde'>
                {/* {isLoading ? <Loader className='size-5 animate-spin' /> : "Agree & Join"} */}
                SignUp
            </button>
        </form>
    )
}

export default SignUpForm