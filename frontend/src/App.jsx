import React from 'react'
import Layout from './components/Layout/Layout'
import Notifications from './pages/Notifications/Notifications'
import Network from './pages/Network/Network'
import Profile from './pages/Profile/Profile'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Post from './pages/Post/Post'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/network' element={<Network />} />
        <Route path='/post/:postId' element={<Post />} />
        <Route path='/profile/:username' element={<Profile />} />
      </Routes>
      <Toaster />
    </Layout>
  )
}

export default App