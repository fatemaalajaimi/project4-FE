import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BASE_URL } from './globals'
import axios from 'axios'
import Nav from './components/NavBar'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import AddPost from './pages/Post/AddPost'
import { useEffect, useState } from 'react'
import { getProfile } from './services/userService'
import client from './services/config'

const App = () => {
  const [user, setUser] = useState(null)

  const getUserProfile = async () => {
    try {
      const data = await getProfile()
      console.log(data)
      setUser(data)
    } catch (error) {
      setUser(null)
      console.log(error)
    }
  }

  const logOut = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await axios.get(`${BASE_URL}/post`)
      setPosts(response.data)
      console.log(response.data)
    }
    getAllPosts()
  }, [])

  return (
    <>
      <header>
        <Nav logOut={logOut} user={user} />
      </header>
      <main>
        <Routes>
          <Route
            path="/auth/signup"
            element={<Signup getUserProfile={getUserProfile} />}
          />
          <Route
            path="/auth/signin"
            element={<Signin getUserProfile={getUserProfile} />}
          />

          <Route path="/" element={<Home user={user} posts={posts} />} />

          <Route
            path="/post/new"
            element={<AddPost posts={posts} setPosts={setPosts} />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
