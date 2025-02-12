import { Link } from 'react-router-dom'
import { BASE_URL } from '../globals'

const Post = ({ post }) => {
  return (
    <div>
      <p className="card-text">
        <b>Content:</b> {post.content}
      </p>

      <p className="card-text">
        <b>Created by:</b> {post.accountId.username}
      </p>
    </div>
  )
}

export default Post
