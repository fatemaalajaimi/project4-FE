import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import client from '../../services/config'
import Post from '../../components/Post'
import AddPostButton from '../../components/AddPostButton'

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await client.get('/post/profile')
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    getUserPosts()
  }, [])

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
                    src={`${BASE_URL}${post.accountId.image}`}
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

      {/* Add Post Button */}
      <section className="container my-4 text-center">
        <AddPostButton />
      </section>

      {/* User Posts Section */}
      <section className="container my-5">
        <div className="row justify-content-center">
          {posts?.length > 0 ? (
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

export default Profile
