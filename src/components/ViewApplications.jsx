import { useNavigate } from 'react-router-dom'

const ViewApplications = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/applications')
  }

  return (
    <button
      onClick={handleClick}
      className="btn w-30 text-white fw-semibold"
      style={{ backgroundColor: '#0A66C2' }}
    >
      View Applications
    </button>
  )
}

export default ViewApplications
