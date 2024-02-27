// Feed.js
import React, { useState } from "react";
import Post from "../feed_components/Post";
import { v4 as uuidv4 } from "uuid";
import "./Feed.css";
import initialPosts from "../data/db.json";
import Menu from "../feed_components/Menu";
import TopBar from "../feed_components/TopBar";
import { redirect } from "react-router-dom";

function Feed({ user, token }) {
  const [postsList, setPostsList] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (!user) {
    redirect("/register");
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle the dark mode state
  };

  const addPost = () => {
    const post = {
      id: uuidv4(),
      content: newPostContent,
      userName: user.name,
      postDate: new Date().toLocaleDateString(),
      postImage: postImage ? URL.createObjectURL(postImage) : null,
      comments: [],
      userProfilePicture: user.profilePicture,
      isNewPost: true,
    };
    setPostsList([post, ...postsList]);
    setNewPostContent("");
    setPostImage(null); // Reset the selected image after posting
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const deletePost = (postId) => {
    // Filter out the post with the matching postId
    const updatedPosts = postsList.filter((post) => post.id !== postId);
    // Update the post list without the deleted post
    setPostsList(updatedPosts);
  };

  const updatePost = (postId, updatedContent, updatedImage) => {
    const updatedPosts = postsList.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          content: updatedContent,
          postImage: updatedImage
            ? URL.createObjectURL(updatedImage)
            : post.postImage,
        };
      }
      return post;
    });
    setPostsList(updatedPosts);
  };

  return (
    <div className={`feed-container ${isDarkMode ? "dark-mode" : ""}`}>
      <TopBar
        // user={user}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        token={token}
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
          <button className="add-post-button" onClick={addPost}>
            Post
          </button>
          {postsList.map((post) => (
            <Post
              key={post.id}
              {...post}
              user={user}
              onDelete={() => deletePost(post.id)}
              onUpdate={updatePost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
