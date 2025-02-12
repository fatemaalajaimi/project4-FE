import { useNavigate } from 'react-router-dom'

const AddPostButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/post/new')
  }

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: '#800000', color: 'white' }}
      className="btn"
    >
      Create a post
    </button>
  )
}

export default AddPostButton
