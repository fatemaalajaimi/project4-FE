import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../../services/postService'

const AddPost = ({ posts, setPosts }) => {
  const initialState = { content: '', image: '' }
  const [formPost, setFormPost] = useState(initialState)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('content', formPost.content)
      formData.append('image', formPost.image)
      const response = await addPost(formData)
      setPosts([...posts, response])
      setFormPost(initialState)
      navigate('/profile')
    } catch (error) {
      setMessage('Failed to create post. Please try again.')
    }
  }

  const handleChange = (event) => {
    setFormPost({ ...formPost, [event.target.id]: event.target.value })
  }

  const handleImageChange = (event) => {
    setFormPost({ ...formPost, image: event.target.files[0] })
  }

  return (
    <main
      className="container d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: '400px', width: '100%', borderRadius: '10px' }}
      >
        <h2 className="text-center mb-4" style={{ color: '#0A66C2' }}>
          Create a Post
        </h2>
        {message && <p className="text-danger text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="content" className="form-label fw-semibold">
              Post Content
            </label>
            <textarea
              id="content"
              className="form-control border-primary"
              onChange={handleChange}
              value={formPost.content}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label fw-semibold">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              className="form-control border-primary"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{ backgroundColor: '#0A66C2' }}
          >
            Post
          </button>
          <div className="text-center mt-3">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="text-decoration-none btn btn-link"
              style={{ color: '#0A66C2' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AddPost
