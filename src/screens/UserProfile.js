import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPost, deletePost, updatePost } from "../utils/HandlePosts";
import TopBar from "../feed_components/TopBar";
import Post from "../feed_components/Post";
import Menu from "../feed_components/Menu";
import { useLocation } from "react-router-dom";
import FriendshipStatusChecker from "../utils/FriendshipStatusChecker.js";
import "./UserProfile.css"

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


    return (
        <div className={`feed-container ${isDarkMode ? "dark-mode" : ""}`}>
            <TopBar user={user} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
            <div className="main-content">
                <Menu />
                <div className="post-containers">
                <div className="user-profile">
                        <img src={author.profilePicture} alt="Profile" className="profile-picture" />
                        <h3>{author.name}</h3>
                        <button onClick={() => navigate('/FriendsPage', { state: { email: author.email } })}>{author.name}'s friends </button>
                        <FriendshipStatusChecker user={user} recipientEmail={author.email} />
                    </div>
                    <input value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="What's on your mind?" className="post-input" />
                    <label htmlFor="file-upload" className="file-upload-label" title="Upload photo">
                        <i className="bi bi-images"></i>
                        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="image-input" />
                    </label>
                    <button className="add-post-button" onClick={addPostHandler}>Post</button>
                    {postsList.map((post) => (
                        <Post key={post._id} {...post} author={post.author} postImage={post.image} onDelete={() => deletePostHandler(post._id)} onUpdate={updatePostHandler} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;