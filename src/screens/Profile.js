import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPost, deletePost, updatePost } from "../feed_components/HandlePosts";
import TopBar from "../feed_components/TopBar";
import Post from "../feed_components/Post";


function Profile({ user }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [postsList, setPostsList] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  // const [profile, setProfile] = useState(null);

  // This ensures the feed will display only if the user signIn and have a token
  useEffect(() => {
    console.log(user)
    if (!user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle the dark mode state
  };

  //handeling posts
  const addPostHandler = async () => {
    await addPost(user, newPostContent, postImage, setPostsList);
    setNewPostContent("");
    setPostImage(null);
  };

  const deletePostHandler = async (postId) => {
    await deletePost(user, postId, setPostsList);
  };

  const updatePostHandler = async (postId, updatedContent, updatedImage) => {
    await updatePost(user, postId, updatedContent, updatedImage, postsList, setPostsList);
  };

  return (
    <div className={`feed-container ${isDarkMode ? "dark-mode" : ""}`}>
      <TopBar
        user={user}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className="main-content">
        <div className="post-containers">
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
              // onChange={handleImageChange}
              className="image-input"
            />
          </label>
          <button className="add-post-button" onClick={addPostHandler}>
            Post
          </button>
          {postsList.map((post) => (
            <Post
              key={post.id}
              {...post}
              // profile={profile}
              onDelete={() => deletePostHandler(post.id)}
              onUpdate={updatePostHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;      
