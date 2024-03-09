import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPost, deletePost, updatePost } from "../feed_components/HandlePosts";
import TopBar from "../feed_components/TopBar";
import Post from "../feed_components/Post";
import Menu from "../feed_components/Menu";

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
    } else {
      // Fetch user's posts when the user is present and has a token
      getUserPosts(user._id);
    }
  }, [user, navigate]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle the dark mode state
  };

  //handeling posts
  const addPostHandler = async () => {
    await addPost(user, newPostContent, postImage, setPostsList);
    setNewPostContent(newPostContent);
    setPostImage(postImage);
  };

  const deletePostHandler = async (postId) => {
    await deletePost(user, postId, setPostsList);
  };

  const updatePostHandler = async (postId, updatedContent, updatedImage) => {
    await updatePost(user, postId, updatedContent, updatedImage, postsList, setPostsList);
  };

  const getUserPosts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.email}/posts/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,  // Assuming 'user' is your authenticated user with a token
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const posts = await response.json();
      setPostsList(posts); // Assuming you have a state setter for postsList in your component
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  return (
    <div className={`feed-container ${isDarkMode ? "dark-mode" : ""}`}>
      <TopBar
        user={user}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className="main-content">
        <Menu></Menu>
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
              key={post._id}
              {...post}
              onDelete={() => deletePostHandler(post._id)}
              onUpdate={updatePostHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;      
