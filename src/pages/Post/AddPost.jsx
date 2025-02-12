import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../../services/config'
import { BASE_URL } from '../../globals'
import { addPost } from '../../services/postService'

const AddPost = ({ posts, setPosts }) => {
  const initialState = {
    content: '',
    image: ''
  }
  const [formPost, setFormPost] = useState(initialState)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('content', formPost.content)
      formData.append('image', formPost.image)
      console.log(formData)
      const response = await addPost(formData)
      setPosts([...posts, response])
      setFormPost(initialState)
      navigate('/')
    } catch (error) {
      console.error('Error adding pharmacy:', error)
    }
  }

  const handleChange = (event) => {
    setFormPost({ ...formPost, [event.target.id]: event.target.value })
  }

  const handleImageChange = (event) => {
    setFormPost({ ...formPost, image: event.target.files[0] })
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="shadow p-4 bg-light rounded mx-auto"
        style={{ maxWidth: '500px' }}
      >
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <input
            type="textarea"
            id="content"
            className="form-control"
            onChange={handleChange}
            value={formPost.content}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#800000', color: 'white' }}
          className="btn  w-100"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default AddPost
