import { useNavigate } from 'react-router-dom'
import { addPost } from '../../services/postService'
import { useEffect, useState } from 'react'
import client from '../../services/config'
import JobApplicationCard from '../../components/JobApplicationCard'

const ViewAllApplications = ({ user }) => {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const getAllApplications = async () => {
      try {
        const response = await client.get(`/application/${user._id}`)
        console.log(response.data)
        setApplications(response.data)
      } catch (error) {
        console.error('Error fetching applications:', error)
      }
    }
    getAllApplications()
  }, [])

  return (
    <div>
      <section className="container my-5">
        <div className="row justify-content-center">
          {applications?.map((application) => (
            <div
              className="col-12 d-flex justify-content-center"
              key={application._id}
            >
              <JobApplicationCard application={application} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ViewAllApplications
