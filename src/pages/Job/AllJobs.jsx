import { useNavigate } from 'react-router-dom'
import client from '../../services/config'
import { BASE_URL } from '../../globals'
import { addJob } from '../../services/jobService'
import AddJobButton from '../../components/AddJobButton'
import { useEffect, useState } from 'react'
import JobCard from '../../components/JobCard'
import ViewApplications from '../../components/ViewApplications'

const AllJobs = ({ user, jobs }) => {
  return (
    <div>
      {user && user.accountType === 'company' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          <AddJobButton />
        </div>
      )}

      {user && user.accountType === 'personal' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          <ViewApplications />
        </div>
      )}

      <section className="container my-5">
        <div className="row justify-content-center">
          {jobs?.map((job) => (
            <div className="col-12 d-flex justify-content-center" key={job._id}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AllJobs
