import { useParams, Link } from 'react-router-dom' // Import Link
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../globals'
import JobDetailsCard from '../../components/JobDetailsCard'

const JobDetails = ({ user }) => {
  const { jobId } = useParams()
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const getAllApplications = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/application/job/${jobId}`)
        console.log(response.data)
        setApplications(response.data)
      } catch (error) {
        console.error('Error fetching applications:', error)
      }
    }
    getAllApplications()
  }, [jobId])

  return (
    <div className="col-12 d-flex flex-column align-items-center">
      <JobDetailsCard user={user} />
      <div>
        {user && user.accountType === 'company' && (
          <table
            className="table table-bordered table-striped text-center"
            style={{ width: '100%', marginTop: '20px', fontSize: '1.2rem' }}
          >
            <thead>
              <tr>
                <th style={{ padding: '15px' }}>Username</th>
                <th style={{ padding: '15px' }}>Date of Application</th>
                <th style={{ padding: '15px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.createdAt}>
                  <td>
                    <Link
                      to={`/profile/${application.userId_Id}`}
                      style={{ textDecoration: 'none', color: 'blue' }}
                    >
                      {application.userId_username}
                    </Link>
                  </td>
                  <td>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                  <td>{application.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default JobDetails
