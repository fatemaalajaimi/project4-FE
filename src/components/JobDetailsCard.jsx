import { Link } from 'react-router-dom'
import { BASE_URL } from '../globals'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const JobDetailsCard = ({ user }) => {
  const navigate = useNavigate()
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [applicationCount, setApplicationCount] = useState()

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/job/${jobId}`)
        setJob(response.data)
        const response2 = await axios.get(
          `${BASE_URL}/application/applicationcount/${jobId}`
        )
        setApplicationCount(response2.data.count)
      } catch (error) {
        setError('Error fetching job details')
        console.error('Error fetching job details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [jobId])

  const applyForJob = async () => {
    try {
      await axios.post(`${BASE_URL}/application/apply/${jobId}/${user._id}`)
      navigate('/applications') // Redirect to the applications page
    } catch (error) {
      alert('Error applying for job: ' + error.response.data.error)
      console.error('Error applying for job:', error)
    }
  }

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-danger">{error}</div>
  if (!job) return <div>No job found.</div>

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{ maxHeight: '100vh', paddingTop: '20px' }}
    >
      <div
        className="card mb-4 shadow-lg p-4 rounded"
        style={{ minWidth: '600px', width: '80%', border: '1px solid #e0e0e0' }}
      >
        <div className="d-flex align-items-center mb-3">
          <img
            // src={
            //   job.companyId?.image ||
            //   'https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg'
            // }
            src={`${BASE_URL}${user.image}`}
            alt="Company Logo"
            className="rounded-circle me-2"
            style={{
              width: '70px',
              height: '70px',
              objectFit: 'cover',
              border: '2px solid #007bff'
            }}
          />
          <div>
            <h6 className="mb-0 fw-bold">
              {job.companyId?.username || 'Unknown Company'}
            </h6>
            <small className="text-muted">
              Posted on: {new Date(job.createdAt).toLocaleString()}
            </small>
          </div>
        </div>

        <h5 className="mb-3 text-primary">{job.role}</h5>
        <p className="card-text">{job.description}</p>
        <p className="card-text text-muted">
          Number of applications: <strong>{applicationCount}</strong>
        </p>

        {/* Apply Button */}
        {user && user.accountType === 'personal' && (
          <div className="text-end mt-4">
            <button onClick={applyForJob} className="btn btn-primary">
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobDetailsCard
