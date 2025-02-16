import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'
import Post from '../../components/Post'
import AddPostButton from '../../components/AddPostButton'

const UserProfile = () => {
  const navigate = useNavigate()
  const { accountId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${accountId}`)
        setUser(response.data)
      } catch (error) {
        setError('Error fetching user details')
        console.error('Error fetching user details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [accountId])

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response2 = await axios.get(`${BASE_URL}/post/${accountId}`)
        setPosts(response2.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    getUserPosts()
  }, [accountId])

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-danger">{error}</div>
  if (!user) return <div>No User found.</div> // Changed from `job` to `user`

  return (
    <div>
      <div className="container mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center">
                  <img
                    // src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg"
                    src={`${BASE_URL}${user.image}`}
                    alt="Profile"
                    className="rounded-circle me-3"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      border: '3px solid #0A66C2'
                    }}
                  />
                  <div>
                    <h4 className="mb-1">{user.username}</h4>
                  </div>
                </div>

                {/* About Section */}
                <hr />
                <div>
                  <h5>About</h5>
                  <p>{user.about}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* User Posts Section */}
      <section className="container my-5">
        <div className="row justify-content-center">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                className="col-12 d-flex justify-content-center"
                key={post._id}
              >
                <Post post={post} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No posts yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default UserProfile
