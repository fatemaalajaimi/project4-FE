import { useNavigate } from 'react-router-dom'

const AddPostButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/post/new')
  }

  return (
    <button
      onClick={handleClick}
      className="btn w-30 text-white fw-semibold"
      style={{ backgroundColor: '#0A66C2' }}
    >
      Create a post
    </button>
  )
}

export default AddPostButton
