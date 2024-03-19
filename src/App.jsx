import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => setUser(response.data[0]));
    axios
      .get("http://localhost:3001/posts")
      .then((response) =>
        setPosts(response.data.map((post) => ({ ...post, likes: 0 })))
      );
  }, []);

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center py-6 pl-3 bg-slate-200 rounded">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={user.profileImage}
          alt="Profile"
        />
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
      </div>
      <div className="flex justify-center items-center bg-gradient-to-br from-pink-500 to-orange-400 py-8 my-4 rounded">
        <h1 className='text-xl text-white'>+ Add new thought</h1>
      </div>
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md p-4 mb-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-500">From: {user.username}</p>
          <p className="text-gray-500">Posted on: {post.timestamp}</p>
          <div className="flex items-center mt-2">
            <button
              type="button"
              className="bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl p-2 rounded-full mr-2"
              onClick={() => {
                handleLike(post.id);
              }}
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
</svg>

            </button>
            <span className="text-gray-600">{post.likes} Likes</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
