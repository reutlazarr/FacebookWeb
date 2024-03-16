import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../feed_components/TopBar";
import Menu from "../feed_components/Menu";
import { useLocation } from "react-router-dom";
import "./FriendsPage.css";

function FriendsPage({ user }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [friends, setFriends] = useState([]); // State to hold the friends list
    const location = useLocation();
    const { email } = location.state || { email: user.email };
    // This ensures the feed will display only if the user signIn and have a token
    useEffect(() => {
        if (!user.token) {
            navigate("/");
        } else {
            email && fetchFriends(email);
        }
    }, [user, navigate, email]);


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
                setProfileUser(setProfile, data);

            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [user.token, user.email]); // Dependency on token to refetch if it changes

    const fetchFriends = async (email) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${email}/friends`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const friendsData = await response.json();
            setFriends(friendsData); // Set the friends data to state
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    };

    return (
        <div className={`feed-container ${isDarkMode ? "dark-mode" : ""}`}>
            <TopBar user={user} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
            <div className="main-content">
                <Menu />
                <div className="profile-content">
                    {/* Other profile content might go here */}
                    <div className="friends-section">
                        <h2 className="friends-title">Friends </h2>
                        <div className="friends-list">
                            {friends.map(friend => (
                                <div key={friend._id} className="friend-item">
                                    <img src={friend.profilePicture} alt={friend.name} className="friend-profile-picture" />
                                    <div className="friend-name">{friend.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FriendsPage;