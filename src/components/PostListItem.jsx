import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import formatTimestamp from "../utils";
import PostOrigin from "./PostOrigin";
import LikeButton from "./LikeButton";

const PostListItem = ({ post, isLiked, onLike }) => {
  return (
    <div key={post.id}>
      <Link
        to={`/thoughts/${post.id}`}
        className="block text-xl font-medium mt-4 transition-colors hover:text-blue-600"
      >
        {post.title}
      </Link>
      <div>
        <p className="text-sm text-gray-500">Posted on: {formatTimestamp(post.timestamp)}</p>
        <PostOrigin origin={post.origin} />
      </div>
      <div className="flex items-center justify-end p-4 border-b border-gray-200">
        <LikeButton
          postId={post.id}
          likes={post.likes}
          isLiked={isLiked}
          onLike={onLike}
        />
      </div>
    </div>
  );
};

PostListItem.propTypes = {
  post: PropTypes.object.isRequired,
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default PostListItem;
