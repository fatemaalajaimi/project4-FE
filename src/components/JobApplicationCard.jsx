import React from 'react'
import { Link } from 'react-router-dom'

const JobApplicationCard = ({ application }) => {
  return (
    <div
      className="card mb-4 shadow-sm"
      style={{ display: 'flex', flexDirection: 'row', width: '600px' }}
    >
      <img
        src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg"
        className="card-img-left"
        alt={application.userId.image}
        style={{ width: '120px', height: '100%', objectFit: 'cover' }} // Smaller image
      />
      <div className="card-body">
        <h5 className="card-title">{application.jobId.role}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {application.userId.username}
        </h6>
        <h6 className="card-subtitle mb-2">
          Date of application: {application.createdAt}
        </h6>
        <h6 className="card-subtitle mb-2">
          Last updated: {application.updatedAt}
        </h6>
        <h6 className="card-subtitle mb-2">Status: {application.status}</h6>
      </div>
    </div>
  )
}

export default JobApplicationCard
