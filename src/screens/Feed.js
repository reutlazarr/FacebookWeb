// Feed.js
import React, { useState, useEffect } from "react";
import Post from "../feed_components/Post";
import { v4 as uuidv4 } from "uuid";
import "./Feed.css";
import initialPosts from "../data/db.json";
import Menu from "../feed_components/Menu";
import TopBar from "../feed_components/TopBar";
import { useNavigate } from "react-router-dom";

function Feed({ user }) {
  const navigate = useNavigate();
  const [postsList, setPostsList] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profile, setProfile] = useState(null);

  function setProfileUser(setProfile, data) {
    setProfile({
      name: data.name,
      profilePicture: data.profilePicture
    });
  }

  // This ensures the feed will display only if the user signIn and have a token
  useEffect(() => {
    if (!user.token) {
      navigate("/");
    }
  }, [user, navigate]);

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

  async function del(postId) {
    const response = await fetch('http://localhost:8080/posts/' + postId, {
        method: "DELETE",
    });
    // Check if the deletion was successful
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        // Handle error response
        throw new Error('Failed to delete the post');
    }
}

  const deletePost = async (postId) => {
    try {
        // Call the server-side deletion function
        const response = await del(postId);
        // If the deletion was successful, update the local state
        if (response.success) {  // Assuming the server sends a success status
            const updatedPosts = postsList.filter((post) => post.id !== postId);
            setPostsList(updatedPosts);
        } else {
            // Handle the case where the server reports deletion failure
            console.error('Failed to delete the post on the server');
        }
    } catch (error) {
        console.error('Error deleting the post:', error);
    }
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
