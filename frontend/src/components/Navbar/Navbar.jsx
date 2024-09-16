import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Home, LogOut, User, Users } from "lucide-react";
import toast from 'react-hot-toast';

const Navbar = () => {
    const [authUser, setAuthUser] = useState(null);

    const handleLogout = async () => {
        try {
            const res = await fetch('https://linkedin-clone-mern.onrender.com/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    localStorage.removeItem('token'); // Remove token on successful logout
                    toast.success(data.message, { position: 'top-center' });
                    // Optionally, redirect to login page
                    window.location.href = '/login'; // Redirect to login
                } else {
                    toast.error(data.message, { position: 'top-center' });
                }
            } else {
                toast.error("Failed to log out", { position: 'top-center' });
            }
        } catch (error) {
            console.error('Error during logout:', error);
            toast.error('An error occurred during logout', { position: 'top-center' });
        }
    };

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            setAuthUser(null);
            return;
        }
    
        try {
            const res = await fetch('https://linkedin-clone-mern.onrender.com/api/v1/auth/me', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
            }
    
            const data = await res.json();
            console.log('Fetched user data:', data); // Log the response to check the data
            setAuthUser(data);
        } catch (error) {
            console.error("Error fetching current user:", error);
            toast.error(`An error occurred while fetching user data: ${error.message}`, { position: 'top-center' });
        }
    };
    

    useEffect(() => {
        fetchUser();
    }, [])


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
                                <Link to="/" className='text-neutral flex flex-col items-center'>
                                    <Home size={20} />
                                    <span className='text-xs hidden md:block'>Home</span>
                                </Link>
                                <Link to='/network' className='text-neutral flex flex-col items-center relative'>
                                    <Users size={20} />
                                    <span className='text-xs hidden md:block'>My Network</span>
                                    <span className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center'>
                                        0
                                    </span>
                                </Link>
                                <Link to='/notifications' className='text-neutral flex flex-col items-center relative'>
                                    <Bell size={20} />
                                    <span className='text-xs hidden md:block'>Notifications</span>
                                    <span className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center'>
                                        0
                                    </span>
                                </Link>
                                <Link to={`/profile/${authUser.id}`} className='text-neutral flex flex-col items-center'>
                                    <User size={20} />
                                    <span className='text-xs hidden md:block'>Me</span>
                                </Link>
                                <button onClick={handleLogout} className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'>
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
    );
};

export default Navbar;
