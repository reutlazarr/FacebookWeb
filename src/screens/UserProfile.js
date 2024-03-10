import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPost, deletePost, updatePost } from "../feed_components/HandlePosts";
import TopBar from "../feed_components/TopBar";
import Post from "../feed_components/Post";
import Menu from "../feed_components/Menu";
import { useLocation } from "react-router-dom";


function UserProfile({ user }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
    const [postsList, setPostsList] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [profile, setProfile] = useState(null);
    const location = useLocation();
    const { author } = location.state || {}; // Get author from state; default to an empty object if state is undefined

    // This ensures the feed will display only if the user signIn and have a token
    useEffect(() => {
        console.log(user)
        if (!user.token) {
            navigate("/");
        } else {
            // Fetch user's posts when the user is present and has a token
            getUserPosts(`${author.email}`);
            //getUserPosts(user._id);
        }
    }, [user, navigate]);


    function setProfileUser(setProfile, data) {
        setProfile({
            name: data.name,
            profilePicture: data.profilePicture
        });
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (!user.token) return; // If no token is provided, do not attempt to fetch user
            try {
                const response = await fetch(`http://localhost:8080/api/users/${author.email}`, {
                    //const response = await fetch(`http://localhost:8080/api/users/${email}`, {
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
                setProfileUser(setProfile, data);

            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [user.token, user.email]); // Dependency on token to refetch if it changes

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode); // Toggle the dark mode state
    };

    const handleImageChange = (e) => {
        setPostImage(e.target.files[0]);
    };

    //handeling posts
    const addPostHandler = async () => {
        await addPost(user, newPostContent, postImage, setPostsList);
        setNewPostContent('');
        setPostImage(null);
    };

    const deletePostHandler = async (postId) => {
        await deletePost(user, postId, setPostsList);
    };

    const updatePostHandler = async (postId, updatedContent, updatedImage) => {
        await updatePost(user, postId, updatedContent, updatedImage, postsList, setPostsList);
    };

    const getUserPosts = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${author.email}/posts/`, {
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

    const sendFriendRequest = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/users/${author.email}/friends`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({ recipient: author.email }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const result = await response.json();
          console.log('Friend request sent:', result);
          // Optionally, provide feedback to the user or update the UI
        } catch (error) {
          console.error("Error sending friend request:", error);
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
                <Menu />
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
                            //onChange={handleImageChange}
                            className="image-input"
                        />
                    </label>
                    <button className="add-post-button" onClick={addPostHandler}>
                        Post
                    </button>
                    <div className="user-profile">
                    <img src={author.profilePicture} alt="Profile" className="profile-picture" />
                    <h3>{author.name}</h3>
                    <button onClick={sendFriendRequest} className="add-friend-button">Add Friend! </button>
                    </div>
                    {postsList.map((post) => (
                        <Post
                            key={post._id}
                            {...post}
                            author={post.author}
                            onDelete={() => deletePostHandler(post._id)}
                            onUpdate={updatePostHandler}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default UserProfile;      