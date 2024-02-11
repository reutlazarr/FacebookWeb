// Feed.js
import React, { useState } from "react";
import Post from "./Post";
import { v4 as uuidv4 } from "uuid";
import "./Feed.css";

function Feed({ user, posts, setPosts }) {
  const [newPostContent, setNewPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);

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
    setPosts([post, ...posts]);
    setNewPostContent("");
    setPostImage(null); // Reset the selected image after posting
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  return (
    <div>
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
      {posts.map((post) => (
        <Post key={post.id} {...post} user={user} />
      ))}
    </div>
  );
}

export default Feed;
