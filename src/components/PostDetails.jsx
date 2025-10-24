import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import formatTimestamp from "../utils";
import LoadingSkeleton from "./LoadingSkeleton";

const Post = ({ post: initialPost }) => {
  const { id } = useParams();
  const { post, loading, error } = usePost(id, initialPost);

  if (loading) return <LoadingSkeleton />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="container mx-auto p-4 mt-8 md:w-1/2 md">
      <h1 className="text-4xl font-bold text-gray-800 mb-1">{post.title}</h1>
      <p className="text-xs text-gray-700">Posted on {formatTimestamp(post.timestamp)}</p>
      <div className="flex items-center">
        {post.origin.country !== "unknown" ? (
          <>
            <img
              className="h-3 rounded-sm mr-1"
              src={`https://flagcdn.com/h20/${post.origin.countryCode}.png`}
            ></img>
            <p className="text-xs text-gray-700">{`From ${post.origin.country}`}</p>
          </>
        ) : (
          <p className="text-xs text-gray-700">From Unknown</p>
        )}
      </div>
      <p className="text-base text-gray-700 mt-4">{post.body}</p>
    </div>
  );
};

export default Post;
