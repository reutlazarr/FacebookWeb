// Feed.js
import React, { useState, useEffect } from "react";
import Post from "../feed_components/Post";
import { v4 as uuidv4 } from "uuid";
import "./Feed.css";
import initialPosts from "../data/db.json";
import Menu from "../feed_components/Menu";
import TopBar from "../feed_components/TopBar";
import { redirect } from "react-router-dom";

function Feed({ user }) {
  const [postsList, setPostsList] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profile, setProfile] = useState(null);

  if (!user) {
    redirect("/register");
  }

  function setProfileUser(setProfile, data) {
    setProfile({
      name: data.name,
      profilePicture: data. profilePicture
    });
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (!user.token) return; // If no token is provided, do not attempt to fetch user
      try {
        console.log("Fetching user profile...");
        console.log(user.token);
        console.log(user.email);
        const response = await fetch(`http://localhost:8080/api/users/${user.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${user.token}` // Include the token in the request
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setProfileUser(setProfile, data);
        //setProfile(data); // Assuming the response contains an object with the user key
        console.log("profile");
        console.log({profile});
        console.log(profile.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();

  }, [user.token, user.email]); // Dependency on token to refetch if it changes

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
        profile={profile}
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
