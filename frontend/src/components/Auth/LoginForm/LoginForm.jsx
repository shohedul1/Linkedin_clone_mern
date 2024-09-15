import React from 'react'

const LoginForm = () => {
    return (
        <form  className='space-y-4 w-full max-w-md'>
            <input
                type='text'
                placeholder='Username'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
            />
            <input
                type='password'
                placeholder='Password'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
            />

            <button type='submit' className='bg-blue-500 hover:bg-blue-700 p-2 text-white w-full rounded-md'>
                Login
                {/* {isLoading ? <Loader className='size-5 animate-spin' /> : "Login"} */}
            </button>
        </form>
    )
}

export default LoginForm