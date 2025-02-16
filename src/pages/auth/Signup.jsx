import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../../services/authService'

const initialFormData = {
  username: '',
  password: '',
  passwordConf: '',
  accountType: 'personal',
  about: ''
}

const Signup = ({ getUserProfile }) => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp(formData)
      await getUserProfile()
      setFormData(initialFormData)
      navigate('/')
    } catch (error) {
      setMessage(error.response?.data?.error)
      console.log(error)
    }
  }

  const isFormInvalid = () => {
    return !(
      formData.username &&
      formData.password &&
      formData.about &&
      formData.password === formData.passwordConf
    )
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
          Sign Up
        </h2>
        {message && <p className="text-danger text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              className="form-control border-primary"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="about" className="form-label fw-semibold">
              About
            </label>
            <input
              type="text"
              id="about"
              value={formData.about}
              name="about"
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
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="form-control border-primary"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm" className="form-label fw-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm"
              value={formData.passwordConf}
              name="passwordConf"
              onChange={handleChange}
              className="form-control border-primary"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Account Type</label>
            <div className="form-check">
              <input
                type="radio"
                id="personal"
                name="accountType"
                value="personal"
                checked={formData.accountType === 'personal'}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="personal" className="form-check-label ms-2">
                Personal
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="company"
                name="accountType"
                value="company"
                checked={formData.accountType === 'company'}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="company" className="form-check-label ms-2">
                Company
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{ backgroundColor: '#0A66C2' }}
            disabled={isFormInvalid()}
          >
            Sign Up
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

export default Signup
