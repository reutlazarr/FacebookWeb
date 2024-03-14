// Feed.js
import React, { useState, useEffect } from "react";
import Post from "../feed_components/Post";
import "./Feed.css";
import Menu from "../feed_components/Menu";
import TopBar from "../feed_components/TopBar";
import { useNavigate } from "react-router-dom";
import { addPost, deletePost, updatePost } from "../utils/HandlePosts";

function Feed({ user }) {
  const navigate = useNavigate();
  const [postsList, setPostsList] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle the dark mode state
  };

  // This ensures the feed will display only if the user signIn and have a token
  useEffect(() => {
    if (!user.token) {
      navigate("/");
    } else {
      // Fetch user's posts when the user is present and has a token
      getFeedPosts(user.email);
    }
  }, [user, navigate]);

   //handeling posts
   const addPostHandler = async () => {
    const updatedPosts = await addPost(user, newPostContent, postImage, setPostsList );
    if (updatedPosts) {
      //setPostsList(updatedPosts); // Update the state with the new list of posts
      setNewPostContent("");
      setPostImage(null);
    }
  };

  const deletePostHandler = async (postId) => {
    await deletePost(user, postId, setPostsList);
  };

  const updatePostHandler = async (postId, updatedContent, updatedImage) => {
    await updatePost(user, postId, updatedContent, updatedImage, postsList, setPostsList);
  };

  const getFeedPosts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const posts = await response.json();
      setPostsList(posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader(); // Create a new FileReader instance
      reader.onload = () => {
        setPostImage(reader.result); // Set the selected image to the reader's result (base64 encoded)
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  return (
    <div className={`feed-container ${isDarkMode ? "dark-mode" : ""}`}>
      <TopBar
        // profile={profile}
        user={user}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className="main-content">
        <Menu />
        <div className="posts-container">
          <input
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="post-input"
          />
          <label
            htmlFor="file-upload"
            className="file-upload-label"
            title="Upload photo"
          >
            <i className="bi bi-images"></i>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
          </label>
          <button className="add-post-button" onClick={addPostHandler}>
            Post
          </button>
          {postsList.map(post => (
            <Post
              key={post._id}
              {...post}
              author={post.author}
              src={post.postImage}
              onDelete={() => deletePostHandler(post._id)}
              onUpdate={updatePostHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;