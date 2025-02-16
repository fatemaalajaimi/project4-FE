import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addJob } from '../../services/jobService'

const AddJob = ({ jobs, setJobs }) => {
  const initialState = {
    role: '',
    description: ''
  }
  const [formJob, setFormJob] = useState(initialState)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await addJob({
        role: formJob.role,
        description: formJob.description
      })
      setJobs([...jobs, response])
      setFormJob(initialState)
      navigate('/jobs')
    } catch (error) {
      console.error('Error adding job:', error)
    }
  }

  const handleChange = (event) => {
    setFormJob({ ...formJob, [event.target.id]: event.target.value })
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
          New Job
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="role" className="form-label fw-semibold">
              Role Name
            </label>
            <input
              type="text"
              id="role"
              className="form-control border-primary"
              onChange={handleChange}
              value={formJob.role}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description
            </label>
            <textarea
              id="description"
              className="form-control border-primary"
              onChange={handleChange}
              value={formJob.description}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{ backgroundColor: '#0A66C2' }}
          >
            Create Job
          </button>
          <div className="text-center mt-3">
            <button
              type="button"
              onClick={() => navigate('/')}
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

export default AddJob
