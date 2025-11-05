import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import thoughts from "../services/thoughts";
import formatTimestamp from "../utils";
import LoadingSkeleton from "./LoadingSkeleton";
import PostOrigin from "./PostOrigin";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    thoughts
      .getOne(id)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <div className="h-dvh flex justify-center align-center items-center text-red-500">Something wrong happened</div>;
  if (!post) return <div className="h-dvh flex justify-center align-center items-center text-red-500">Post not found</div>;

  return (
    <div className="container mx-auto p-4 mt-8 md:w-1/2 md">
      <h1 className="text-4xl font-bold text-gray-800 mb-1">{post.title}</h1>
      <p className="text-xs text-gray-700">
        Posted on {formatTimestamp(post.timestamp)}
      </p>
      <PostOrigin origin={post.origin} />
      <p className="text-base text-gray-700 mt-4">{post.body}</p>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
