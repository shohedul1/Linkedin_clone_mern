import React from 'react'

const SignUpForm = () => {
    return (
        <form className='flex flex-col gap-4'>
            <input
                type='text'
                placeholder='Full name'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
            />
            <input
                type='text'
                placeholder='Username'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
            />
            <input
                type='email'
                placeholder='Email'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
            />
            <input
                type='password'
                placeholder='Password (6+ characters)'
                className='w-full outline-none focus:outline-red-200 rounded-md p-2 outline-black'
                required
            />

            <button type='submit' className='bg-blue-500 hover:bg-blue-700 p-2 text-white w-full rounde'>
                {/* {isLoading ? <Loader className='size-5 animate-spin' /> : "Agree & Join"} */}
                SignUp
            </button>
        </form>
    )
}

export default SignUpForm