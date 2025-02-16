import { Link } from 'react-router-dom'
import { BASE_URL } from '../globals'

const Post = ({ post }) => {
  return (
    <div
      className="card mb-3 shadow-sm p-3 rounded"
      style={{ maxWidth: '600px' }}
    >
      <div className="d-flex align-items-center mb-2">
        <Link to={`/profile/${post.accountId_id}`}>
          {' '}
          {/* Make the image clickable */}
          <img
            // src={
            //   // src={`${BASE_URL}${post.accountId.image}`}
            //   'https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg'
            // }
            src={`${BASE_URL}${post.accountId.image}`}
            alt="User Profile"
            className="rounded-circle me-2"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
        </Link>
        <div>
          <h6 className="mb-0 fw-bold">{post.accountId.username}</h6>
          <small className="text-muted">
            {new Date(post.createdAt).toLocaleString()}
          </small>
        </div>
      </div>
      <p className="card-text">{post.content}</p>
      {post.image && (
        <img
          // src={`${BASE_URL}${post.image}`}
          src="https://www.socialchamp.com/wp-content/uploads/2023/12/Content-Blog-Banner_Q4-2023_1125x600_30_What-to-Post-on-LinkedIn.png"
          alt="Post"
          className="img-fluid rounded mt-2"
        />
      )}
    </div>
  )
}

export default Post
