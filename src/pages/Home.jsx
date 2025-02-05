import { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'

const Home = ({ user }) => {
  return (
    <div>
      <h1>Home page</h1>

      {/* personal account */}
      {user && user.accountType === 'personal' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          Personal account
        </div>
      )}

      {/* company account */}
      {user && user.accountType === 'company' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          Company account
        </div>
      )}
    </div>
  )
}

export default Home
