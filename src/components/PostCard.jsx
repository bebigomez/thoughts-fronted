import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import formatTimestamp from "../utils";
import PostOrigin from "./PostOrigin";
import LikeButton from "./LikeButton";

const PostCard = ({ post, isLiked, onLike }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <Link
        to={`/thoughts/${post.id}`}
        className="block text-lg font-medium mb-3 transition-colors hover:text-blue-600 line-clamp-2"
      >
        {post.title}
      </Link>
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Posted on: {formatTimestamp(post.timestamp)}</p>
        <PostOrigin origin={post.origin} />
      </div>
      <div className="flex items-center justify-end pt-4 border-t border-gray-100">
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

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default PostCard;
