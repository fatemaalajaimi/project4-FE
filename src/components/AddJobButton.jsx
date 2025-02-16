import { useNavigate } from 'react-router-dom'

const AddJobButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/job/new')
  }

  return (
    <button
      onClick={handleClick}
      className="btn w-30 text-white fw-semibold"
      style={{ backgroundColor: '#0A66C2' }}
    >
      Post a new Job
    </button>
  )
}

export default AddJobButton
