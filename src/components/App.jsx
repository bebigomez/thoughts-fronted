import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import thoughtService from "../services/thoughts";

import MainPage from "./MainPage";
import PostDetails from "./PostDetails";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    thoughtService.getAll().then((initalPosts) => {
      const sortedPosts = initalPosts.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setPosts(sortedPosts);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MainPage posts={posts} setPosts={setPosts} />}
        />
        <Route path="/thoughts/:id" element={<PostDetails />} />
      </Routes>
    </>
  );
};

export default App;
