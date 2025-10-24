import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import thoughts from "../services/thoughts";
import formatTimestamp from "../utils";

const Post = ({ post }) => {
  const [pagePost, setPagePost] = useState(post || null);
  const [loading, setLoading] = useState(!post);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (!post && id) {
      setLoading(true);
      thoughts.getOne(id)
        .then((data) => {
          setPagePost(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, post]);

  const LoadingSkeleton = () => (
    <div className="container mx-auto p-4 mt-8 md:w-1/2 animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-1 w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-8 md:w-1/2 md">
      <h1 className="text-4xl font-bold text-gray-800 mb-1">{pagePost.title}</h1>
      <p className="text-xs text-gray-700">Posted on {formatTimestamp(pagePost.timestamp)}</p>
      <div className="flex items-center">
        {pagePost.origin.country !== "unknown" ? (
          <>
            <img
              className="h-3 rounded-sm mr-1"
              src={`https://flagcdn.com/h20/${pagePost.origin.countryCode}.png`}
            ></img>
            <p className="text-xs text-gray-700">{`From ${pagePost.origin.country}`}</p>
          </>
        ) : (
          <p className="text-xs text-gray-700">From Unknown</p>
        )}
      </div>
      <p className="text-base text-gray-700 mt-4">{pagePost.body}</p>
    </div>
  );
};

export default Post;
