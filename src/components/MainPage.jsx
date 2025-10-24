/* eslint react/prop-types: 0 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import thoughtService from "../services/thoughts";
import formatTimestamp from "../utils";

import Scribble from "./icons/Scribble";
import PostForm from "../components/PostForm";

const MainPage = ({ posts, setPosts, location }) => {
  const [blogVisibility, setBlogVisibility] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // New state for view mode

  useEffect(() => {
    const likedPostsFromLocalStorage = JSON.parse(
      localStorage.getItem("likedPosts")
    );
    if (likedPostsFromLocalStorage) {
      setLikedPosts(likedPostsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const hasSeenAlert = localStorage.getItem("hasSeenLocationPermission");

    if (!hasSeenAlert) {
      alert(
        "We ask for location permission to know from which country you are writing. If you prefer, you can decline it and post from an unknown origin."
      );
      localStorage.setItem("hasSeenLocationPermission", true);
    }
  });

  const toggleVisibility = () => {
    setBlogVisibility(!blogVisibility);
  };

  const handleLike = async (id) => {
    const post = posts.find((p) => p.id === id);

    const like = likedPosts.includes(id)
      ? { likes: post.likes - 1 }
      : { likes: post.likes + 1 };

    try {
      const patchedPost = await thoughtService.addLike(id, like);

      const updatedLikedPosts = likedPosts.includes(id)
        ? likedPosts.filter((item) => item !== id)
        : [...likedPosts, id];
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
      setLikedPosts(updatedLikedPosts);

      setPosts(posts.map((p) => (p.id !== id ? p : patchedPost)));
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const renderListView = () => (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Link
            to={`/posts/${post.id}`}
            className="block text-xl font-medium mt-4 transition-colors hover:text-blue-600"
          >
            {post.title}
          </Link>
          <div>
            <p className="text-sm text-gray-500">Posted on: {formatTimestamp(post.timestamp)}</p>
            <div className="flex items-center">
              {post.origin.country !== "unknown" ? (
                <>
                  <p className="text-sm text-gray-500">
                    From {post.origin.country}
                  </p>
                  <img
                    className="h-4 rounded-sm ml-2"
                    src={`https://flagcdn.com/h20/${post.origin.countryCode}.png`}
                    alt={`Flag of ${post.origin.country}`}
                  />
                </>
              ) : (
                <p className="text-sm text-gray-500">From Unknown</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end p-4 border-b border-gray-200">
            <button onClick={() => handleLike(post.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className={`w-6 h-6 fill-current ${
                  likedPosts.includes(post.id)
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="text-gray-500 ml-2">{post.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCardsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <Link
            to={`/posts/${post.id}`}
            className="block text-lg font-medium mb-3 transition-colors hover:text-blue-600 line-clamp-2"
          >
            {post.title}
          </Link>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Posted on: {formatTimestamp(post.timestamp)}</p>
            <div className="flex items-center">
              {post.origin.country !== "unknown" ? (
                <>
                  <p className="text-sm text-gray-500">
                    From {post.origin.country}
                  </p>
                  <img
                    className="h-4 rounded-sm ml-2"
                    src={`https://flagcdn.com/h20/${post.origin.countryCode}.png`}
                    alt={`Flag of ${post.origin.country}`}
                  />
                </>
              ) : (
                <p className="text-sm text-gray-500">From Unknown</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end pt-4 border-t border-gray-100">
            <button onClick={() => handleLike(post.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className={`w-6 h-6 fill-current ${
                  likedPosts.includes(post.id)
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="text-gray-500 ml-2">{post.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:w-1/2">
      <div className="flex flex-col gap-3 items-center pt-4">
        <Scribble />
        <h1 className="text-xl font-semibold my-2">
          hey! want to share a thought?
        </h1>
        <button
          onClick={toggleVisibility}
          className="bg-blue-600 text-white font-semibold py-1.5 px-3 rounded-xl"
        >
          yup!
        </button>

        {blogVisibility && (
          <PostForm
            toggleVisibility={toggleVisibility}
            location={location}
            posts={posts}
            setPosts={setPosts}
          />
        )}
      </div>
      
      <div className="flex items-center justify-between mt-10 mb-6">
        <h2 className="text-xl font-semibold">
          Other people have shared:
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            title="List View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`p-2 rounded ${
              viewMode === "cards" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            title="Cards View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === "list" ? renderListView() : renderCardsView()}
    </div>
  );
};

export default MainPage;
