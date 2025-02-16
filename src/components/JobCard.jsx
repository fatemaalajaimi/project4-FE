import React from 'react'
import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {
  return (
    <div
      className="card mb-4 shadow-sm"
      style={{ display: 'flex', flexDirection: 'row', width: '600px' }}
    >
      <img
        src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg"
        className="card-img-left"
        alt={job.companyName}
        style={{ width: '120px', height: '100%', objectFit: 'cover' }} // Smaller image
      />
      <div className="card-body">
        <h5 className="card-title">{job.role}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {job.companyId.username}
        </h6>

        <Link
          to={`/job/${job._id}`}
          className="btn w-30 text-white fw-semibold"
          style={{ backgroundColor: '#0A66C2' }}
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default JobCard
