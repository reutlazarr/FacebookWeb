// Feed.js
import React, { useState } from "react";
import Post from "../feed_components/Post";
import { v4 as uuidv4 } from "uuid";
import "./Feed.css";
import initialPosts from "../data/db.json";
import Menu from "../feed_components/Menu";
import TopBar from "../feed_components/TopBar";

function Feed() {
  const [postsList, setPostsList] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [user, setUser] = useState(null);

const handleLogin = () => {
  const loggedInUser = {
    username: "Reut Lazar",
    name: "Reut Lazar",
    email: "user@example.com",
    profilePicture:
      "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlfHx8fHx8MTcwNzU1NzMxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  };
  setUser(loggedInUser);
};

  const addPost = () => {
    const post = {
      id: uuidv4(),
      content: newPostContent,
      userName: user.username,
      postDate: new Date().toLocaleDateString(),
      postImage: postImage ? URL.createObjectURL(postImage) : null,
      comments: [],
      userProfilePicture: user.profilePicture,
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

  return (
    <div className="feed-container">
      <TopBar user={user} onLogin={handleLogin}/>
      <div className="main-content">
        <Menu />
        <div className="posts-container">
          <input
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="post-input"
          />
          <label htmlFor="file-upload" className="file-upload-label">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
