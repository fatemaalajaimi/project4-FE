import Post from '../components/Post'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import AddPostButton from '../components/AddPostButton'
import AddJobButton from '../components/AddJobButton'
import axios from 'axios'
import client from '../services/config'

const Home = ({ user }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await client.get('/post')
        // console.log(response.data)
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    getAllPosts()
  }, [])

  return (
    <div>
      <h1></h1>

      {/* {user && (
        <div className="d-flex justify-content-end mt-3 me-5">
          <AddPostButton />
        </div>
      )} */}

      {/* personal account */}
      {/* {user && user.accountType === 'personal' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          Personal account
        </div>
      )} */}

      {/* company account */}
      {/* {user && user.accountType === 'company' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          Company account
          <AddJobButton />
        </div>
      )} */}

      {/* Display all posts */}
      <section className="container my-5">
        <div className="row justify-content-center">
          {posts?.map((post) => (
            <div
              className="col-12 d-flex justify-content-center"
              key={post._id}
            >
              <Post post={post} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
