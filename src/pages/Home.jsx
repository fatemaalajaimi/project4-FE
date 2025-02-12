import Post from '../components/Post'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import AddPostButton from '../components/AddPostButton'
import axios from 'axios'

const Home = ({ user, posts }) => {
  return (
    <div>
      <h1>Home page</h1>

      {user && (
        <div className="d-flex justify-content-end mt-3 me-5">
          <AddPostButton />
        </div>
      )}

      {/* personal account */}
      {user && user.accountType === 'personal' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          Personal account
        </div>
      )}

      {/* company account */}
      {user && user.accountType === 'company' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          Company account
        </div>
      )}

      {/* Display all posts */}
      <section className="container my-5 d-flex justify-content-center">
        <div className="row row-cols-1 row-cols-md-3 g-5">
          {posts?.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
