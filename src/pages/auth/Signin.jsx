import { useState } from 'react'
import { signIn } from '../../services/authService'
import { Link, useNavigate } from 'react-router-dom'

const initialFormData = {
  username: '',
  password: ''
}

const Signin = ({ getUserProfile }) => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(formData)
      await getUserProfile()
      setFormData(initialFormData)
      navigate('/')
    } catch (error) {
      setMessage(error.response?.data?.error)
    }
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
          Sign In
        </h2>
        {message && <p className="text-danger text-center">{message}</p>}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              className="form-control border-primary"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="form-control border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{ backgroundColor: '#0A66C2' }}
          >
            Sign In
          </button>
          <div className="text-center mt-3">
            <Link
              to="/"
              className="text-decoration-none"
              style={{ color: '#0A66C2' }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Signin
