import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import { BASE_URL } from './globals'
import axios from 'axios'
import Nav from './components/NavBar'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Profile from './pages/auth/Profile'
import UserProfile from './pages/auth/UserProfile'
import AddPost from './pages/Post/AddPost'
import AllJobs from './pages/Job/AllJobs'
import AddJob from './pages/Job/AddJob'
import JobDetails from './pages/Job/JobDetails'
import ViewAllApplications from './pages/applications/ViewAllApplications'
import { useEffect, useState } from 'react'
import { getProfile } from './services/userService'
import client from './services/config'

const App = () => {
  const [user, setUser] = useState(null)

  const getUserProfile = async () => {
    try {
      const data = await getProfile()
      // console.log(data)
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
      // console.log(response.data)
    }
    getAllPosts()
  }, [])

  // useEffect(() => {
  //   const getAllJobs = async () => {
  //     const response = await axios.get(`${BASE_URL}/job`)
  //     setJobs(response.data)
  //     // console.log(response.data)
  //   }
  //   getAllJobs()
  // }, [])

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        let response
        if (user.accountType === 'personal') {
          // response = await client.get('/job')
          response = await axios.get(`${BASE_URL}/job/notApplied/${user._id}`)
        } else if (user.accountType === 'company') {
          response = await client.get('/job/companyJobs')
        }

        setJobs(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }

    if (user) {
      getAllJobs()
    }
  }, [user])

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

          <Route path="/Profile" element={<Profile user={user} />} />

          {/* `/profile/${post.accountId_id}` */}
          <Route path="/Profile/:accountId" element={<UserProfile />} />

          <Route path="/" element={<Home user={user} />} />

          <Route
            path="/post/new"
            element={<AddPost posts={posts} setPosts={setPosts} />}
          />

          <Route path="/jobs" element={<AllJobs jobs={jobs} user={user} />} />

          <Route
            path="/job/new"
            element={<AddJob jobs={jobs} setJobs={setJobs} />}
          />

          <Route path="/job/:jobId" element={<JobDetails user={user} />} />

          <Route
            path="/applications"
            element={<ViewAllApplications user={user} />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
