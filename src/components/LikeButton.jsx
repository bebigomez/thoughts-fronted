import PropTypes from "prop-types";

const LikeButton = ({ postId, likes, isLiked, onLike }) => {
  return (
    <div className="flex items-center">
      <button onClick={() => onLike(postId)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`w-6 h-6 fill-current ${
            isLiked ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span className="text-gray-500 ml-2">{likes}</span>
    </div>
  );
};

LikeButton.propTypes = {
  postId: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default LikeButton;
