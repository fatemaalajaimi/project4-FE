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

  //Admin Page viewing all the vendors and we will need a handle that submit both Vendors & Customers
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
    <main className="container mt-5">
      <h1 className="text-center mb-4">Sign In</h1>
      {message && <p className="text-danger text-center">{message}</p>}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#800000', color: '#fff' }}
          >
            Sign In
          </button>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  )
}

export default Signin
