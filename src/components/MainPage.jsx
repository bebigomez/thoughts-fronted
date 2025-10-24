/* eslint react/prop-types: 0 */

import { useState, useEffect } from "react";

import thoughtService from "../services/thoughts";

import Scribble from "./icons/Scribble";
import PostForm from "../components/PostForm";
import PostListItem from "./PostListItem";
import PostCard from "./PostCard";
import ViewModeToggle from "./ViewModeToggle";

const MainPage = ({ posts, setPosts, location }) => {
  const [blogVisibility, setBlogVisibility] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [viewMode, setViewMode] = useState("list");

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
        <PostListItem
          key={post.id}
          post={post}
          isLiked={likedPosts.includes(post.id)}
          onLike={handleLike}
        />
      ))}
    </div>
  );

  const renderCardsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isLiked={likedPosts.includes(post.id)}
          onLike={handleLike}
        />
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
        <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {viewMode === "list" ? renderListView() : renderCardsView()}
    </div>
  );
};

export default MainPage;
