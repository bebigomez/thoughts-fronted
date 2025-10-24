import { useState } from "react";
import PropTypes from "prop-types";

import thoughtService from "../services/thoughts";

const PostForm = ({ toggleVisibility, location, posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.trim().length === 0 || body.trim().length === 0) {
      alert("You must add a title and body to post.");
      return;
    }

    const postObject = {
      title,
      body,
      origin: location,
    };

    thoughtService.create(postObject).then((response) => {
      setPosts([response, ...posts]);
    });

    setTitle("");
    setBody("");
    toggleVisibility();
    return;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
        <div>
          <textarea
            className="text-4xl font-semibold border-none w-full px-3 text-black focus:outline-none focus:shadow-outline break-all"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-6">
          <textarea
            className="text-base border-none w-full py-2 px-3 text-black, focus:outline-none focus:shadow-outline"
            placeholder="Tell us more..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            onClick={toggleVisibility}
            className="bg-blue-600 text-white font-semibold py-1.5 px-3 rounded-xl"
          >
            cancel
          </button>
          <button className="bg-blue-600 text-white font-semibold py-1.5 px-3 rounded-xl ml-2">
            post
          </button>
        </div>
      </form>
    </div>
  );
};
PostForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  location: PropTypes.string,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
};

export default PostForm;
