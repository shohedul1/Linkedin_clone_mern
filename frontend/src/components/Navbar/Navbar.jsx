import React from 'react'
import { Link } from 'react-router-dom';
import { Bell, Home, LogOut, User, Users } from "lucide-react";


const Navbar = () => {
    const authUser = false;
    return (
        <nav className='bg-gray-200 shadow-md sticky top-0 z-10'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex justify-between items-center py-3'>
                    <div className='flex items-center space-x-4'>
                        <Link to='/'>
                            <img className='h-8 rounded' src='/small-logo.png' alt='LinkedIn' />
                        </Link>
                    </div>
                    <div className='flex items-center gap-2 md:gap-6'>
                        {authUser ? (
                            <>
                                <Link to={"/"} className='text-neutral flex flex-col items-center'>
                                    <Home size={20} />
                                    <span className='text-xs hidden md:block'>Home</span>
                                </Link>
                                <Link to='/network' className='text-neutral flex flex-col items-center relative'>
                                    <Users size={20} />
                                    <span className='text-xs hidden md:block'>My Network</span>

                                    <span
                                        className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
                                          rounded-full size-3 md:size-4 flex items-center justify-center'
                                    >
                                        0
                                    </span>

                                </Link>
                                <Link to='/notifications' className='text-neutral flex flex-col items-center relative'>
                                    <Bell size={20} />
                                    <span className='text-xs hidden md:block'>Notifications</span>

                                    <span
                                        className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
                                          rounded-full size-3 md:size-4 flex items-center justify-center'
                                    >
                                        0
                                    </span>

                                </Link>
                                <Link
                                    to={`/profile/:4565`}
                                    className='text-neutral flex flex-col items-center'
                                >
                                    <User size={20} />
                                    <span className='text-xs hidden md:block'>Me</span>
                                </Link>
                                <button
                                    className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
                                >
                                    <LogOut size={20} />
                                    <span className='hidden md:inline'>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to='/login' className='bg-blue-500 p-2 rounded-full'>
                                    Sign In
                                </Link>
                                <Link to='/signup' className='bg-purple-400 p-2 rounded-full'>
                                    Join now
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar